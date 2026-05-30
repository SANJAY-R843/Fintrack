<div align="center">

<img src="https://img.shields.io/badge/FinTrack-Personal%20Finance%20Platform-4F46E5?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMSAxN3YtNkg5di0yaDF2LTJoMnY4aC0xem0yLTZoMmwtMiA2aC0xbDItNnoiLz48L3N2Zz4=" />

# FinTrack

### Personal Finance Management Platform

*Take control of your financial life — track expenses, manage budgets, monitor investments, and make smarter money decisions.*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1?style=flat-square&logo=postgresql)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render)](https://render.com/)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#) · [API Docs](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 🌟 Overview

**FinTrack** is a modern, full-stack personal finance management platform designed to give users complete visibility and control over their financial health. From day-to-day expense tracking to long-term investment monitoring, FinTrack consolidates all financial data into a single, intuitive dashboard.

```
📊 Track Expenses → 💼 Manage Budgets → 📈 Monitor Investments → 🔔 Bill Reminders → 🧠 Smart Insights
```

> Built with a clean separation of concerns between the React frontend, Express REST API, and PostgreSQL database, FinTrack follows production-grade architecture patterns with JWT authentication, Prisma ORM, and a component-driven UI.

---

## ✨ Features

### 💳 Expense Tracking
- Record and categorize daily income and expenses
- Automatic transaction categorization
- Full transaction history with filters and search
- CSV import/export for financial data portability

### 📊 Smart Budget Management
- Create category-based monthly budgets
- Real-time spending vs. budget monitoring
- Threshold alerts when nearing budget limits
- Month-over-month performance comparison

### 📈 Investment Portfolio
- Track stocks, mutual funds, gold, and other assets
- Portfolio P&L (Profit & Loss) tracking
- Visual allocation breakdown and growth charts
- Performance analytics by asset class

### 🔔 Bill Reminders
- Schedule recurring bills and subscriptions
- Smart payment reminders before due dates
- Automatic status tracking (paid / upcoming / overdue)

### 📉 Financial Analytics
- Interactive charts powered by Recharts
- Monthly spending trend analysis
- Category-wise expense breakdown
- Savings rate and financial health scoring

### 🔐 Secure Authentication
- User registration and login
- JWT-based stateless authentication
- Protected routes and session management

---

## 🏗️ Architecture

FinTrack follows a **3-tier architecture** with a clear separation between the presentation, application, and data layers.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                               │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │                   React.js Frontend                       │    │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │    │
│   │   │Dashboard │  │Expenses  │  │Budgets   │  │Invest  │  │    │
│   │   │Analytics │  │Manager   │  │Tracker   │  │Manager │  │    │
│   │   └──────────┘  └──────────┘  └──────────┘  └────────┘  │    │
│   │   ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │    │
│   │   │  Bills   │  │ Reports  │  │  Auth (Login/Register) │  │    │
│   │   └──────────┘  └──────────┘  └───────────────────────┘  │    │
│   │                   Tailwind CSS + Framer Motion            │    │
│   └───────────────────────────────────────────────────────────┘    │
│                       Vercel (CDN + Edge)                           │
└─────────────────────────────────────────────────────────────────────┘
                              │ HTTPS / REST
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        APPLICATION LAYER                            │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │              Node.js + Express.js REST API                │    │
│   │                                                           │    │
│   │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │    │
│   │  │Auth Routes │  │Transaction │  │  Budget Routes     │  │    │
│   │  │/api/auth   │  │Routes      │  │  /api/budgets      │  │    │
│   │  └────────────┘  │/api/txns   │  └────────────────────┘  │    │
│   │                  └────────────┘                           │    │
│   │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │    │
│   │  │Investment  │  │Bill Routes │  │  Analytics Routes  │  │    │
│   │  │Routes      │  │/api/bills  │  │  /api/analytics    │  │    │
│   │  │/api/invest │  └────────────┘  └────────────────────┘  │    │
│   │  └────────────┘                                           │    │
│   │           JWT Middleware + Input Validation               │    │
│   └───────────────────────────────────────────────────────────┘    │
│                       Render (Auto-scaling)                         │
└─────────────────────────────────────────────────────────────────────┘
                              │ Prisma ORM
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                 │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │              PostgreSQL Database (Neon)                   │    │
│   │                                                           │    │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │    │
│   │  │  Users   │  │Transactions│ │ Budgets  │  │  Bills  │  │    │
│   │  └──────────┘  └──────────┘  └──────────┘  └─────────┘  │    │
│   │  ┌──────────┐  ┌──────────┐                              │    │
│   │  │Investments│ │Categories│                              │    │
│   │  └──────────┘  └──────────┘                              │    │
│   └───────────────────────────────────────────────────────────┘    │
│                    Neon Serverless PostgreSQL                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → React Component → API Service (Axios)
    → Express Router → Middleware (JWT + Validation)
        → Controller → Prisma ORM → PostgreSQL
            → JSON Response → State Update → UI Re-render
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js 18 | Component-based UI |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Charts** | Recharts | Financial data visualization |
| **Animations** | Framer Motion | Smooth UI transitions |
| **Backend** | Node.js + Express.js | REST API server |
| **Auth** | JSON Web Tokens (JWT) | Stateless authentication |
| **ORM** | Prisma | Type-safe database client |
| **Database** | PostgreSQL (Neon) | Relational data storage |
| **Frontend Deploy** | Vercel | CDN + serverless hosting |
| **Backend Deploy** | Render | Managed Node.js hosting |
| **DB Hosting** | Neon | Serverless Postgres |

---

## 📁 Project Structure

```
fintrack/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/                  # Icons, images, fonts
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Button, Input, Modal, Card
│   │   │   ├── charts/              # LineChart, PieChart, BarChart
│   │   │   ├── layout/              # Navbar, Sidebar, Footer
│   │   │   └── notifications/       # Alert, Toast, Badge
│   │   ├── pages/                   # Route-level page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseList.jsx
│   │   │   │   └── AddExpense.jsx
│   │   │   ├── budgets/
│   │   │   │   └── BudgetManager.jsx
│   │   │   ├── investments/
│   │   │   │   └── Portfolio.jsx
│   │   │   ├── bills/
│   │   │   │   └── BillReminders.jsx
│   │   │   └── analytics/
│   │   │       └── Reports.jsx
│   │   ├── services/                # Axios API call functions
│   │   │   ├── authService.js
│   │   │   ├── transactionService.js
│   │   │   ├── budgetService.js
│   │   │   ├── investmentService.js
│   │   │   └── billService.js
│   │   ├── context/                 # React Context (AuthContext, ThemeContext)
│   │   ├── hooks/                   # Custom hooks (useAuth, useBudget)
│   │   ├── utils/                   # Formatters, validators, constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── prisma/
│   │   ├── schema.prisma            # Database models
│   │   └── migrations/              # DB migration history
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Prisma client instance
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── validate.js          # Request validation
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── transaction.routes.js
│   │   │   ├── budget.routes.js
│   │   │   ├── investment.routes.js
│   │   │   ├── bill.routes.js
│   │   │   └── analytics.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── transaction.controller.js
│   │   │   ├── budget.controller.js
│   │   │   ├── investment.controller.js
│   │   │   ├── bill.controller.js
│   │   │   └── analytics.controller.js
│   │   └── utils/
│   │       ├── jwt.js               # Token generation/verification
│   │       └── hash.js              # Password hashing (bcrypt)
│   ├── app.js                       # Express app setup
│   ├── server.js                    # Entry point
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

```prisma
// prisma/schema.prisma

model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String
  currency     String        @default("INR")
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  transactions Transaction[]
  budgets      Budget[]
  investments  Investment[]
  bills        Bill[]
}

model Transaction {
  id          String   @id @default(cuid())
  title       String
  amount      Float
  type        String   // "income" | "expense"
  category    String
  date        DateTime
  note        String?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}

model Budget {
  id        String   @id @default(cuid())
  category  String
  limit     Float
  month     Int
  year      Int
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model Investment {
  id           String   @id @default(cuid())
  name         String
  type         String   // "stock" | "mutual_fund" | "gold" | "crypto" | "other"
  quantity     Float
  buyPrice     Float
  currentPrice Float
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Bill {
  id          String    @id @default(cuid())
  name        String
  amount      Float
  dueDate     DateTime
  frequency   String    // "monthly" | "quarterly" | "yearly" | "one-time"
  isPaid      Boolean   @default(false)
  category    String
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  createdAt   DateTime  @default(now())
}
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

### Transactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/transactions` | Get all transactions | ✅ |
| `POST` | `/api/transactions` | Create a transaction | ✅ |
| `PUT` | `/api/transactions/:id` | Update a transaction | ✅ |
| `DELETE` | `/api/transactions/:id` | Delete a transaction | ✅ |
| `GET` | `/api/transactions/export` | Export as CSV | ✅ |
| `POST` | `/api/transactions/import` | Import from CSV | ✅ |

### Budgets

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/budgets` | Get all budgets | ✅ |
| `POST` | `/api/budgets` | Create a budget | ✅ |
| `PUT` | `/api/budgets/:id` | Update a budget | ✅ |
| `DELETE` | `/api/budgets/:id` | Delete a budget | ✅ |

### Investments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/investments` | Get portfolio | ✅ |
| `POST` | `/api/investments` | Add investment | ✅ |
| `PUT` | `/api/investments/:id` | Update holding | ✅ |
| `DELETE` | `/api/investments/:id` | Remove investment | ✅ |

### Bills

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/bills` | Get all bills | ✅ |
| `POST` | `/api/bills` | Add a bill | ✅ |
| `PATCH` | `/api/bills/:id/pay` | Mark bill as paid | ✅ |
| `DELETE` | `/api/bills/:id` | Delete a bill | ✅ |

### Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/analytics/summary` | Monthly summary | ✅ |
| `GET` | `/api/analytics/trends` | Spending trends | ✅ |
| `GET` | `/api/analytics/categories` | Category breakdown | ✅ |

> All protected routes (`✅`) require `Authorization: Bearer <token>` header.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- PostgreSQL database (local or [Neon](https://neon.tech))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack
```

### 2. Setup the Backend

```bash
cd server
npm install

# Copy env file and fill in your values
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Seed the database (optional)
npx prisma db seed

# Start the development server
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../client
npm install

# Copy env file
cp .env.example .env

# Start the development server
npm run dev
```

> Frontend runs on `http://localhost:5173` · Backend runs on `http://localhost:5000`

---

## 🔧 Environment Variables

### Backend (`server/.env`)

```env
# Database
DATABASE_URL="postgresql://user:password@host/fintrack?sslmode=require"

# Authentication
JWT_SECRET="your_super_secret_jwt_key_here"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL="http://localhost:5173"
```

### Frontend (`client/.env`)

```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

---

## 🌐 Deployment

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

cd client
vercel --prod
```

Set environment variable in Vercel dashboard:
```
VITE_API_BASE_URL = https://your-backend.onrender.com/api
```

### Backend → Render

1. Push code to GitHub
2. Connect repository to [Render](https://render.com)
3. Set **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Set **Start Command**: `node server.js`
5. Add all environment variables from `server/.env`

### Database → Neon

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Set it as `DATABASE_URL` in both Render and your local `.env`

---

## 🔒 Security

FinTrack implements multiple layers of security:

| Feature | Implementation |
|---|---|
| **Password Hashing** | bcrypt with salt rounds |
| **Authentication** | JWT (JSON Web Tokens) with expiry |
| **Authorization** | Protected API routes via middleware |
| **Data Isolation** | All queries scoped to `userId` |
| **Input Validation** | Server-side validation on all endpoints |
| **HTTPS** | Enforced on Vercel and Render |
| **CORS** | Restricted to allowed frontend origin |
| **Env Secrets** | Sensitive keys stored in env variables only |

---

## 🗺️ Roadmap

- [x] Expense tracking and categorization
- [x] Budget management with alerts
- [x] Investment portfolio monitoring
- [x] Bill reminders and scheduling
- [x] Analytics dashboard with charts
- [x] JWT authentication
- [ ] Multi-currency support
- [ ] Mobile application (React Native)
- [ ] Family finance management
- [ ] Financial goal planning
- [ ] Open banking integrations
- [ ] Advanced AI-powered insights
- [ ] Push notifications
- [ ] Dark mode

---

---

<div align="center">


⭐ Star this repo if you found it helpful!

</div>