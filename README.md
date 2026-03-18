![Logo](./logitrackpro.svg)

# LogiTrack Pro

LogiTrack Pro é uma aplicação Web onde visa resolver o problema de gerenciamento de veículos e frota da empresa **LogiTrack**, centralizando informações e fornecendo inteligência de dados para os gestores.

# Appendix

O repositório se trata de um monorepo utilizando o [TurboRepo](https://turborepo.dev/), seguindo o desafio o módulo escolhido foi:

- Opção 1: Módulo de Viagens

Para o Front-End, optei por uma interface web moderna, utilizando React + [Vite](https://vite.dev/) **(SPA)**

## 1. Tecnologias e arquitetura

- Monorepo com TurboRepo.
- Backend: Spring Boot 4, Java 21, Gradle, Spring Security (JWT), Spring Data JPA.
- Frontend: React 19, Vite, TypeScript, React Query.
- Banco de dados: PostgreSQL 16.3.
- Orquestracao de containers: Docker Compose.

##### Estrutura principal:

- apps/api: API REST e regras de negócio.
- apps/web: interface web moderna.
- envs: variaveis de ambiente usadas pelo Compose.
- compose.yaml: sobe os serviços **postgres**, **api** e **web**.

## 2. Pre-requisitos

- Docker e Docker Compose instalados.

###### Para execucao sem Docker:

- Java 21
- Node.js 20+

## 3. Configuração de ambiente

### Passo a passo

Utilize os `.env.*.example` para se basear e copiar os arquivos de env para seu respectivo projeto

##### Os serviços no Compose usam os arquivos da pasta `envs/`:

- envs/.env.postgres
- envs/.env.api
- envs/.env.web (para build, é necessário que o mesmo `.env` esteja presente em apps/web)

##### **Valores importantes:**

- API -> DB_URL deve apontar para o serviço do banco no Compose:
  - DB_URL=jdbc:postgresql://postgresql:5432/logitrackpro
  - Para as credenciais login de admin padrão funcionarem é necessário utilizar o valor de `JWT_SECRET=vJLqYKPKYfzT7Oz2LjYzBg5rSjIj/cmv6K3rnSihVSA=`
- Web -> VITE_API_URL para acesso da UI no navegador:
  - VITE_API_URL=http://localhost:8080

## 4. Como rodar localmente com Docker (recomendado)

Na raiz do projeto (/):

```bash
docker compose up --build -d
```

Endpoints:

- Web: http://localhost:3000
  - Credenciais de acesso:
    - Email: `admin@logitrack.com` (verificar [Valores importantes](#valores-importantes))
    - Senha: `password`
- API: http://localhost:8080
- Postgres: localhost:5432

Para desligar os serviços:

```bash
docker compose stop
```

## 5. Execução sem Docker (opcional)

API:

```bash
cd apps/api
./gradlew bootRun
```

Web:

```bash
cd apps/web
yarn install
yarn dev
```

## 6. Decisões técnicas

- Como o script inicial `Desafio LogAp TRE - Carga Inicial.sql` foi escrito na sintaxe do **PostgreSQL**, optei por usar o mesmo banco de dados.
- Spring Boot + JPA para acelerar o CRUD (Módulo de Viagens), validacões e persistência.
- Para o Dashboard, foi feita uma implementação separada na camada de repositório com SQL bruto (JDBC), evitando carga desnecessária de entidades e melhorando o tempo de resposta das consultas.
- JWT para autenticação stateless na API.
- React Query para cache e sincronização de dados no frontend, servindo assim como o backend sendo o Single Source of Truth (SSOT).
- Docker multi-stage para imagens menores, cache de etapas e build mais previsivel.

## 7. Banco de dados e scripts

- Banco padrão: PostgreSQL 16.3.
- Seed inicial da aplicação: `apps/api/src/main/resources/data.sql`
- Script fornecido no desafio: `Desafio LogAp TRE - Carga Inicial.sql`

Sobre alterações de banco:

- Não foi criado um novo script SQL de estrutura separado.
- A justificativa foi manter simplicidade para desenvolvimento rápido.

## 8. Autor

- **Cleyson Barbosa**
