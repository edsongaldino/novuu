# Novuu | Inteligência Imobiliária

Este é o monorepo consolidado do projeto Novuu. Ele contém a API, o Portal web, e o Painel Administrativo.

## Como rodar o projeto localmente com um só comando

Para iniciar o projeto inteiro (Banco de Dados + API + Portal + Painel) sem precisar instalar e configurar tudo na sua máquina local, basta ter o [Docker](https://www.docker.com/products/docker-desktop) instalado e rodar o comando:

```bash
docker-compose up --build
```

> **Primeira Execução:**
> Na primeira vez que você rodar, o backend detectará o novo banco de dados em branco, aplicará o esquema completo do Entity Framework, e rodará o *Seed* dos dados, criando os usuários iniciais, as construtoras, empreendimentos e os leads mockados. Nenhuma configuração extra no banco é necessária.

## Acessos Locais

Depois que o comando terminar de subir os containers, você pode acessar:

- **Portal Público:** [http://localhost:4200](http://localhost:4200)
- **Painel Administrativo:** [http://localhost:4201](http://localhost:4201)
- **API Swagger / Endpoints:** [http://localhost:5135/swagger](http://localhost:5135/swagger) ou `http://localhost:5135/scalar/v1`

## Como desligar
Para parar e desligar os containers (mantendo os dados do banco intactos), use `Ctrl+C` no terminal que está rodando, ou digite:

```bash
docker-compose down
```

Se precisar resetar o banco de dados completamente (destruir os dados locais), rode:

```bash
docker-compose down -v
```
