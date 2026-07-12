<div align="center">

# 🛰️ DigiLog

### Smart Digital Logbook for Modern Industrial Operations

Replace paper logbooks and scattered spreadsheets with one secure, enterprise-grade platform —
**shift logs, operational events, incident management, CAPA, shift handovers, and real-time analytics.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-4169e1?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 🎯 Overview

DigiLog is an enterprise digital logbook system built for refineries, power plants,
chemical plants, and manufacturing operations (IOCL, HPCL, BPCL, ONGC, NTPC, Tata Steel,
Reliance, and more). It digitizes the entire operations lifecycle — from an operator
signing in at shift start to the executive board review of downtime and incident trends.

## ✨ Modules

| # | Module | Highlights |
|---|--------|-----------|
| 01 | **Authentication & RBAC** ✅ | JWT + refresh tokens, optional MFA, 4 roles (Operator, Supervisor, Manager, Admin) |
| 02 | **Digital Shift Logbook** ✅ | Structured entries, autosave/drafts, advanced filters, CSV export, timeline, attachments |
| 03 | **Operational Events** | Priorities, attachments, comment threads, @mentions, status history |
| 04 | **Incident Management** | Severity, CAPA, root-cause analysis, escalation, approvals, email alerts |
| 05 | **Shift Handover** | Auto summaries, checklists, digital signatures, PDF/Excel export |
| 06 | **Analytics & Reports** | KPI dashboards, downtime, machine health, heat maps, compliance & audit trail |

## 🧱 Tech Stack

**Frontend** — Next.js 15 · React 19 · TypeScript · TailwindCSS · shadcn/ui · Framer Motion ·
Lucide · React Hook Form · Zod · TanStack Query · Recharts · TanStack Table

**Backend** — Node.js · Express · TypeScript · Prisma ORM · PostgreSQL · JWT · Redis ·
Socket.IO · Cloudinary · Nodemailer

**DevOps** — Docker · Docker Compose · GitHub Actions · Vercel (frontend) · Railway/Render (backend) · Neon (Postgres)

## 📂 Repository Structure

```
Digilog/
├── frontend/        # Next.js 15 app — landing, auth, dashboard, all modules
├── backend/         # Express + Prisma REST API (RBAC, Swagger, Socket.IO)
├── database/        # Prisma schema, migrations, seed, ER diagram
├── docker/          # Dockerfiles + docker-compose
├── docs/            # Architecture, API docs, deployment guide
├── scripts/         # Setup & maintenance scripts
└── README.md
```

## 🚀 Getting Started (Frontend)

```bash
cd frontend
npm install
cp .env.example .env.local   # configure API + app URLs
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

## 🔌 Getting Started (Backend API)

```bash
# 1. Start Postgres + Redis (requires Docker)
docker compose -f docker/docker-compose.dev.yml up -d

# 2. Configure and run the API
cd backend
npm install
cp .env.example .env            # set JWT secrets + DATABASE_URL
npm run prisma:migrate          # create the schema
npm run db:seed                 # demo plant, departments, machines, users
npm run dev                     # http://localhost:4000  · docs at /api/docs
```

**Demo accounts** (password `Password123` for all):

| Role | Email |
|------|-------|
| Admin | `admin@digilog.app` |
| Manager | `manager@digilog.app` |
| Supervisor | `supervisor@digilog.app` |
| Operator | `operator@digilog.app` |

## 🗺️ Build Roadmap

DigiLog is being built in verifiable milestones — each one is runnable, not a stub.
Milestones cover infrastructure; Modules 1–6 (above) are the numbered feature set from the spec.

- [x] Frontend design system + landing page
- [x] Full Prisma schema (all 6 modules' tables) + **Module 1: Authentication & RBAC**
- [x] App shell (sidebar, ⌘K command palette, notifications, dark mode) + live analytics dashboard
- [x] **Module 2: Digital Shift Logbook** (CRUD, draft/autosave, submit → sign workflow, attachments, filters, CSV export, timeline)
- [ ] **Module 3: Operational Events**
- [ ] **Module 4: Incident Management** (CAPA, RCA, escalation)
- [ ] **Module 5: Shift Handover**
- [ ] **Module 6: Analytics & Reports** (expand beyond the dashboard overview)
- [ ] Admin panel (users, roles, departments, plants, machines)
- [ ] Backend hardening, Docker, CI/CD, deployment docs

## 📄 License

MIT © DigiLog
