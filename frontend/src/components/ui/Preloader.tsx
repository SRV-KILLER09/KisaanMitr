'use client';

import React, { useState, useEffect } from 'react';
import { Sprout, Cpu } from 'lucide-react';

export default function Preloader() {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Initializing farm node...");

  useEffect(() => {
    // Fast-counting progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Cycle boot logs as progress increments
  useEffect(() => {
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

  // Lock document scrolling when preloader is active to prevent page scrolls
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
      className={`fixed inset-0 w-screen h-screen bg-[#030503] flex items-center justify-center overflow-hidden z-[99999] transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isFading 
          ? 'opacity-0 scale-95 pointer-events-none' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Light neon gridline backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />
      
      {/* Radial ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Centered glass capsule card matching Screenshot 2 & 3 vibes */}
      <div className="glass-panel p-8 bg-[#070b08]/90 border border-white/10 rounded-2xl w-full max-w-[480px] flex flex-col gap-5 shadow-[0_0_60px_rgba(16,185,129,0.22)] relative z-10 backdrop-blur-2xl mx-4 select-none animate-pulse-soft">
        
        <div className="flex items-center gap-6">
          {/* Left Side: Spinning Indicator ring containing logo */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 80 80">
              <circle 
                cx="40" 
                cy="40" 
                r="36" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.05)" 
                strokeWidth="1.5" 
              />
              <circle 
                cx="40" 
                cy="40" 
                r="36" 
                fill="none" 
                stroke="url(#preloader-spinner-gradient)" 
                strokeWidth="2.5" 
                strokeDasharray="90 35" 
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

            {/* Central Logo */}
            <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]">
              <Sprout className="text-emerald-400 animate-pulse" size={22} />
            </div>
          </div>

          {/* Right Side: Text details and loading states */}
          <div className="flex-1 text-left space-y-1 font-sans">
            <span className="text-[7.5px] font-black text-emerald-450 border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-0.5 rounded-full w-max block font-mono tracking-wider">
              SMART AGRICULTURE ORCHESTRATION OS
            </span>
            <h2 className="text-xl font-black text-white leading-none tracking-tight flex items-center gap-1.5">
              KisaanMitra AI
              <Cpu size={14} className="text-fuchsia-400 animate-pulse" />
            </h2>
            <p className="text-[10px] text-zinc-400 font-semibold italic">
               "खेती होगी स्मार्ट, भविष्य होगा मजबूत."
            </p>
          </div>
        </div>

        {/* Dynamic Tagline Logger and Thin Progress Bar */}
        <div className="space-y-2.5 pt-4 border-t border-white/5 font-mono text-[9px]">
          <div className="flex justify-between items-center text-zinc-500 font-bold">
            <span className="flex items-center gap-1.5 text-left truncate max-w-[270px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {statusText}
            </span>
            <span className="text-emerald-450 font-black shrink-0">{progress}%</span>
          </div>

          {/* Sleek, colorful loading bar */}
          <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-emerald-500 rounded-full transition-all duration-100 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[7.5px] text-zinc-600 font-semibold select-none pt-0.5">
            <span>[SYS_BOOT: 0x8A92]</span>
            <span>SECURE_SHELL_ACTIVE</span>
          </div>
        </div>

      </div>

    </div>
  );
}
