# 🌾 KisaanMitra ( किसानमित्र )

### *"खेती होगी स्मार्ट, भविष्य होगा मजबूत।"*
**Smart farming for a stronger future.**

*One farm. Seven experts. Zero guesswork, KisaanMitra puts an entire team of AI specialists in every farmer's pocket..*

<br>

![Agriculture](https://img.shields.io/badge/🌱_Agriculture-2E7D32?style=flat-square&labelColor=1a1a1a)
![Crop Health](https://img.shields.io/badge/🩺_Crop_Health-C62828?style=flat-square&labelColor=1a1a1a)
![Weather](https://img.shields.io/badge/⛅_Weather-1565C0?style=flat-square&labelColor=1a1a1a)
![Market Insights](https://img.shields.io/badge/📊_Market_Insights-EF6C00?style=flat-square&labelColor=1a1a1a)
![Healthcare](https://img.shields.io/badge/🏥_Healthcare-6A1B9A?style=flat-square&labelColor=1a1a1a)
![Disaster Prep](https://img.shields.io/badge/🚨_Disaster_Prep-AD1457?style=flat-square&labelColor=1a1a1a)
![Education](https://img.shields.io/badge/🎓_Education-00838F?style=flat-square&labelColor=1a1a1a)

<br>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-2ea44f?style=for-the-badge)](https://kisaanmitr-indol.vercel.app)
[![Stars](https://img.shields.io/github/stars/SRV-KILLER09/KisaanMitr?style=for-the-badge&color=yellow)](https://github.com/SRV-KILLER09/KisaanMitr/stargazers)
[![Forks](https://img.shields.io/github/forks/SRV-KILLER09/KisaanMitr?style=for-the-badge&color=blue)](https://github.com/SRV-KILLER09/KisaanMitr/forks)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)](#-license)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Qdrant](https://img.shields.io/badge/Qdrant-DC244C?style=flat-square&logo=qdrant&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![YOLOv11](https://img.shields.io/badge/YOLOv11-Vision-purple?style=flat-square)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Key Features](#-key-system-features)
- [Tech Stack](#️-technology-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started--run-instructions)
- [Project Structure](#-project-directory-structure)
- [Contributing](#-contributing)

---

## 🎯 About

> **Kisaanमित्र is an autonomous multiagent AI platform built to simplify farming.** Instead of relying on a single chatbot, it brings together specialized AI agents for agriculture, crop health, weather, market insights, healthcare, disaster preparedness, and education — working together to give farmers personalized, actionable recommendations.

KisaanMitra is a **premium-design, single-screen Farm OS** — instead of one generic chatbot, a network of specialized AI agents (crop health, weather, market, healthcare, disaster-prep, and education) work together behind a stateful **LangGraph** planner to turn messy farm inputs — NPK readings, leaf-spot photos, regional queries — into actionable guidance in **under 60 seconds**.

Built with a **Next.js + TailwindCSS** frontend and a **FastAPI + LangGraph** multi-agent backend.

---

## 🚀 Key System Features

<table>
<tr>
<td width="50%" valign="top">
<br>

**🛰️ Floating Capsule Navbar**
<br>GDG-style premium capsule navigation centered on a starfield canvas — code-bracket branding, seamless tab transitions, language toggles, and live notification bells.

**🗺️ GPS & Satellite Farmland Map**
<br>Requests location on mount and renders a live Google Satellite embed of the farmland — overlaid with geofenced fields, pulsing IoT sensors, and YOLOv11 pathogen alert beacons.

**🌐 11 Regional Languages**
<br>Full localization across **English, Hindi, Punjabi, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali, Malayalam & Odia** — instantly re-skinning voice, diagnostics, pricing, SOS guides, and quizzes.

</td>
<td width="50%" valign="top">

**📈 Mandi Prices & MSP Tracker**
<br>Live Mandi market rates alongside government MSPs, with 6-month historical pricing trend graphs.

**🎓 Interactive Krishi Academy**
<br>Audio-guided lessons and gamified quizzes with reward badges to build farmer knowledge.

**🆘 Vibration-Feedback Emergency SOS**
<br>Flash-flood loss calculators, anti-snake-venom locator maps, and pesticide-poisoning first-aid guides.

**🔬 YOLOv11 Pathogen Scanner**
<br>Computer-vision engine that segments crop leaves, flags diseases (e.g. Early Blight) with confidence scores, and draws diagnostic bounding boxes in real time.

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

| Layer | Stack |
|---|---|
| **Frontend** | Next.js 16 (App Router) · Webpack Compiler · TailwindCSS · Lucide Icons · HTML5 Geolocation API · Web Speech API |
| **Backend** | FastAPI · LangGraph (stateful agent workflows) · SQLAlchemy |
| **Data & Memory** | SQLite (local fallback) · Redis (telemetry cache) · Qdrant (cosine-similarity semantic RAG) |
| **Vision** | YOLOv11 pathogen detection |

---

## 📊 System Architecture

```mermaid
graph TD
    User([🧑‍🌾 Farmer]) -->|Interacts| UI[Capsule UI /dashboard]
    UI -->|HTML5 Geolocate| GPS[Capture GPS coordinates]
    UI -->|Voice / Text Query| Voice[Voice assistant query]
    Voice -->|API Chat route| Planner[Planner Agent · LangGraph]

    Planner --> Memory[Memory Agent]
    Planner --> Vision[Vision Pathogen Agent]
    Planner --> Weather[Weather Advisory Agent]
    Planner --> Soil[Soil & IoT Agent]
    Planner --> Market[Mandi Rates Agent]
    Planner --> Schemes[Subsidies Scheme Agent]
    Planner --> SOS[Disaster SOS Agent]
    Planner --> Academy[Education Agent]

    Memory -.-> SQLite[(SQLite User DB)]
    Soil -.-> Sliders[IoT Calibration Sliders]
    Vision -.-> YOLO[YOLOv11 Scanner]

    SQLite & YOLO & Sliders -->|Compute Index| Health[Speedometer Health Gauge %]
    GPS -->|Render Satellite Embed| FarmMap[Interactive Satellite Farm Map]
```

---

## 🏃 Getting Started & Run Instructions

> **Prerequisites:** Python 3.10+ and Node.js 18+

### 1️⃣ Setup Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
> SQLite tables and Qdrant collections self-seed on startup.

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to launch KisaanMitra AI.

---

## 📂 Project Directory Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI entrypoint, seeds database
│   │   ├── core/               # Redis, Qdrant, SQLAlchemy engines
│   │   └── agents/             # LangGraph multi-agent workflow scripts
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/                # Next.js pages (/auth, /dashboard)
    │   └── components/
    │       ├── ui/             # Interactive 3D constellation shell
    │       └── dashboard/      # Voice, Vision, Mandi, SOS & FarmMap components
    └── package.json
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/SRV-KILLER09/KisaanMitr/issues) or open a pull request.

---

<img width="1759" height="971" alt="image" src="https://github.com/user-attachments/assets/17bf768d-aee8-4785-9343-8348a265cd64" />


<br>
<div align="center">

Made with ❤️ by [**Team Quintara**](https://github.com/SRV-KILLER09/KisaanMitr) · @2026

</div>
