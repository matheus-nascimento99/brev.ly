# Brev.ly - Encurtador de URLs

Um encurtador de URLs moderno e completo, construído com Node.js/Fastify no backend e React/Vite no frontend.

## 🚀 Funcionalidades

### Backend (API)
- ✅ **Criar links encurtados** - Transforme URLs longas em links curtos personalizados
- ✅ **Validação de URLs** - Não permite URLs mal formatadas ou encurtamentos já existentes
- ✅ **Buscar link por URL encurtada** - Obtenha a URL original através do link curto
- ✅ **Listar links** - Visualize todos os links cadastrados com filtro por URL original
- ✅ **Deletar links** - Remova links desnecessários
- ✅ **Contagem de acessos** - Incremente automaticamente o número de acessos
- ✅ **Exportar relatórios CSV** - Gere relatórios completos com upload para CDN (Cloudflare R2)
- ✅ **Documentação Swagger** - API totalmente documentada em `/docs`

### Frontend (Web)
- ✅ **Interface responsiva** - Funciona perfeitamente em desktop e mobile
- ✅ **Criação de links** - Formulário intuitivo para criar novos links
- ✅ **Listagem em tempo real** - Visualize todos os seus links com atualização automática
- ✅ **Cópia para clipboard** - Copie links encurtados com um clique
- ✅ **Redirecionamento automático** - Acesso aos links com contagem de cliques
- ✅ **Download de relatórios** - Baixe CSV com todos os seus links
- ✅ **Estados de loading** - Feedback visual durante operações
- ✅ **Tratamento de erros** - Notificações claras para o usuário

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Cloudflare R2** - Storage para arquivos CSV
- **Zod** - Validação de schemas
- **Vitest** - Testes unitários e E2E
- **Docker** - Containerização

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool moderna
- **TanStack Router** - Roteamento type-safe
- **TailwindCSS** - Estilização utility-first
- **Zustand** - Gerenciamento de estado
- **React Hook Form** + **Zod** - Formulários e validação
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

- Node.js 23+
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

## 🚀 Como executar

### Opção 1: Com Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone <repository-url>
cd brev.ly
```

2. **Execute com Docker Compose**
```bash
docker-compose up -d
```

Isso irá:
- Configurar o banco PostgreSQL
- Executar as migrações
- Iniciar a API na porta 3333

### Opção 2: Execução manual

#### Backend

1. **Navegue para a pasta do servidor**
```bash
cd server
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Execute as migrações do banco**
```bash
npm run db:migrate
```

5. **Inicie o servidor**
```bash
npm run dev
```

#### Frontend

1. **Navegue para a pasta web**
```bash
cd web
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Configure a URL da API (ex: VITE_API_URL=http://localhost:3333)
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

## 🌐 Acessos

Após a execução:

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3333
- **Documentação da API**: http://localhost:3333/docs

## 📚 Estrutura do Projeto

```
brev.ly/
├── server/           # Backend API
│   ├── src/
│   │   ├── domain/   # Camada de domínio (entities, use cases)
│   │   ├── infra/    # Infraestrutura (database, http, storage)
│   │   └── core/     # Utilitários e tipos base
│   ├── test/         # Testes e mocks
│   └── docker/       # Configurações Docker
└── web/              # Frontend React
    ├── src/
    │   ├── components/ # Componentes reutilizáveis
    │   ├── routes/     # Páginas e roteamento
    │   ├── stores/     # Gerenciamento de estado
    │   └── http/       # Cliente HTTP e APIs
    └── public/         # Arquivos estáticos
```

## 🧪 Testes

### Backend
```bash
cd server

# Testes unitários
npm run test

# Testes E2E
npm run test:e2e
```

## 📦 Build para Produção

### Backend
```bash
cd server
npm run build
```

### Frontend
```bash
cd web
npm run build
```

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
PORT=3333
# setup manual
DATABASE_URL=postgresql://user:password@localhost:5432/brevly

# ou

# setup docker
DATABASE_URL=postgresql://docker:docker@bd:5432/brevly

# Cloudflare R2 (para upload de CSVs)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET=your_bucket_name
CLOUDFLARE_PUBLIC_URL=https://your-public-url.com
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3333
VITE_NODE_ENV=development
```

## 🔗 Links Úteis

- [Documentação da API](http://localhost:3333/docs) (quando rodando localmente)
- [Fastify Documentation](https://www.fastify.io/)
- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Drizzle ORM](https://orm.drizzle.team/)