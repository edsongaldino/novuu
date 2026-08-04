# Estágio 1: Build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Serve (SSR usando Node)
FROM node:20-alpine
WORKDIR /app

# Copia os artefatos compilados
COPY --from=build /app/dist/lancamentos-online-portal ./dist/lancamentos-online-portal

EXPOSE 4000

# Comando para rodar o servidor Express gerado pelo Angular Universal/SSR
CMD ["node", "dist/lancamentos-online-portal/server/server.mjs"]
