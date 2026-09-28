# 🌌 Antigravity // Atmospheric Weather Dynamics

A futuristic, zero-gravity weather forecast application designed to defy traditional rigid grid layouts. Featuring interactive glassmorphic UI, glowing bioluminescent orbs, magnetic cursor repulsion physics, and an orbital asteroid-belt forecast timeline.

![Antigravity Weather](https://img.shields.io/badge/Theme-Zero--Gravity-00F0FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

---

## ✨ Features

- **Orbital Planetary Core:** The current temperature is represented as a massive, glowing, central "planet" with rotating gyroscopic rings, internal plasma glow, and interactive 3D perspective tilt.
- **Satellite Telemetry Cards:** Metrics (Wind Velocity, Humidity, Quantum UV Radiation, Void Pressure, Visibility, Air Quality) float in orbit at varying z-depths with ambient drift.
- **Magnetic Repulsion Physics:** Floating cards actively deflect away from the cursor when approached and bounce back smoothly using spring physics.
- **Asteroid Belt 7-Day Forecast:** Curved 3D orbital trajectory displaying interactive weather asteroid pods with probability indicators.
- **Interactive Starfield & Zero-G Droplets:** Canvas-powered starry background with parallax depth and zero-gravity floating atmospheric moisture droplets.
- **Holographic Command Search:** Holographic input with teleport presets (Neo-Tokyo, New York, Kepler-186f, Reykjavik, Cyber-Dubai).
- **Backend & Database:** Node.js Express API + Supabase PostgreSQL for saving pinned locations and query telemetry.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mwahaj1976/project.git
cd project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Configure your `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://postgres.nncimtcrhksywgkijbvx:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
PORT=3001
```

### 4. Run the Application
- **Frontend Development Server:**
  ```bash
  npm run dev
  ```
- **Backend API Server:**
  ```bash
  npm run server
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express, PostgreSQL (`pg`)
- **Database:** Supabase PostgreSQL Pooler
