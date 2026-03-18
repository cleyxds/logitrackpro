![Logo](./logitrackpro.svg)

# LogiTrack Pro

LogiTrack Pro é uma aplicação Web onde visa resolver o problema de gerenciamento de veículos e frota da empresa **LogiTrack**, centralizando informações e fornecendo inteligência de dados para os gestores.

## Appendix

Estrutura do repositório (monorepo)

- Root: arquivos de configuração e orquestração (`compose.yaml`, `turbo.json`, etc.).
- `apps/api`: aplicação backend Spring Boot (Java 21, Gradle). Expõe a API REST (`/api/**`) e contém a lógica de domínio, repositórios JPA e configuração de segurança JWT (opcional, porém decidi implementar).
- `apps/web`: aplicação frontend (React + Vite + TypeScript). UI, rotas, chamadas para a API via `VITE_API_URL`.
- `packages/*`: configurações e pacotes compartilhados (ESLint, presets TypeScript, utilitários). Comumente utilizado para compartilhar packages e códigos entre os projetos do monorepo.
- `envs/`: exemplos e overrides de variáveis de ambiente por ambiente (dev/prod).

Como rodar (dev)

- Backend:
  - Copie/ajuste `.env` em `apps/api` (ou use `spring.config.import`): configure `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, etc.
  - Executar: (na pasta `apps/api`)
    ```bash
    ./gradlew bootRun
    ```
- Frontend:
  - Ajuste `VITE_API_URL` em `.env` (ou use o proxy em `vite.config.ts`).
  - Executar: (na pasta `apps/web`)
    ```bash
    npm install
    npm run dev
    ```

Variáveis de ambiente importantes

- Database: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
- Auth: `JWT_SECRET`, `JWT_EXPIRATION_MS`
- Frontend: `VITE_API_URL`

Observações:

- O módulo de autenticação foi implementado de forma minimalista (JWT + refresh tokens em localStorage).

## Author

- [Cleyson Barbosa](https://www.github.com/cleyxds)

![Logo](https://raw.githubusercontent.com/cleyxds/cleyxds/refs/heads/main/profile.gif)
