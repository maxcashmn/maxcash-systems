# MaxCash - Loan Management System

A serverless loan management system built with:
- **Frontend**: React + Vite + Tailwind (Cloudflare Pages)
- **Backend**: Cloudflare Workers + Hono
- **Database**: Neon Serverless PostgreSQL
- **CMS**: Sanity
- **Communications**: EmailJS + WhatsApp Business API

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Deploy to production
pnpm deploy:prod
```

## 📁 Project Structure

```
maxcash-platform/
├── packages/
│   ├── shared/      # Shared types, constants, validators
│   ├── backend/     # Cloudflare Workers API
│   ├── frontend/    # Cloudflare Pages React App
│   └── cms/         # Sanity Studio
├── docs/            # Documentation
├── scripts/         # Utility scripts
└── .github/         # CI/CD workflows
```

## 📚 Documentation

See the `docs/` folder for:
- Architecture overview
- API documentation
- Database schema
- Deployment guide
- Security guidelines
- Business rules

## 🔒 License

MIT
