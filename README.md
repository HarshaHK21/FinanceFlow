# FinanceFlow
a personal finance management system
## ✨ Overview

**FinanceFlow** is a modern, full-featured personal finance web application built with vanilla HTML/CSS/JS and powered by **Supabase** for authentication and real-time data. It features a **Zero-Based Budget** system where every rupee of income is assigned a purpose — expenses, savings, or goals.

The UI is crafted with a premium, minimalist aesthetic using glassmorphism, kinetic typography, bento grid layouts, and smooth micro-animations throughout.

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Zero-Based Budgeting** | Allocate 100% of your income to categories — know exactly where every rupee goes |
| **Interactive Dashboard** | Bento-grid layout with real-time budget summary, income sources, and breakdown charts |
| **Transaction Tracking** | Log income & expenses with smart auto-categorization |
| **Category Management** | Create and manage custom spending categories |
| **Budget Plans** | Set monthly budget limits per category with progress tracking |
| **Savings Goals** | Track savings targets with visual progress indicators |
| **Authentication** | Full auth flow — Sign Up, Login, Password Reset (OTP-based) via Supabase Auth |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile with collapsible sidebar |
| **Toast Notifications** | Elegant slide-in notifications for success, error, warning, and info states |
| **Scroll Animations** | Reveal-on-scroll sections powered by Intersection Observer |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure & SEO |
| **CSS3** | Custom design system with CSS variables, glassmorphism, animations |
| **Tailwind CSS** | Utility-first styling via CDN |
| **JavaScript (ES6+)** | Client-side logic, DOM manipulation, async/await patterns |
| **Supabase** | Backend-as-a-Service — Auth, PostgreSQL database, real-time subscriptions |

---

## 📁 Project Structure

```
PROJECT02/
├── index.html                  # Landing page (hero, features, pricing, CTA)
├── css/
│   └── styles.css              # Global design system & shared styles
├── js/
│   ├── supabase-config.js      # Supabase client init + auth helper functions
│   ├── auth.js                 # Login & signup form logic
│   └── components-loader.js    # Dynamic HTML component loader + Toast system
├── components/
│   ├── header.html             # Reusable header component
│   ├── sidebar.html            # App sidebar with nav links & user info
│   └── footer.html             # Reusable footer component
├── pages/
│   ├── dashboard.html          # Zero-Based Budget dashboard (main app view)
│   ├── transactions.html       # Transaction logging & history
│   ├── categories.html         # Category management
│   ├── budgets.html            # Budget plan creation & tracking
│   ├── savings.html            # Savings goals with progress bars
│   ├── login.html              # User sign-in page
│   ├── signup.html             # User registration page
│   └── forgot-password.html    # OTP-based password reset flow
└── README.md                   # You are here!
```

---

## ⚡ Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local development server (e.g., VS Code Live Server, `http-server`, or `python -m http.server`)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PROJECT02
   ```

2. **Start a local server**

   Using VS Code Live Server:
   > Right-click `index.html` → **Open with Live Server**

   Or via CLI:
   ```bash
   npx http-server . -p 3000
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

### Supabase Setup

The app connects to a Supabase project for authentication and data storage. The configuration is in `js/supabase-config.js`.

To use your own Supabase project:
1. Create a project at [supabase.com](https://supabase.com)
2. Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `js/supabase-config.js`
3. Set up the required tables: `income_sources`, `budget_items`, `transactions`, `categories`, `savings_goals`
4. Enable email authentication in your Supabase dashboard

---

## 📄 Pages

### 🏠 Landing Page (`index.html`)
The public-facing marketing page featuring:
- Glassmorphic hero section with kinetic typography
- Trust marquee with security badges
- Bento-grid feature showcase
- Comparison section (manual vs. FinanceFlow)
- Three-tier pricing (Starter, Pro, Family)
- Dark CTA section

### 📊 Dashboard (`pages/dashboard.html`)
The core app experience with a zero-based budget overview:
- **Left to Budget** hero card — shows unallocated income
- **Left to Spend** — actual income minus actual expenses
- **Income Sources** — list of income entries with expected vs actual
- **Budget Breakdown** — bills, expenses, and savings with progress bars
- Quick-add transaction button

### 💸 Transactions (`pages/transactions.html`)
Full transaction management with filtering and category assignment.

### 🏷️ Categories (`pages/categories.html`)
Create, edit, and manage spending categories with icons and colors.

### 📈 Budget Plans (`pages/budgets.html`)
Set monthly budget limits per category and track spending against them.

### 🎯 Savings Goals (`pages/savings.html`)
Define savings targets with visual progress tracking and contribution history.

### 🔐 Auth Pages
- **Login** (`pages/login.html`) — Email/password sign-in
- **Sign Up** (`pages/signup.html`) — New account registration with name
- **Forgot Password** (`pages/forgot-password.html`) — OTP-based password recovery

---

## 🎨 Design Philosophy

- **Monochrome Elegance** — Clean black & white palette with strategic color accents
- **Glassmorphism** — Frosted glass effects with backdrop-filter blur
- **Bento Grid** — Dashboard widgets organized in an asymmetric, magazine-style layout
- **Kinetic Typography** — Animated text reveals on the landing page
- **Micro-Animations** — Hover effects, transitions, and scroll-triggered reveals
- **Mobile-First** — Responsive breakpoints with a collapsible sidebar on mobile

---

## 📝 License

This project is for educational and personal use. Feel free to fork and customize it for your own needs.

---

