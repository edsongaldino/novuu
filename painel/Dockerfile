# Estágio 1: Build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Estágio 2: Serve (SPA com Nginx)
FROM nginx:alpine

# Copiar build gerado do painel para a pasta pública do nginx
COPY --from=build /app/dist/lancamentos-online-admin/browser /usr/share/nginx/html

# Configuração customizada do Nginx para suportar roteamento SPA do Angular
# Precisamos sobrescrever o default.conf para que todas as requisições apontem para index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
