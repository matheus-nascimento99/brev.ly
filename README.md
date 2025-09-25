# Brev.ly - Encurtador de URLs

Um encurtador de URLs moderno e completo, construído com Node.js/Fastify no backend e React/Vite no frontend. **Totalmente containerizado** para facilitar o desenvolvimento e deployment.

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

## 🛠️ Stack Tecnológica

### Backend
- **Node.js 23** + **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **PostgreSQL 17** - Banco de dados relacional
- **Cloudflare R2** - Storage para arquivos CSV
- **Zod** - Validação de schemas
- **Vitest** - Testes unitários e E2E
- **Docker** - Containerização

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool moderna e rápida
- **TanStack Router** - Roteamento type-safe
- **TailwindCSS** - Estilização utility-first
- **Zustand** - Gerenciamento de estado
- **React Hook Form** + **Zod** - Formulários e validação
- **Axios** - Cliente HTTP

### DevOps
- **Docker** + **Docker Compose** - Orquestração de containers
- **Multi-stage builds** - Otimização de imagens
- **PostgreSQL oficial** - Banco containerizado
- **Health checks** - Monitoramento de saúde dos serviços

## 📋 Pré-requisitos

### Para execução com Docker (Recomendado)
- **Docker** e **Docker Compose**
- Apenas isso! 🎉

### Para execução manual (Desenvolvimento)
- **Node.js 23+**
- **PostgreSQL 17+**
- **npm** ou **yarn**

## 🚀 Quick Start

### 🐳 Execução com Docker (Recomendado)

**Uma única linha e tudo funciona!**

```bash
# Clone e execute
git clone <repository-url>
cd brev.ly
docker compose up -d
```

**Pronto!** 🎉 A aplicação estará rodando em:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3333  
- **Documentação**: http://localhost:3333/docs
- **Banco**: PostgreSQL na porta 5432

#### Comandos úteis do Docker

```bash
# Ver logs dos serviços
docker compose logs -f

# Ver apenas logs do backend
docker compose logs -f app

# Ver apenas logs do frontend  
docker compose logs -f web

# Parar todos os serviços
docker compose down

# Rebuild das imagens (após mudanças no código)
docker compose up -d --build

# Limpar tudo (containers, volumes, imagens)
docker compose down -v --rmi all
```

---

### ⚙️ Execução Manual (Desenvolvimento)

Para contribuidores que querem rodar localmente:

#### 1. **Setup do Banco de Dados**
```bash
# Instalar PostgreSQL localmente ou usar Docker só para o banco
docker run --name brevly-db -p 5432:5432 \
  -e POSTGRES_USER=docker \
  -e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=brevly \
  -d postgres:17
```

#### 2. **Backend**
```bash
cd server

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Executar migrações
npm run db:migrate

# Iniciar em modo desenvolvimento
npm run dev
```

#### 3. **Frontend**
```bash
cd web

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Configurar VITE_API_URL=http://localhost:3333

# Iniciar servidor de desenvolvimento
npm run dev
```

**Acessos no modo manual:**
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3333
- **Documentação**: http://localhost:3333/docs

## 🏗️ Arquitetura da Aplicação

### � Estrutura do Projeto
```
brev.ly/
├── docker compose.yml    # Orquestração dos serviços
├── docker/              # Scripts de inicialização do DB
├── server/              # Backend API (Node.js + Fastify)
│   ├── Dockerfile       # Container otimizado para produção
│   ├── src/
│   │   ├── domain/      # Clean Architecture - Camada de domínio
│   │   │   └── links/   # Agregado de Links
│   │   ├── infra/       # Infraestrutura (DB, HTTP, Storage)
│   │   │   ├── database/  # Drizzle ORM + PostgreSQL
│   │   │   ├── http/      # Fastify + Routes + Factories
│   │   │   └── storage/   # Cloudflare R2
│   │   └── core/        # Entidades base e utilitários
│   └── test/            # Testes unitários e E2E
└── web/                 # Frontend (React + Vite)
    ├── Dockerfile       # Container multi-stage otimizado
    ├── src/
    │   ├── components/  # Componentes reutilizáveis
    │   ├── routes/      # TanStack Router pages
    │   ├── stores/      # Zustand state management
    │   ├── http/        # Axios HTTP client
    │   └── lib/         # Utilitários e configurações
    └── public/          # Assets estáticos
```

### 🐳 Containers
- **app**: Backend API (Node.js Alpine + multi-stage)
- **web**: Frontend SPA (Node.js Alpine + serve)
- **bd**: PostgreSQL 17 (Bitnami oficial)

### 🔄 Fluxo de Dados
1. **Frontend** faz requisições para **API**
2. **API** valida dados com **Zod**
3. **Drizzle ORM** persiste no **PostgreSQL**
4. **Cloudflare R2** armazena relatórios CSV
5. **Docker Compose** orquestra tudo

## 🧪 Testes

### Docker (Recomendado)
```bash
# Testes do backend no container
docker compose exec app npm run test
docker compose exec app npm run test:e2e

# Build de testes
docker compose exec app npm run build
```

### Local
```bash
cd server

# Testes unitários
npm run test

# Testes E2E (precisa do banco rodando)
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Build e Deploy

### Docker (Produção)
```bash
# Build das imagens otimizadas
docker compose build

# Deploy completo
docker compose up -d

# Verificar saúde dos serviços
docker compose ps
```

### Build manual
```bash
# Backend
cd server && npm run build

# Frontend  
cd web && npm run build
```

### 📊 Monitoramento
```bash
# Logs em tempo real
docker compose logs -f

# Status dos containers
docker compose ps

# Recursos utilizados
docker stats
```

## ⚙️ Configuração de Ambiente

### � Docker (Zero Config)
Com Docker, **não é necessário configurar nada!** As variáveis já estão definidas no `docker compose.yml`.

### 🔧 Setup Manual

#### Backend (`server/.env`)
```env
# Servidor
PORT=3333
NODE_ENV=development

# Banco de dados
DATABASE_URL=postgresql://docker:docker@localhost:5432/brevly

# Cloudflare R2 (opcional - para export CSV)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET=your_bucket_name
CLOUDFLARE_PUBLIC_URL=https://your-public-url.com
```

#### Frontend (`web/.env`)
```env
# API Backend
VITE_API_URL=http://localhost:3333

# Ambiente
VITE_NODE_ENV=development
```

## � Troubleshooting

### Problemas Comuns

**Containers não sobem:**
```bash
# Verificar portas ocupadas
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :3333

# Limpar cache do Docker
docker system prune -a
```

**Banco não conecta:**
```bash
# Verificar logs do banco
docker compose logs bd

# Restart do banco
docker compose restart bd
```

**Frontend não encontra API:**
- Verificar se `VITE_API_URL` está correto
- Confirmar que o backend está rodando na porta 3333

## 🤝 Contribuição

1. **Fork** o projeto
2. **Clone** seu fork
```bash
git clone https://github.com/seu-usuario/brev.ly
cd brev.ly
```

3. **Crie uma branch** para sua feature
```bash
git checkout -b feature/nova-funcionalidade
```

4. **Desenvolva** usando Docker
```bash
docker compose up -d
# Faça suas alterações...
```

5. **Teste** suas mudanças
```bash
docker compose exec app npm run test
```

6. **Commit** e **Push**
```bash
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

7. **Abra um Pull Request**

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links e Documentação

- **[Documentação da API](http://localhost:3333/docs)** - Swagger UI interativo
- **[Fastify](https://www.fastify.io/)** - Framework web do backend
- **[React](https://react.dev/)** - Biblioteca do frontend  
- **[TanStack Router](https://tanstack.com/router)** - Roteamento type-safe
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS
- **[Docker](https://docs.docker.com/)** - Containerização

---

<div align="center">

**Feito com ❤️ usando as melhores práticas de desenvolvimento**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>