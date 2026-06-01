# Marketplace Aggregator

Aplicação fullstack que agrega, armazena e compara produtos de múltiplos marketplaces.

---

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Backend | NestJS + TypeScript | Estrutura modular, DI nativa, Swagger integrado |
| Frontend | Next.js 14 + TypeScript | SSR, App Router, Tailwind CSS |
| Dados | In-memory (Map) | Suficiente para o escopo; interface idêntica à de um banco real |
| Fonte externa | DummyJSON API | Gratuita, estável, retorna produtos com categorias e preços |
| Infra | Docker + docker-compose | Sobe tudo com um comando |

---

## Como rodar

### Com Docker (recomendado)

Antes do primeiro `docker-compose up`, rode `npm install` em **backend** e **frontend** na máquina host. Os Dockerfiles usam `npm ci`, que depende do `package-lock.json` gerado localmente.

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

### Sem Docker

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/health | Health check da API |



---
