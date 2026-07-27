# 🚀 Riyadvi Software Technologies — Enterprise Platform Revamp


A high-performance, full-stack enterprise digital platform revamp for **Riyadvi Software Technologies**, engineered to position the company as a strategic **solution partner** for global enterprise leaders and high-growth scale-ups. Built with a dark luxury gold aesthetic (`#D4AF37`), fluid 3D carousel animations, GPU-accelerated scroll reveals, interactive performance analytics, and mobile-optimized responsive architecture.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-revamp--riyadvi.vercel.app-D4AF37?style=for-the-badge)](https://revamp-riyadvi.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-aravind7lee%2FRevamp--Riyadvi-181717?style=for-the-badge&logo=github)](https://github.com/aravind7lee/Revamp-Riyadvi)

---


## 🎨 Design & Visual Aesthetics

- **Primary Colors**: Deep Obsidian `#050508`, Luxury Metallic Gold `#D4AF37`, Surface Slate `#0D0D14`, Border Accent `#1F1F2C`
- **Gradients**: Radial Gold Glow (`bg-[#D4AF37]/5 blur-[140px]`), Dark Gradient Overlays
- **Typography**: Inter & Montserrat (Google Fonts)
- **Tone**: Strategic, High-Velocity Engineering, Premium Enterprise-Ready

---

## 🛠️ Technology Stack

### **Frontend**
- **Core Framework**: React 18 with Vite & TypeScript
- **Styling**: Vanilla CSS + Tailwind CSS (Responsive Utilities & Micro-Animations)
- **Iconography**: Lucide React
- **Routing**: React Router v6 (SPA with Vercel Rewrite Rules)
- **State Management**: Reactive Local Hooks + GPU Direct DOM Transform Listeners (120FPS Scroll Sync)

### **Backend**
- **Runtime**: Node.js & Express.js API
- **Database**: MongoDB (Mongoose Schemas & Automated Seeding Scripts)
- **Middleware**: CORS, Dotenv, Body Parser
- **Deployment**: Vercel (Frontend SPA) & Render / Railway (Backend API)

---

## 🌟 Key Features & Architectural Deliverables

1. **Responsive 3D Service Carousel (Our Services)**:
   - 3D perspective rotation (`perspective: 1000px`) with interactive touch swipe and arrow navigation across Web Dev, App Dev, UI/UX, Digital Marketing, AR/VR, and 3D Modeling.

2. **Butter-Smooth GPU Stack Scroll Reveal (Our Portfolio)**:
   - GPU-accelerated card stacking reveal with category filter pills ("All", "Web Dev", "App Dev", "UI/UX", "AR/VR", "3D Modeling", "Digital Marketing").
   - Detailed Case Study Modal displaying Client, Problem, Solution, Outcome Metrics (`$12M+`, `250K+`, `99.99%`), and Technology Stack tags.

3. **Interactive Performance & Growth Chart**:
   - Canvas-inspired year-over-year growth chart (2021 – 2024) with smart overflow-safe mobile tooltips and touch-tap selection summary strip.

4. **Interactive 4-Pillar Engineering Advantage (Why Choose Us)**:
   - Scroll-synced interactive showcase highlighting 3+ Years Track Record, Free Technical Audit, 100% In-House Multidisciplinary Team, and 24/7 SLA Partnering.

5. **Company Timeline & Milestones (Our Journey)**:
   - Vertical evolution track (2021 – 2024) with Star of Excellence Award badge and compact mobile layout.

6. **Software Project Planning & Architecture Lead Magnet**:
   - Automated 48-page PDF blueprint generator with instant real-time browser download and lead capture form.

7. **Consultation Desk & Quote Modal (Book Call / Get Quote)**:
   - Mobile-optimized scheduling desk modal with high z-index overlay (`z-[300]`) and native window scrolling.

---

## ⚙️ Local Setup & Installation Instructions

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

---

### Step 1: Clone Repository
```bash
git clone https://github.com/aravind7lee/Revamp-Riyadvi.git
cd Revamp-Riyadvi
```

---

### Step 2: Setup & Run Backend API

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# (Optional) Seed MongoDB with initial dataset
npm run seed

# Start Node.js Express backend
npm run dev
```
- **Backend API Running**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

---

### Step 3: Setup & Run Frontend Application

```bash
# Open new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Build & verify TypeScript code integrity
npm run build

# Start Vite Development Server
npm run dev
```
- **Frontend App Running**: `http://localhost:3000`

---

## 🔒 Security & Environment Variables

Environment files (`.env`) and secret tokens are protected via `.gitignore` at root, `frontend/`, and `backend/`.

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=XXXXXXXXXXXXXXXXXX
```

### `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/riyadvi_db
CLIENT_ORIGIN=http://localhost:3000
```

---

## 🚀 Deployment Instructions (Vercel)

### **Frontend Vercel Deployment**
1. Push repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/dashboard), click **"Add New Project"** and select your repository.
3. Configure settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-api.onrender.com/api`
5. Click **Deploy**.

*Note: `frontend/vercel.json` and `vercel.json` are pre-configured with SPA route rewriting rules to guarantee 400/404-free dynamic routing.*

---

## 📁 Repository Directory Structure

```
Revamp Riyadvi/
├── .gitignore               # Root git ignore (keeps secrets & node_modules safe)
├── README.md                # Project documentation & setup instructions
├── vercel.json              # Vercel deployment configuration
├── backend/
│   ├── .env.example         # Backend environment schema
│   ├── .gitignore           # Backend git ignore
│   ├── package.json         # Express & Mongoose dependencies
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/     # Route handlers for leads & contacts
│       ├── models/          # Mongoose schemas
│       └── server.ts        # Express entry point
└── frontend/
    ├── .gitignore           # Frontend git ignore
    ├── vercel.json          # Vite SPA route rewrite rule
    ├── package.json         # React & Vite dependencies
    ├── vite.config.ts       # Chunk optimization & build configuration
    └── src/
        ├── components/      # Responsive UI components (3D Carousel, Stack Scroll, etc.)
        ├── data/            # Portfolio & Service datasets
        ├── pages/           # Page view routes (Home, Services, Portfolio, About, Contact)
        └── services/        # API & Analytics integrations
```
