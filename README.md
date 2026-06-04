# Marketplace Aggregator

Aplicação fullstack que agrega produtos de uma fonte externa (DummyJSON), armazena em memória, expõe uma API REST e oferece interface web para busca, filtros, detalhe e comparação lado a lado.

---

## Funcionalidades

| Área | O que faz |
|------|-----------|
| **Ingestão** | Na subida, busca todos os produtos da [DummyJSON](https://dummyjson.com) e normaliza para o modelo interno |
| **API** | Listagem com paginação/filtros, detalhe por id, re-sync manual |
| **Frontend** | Listagem, filtros na URL, detalhe, comparação de 2 a 4 produtos |
| **Infra** | Docker Compose com healthcheck e proxy da API no Next.js |

---

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Backend | NestJS + TypeScript | Módulos, DI, validação, Swagger nativo |
| Frontend | Next.js 14 (App Router) + Tailwind | SSR no detalhe, client fetch na listagem, UI rápida |
| Dados | In-memory (`Map`) | Atende o case; repositório isolado facilita trocar por DB depois |
| Fonte externa | DummyJSON | API pública, estável, sem autenticação |
| Infra | Docker + Compose | Um comando sobe backend + frontend |

---

## Estrutura do projeto

```
marketplace-product-aggregator/
├── backend/                 # API NestJS
│   └── src/
│       ├── products/        # Ingestão, store, controllers
│       ├── health/
│       └── common/          # Filter global, interceptor de log
├── frontend/                # Next.js 14
│   └── src/
│       ├── app/             # Páginas e proxy /api/[...path]
│       ├── components/
│       ├── context/         # Seleção para comparação
│       └── lib/
├── docker-compose.yml
```

---

## Variáveis de ambiente

### Backend (`backend/.env`)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta da API |
| `NODE_ENV` | `development` | Ambiente |
| `EXTERNAL_API_URL` | `https://dummyjson.com` | Fonte de produtos |
| `EXTERNAL_API_TIMEOUT` | `5000` | Timeout da ingestão (ms) |
| `FRONTEND_URL` | `http://127.0.0.1:3000` | Origem permitida no CORS |

### Frontend (`frontend/.env.local`)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:3001/api` | URL da API no **navegador** (dev local) |
| `API_URL` | `http://127.0.0.1:3001/api` | URL da API no **servidor Next** (detalhe SSR) e proxy `/api` no Docker |

No Docker Compose, o frontend recebe `API_URL=http://backend:3001/api` para o proxy interno.

---

## Como rodar

### Pré-requisitos

- Node.js 20+
- Docker Desktop (opcional, recomendado)

Antes do primeiro build Docker, gere os lockfiles:

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Com Docker (recomendado)

```bash
docker compose up --build
```


**URLs (use `127.0.0.1`, não `localhost`, no Windows + WSL):**

| Serviço | URL |
|---------|-----|
| Frontend | http://127.0.0.1:3000 |
| API | http://127.0.0.1:3001/api |
| Swagger | http://127.0.0.1:3001/api/docs |
| Health | http://127.0.0.1:3001/api/health |

Na primeira subida, aguarde ~30s para o backend ingerir ~194 produtos (healthcheck). O frontend só sobe após o backend ficar **healthy**.

Rebuild sem cache:

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Sem Docker

**Terminal 1 — Backend:**

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

**Terminal 2 — Frontend:**

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

---

## API REST

Base: `http://127.0.0.1:3001/api`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Health check |
| GET | `/products` | Lista com paginação e filtros |
| GET | `/products/:id` | Detalhe de um produto |
| POST | `/products/sync` | Reingere produtos da DummyJSON |

### Query params — `GET /products`

| Param | Tipo | Descrição |
|-------|------|-----------|
| `category` | string | Filtra por categoria (ex.: `smartphones`) |
| `minPrice` | number | Preço mínimo |
| `maxPrice` | number | Preço máximo |
| `search` | string | Busca em título e descrição |
| `page` | number | Página (padrão: 1) |
| `limit` | number | Itens por página (padrão: 20, máx.: 100) |

### Exemplos

```bash
# Listar smartphones com busca "iphone"
curl "http://127.0.0.1:3001/api/products?category=smartphones&search=iphone&limit=5"

# Detalhe
curl "http://127.0.0.1:3001/api/products/1"

# Re-sync
curl -X POST "http://127.0.0.1:3001/api/products/sync"
```

Documentação interativa: http://127.0.0.1:3001/api/docs

---

## Frontend

| Rota | Descrição |
|------|-----------|
| `/` | Listagem, filtros na URL, seleção para comparar |
| `/products/:id` | Detalhe do produto |
| `/compare?ids=1,2,3` | Tabela comparativa (mín. 2, máx. 4 produtos) |


**Fluxo de comparação:**

1. Marque **Comparar** nos cards ou no detalhe.
2. Use a barra fixa inferior ou o link **Comparar** na navbar.
3. A URL `/compare?ids=...` pode ser compartilhada.

A listagem busca dados via `GET /api/products` no navegador (visível no DevTools → Preview em JSON). O proxy `frontend/src/app/api/[...path]` encaminha para o backend no Docker.

---

## Arquitetura e trade-offs

### Fluxo de dados

```
DummyJSON → [Ingestão Nest] → Map in-memory → API REST
                                    ↑
Browser → Next.js (/api proxy) ─────┘
```

### Decisões assumidas

| Decisão | Motivo |
|---------|--------|
| **In-memory** | Case não exige banco; foco em modelagem e API |
| **Ingestão no `onModuleInit`** | Dados prontos ao subir; falha na fonte não derruba a API |
| **Client fetch na listagem** | Filtros reativos + JSON visível no Network para debug |
| **SSR só no detalhe** | SEO/simples no `/products/[id]` sem complexidade na listagem |
| **Proxy `/api` no Next** | Browser usa mesma origem; no Docker, `API_URL` aponta para `backend:3001` |
| **Sem auth** | Case não exige; endpoints são somente leitura (+ sync opcional) |

### Resiliência

- Timeout e `ServiceUnavailableException` se DummyJSON falhar na ingestão
- `AllExceptionsFilter` + `LoggingInterceptor` globais no backend
- Frontend exibe mensagem de erro se a API estiver indisponível

---

## O que ficou de fora (escopo do case)

| Item | Motivo |
|------|--------|
| Banco relacional | Opcional no case; in-memory foi suficiente |
| Autenticação JWT | Diferencial opcional |
| Testes automatizados | Diferencial opcional |
| Histórico de preços | Diferencial opcional |
| Cache / rate limiting | Diferencial opcional |
| Deploy público | Não configurado neste repositório |

---

## Próximos passos (com mais tempo)

1. **PostgreSQL** + migrations, mantendo a interface do repositório.
2. **Testes** — unitários (filtros, mapper) e E2E (Playwright: busca + comparação).
3. **Histórico de preços** — job periódico e gráfico na UI.
4. **Deploy** — Railway/Render com variáveis de ambiente documentadas.
5. **Rate limiting** na ingestão e na API pública.

---

## Licença

MIT — ver [LICENSE](LICENSE).
