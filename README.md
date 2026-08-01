# KisaanMitra (किसानमित्र) 🌾
> **"खेती होगी स्मार्ट, भविष्य होगा मजबूत।"**

KisaanMitra is an advanced, premium-design **Multi-Agent Farm OS** that integrates computer vision, IoT telemetry, Mandi pricing forecasts, emergency crisis support, and agricultural education into a unified, single-screen dashboard. 

Built using a stateful LangGraph Multi-Agent network on the backend and Next.js + TailwindCSS on the frontend, KisaanMitra helps farmers convert messy farm inputs (NPK metrics, leaf spots, regional queries) into actionable agriculture planning guides in under 60 seconds.

---

## 🚀 Key System Features

1. **Top Floating Capsule Navbar (GDG Style)**
   * Designed after premium capsule layouts, centered and floating on starfield canvases. Features code-brackets branding, seamless tab transitions, localized language toggles, and dynamic notification indicator bells.

2. **GPS Geolocation & Farmland Satellite Geomap**
   * Prompts browser location permission on mount. Uses clean Google Satellite embed vectors (`maps.google.com/maps?t=k`) to display real-time farmland layouts inside the dashboard viewport without redirects.
   * Overlays geofenced fields, pulsing IoT sensors, and YOLOv11 pathogen alert beacons dynamically.

3. **11 Regional Languages Support**
   * Complete localization dictionary binding across **English, Hindi, Punjabi, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali, Malayalam, and Odia**. 
   * Toggling the globe selector instantly updates voice assistants, leaf diagnostics, Mandi pricing graphs, emergency SOS guidelines, and academic quizzes.

4. **YOLOv11 Bounding Pathogen Scanner**
   * Computer vision engine segments crop leaves, alerts on diseases (e.g. Early Blight) with confidence scores, and plots diagnostic bounding boxes.

5. **Mandi Prices & MSP Tracker**
   * Scrapes live market Mandi rates, tracks government Minimum Support Prices (MSP), and graphs 6-month historical pricing trends.

6. **Interactive Krishi Academy**
   * Audio-guided lessons and gamified quizzes with reward badge trackers.

7. **Vibration-Feedback Emergency SOS**
   * Flash flood loss calculators, anti-snake venom locator maps, and pesticide poisoning first-aid guides.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 16 (App Router), Webpack Compiler, TailwindCSS, Lucide Icons, HTML5 Geolocation API, Web Speech API.
* **Backend**: FastAPI, LangGraph (Stateful Agent Workflows), SQLAlchemy (Persistent user memory profiles), SQLite (Local fallback storage), Redis (Telemetry caching fallback), Qdrant Vector Database (Cosine similarity semantic RAG searching).

---

## 📊 System Architecture

```mermaid
graph TD
    User([Farmer]) -->|Interacts| UI[Capsule UI /dashboard]
    UI -->|HTML5 Geolocate| GPS[Capture GPS coordinates]
    UI -->|Voice / Text Query| Voice[Voice assistant query]
    Voice -->|API Chat route| Planner[Planner Agent / LangGraph]
    
    Planner --> Memory[Memory Agent]
    Planner --> Vision[Vision Pathogen Agent]
    Planner --> Weather[Weather Advisory Agent]
    Planner --> Soil[Soil & IoT Agent]
    Planner --> Market[Mandi Rates Agent]
    Planner --> Schemes[Subsidies Scheme Agent]
    Planner --> SOS[Disaster SOS Agent]
    Planner --> Academy[Education Agent]
    
    Memory -.-> SQLite[(SQLite User DB)]
    Soil -.-> Sliders[IoT calibration sliders]
    Vision -.-> YOLO[YOLOv11 Scanner]
    
    SQLite & YOLO & Sliders -->|Compute index| Health[Speedometer Health Gauge %]
    GPS -->|Render Satellite Embed| FarmMap[Interactive Satellite Farm Map]
```

---

## 🏃 Getting Started & Run Instructions

Ensure python 3.10+ and Node.js 18+ are installed.

### 1. Setup Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
*Note: SQLite tables and Qdrant collections will self-seed on startup.*

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to launch KisaanMitra AI.

---

## 📂 Project Directory Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI entrypoint, seeds database
│   │   ├── core/               # Redis, Qdrant, SQLAlchemy engines
│   │   └── agents/             # LangGraph Multi-agent workflow scripts
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/                # Next.js pages (/auth, /dashboard)
    │   └── components/
    │       ├── ui/             # Interactive 3D constellation shell
    │       └── dashboard/      # Voice, Vision, Mandi, SOS, & FarmMap components
    └── package.json
```
