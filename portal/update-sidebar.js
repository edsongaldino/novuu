const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

const replacement = `      <aside class="detail-right-column" style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        
        <!-- Lead Interest Contact Form (Dark Theme) -->
        <div id="contact-form-sidebar" class="sidebar-card contact-card" style="background-color: #0b2545; border-radius: var(--radius-lg); padding: var(--spacing-xl); box-shadow: var(--shadow-lg);">
          
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: var(--spacing-lg);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="8" y1="6" x2="8.01" y2="6"></line><line x1="12" y1="6" x2="12.01" y2="6"></line><line x1="16" y1="6" x2="16.01" y2="6"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="12" y1="10" x2="12.01" y2="10"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="12" y1="14" x2="12.01" y2="14"></line><line x1="16" y1="14" x2="16.01" y2="14"></line></svg>
            </div>
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 700; color: white; margin: 0 0 4px 0;">Tenho interesse</h3>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8); margin: 0; line-height: 1.4;">Receba tabela de preços, plantas, condições especiais e disponibilidade.</p>
            </div>
          </div>
          
          @if (formSubmitted()) {
            <div class="form-success-alert" style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: var(--spacing-md); border-radius: var(--radius-md); text-align: center;">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="#22c55e" stroke-width="2" fill="none" style="margin-bottom: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <h4 style="color: white; margin: 0 0 8px 0;">Solicitação recebida!</h4>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0 0 16px 0;">Em breve um consultor entrará em contato.</p>
              <button (click)="formSubmitted.set(false)" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: var(--radius-sm); cursor: pointer;">Enviar nova mensagem</button>
            </div>
          } @else {
            <form class="contact-form" (submit)="submitInterest($event)" style="display: flex; flex-direction: column; gap: 16px;">
              <div class="form-group" style="margin: 0;">
                <label for="contact-name" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">Nome completo *</label>
                <input type="text" id="contact-name" [(ngModel)]="clientNome" name="cname" placeholder="Digite seu nome completo" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-phone" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">WhatsApp *</label>
                <input type="tel" id="contact-phone" [(ngModel)]="clientTelefone" name="cphone" placeholder="(65) 9 9999-9999" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-email" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">E-mail *</label>
                <input type="email" id="contact-email" [(ngModel)]="clientEmail" name="cemail" placeholder="seu@email.com" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-previsao" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">Qual a sua previsão de compra?</label>
                <select id="contact-previsao" [(ngModel)]="clientPrevisao" name="cprevisao" style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box; cursor: pointer;">
                  <option value="Imediata">Imediata (Menos de 3 meses)</option>
                  <option value="Medio Prazo">Médio Prazo (3 a 6 meses)</option>
                  <option value="Futuro">Futuro (Mais de 6 meses)</option>
                  <option value="Apenas Pesquisa">Estou apenas pesquisando</option>
                </select>
              </div>

              <button type="submit" [disabled]="submitting()" style="background-color: #f97316; color: white; padding: 16px; border: none; border-radius: var(--radius-lg); font-weight: 800; font-size: 1.05rem; cursor: pointer; margin-top: 8px; transition: opacity 0.2s; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2), 0 2px 4px -1px rgba(249, 115, 22, 0.1);">
                {{ submitting() ? 'Enviando...' : 'Quero receber informações' }}
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: rgba(255,255,255,0.7);">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Atendimento personalizado
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Sem compromisso
                </div>
              </div>
            </form>
          }
        </div>

        <!-- Technical Specs Card (Vertical) -->
        <div class="sidebar-card specs-card-vertical" style="background-color: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-xl); box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 var(--spacing-lg) 0; text-transform: uppercase; letter-spacing: 0.05em;">Ficha técnica</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-xl); padding-bottom: var(--spacing-xl); border-bottom: 1px solid var(--border-color);">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ areaTerreno() }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Área do terreno</span>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9" y2="6"></line><line x1="15" y1="6" x2="15" y2="6"></line><line x1="9" y1="10" x2="9" y2="10"></line><line x1="15" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="9" y2="14"></line><line x1="15" y1="14" x2="15" y2="14"></line><line x1="9" y1="18" x2="9" y2="18"></line><line x1="15" y1="18" x2="15" y2="18"></line></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ empreendimento()?.qtdeTorre || 1 }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Torres</span>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ qtdeUnidades() }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Unidades</span>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ metragens() }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Metragens</span>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ dormitorios() }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Suítes</span>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-size: 1.4rem; color: var(--text-secondary); display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="2" y="10" width="20" height="10" rx="2" ry="2"></rect><circle cx="6" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle><path d="M4 10l2-6h12l2 6"></path></svg></span>
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ vagas() }}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Vagas</span>
              </div>
            </div>
          </div>

          <table class="specs-table-minimal" style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="padding: 12px 0; font-size: 0.85rem; color: var(--text-secondary); border-bottom: 1px solid var(--bg-secondary);">Tipo de empreendimento</td>
                <td style="padding: 12px 0; font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-align: right; border-bottom: 1px solid var(--bg-secondary);">{{ empreendimento()?.tipo }}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 0.85rem; color: var(--text-secondary); border-bottom: 1px solid var(--bg-secondary);">Status</td>
                <td style="padding: 12px 0; font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-align: right; border-bottom: 1px solid var(--bg-secondary);">{{ empreendimento()?.status }}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 0.85rem; color: var(--text-secondary);">Previsão de entrega</td>
                <td style="padding: 12px 0; font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-align: right;">{{ empreendimento()?.previsaoEntrega }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>`;

html = html.replace(/<aside class="detail-right-column">[\s\S]*?<\/aside>/, replacement);
fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
console.log("Form correctly updated");
