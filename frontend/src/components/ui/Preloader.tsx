'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sprout } from 'lucide-react';

export default function Preloader() {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Initializing farm node...");
  
  // Matrix-style compilation log array for background scrolling
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const LOG_DATA = [
    "⚡ COMPILING: Kisaanमित्र Core OS v2.1",
    "📡 Establishing socket telemetry link to sub-district...",
    "📶 IoT Telemetry Buffer: allocating 1024kb SRAM [OK]",
    "💾 Connecting to local Qdrant Vector database...",
    "📥 Qdrant DB: loading index kisaan_kb [OK]",
    "🌱 Seeding 4 RAG knowledge bulletins (KVK + ICAR manuals)...",
    "🧠 Compiling LangGraph workflow graph: 12 agents initialized",
    "👁️ Vision Node: loading YOLOv11 pathogen scanner weights...",
    "🗺️ Vision Node: parsing SAM2 segmented coordinates maps...",
    "📦 MCP Server: exposing tools: fetch_weather, locate_mandis",
    "🗺️ Geocoding: resolving Noida GPS coordinates [28.5355, 77.3910] [GEO_SYNC]",
    "🌡️ Weather Agent: fetching satellite climate telemetry for Noida...",
    "📈 Mandi Agent: fetching current commodity indices [OK]",
    "🛡️ Disaster Node: calibrating flood level warning meters...",
    "🧬 System status: 100% healthy, databases connected [OK]"
  ];

  useEffect(() => {
    // Speed-based progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 5;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Sync logs adding dynamically based on progress
  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * LOG_DATA.length);
    const loadedLogs = LOG_DATA.slice(0, logIndex + 1);
    setConsoleLogs(loadedLogs);
    
    // Auto-scroll logs
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }

    if (progress < 25) {
      setStatusText("Initializing core telemetry buffers...");
    } else if (progress < 50) {
      setStatusText("Establishing satellite link to region...");
    } else if (progress < 75) {
      setStatusText("Compiling LangGraph orchestrator state graph...");
    } else if (progress < 95) {
      setStatusText("Exposing MCP tools & vector index parameters...");
    } else {
      setStatusText("System ready. Launching agricultural cockpit.");
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 350);

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1050);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen bg-[#010301] flex items-center justify-center overflow-hidden z-[99999] transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFading 
          ? 'opacity-0 scale-95 pointer-events-none' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Matrix/Telemetry logs stream */}
      <div 
        ref={logContainerRef}
        className="absolute inset-0 p-6 font-mono text-[9px] text-emerald-500/10 leading-relaxed overflow-hidden select-none pointer-events-none z-0 flex flex-col justify-end text-left"
      >
        {consoleLogs.map((log, i) => (
          <div key={i} className="animate-fade-in truncate">
            {log}
          </div>
        ))}
      </div>

      {/* Cyber Grid background layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      {/* Concentric expanding telemetry radar lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[300px] h-[300px] border border-emerald-500/5 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="w-[500px] h-[500px] border border-emerald-500/2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDuration: '6s' }} />
      </div>

      {/* Ambient background neon blur glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-fuchsia-500/3 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Centered Glass Capsule Panel with linear glowing border tracking */}
      <div className="glass-panel p-8 bg-[#050805]/95 border border-emerald-500/20 rounded-3xl w-full max-w-[460px] flex flex-col gap-6 shadow-[0_0_80px_rgba(16,185,129,0.15)] relative z-10 backdrop-blur-3xl mx-4 select-none">
        
        {/* Animated tracing border corner glows */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-gradient-to-r from-fuchsia-500/20 via-cyan-500/20 to-emerald-500/20 opacity-50" />

        <div className="flex items-center gap-6">
          {/* Left Side: Orbit Indicator containing logo */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            
            {/* Spinning Neon Gradient Dashboard ring */}
            <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '2.5s' }} viewBox="0 0 80 80">
              <circle 
                cx="40" 
                cy="40" 
                r="36" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.03)" 
                strokeWidth="1" 
              />
              <circle 
                cx="40" 
                cy="40" 
                r="36" 
                fill="none" 
                stroke="url(#preloader-spinner-gradient)" 
                strokeWidth="2.5" 
                strokeDasharray="100 25" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="preloader-spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Sprout Logo in active orbital ring */}
            <div className="w-12 h-12 rounded-full bg-[#020402] border border-white/10 flex items-center justify-center shadow-[inset_0_0_15px_rgba(16,185,129,0.15)] z-10 relative">
              <Sprout className="text-emerald-400 animate-pulse" size={22} style={{ animationDuration: '1.5s' }} />
            </div>

            {/* Micro radar rings */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-60 scale-75" style={{ animationDuration: '2s' }} />
          </div>

          {/* Right Side: Text branding details */}
          <div className="flex-1 text-left space-y-1">
            <span className="text-[7.5px] font-mono font-black text-emerald-450 border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-0.5 rounded-full w-max block tracking-widest uppercase">
              SMART AGRICULTURE ORCHESTRATION OS
            </span>
            <h2 className="text-xl font-black text-white leading-none tracking-tight flex items-center gap-1.5 font-sans">
              Kisaanमित्र
            </h2>
            <p className="text-[10px] text-zinc-400 font-semibold font-sans italic">
              "खेती होगी स्मार्ट, भविष्य होगा मजबूत।"
            </p>
          </div>
        </div>

        {/* Dynamic Tagline Logger and Thin Progress Bar */}
        <div className="space-y-3.5 pt-4 border-t border-white/5 font-mono text-[9px]">
          <div className="flex justify-between items-center text-zinc-500 font-bold">
            <span className="flex items-center gap-1.5 text-left truncate max-w-[270px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-zinc-350">{statusText}</span>
            </span>
            <span className="text-emerald-450 font-black shrink-0">{progress}%</span>
          </div>

          {/* Sleek, neon gradient loading bar */}
          <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-emerald-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_#10b981]" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[7.5px] text-zinc-600 font-semibold select-none pt-0.5">
            <span>[SYS_BOOT: 0x8A92]</span>
            <span className="text-emerald-500/60 font-black animate-pulse">[SECURE_SHELL_ACTIVE]</span>
          </div>
        </div>

      </div>

    </div>
  );
}
