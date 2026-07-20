import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  computed,
  ChangeDetectorRef,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAR2IVq3jVk74-DZM8sEliKtRcVJqZoLPI';

export interface PlaceCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  googleType: string;
}

export interface NearbyPlace {
  name: string;
  vicinity: string;
  lat: number;
  lng: number;
  categoryId: string;
  placeId: string;
  rating?: number;
}

const CATEGORIES: PlaceCategory[] = [
  { id: 'hospital',     label: 'Hospital',     emoji: '🏥', color: '#dc2626', bgColor: '#fef2f2', googleType: 'hospital' },
  { id: 'pharmacy',     label: 'Farmácia',     emoji: '💊', color: '#16a34a', bgColor: '#f0fdf4', googleType: 'pharmacy' },
  { id: 'supermarket',  label: 'Supermercado', emoji: '🛒', color: '#2563eb', bgColor: '#eff6ff', googleType: 'supermarket' },
  { id: 'school',       label: 'Escola',       emoji: '🏫', color: '#ca8a04', bgColor: '#fefce8', googleType: 'school' },
  { id: 'shopping_mall',label: 'Shopping',     emoji: '🏬', color: '#7c3aed', bgColor: '#f5f3ff', googleType: 'shopping_mall' },
  { id: 'restaurant',   label: 'Restaurante',  emoji: '🍽️', color: '#ea580c', bgColor: '#fff7ed', googleType: 'restaurant' },
  { id: 'bank',         label: 'Banco',        emoji: '🏦', color: '#0e7490', bgColor: '#ecfeff', googleType: 'bank' },
  { id: 'gym',          label: 'Academia',     emoji: '💪', color: '#be185d', bgColor: '#fdf2f8', googleType: 'gym' },
];

declare const google: any;

@Component({
  selector: 'app-proximity-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proximity-map.component.html',
  styleUrls: ['./proximity-map.component.css'],
})
export class ProximityMapComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() address: string = '';
  @Input() lat?: number | null;
  @Input() lng?: number | null;

  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  readonly categories = CATEGORIES;

  mapLoaded = signal(false);
  mapError = signal('');
  activeCategories = signal<Set<string>>(new Set());
  loadingCategories = signal<Set<string>>(new Set());
  nearbyPlaces = signal<NearbyPlace[]>([]);
  radius = signal(1000); // metres

  placesCountByCategory = computed(() => {
    const places = this.nearbyPlaces();
    const map: Record<string, number> = {};
    for (const p of places) {
      map[p.categoryId] = (map[p.categoryId] || 0) + 1;
    }
    return map;
  });

  private map: any = null;
  private circle: any = null;
  private geocoder: any = null;
  private placesService: any = null;
  private centerMarker: any = null;
  private categoryMarkers: Map<string, any[]> = new Map();
  private centerLatLng: any = null;
  private viewReady = false;
  private addressToLoad: string = '';

  private static apiLoaded = false;
  private static apiLoadPromise: Promise<void> | null = null;

  ngAfterViewInit() {
    this.viewReady = true;
    if (this.address || (this.lat != null && this.lng != null)) {
      this.initMap(this.address);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address'] || changes['lat'] || changes['lng']) {
      if (this.viewReady && (this.address || (this.lat != null && this.lng != null))) {
        this.initMap(this.address);
      }
    }
  }

  ngOnDestroy() {
    this.clearAllMarkers();
  }

  private async initMap(address: string) {
    try {
      await this.loadGoogleMapsApi();
      this.createMap(address);
    } catch (e: any) {
      this.ngZone.run(() => {
        this.mapError.set('Não foi possível carregar o mapa. Verifique a API Key.');
      });
    }
  }

  private loadGoogleMapsApi(): Promise<void> {
    if (ProximityMapComponent.apiLoaded && typeof google !== 'undefined') {
      return Promise.resolve();
    }
    if (ProximityMapComponent.apiLoadPromise) {
      return ProximityMapComponent.apiLoadPromise;
    }
    ProximityMapComponent.apiLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=pt-BR`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        ProximityMapComponent.apiLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Google Maps API failed to load'));
      document.head.appendChild(script);
    });
    return ProximityMapComponent.apiLoadPromise;
  }

  private createMap(address: string) {
    const container = this.mapContainer?.nativeElement;
    if (!container) return;

    const mapOptions = {
      zoom: 15,
      center: { lat: -15.601411, lng: -56.097892 }, // Cuiabá fallback
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: this.mapStyles(),
    };

    this.map = new google.maps.Map(container, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    this.placesService = new google.maps.places.PlacesService(this.map);

    this.ngZone.run(() => this.mapLoaded.set(true));

    // If coordinates are provided, use them directly
    if (this.lat != null && this.lng != null && !isNaN(this.lat) && !isNaN(this.lng)) {
      console.log('Utilizando coordenadas cadastradas no empreendimento:', this.lat, this.lng);
      const loc = new google.maps.LatLng(this.lat, this.lng);
      this.centerLatLng = loc;
      this.map.setCenter(loc);
      this.map.setZoom(15);
      this.drawCircle(loc);
      this.addCenterMarker(loc);

      // Search active categories with coordinate center
      this.activeCategories().forEach(catId => {
        this.removeMarkersForCategory(catId);
        this.fetchPlaces(catId);
      });
      return;
    }

    // Otherwise, draw circle immediately with fallback center, then geocode
    this.drawCircle({ lat: -15.601411, lng: -56.097892 });

    // Geocode address
    console.log('Iniciando geocodificação para o endereço:', address);
    this.geocoder.geocode({ address }, (results: any[], status: string) => {
      this.ngZone.run(() => {
        console.log('Resultado do Geocoder:', status, results);
        if (status === 'OK' && results[0]) {
          const loc = results[0].geometry.location;
          this.centerLatLng = loc;
          this.map.setCenter(loc);
          this.map.setZoom(15);
          this.drawCircle(loc);
          this.addCenterMarker(loc);
          
          // Re-search active categories with new center
          this.activeCategories().forEach(catId => {
            this.removeMarkersForCategory(catId);
            this.fetchPlaces(catId);
          });
        } else {
          console.warn('Geocodificação falhou ou não retornou resultados. Status:', status, '. Usando coordenadas padrão de Cuiabá.');
          // Fallback para coordenadas padrão de Cuiabá (Jardim das Américas / Av. dos Lagos)
          const fallbackLoc = new google.maps.LatLng(-15.607412, -56.068892);
          this.centerLatLng = fallbackLoc;
          this.map.setCenter(fallbackLoc);
          this.map.setZoom(15);
          this.drawCircle(fallbackLoc);
          this.addCenterMarker(fallbackLoc);
          
          // Re-search active categories com coordenadas padrão
          this.activeCategories().forEach(catId => {
            this.removeMarkersForCategory(catId);
            this.fetchPlaces(catId);
          });
        }
      });
    });
  }

  private getCenterMarkerIcon(): any {
    // Exact SVG representing the website logo
    const svg = `
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="22" fill="white" stroke="#0A0A0A" stroke-width="3" />
      <path d="M 17 35 L 17 15 L 33 35 L 33 15" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="33" cy="15" r="3" fill="#4F46E5" />
    </svg>
    `;
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(46, 46),
      anchor: new google.maps.Point(23, 23),
    };
  }

  private addCenterMarker(location: any) {
    if (this.centerMarker) this.centerMarker.setMap(null);
    this.centerMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: this.address,
      icon: this.getCenterMarkerIcon(),
      zIndex: 999,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-family:'Inter',sans-serif;padding:4px 2px;"><strong style="color:#0b2545;">📍 Empreendimento</strong><br><span style="color:#555;font-size:0.85em;">${this.address}</span></div>`,
    });
    this.centerMarker.addListener('click', () => infoWindow.open(this.map, this.centerMarker));
  }

  private drawCircle(center: any) {
    if (this.circle) this.circle.setMap(null);
    this.circle = new google.maps.Circle({
      strokeColor: '#2563eb',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#3b82f6',
      fillOpacity: 0.08,
      map: this.map,
      center,
      radius: this.radius(),
    });
  }

  setRadius(r: number) {
    this.radius.set(r);
    if (this.circle && this.centerLatLng) {
      this.circle.setRadius(r);
      
      // Dynamic zoom adjustment based on search radius
      let zoomLevel = 15;
      if (r === 500) zoomLevel = 16;
      else if (r === 1000) zoomLevel = 15;
      else if (r === 2000) zoomLevel = 14;
      else if (r === 5000) zoomLevel = 12;
      else if (r === 10000) zoomLevel = 11;
      
      this.map.setZoom(zoomLevel);
      this.map.setCenter(this.centerLatLng);

      // Re-fetch all active categories with new radius
      const active = new Set(this.activeCategories());
      this.clearAllMarkers();
      this.nearbyPlaces.set([]);
      active.forEach(catId => this.fetchPlaces(catId));
    }
  }

  toggleCategory(catId: string) {
    const current = new Set(this.activeCategories());
    if (current.has(catId)) {
      current.delete(catId);
      this.removeMarkersForCategory(catId);
      this.nearbyPlaces.update(places => places.filter(p => p.categoryId !== catId));
    } else {
      current.add(catId);
      this.fetchPlaces(catId);
    }
    this.activeCategories.set(current);
  }

  isCategoryActive(catId: string): boolean {
    return this.activeCategories().has(catId);
  }

  isCategoryLoading(catId: string): boolean {
    return this.loadingCategories().has(catId);
  }

  private fetchPlaces(catId: string) {
    if (!this.placesService || !this.centerLatLng) return;

    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;

    this.loadingCategories.update(s => { const n = new Set(s); n.add(catId); return n; });

    const request = {
      location: this.centerLatLng,
      radius: this.radius(),
      type: cat.googleType,
    };

    console.log('Buscando locais para a categoria:', catId, 'Request:', request);
    this.placesService.nearbySearch(request, (results: any[], status: string) => {
      this.ngZone.run(() => {
        console.log('Resultado do NearbySearch para', catId, 'Status:', status, 'Total:', results ? results.length : 0);
        this.loadingCategories.update(s => { const n = new Set(s); n.delete(catId); return n; });
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const newPlaces: NearbyPlace[] = results.slice(0, 15).map((r: any) => ({
            name: r.name,
            vicinity: r.vicinity,
            lat: r.geometry.location.lat(),
            lng: r.geometry.location.lng(),
            categoryId: catId,
            placeId: r.place_id,
            rating: r.rating,
          }));
          this.nearbyPlaces.update(prev => [...prev, ...newPlaces]);
          this.addMarkersForCategory(catId, newPlaces, cat);
        } else if (status === 'ZERO_RESULTS') {
          console.log('Nenhum resultado encontrado para a categoria:', catId);
        } else {
          console.error('Erro na busca NearbySearch:', status);
        }
      });
    });
  }

  private getCategorySvgPath(catId: string, color: string): string {
    switch (catId) {
      case 'hospital':
        return `<path d="M18 10v16M10 18h16" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
      case 'pharmacy':
        return `
          <rect x="11" y="11" width="14" height="14" rx="7" transform="rotate(45 18 18)" stroke="${color}" stroke-width="2.5" fill="none" />
          <line x1="13" y1="13" x2="23" y2="23" stroke="${color}" stroke-width="2.5" />
        `;
      case 'supermarket':
        return `
          <circle cx="14" cy="27" r="2" fill="${color}"/>
          <circle cx="24" cy="27" r="2" fill="${color}"/>
          <path d="M8 8h4l3 12h11l3-9H14" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        `;
      case 'school':
        return `
          <path d="M18 9l11 5-11 5-11-5 11-5z" stroke="${color}" stroke-width="2" fill="none"/>
          <path d="M11 15.5v5c0 1 2 2.5 7 2.5s7-1.5 7-2.5v-5" stroke="${color}" stroke-width="2" fill="none"/>
          <line x1="29" y1="14" x2="29" y2="21" stroke="${color}" stroke-width="2"/>
          <circle cx="29" cy="21" r="1.5" fill="${color}"/>
        `;
      case 'shopping_mall':
        return `
          <path d="M11 13h14v14H11z" stroke="${color}" stroke-width="2.2" fill="none"/>
          <path d="M14 13V10a4 4 0 0 1 8 0v3" stroke="${color}" stroke-width="2.2" fill="none"/>
          <line x1="15" y1="18" x2="21" y2="18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        `;
      case 'restaurant':
        return `
          <path d="M13 9v7m-2.5-7v4a2.5 2.5 0 0 0 5 0V9m-2.5 7v11" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M23 9v18M20 9a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V9z" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>
        `;
      case 'bank':
        return `
          <path d="M18 8l11 5H7l11-5z" fill="${color}"/>
          <line x1="10" y1="14" x2="10" y2="23" stroke="${color}" stroke-width="2"/>
          <line x1="18" y1="14" x2="18" y2="23" stroke="${color}" stroke-width="2"/>
          <line x1="26" y1="14" x2="26" y2="23" stroke="${color}" stroke-width="2"/>
          <line x1="8" y1="25" x2="28" y2="25" stroke="${color}" stroke-width="2.5"/>
        `;
      case 'gym':
        return `
          <rect x="8" y="15" width="4" height="6" rx="1" fill="${color}"/>
          <rect x="24" y="15" width="4" height="6" rx="1" fill="${color}"/>
          <line x1="12" y1="18" x2="24" y2="18" stroke="${color}" stroke-width="3"/>
          <line x1="10" y1="12" x2="10" y2="24" stroke="${color}" stroke-width="2.2"/>
          <line x1="26" y1="12" x2="26" y2="24" stroke="${color}" stroke-width="2.2"/>
        `;
      default:
        return `<circle cx="18" cy="18" r="4" fill="${color}"/>`;
    }
  }

  private getCategoryMarkerIcon(cat: PlaceCategory): any {
    // Generate a modern round white marker with colored border and centered vector SVG path icon
    const iconSvg = this.getCategorySvgPath(cat.id, cat.color);
    const svg = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="15" fill="white" stroke="${cat.color}" stroke-width="3" />
      ${iconSvg}
    </svg>
    `;
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(36, 36),
      anchor: new google.maps.Point(18, 18),
    };
  }

  private addMarkersForCategory(catId: string, places: NearbyPlace[], cat: PlaceCategory) {
    const markers: any[] = [];
    const markerIcon = this.getCategoryMarkerIcon(cat);
    
    places.forEach(place => {
      const marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: this.map,
        title: place.name,
        icon: markerIcon
      });
      
      const info = new google.maps.InfoWindow({
        content: `<div style="font-family:'Inter',sans-serif;min-width:160px;padding:4px 2px;">
          <div style="font-weight:700;color:${cat.color};margin-bottom:4px;">${cat.emoji} ${place.name}</div>
          <div style="color:#555;font-size:0.82em;">${place.vicinity}</div>
          ${place.rating ? `<div style="color:#f59e0b;margin-top:4px;font-size:0.82em;">⭐ ${place.rating}</div>` : ''}
        </div>`,
      });
      marker.addListener('click', () => info.open(this.map, marker));
      markers.push(marker);
    });
    this.categoryMarkers.set(catId, markers);
  }

  private removeMarkersForCategory(catId: string) {
    const markers = this.categoryMarkers.get(catId) || [];
    markers.forEach(m => m.setMap(null));
    this.categoryMarkers.delete(catId);
  }

  private clearAllMarkers() {
    this.categoryMarkers.forEach((markers) => markers.forEach(m => m.setMap(null)));
    this.categoryMarkers.clear();
  }

  openInGoogleMaps() {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}`;
    window.open(url, '_blank');
  }

  private mapStyles(): any[] {
    return [
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#aaaaaa' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9e8f5' }] },
      { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }] },
      { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
    ];
  }
}
