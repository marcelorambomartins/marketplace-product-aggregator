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
docker compose up --build
```

Se a página abrir vazia ou com erro de API, aguarde o backend concluir a ingestão (~30s na primeira subida) e recarregue. Para rebuild completo: `docker compose down && docker compose build --no-cache && docker compose up`.

- Frontend: http://127.0.0.1:3000
- Backend: http://127.0.0.1:3001
- Swagger: http://127.0.0.1:3001/api/docs

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
| GET | /api/products | Lista produtos (paginação, filtros) |
| GET | /api/products/:id | Detalhe de um produto |
| POST | /api/products/sync | Reingere produtos da DummyJSON |

### Query params — `GET /api/products`

| Param | Tipo | Descrição |
|-------|------|-----------|
| `category` | string | Filtra por categoria (ex.: `smartphones`) |
| `minPrice` | number | Preço mínimo |
| `maxPrice` | number | Preço máximo |
| `search` | string | Busca em título e descrição |
| `page` | number | Página (padrão: 1) |
| `limit` | number | Itens por página (padrão: 20, máx.: 100) |

Na primeira subida, o backend ingere automaticamente os produtos da [DummyJSON](https://dummyjson.com). Os dados ficam em memória e são perdidos ao reiniciar o processo.

## Frontend

| Rota | Descrição |
|------|-----------|
| `/` | Listagem com filtros (busca, categoria, preço) e paginação |
| `/products/:id` | Detalhe do produto |
| `/compare?ids=1,2,3` | Comparação lado a lado (mín. 2, máx. 4 produtos) |

Na listagem, marque **Comparar** nos cards (ou no detalhe), depois use a barra fixa inferior. Os filtros ficam na URL (`?search=iphone`), permitindo compartilhar a busca; a comparação também (`?ids=1,5,12`).

---
