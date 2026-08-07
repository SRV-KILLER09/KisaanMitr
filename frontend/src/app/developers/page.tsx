'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User, X, Briefcase, Mail, Cpu, Terminal, Sprout, ShieldAlert, Award } from 'lucide-react';
import Preloader from '@/components/ui/Preloader';

interface SkillStat {
  name: string;
  value: number; // 0 to 100
}

interface Developer {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  portfolio?: string;
  instagram?: string;
  avatar: string;
  avatarAlt: string;
  tags: string[];
  themeColor: string;
  bgGradient: string;
  borderHover: string;
  glowShadow: string;
  tagBg: string;
  accentText: string;
  cardBorder: string;
  avatarBorder: string;
  btnHover: string;
  glowDot: string;
  telemetryCode: string;
  statusText: string;
  stats: SkillStat[];
}

// Inline custom SVG GitHub Icon component
function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// Inline custom SVG LinkedIn Icon component
function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

// Inline custom SVG Portfolio/Globe Icon component
function GlobeIcon() {
  return (
    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

// Inline custom SVG Instagram Icon component
function InstagramIcon() {
  return (
    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function DevelopersPage() {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const developers: Developer[] = [
    {
      id: "akshara",
      name: "Akshara Tyagi",
      role: "Database, AI & RAG Architect",
      bio: "I map the data structures of today so that the AI can answer the queries of tomorrow.",
      github: "https://github.com/aksharatyagi2901",
      linkedin: "https://www.linkedin.com/in/akshara-tyagi-194732383/",
      instagram: "https://www.instagram.com/aksharuhhh",
      avatar: "/akshara.jpg",
      avatarAlt: "Akshara Tyagi profile photo",
      tags: ["Qdrant DB", "RAG Pipeline", "AI Systems", "SQLAlchemy"],
      themeColor: "fuchsia",
      bgGradient: "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent",
      borderHover: "group-hover:border-fuchsia-400 hover:border-fuchsia-400",
      glowShadow: "hover:shadow-[0_0_35px_rgba(217,70,239,0.3)] hover:border-fuchsia-450",
      tagBg: "bg-fuchsia-950/60 border border-fuchsia-500/30 text-fuchsia-300",
      accentText: "text-fuchsia-400",
      cardBorder: "border-fuchsia-500/20 bg-fuchsia-950/5",
      avatarBorder: "border-fuchsia-500/40 group-hover:border-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]",
      btnHover: "hover:bg-fuchsia-950 hover:text-fuchsia-300 hover:border-fuchsia-400",
      glowDot: "bg-fuchsia-400 shadow-[0_0_10px_#d946ef]",
      statusText: "QUERYING // DB",
      telemetryCode: "db.query(Farmer).filter_by().all()",
      stats: [
        { name: "Model Convergence", value: 96 },
        { name: "Retrieve Recall Rate", value: 97 },
        { name: "SQL Execution Speed", value: 94 }
      ]
    },
    {
      id: "akshita",
      name: "Akshita Vishnoi",
      role: "Computer Vision Specialist",
      bio: "I teach models how to see the world, one bounding box at a time.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/akshita.jpg",
      avatarAlt: "Akshita Vishnoi profile photo",
      tags: ["YOLOv11", "FastAPI", "SAM2 Segmentation", "PyTorch"],
      themeColor: "cyan",
      bgGradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      borderHover: "group-hover:border-cyan-400 hover:border-cyan-400",
      glowShadow: "hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] hover:border-cyan-450",
      tagBg: "bg-cyan-950/60 border border-cyan-500/30 text-cyan-300",
      accentText: "text-cyan-400",
      cardBorder: "border-cyan-500/20 bg-cyan-950/5",
      avatarBorder: "border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
      btnHover: "hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-400",
      glowDot: "bg-cyan-400 shadow-[0_0_10px_#06b6d4]",
      statusText: "DEPLOYING // AI",
      telemetryCode: "model.predict(image).segment()",
      stats: [
        { name: "Model Convergence", value: 96 },
        { name: "Segmentation Accuracy", value: 94 },
        { name: "Latency Optimization", value: 90 }
      ]
    },
    {
      id: "shreya",
      name: "Shreya Bhatt",
      role: "Lead Frontend Architect",
      bio: "I write the interfaces that make complex backend architecture look effortless.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/shreya.jpg",
      avatarAlt: "Shreya Bhatt profile photo",
      tags: ["Next.js", "TailwindCSS", "Web Speech API", "State Management"],
      themeColor: "yellow",
      bgGradient: "from-yellow-500/10 via-yellow-500/5 to-transparent",
      borderHover: "group-hover:border-yellow-400 hover:border-yellow-400",
      glowShadow: "hover:shadow-[0_0_35px_rgba(234,179,8,0.3)] hover:border-yellow-450",
      tagBg: "bg-yellow-950/60 border border-yellow-500/30 text-yellow-300",
      accentText: "text-yellow-400",
      cardBorder: "border-yellow-500/20 bg-yellow-950/5",
      avatarBorder: "border-yellow-500/40 group-hover:border-yellow-400 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]",
      btnHover: "hover:bg-yellow-950 hover:text-yellow-300 hover:border-yellow-400",
      glowDot: "bg-yellow-400 shadow-[0_0_10px_#eab308]",
      statusText: "COMPILING // HCI",
      telemetryCode: "const mic = new SpeechRecognition();",
      stats: [
        { name: "UI Fidelity", value: 98 },
        { name: "Speech Recognition Latency", value: 92 },
        { name: "HCI Precision", value: 95 }
      ]
    },
    {
      id: "vardaan",
      name: "Vardaan Saxena",
      role: "Lead Orchestration Engineer",
      bio: "I always build something that I keep wishing someone would make for me.",
      github: "https://github.com/SRV-KILLER09",
      linkedin: "https://linkedin.com",
      portfolio: "https://vardaansaxena.tec",
      avatar: "/vardaan.jpg",
      avatarAlt: "Vardaan Saxena profile photo",
      tags: ["LangGraph", "Multi-Agent Systems", "State Graphs", "Redis Cache"],
      themeColor: "emerald",
      bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      borderHover: "group-hover:border-emerald-400 hover:border-emerald-400",
      glowShadow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] hover:border-emerald-450",
      tagBg: "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300",
      accentText: "text-emerald-400",
      cardBorder: "border-emerald-500/20 bg-emerald-950/5",
      avatarBorder: "border-emerald-500/40 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]",
      btnHover: "hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-400",
      glowDot: "bg-emerald-400 shadow-[0_0_10px_#10b981]",
      statusText: "ROUTING // Graph",
      telemetryCode: "workflow.compile(checkpointer)",
      stats: [
        { name: "Graph Compilation", value: 99 },
        { name: "Telemetry Fallback", value: 95 },
        { name: "Node Synchronization", value: 96 }
      ]
    },
    {
      id: "shlok",
      name: "Shlok Pant",
      role: "DevOps & Cloud Engineer",
      bio: "I engineer the systems behind every deployment.",
      github: "https://github.com/im-shlok",
      linkedin: "https://linkedin.com",
      avatar: "/shlok.jpg",
      avatarAlt: "Shlok Pant profile photo",
      tags: ["Docker", "Render Cloud", "Vercel Build Presets", "DevOps Pipelines"],
      themeColor: "red",
      bgGradient: "from-red-500/10 via-red-500/5 to-transparent",
      borderHover: "group-hover:border-red-400 hover:border-red-400",
      glowShadow: "hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] hover:border-red-450",
      tagBg: "bg-red-950/60 border border-red-500/30 text-red-300",
      accentText: "text-red-400",
      cardBorder: "border-red-500/20 bg-red-950/5",
      avatarBorder: "border-red-500/40 group-hover:border-red-400 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
      btnHover: "hover:bg-red-950 hover:text-red-300 hover:border-red-400",
      glowDot: "bg-red-400 shadow-[0_0_10px_#ef4444]",
      statusText: "PIPELINE // Ops",
      telemetryCode: "docker build -t backend:latest .",
      stats: [
        { name: "Docker Optimization", value: 95 },
        { name: "Build Success Rate", value: 98 },
        { name: "Edge Cache Hitrate", value: 91 }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative w-full bg-[#030604] text-white flex flex-col justify-between select-none">
      
      {/* Self-contained styling for holographic scanline and blinking animations */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .scanline-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent 49%, var(--scan-color, #10b981) 50%, transparent 51%);
          background-size: 100% 200%;
          z-index: 10;
          animation: scanline 4s linear infinite;
          opacity: 0.15;
        }
        .animate-blink-slow {
          animation: blink 2s infinite;
        }
      `}</style>

      {/* High-tech grid overlay with higher visibility */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />
      
      {/* Dynamic colorful background glow elements to brighten the screen */}
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-fuchsia-500/10 blur-[130px] rounded-full pointer-events-none z-0 animate-pulse-soft" />
      <div className="absolute top-[35%] right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 left-[20%] w-[380px] h-[380px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Preloader element */}
      <Preloader />

      {/* Unified Header Navbar */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-6">
        <nav className="glass-panel px-6 py-2.5 flex justify-between items-center bg-[#090d0a]/80 border border-white/10 rounded-full shadow-lg relative z-50">
          <div className="flex flex-col text-left">
            <span className="text-sm font-black text-white leading-none tracking-wide flex items-center gap-1 font-sans">
              <Sprout className="text-emerald-500 animate-pulse" size={16} />
              Kisaanमित्र
            </span>
            <span className="text-[8px] font-bold text-zinc-400 mt-0.5 uppercase tracking-wide">
              खेती होगी स्मार्ट, किसान होगा मजबूत।
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <Link 
              href="/"
              className="px-3.5 py-1.5 bg-[#0a0f0c] hover:bg-white/5 border border-white/10 text-zinc-300 font-extrabold rounded-full text-[10px] transition-all flex items-center gap-1.5 shadow"
            >
              <ArrowLeft size={12} className="text-emerald-400" />
              <span>Back to Home</span>
            </Link>

            <Link 
              href="/dashboard"
              className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-full text-[10px] transition-all flex items-center gap-1 shadow"
            >
              Launch Farm OS
              <ArrowRight size={10} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content grid */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        
        {/* Title details matching the requested screenshot */}
        <div className="text-center mb-16 select-none">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider font-sans text-[#00dfa2] uppercase mb-4">
            Meet the Developers
          </h1>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-emerald-500/80 font-mono tracking-wide font-medium leading-relaxed">
            The engineering squad behind Kisaanमित्र's multi-agent orchestrator,
            <br className="hidden md:inline" /> real-time telemetry, and visual crop pathology diagnosis systems.
          </p>
        </div>

        {/* Developers container */}
        <div className="space-y-8">
          
          {/* Top row - 3 Developers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developers.slice(0, 3).map((dev) => (
              <div 
                key={dev.id}
                onClick={() => setSelectedDev(dev)}
                className={`group relative bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border-2 ${dev.cardBorder} rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 ${dev.glowShadow}`}
              >
                {/* Glow border background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${dev.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Blinking Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono font-bold tracking-wider text-zinc-400">
                  <span className={`w-1.5 h-1.5 rounded-full animate-blink-slow ${dev.glowDot}`} />
                  <span>{dev.statusText}</span>
                </div>

                {/* Avatar Frame with halo & scanner */}
                <div className={`relative mb-6 w-24 h-24 rounded-full overflow-hidden border-2 ${dev.avatarBorder} transition-all duration-300`}>
                  {/* Holographic scanner line overlay */}
                  <div className="scanline-overlay" style={{ '--scan-color': dev.themeColor === 'fuchsia' ? '#d946ef' : dev.themeColor === 'cyan' ? '#06b6d4' : dev.themeColor === 'yellow' ? '#eab308' : dev.themeColor === 'emerald' ? '#10b981' : '#ef4444' } as React.CSSProperties} />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={dev.avatar} 
                    alt={dev.avatarAlt} 
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay" />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-black text-white tracking-wide group-hover:text-emerald-400 transition-colors duration-300">
                  {dev.name}
                </h3>
                <span className={`text-[9px] font-mono font-black ${dev.accentText} uppercase tracking-widest mb-4`}>
                  {dev.role}
                </span>



                {/* Action buttons (Links) */}
                <div className="flex gap-3 relative z-20 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={dev.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                    title="GitHub Profile"
                  >
                    <GithubIcon />
                  </a>
                  <a 
                    href={dev.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon />
                  </a>
                  {dev.portfolio && (
                    <a 
                      href={dev.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                      title="Portfolio Website"
                    >
                      <GlobeIcon />
                    </a>
                  )}
                  {dev.instagram && (
                    <a 
                      href={dev.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                      title="Instagram Profile"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 2 Developers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {developers.slice(3, 5).map((dev) => (
              <div 
                key={dev.id}
                onClick={() => setSelectedDev(dev)}
                className={`group relative bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border-2 ${dev.cardBorder} rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 ${dev.glowShadow}`}
              >
                {/* Glow border background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${dev.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Blinking Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono font-bold tracking-wider text-zinc-400">
                  <span className={`w-1.5 h-1.5 rounded-full animate-blink-slow ${dev.glowDot}`} />
                  <span>{dev.statusText}</span>
                </div>

                {/* Avatar Frame with halo & scanner */}
                <div className={`relative mb-6 w-24 h-24 rounded-full overflow-hidden border-2 ${dev.avatarBorder} transition-all duration-300`}>
                  {/* Holographic scanner line overlay */}
                  <div className="scanline-overlay" style={{ '--scan-color': dev.themeColor === 'fuchsia' ? '#d946ef' : dev.themeColor === 'cyan' ? '#06b6d4' : dev.themeColor === 'yellow' ? '#eab308' : dev.themeColor === 'emerald' ? '#10b981' : '#ef4444' } as React.CSSProperties} />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={dev.avatar} 
                    alt={dev.avatarAlt} 
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay" />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-black text-white tracking-wide group-hover:text-emerald-400 transition-colors duration-300">
                  {dev.name}
                </h3>
                <span className={`text-[9px] font-mono font-black ${dev.accentText} uppercase tracking-widest mb-4`}>
                  {dev.role}
                </span>



                {/* Action buttons (Links) */}
                <div className="flex gap-3 relative z-20 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={dev.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                    title="GitHub Profile"
                  >
                    <GithubIcon />
                  </a>
                  <a 
                    href={dev.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon />
                  </a>
                  {dev.portfolio && (
                    <a 
                      href={dev.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                      title="Portfolio Website"
                    >
                      <GlobeIcon />
                    </a>
                  )}
                  {dev.instagram && (
                    <a 
                      href={dev.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl bg-white/[0.02] border border-emerald-500/10 text-emerald-400/80 hover:text-white transition-all duration-300 ${dev.btnHover} shadow-sm`}
                      title="Instagram Profile"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center border-t border-emerald-500/15 mt-12 text-[9px] font-mono text-emerald-500/30 uppercase tracking-wider">
        © 2026 Kisaanमित्र Project Core // All Rights Reserved
      </footer>

      {/* Cool aesthetic detail modal with background blur */}
      {selectedDev && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedDev(null)}
        >
          <div 
            className={`relative bg-[#050806] border rounded-3xl p-8 max-w-md w-full text-center z-50 animate-scale-up overflow-hidden ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/20 shadow-[0_0_60px_rgba(217,70,239,0.25)]' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.25)]' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/20 shadow-[0_0_60px_rgba(234,179,8,0.25)]' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.25)]' :
              'border-red-500/20 shadow-[0_0_60px_rgba(239,68,68,0.25)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tactical cyber corner bracket overlays */}
            <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-3xl pointer-events-none ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/30' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/30' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/30' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/30' :
              'border-red-500/30'
            }`} />
            <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-3xl pointer-events-none ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/30' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/30' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/30' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/30' :
              'border-red-500/30'
            }`} />
            <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-3xl pointer-events-none ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/30' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/30' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/30' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/30' :
              'border-red-500/30'
            }`} />
            <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-3xl pointer-events-none ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/30' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/30' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/30' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/30' :
              'border-red-500/30'
            }`} />

            {/* Ambient scanner beam across the modal */}
            <div className="scanline-overlay" style={{ '--scan-color': selectedDev.themeColor === 'fuchsia' ? '#d946ef' : selectedDev.themeColor === 'cyan' ? '#06b6d4' : selectedDev.themeColor === 'yellow' ? '#eab308' : selectedDev.themeColor === 'emerald' ? '#10b981' : '#ef4444' } as React.CSSProperties} />

            {/* Modal close icon */}
            <button 
              onClick={() => setSelectedDev(null)}
              className={`absolute top-4 right-4 p-1.5 rounded-xl border hover:text-white transition-all cursor-pointer animate-pulse-soft z-55 ${
                selectedDev.themeColor === 'fuchsia' ? 'bg-fuchsia-950/60 border-fuchsia-500/15 text-fuchsia-400' :
                selectedDev.themeColor === 'cyan' ? 'bg-cyan-950/60 border-cyan-500/15 text-cyan-400' :
                selectedDev.themeColor === 'yellow' ? 'bg-yellow-950/60 border-yellow-500/15 text-yellow-400' :
                selectedDev.themeColor === 'emerald' ? 'bg-emerald-950/60 border-emerald-500/15 text-emerald-400' :
                'bg-red-950/60 border-red-500/15 text-red-400'
              }`}
            >
              <X size={14} />
            </button>

            {/* Top row: Name */}
            <div className={`flex flex-col items-center gap-2 border-b pb-4 mb-5 relative z-10 ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/10' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/10' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/10' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/10' :
              'border-red-500/10'
            }`}>
              <h2 className="text-xl font-black text-white tracking-wide text-center">
                {selectedDev.name}
              </h2>
            </div>

            {/* Center Section: Photo and Role */}
            <div className="flex flex-col items-center justify-center mb-5 relative z-10">
              <div className={`relative mb-4 w-32 h-32 rounded-full overflow-hidden border-2 ${selectedDev.avatarBorder.replace('group-hover:', '')} shadow-[0_0_20px_rgba(16,185,129,0.15)]`}>
                {/* Holographic scanner line overlay */}
                <div className="scanline-overlay" style={{ '--scan-color': selectedDev.themeColor === 'fuchsia' ? '#d946ef' : selectedDev.themeColor === 'cyan' ? '#06b6d4' : selectedDev.themeColor === 'yellow' ? '#eab308' : selectedDev.themeColor === 'emerald' ? '#10b981' : '#ef4444' } as React.CSSProperties} />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedDev.avatar} 
                  alt={selectedDev.avatarAlt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`text-[10px] font-mono font-bold ${selectedDev.accentText} uppercase tracking-wider flex items-center gap-1.5`}>
                <Terminal size={12} />
                <span>{selectedDev.role}</span>
              </div>
            </div>

            {/* Bottom Section: Biography (About Me) */}
            <div className={`space-y-2.5 text-xs leading-relaxed text-emerald-250/90 font-sans relative z-10 pt-2.5 border-t mb-4 ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/10' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/10' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/10' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/10' :
              'border-red-500/10'
            }`}>
              <span className={`text-[9.5px] font-mono font-black uppercase tracking-widest block text-left mb-1 ${selectedDev.accentText}`}>
                [ ABOUT ME ]
              </span>
              <p className={`bg-[#050806]/80 p-4 rounded-2xl border font-medium italic text-left text-zinc-305 ${
                selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/10 bg-fuchsia-950/5' :
                selectedDev.themeColor === 'cyan' ? 'border-cyan-500/10 bg-cyan-950/5' :
                selectedDev.themeColor === 'yellow' ? 'border-yellow-500/10 bg-yellow-950/5' :
                selectedDev.themeColor === 'emerald' ? 'border-emerald-500/10 bg-emerald-950/5' :
                'border-red-500/10 bg-red-950/5'
              }`}>
                "{selectedDev.bio}"
              </p>
            </div>

            {/* Modal Links Footer */}
            <div className={`flex gap-3 pt-4 border-t relative z-10 ${
              selectedDev.themeColor === 'fuchsia' ? 'border-fuchsia-500/10' :
              selectedDev.themeColor === 'cyan' ? 'border-cyan-500/10' :
              selectedDev.themeColor === 'yellow' ? 'border-yellow-500/10' :
              selectedDev.themeColor === 'emerald' ? 'border-emerald-500/10' :
              'border-red-500/10'
            }`}>
              <a 
                href={selectedDev.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 py-2.5 px-3 border rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedDev.themeColor === 'fuchsia' ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/15' :
                  selectedDev.themeColor === 'cyan' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/15' :
                  selectedDev.themeColor === 'yellow' ? 'bg-yellow-950/40 text-yellow-300 border-yellow-500/15' :
                  selectedDev.themeColor === 'emerald' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/15' :
                  'bg-red-950/40 text-red-300 border-red-500/15'
                } ${selectedDev.btnHover}`}
              >
                <GithubIcon />
                <span>GitHub</span>
              </a>
              <a 
                href={selectedDev.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 py-2.5 px-3 border rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedDev.themeColor === 'fuchsia' ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/15' :
                  selectedDev.themeColor === 'cyan' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/15' :
                  selectedDev.themeColor === 'yellow' ? 'bg-yellow-950/40 text-yellow-300 border-yellow-500/15' :
                  selectedDev.themeColor === 'emerald' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/15' :
                  'bg-red-950/40 text-red-300 border-red-500/15'
                } ${selectedDev.btnHover}`}
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>
              {selectedDev.portfolio && (
                <a 
                  href={selectedDev.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 px-3 border rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedDev.themeColor === 'fuchsia' ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/15' :
                    selectedDev.themeColor === 'cyan' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/15' :
                    selectedDev.themeColor === 'yellow' ? 'bg-yellow-950/40 text-yellow-300 border-yellow-500/15' :
                    selectedDev.themeColor === 'emerald' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/15' :
                    'bg-red-950/40 text-red-300 border-red-500/15'
                  } ${selectedDev.btnHover}`}
                >
                  <GlobeIcon />
                  <span>Portfolio</span>
                </a>
              )}
              {selectedDev.instagram && (
                <a 
                  href={selectedDev.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 px-3 border rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedDev.themeColor === 'fuchsia' ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/15' :
                    selectedDev.themeColor === 'cyan' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/15' :
                    selectedDev.themeColor === 'yellow' ? 'bg-yellow-950/40 text-yellow-300 border-yellow-500/15' :
                    selectedDev.themeColor === 'emerald' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/15' :
                    'bg-red-950/40 text-red-300 border-red-500/15'
                  } ${selectedDev.btnHover}`}
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}    </div>
  );
}
