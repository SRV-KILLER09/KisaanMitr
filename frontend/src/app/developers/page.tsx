'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, X, Briefcase, Mail, Cpu, Terminal } from 'lucide-react';
import Preloader from '@/components/ui/Preloader';

interface Developer {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  avatar: string; // Random unsplash photo
  avatarAlt: string;
  tags: string[];
}

// Inline custom SVG GitHub Icon component
function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// Inline custom SVG LinkedIn Icon component
function LinkedinIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function DevelopersPage() {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const developers: Developer[] = [
    {
      id: "akshara",
      name: "Akshara Tyagi",
      role: "Lead Frontend Architect",
      bio: "Spearheads user experience design and client-side system architecture. Expert in real-time SpeechRecognition interfaces, fluid Next.js page state propagation, and premium CSS micro-animations.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      avatarAlt: "Akshara Tyagi profile photo",
      tags: ["Next.js", "TailwindCSS", "Web Speech API", "State Management"]
    },
    {
      id: "akshita",
      name: "Akshita Vishnoi",
      role: "Computer Vision Specialist",
      bio: "Orchestrates machine learning pipeline systems. Focuses on custom crop pathogen detection neural networks, YOLOv11 leaf pathology classifiers, and SAM2 boundary box mask rendering integrations.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      avatarAlt: "Akshita Vishnoi profile photo",
      tags: ["YOLOv11", "FastAPI", "SAM2 Segmentation", "PyTorch"]
    },
    {
      id: "shreya",
      name: "Shreya Bhatt",
      role: "Database & RAG Architect",
      bio: "Owns the knowledge base retrieval structures. Manages semantic document mapping inside Qdrant vector databases, handles secure user relational profiles via SQLAlchemy, and seeds caching schemas.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      avatarAlt: "Shreya Bhatt profile photo",
      tags: ["Qdrant DB", "RAG Pipeline", "SQLAlchemy", "Metadata Optimization"]
    },
    {
      id: "vardaan",
      name: "Vardaan Saxena",
      role: "Lead Orchestration Engineer",
      bio: "Architects the agentic execution core. Configures state graph routers using LangGraph, coordinates the 12 specialized response agents, and integrates telemetry fallback drivers.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      avatarAlt: "Vardaan Saxena profile photo",
      tags: ["LangGraph", "Multi-Agent Systems", "State Graphs", "Redis Cache"]
    },
    {
      id: "shlok",
      name: "Shlok Pant",
      role: "DevOps & Cloud Engineer",
      bio: "Drives compilation pipelines and deployment environments. Specializes in Docker container scaling, Render web service configurations, Vercel monorepo compilation, and CI/CD integrations.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      avatarAlt: "Shlok Pant profile photo",
      tags: ["Docker", "Render Cloud", "Vercel Build Presets", "DevOps Pipelines"]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050806] text-white flex flex-col justify-between select-none">
      
      {/* High-tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Decorative top aura gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Preloader element */}
      <Preloader />

      {/* Header section */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-8 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wide hover:bg-emerald-900/50 hover:text-white hover:border-emerald-400/50 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Back to Farm OS</span>
        </Link>
        <div className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest font-bold">
          System Panel // Team Core
        </div>
      </header>

      {/* Main content grid */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        
        {/* Title details */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-sans bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600 bg-clip-text text-transparent uppercase mb-3">
            Meet the Developers
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-emerald-400/60 font-mono tracking-wide">
            The engineering squad behind KisaanMitra's multi-agent orchestrator, real-time telemetry, and visual disease diagnosis systems.
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
                className="group relative bg-[#090f0c]/60 backdrop-blur-md border border-emerald-500/15 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
              >
                {/* Glow border background overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Avatar Frame */}
                <div className="relative mb-5 w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={dev.avatar} 
                    alt={dev.avatarAlt} 
                    className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay" />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                  {dev.name}
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-4">
                  {dev.role}
                </span>

                {/* Action buttons (Links) */}
                <div className="flex gap-3 relative z-20 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={dev.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-800/80 hover:border-emerald-400 transition-all shadow-inner"
                    title="GitHub Profile"
                  >
                    <GithubIcon />
                  </a>
                  <a 
                    href={dev.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-800/80 hover:border-emerald-400 transition-all shadow-inner"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon />
                  </a>
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
                className="group relative bg-[#090f0c]/60 backdrop-blur-md border border-emerald-500/15 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
              >
                {/* Glow border background overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Avatar Frame */}
                <div className="relative mb-5 w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={dev.avatar} 
                    alt={dev.avatarAlt} 
                    className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay" />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                  {dev.name}
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-4">
                  {dev.role}
                </span>

                {/* Action buttons (Links) */}
                <div className="flex gap-3 relative z-20 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={dev.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-800/80 hover:border-emerald-400 transition-all shadow-inner"
                    title="GitHub Profile"
                  >
                    <GithubIcon />
                  </a>
                  <a 
                    href={dev.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-800/80 hover:border-emerald-400 transition-all shadow-inner"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center border-t border-emerald-500/5 mt-12 text-[9px] font-mono text-emerald-500/30 uppercase tracking-wider">
        © 2026 KisaanMitra Project Core // All Rights Reserved
      </footer>

      {/* Cool aesthetic detail modal with background blur */}
      {selectedDev && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedDev(null)}
        >
          <div 
            className="relative bg-[#060a08] border border-emerald-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.25)] text-left z-50 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal close icon */}
            <button 
              onClick={() => setSelectedDev(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 hover:text-white transition-all cursor-pointer"
            >
              <X size={14} />
            </button>

            {/* Developer Header Profile */}
            <div className="flex items-center gap-5 border-b border-emerald-500/10 pb-5 mb-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-emerald-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedDev.avatar} 
                  alt={selectedDev.avatarAlt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-1.5">
                  <span>{selectedDev.name}</span>
                </h2>
                <div className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
                  <Terminal size={10} className="text-emerald-500" />
                  <span>{selectedDev.role}</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-4 text-xs leading-relaxed text-emerald-200/80 font-sans">
              <p className="bg-[#0b120f]/50 p-4 rounded-xl border border-emerald-500/5 font-medium italic">
                "{selectedDev.bio}"
              </p>
              
              {/* Stack tags */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest block">
                  Skill Taxonomy
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDev.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/15 text-[9px] font-mono font-bold text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Links Footer */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-emerald-500/10">
              <a 
                href={selectedDev.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-emerald-950 text-emerald-400 border border-emerald-500/20 hover:border-emerald-400 hover:text-white rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
              >
                <GithubIcon />
                <span>GitHub Profile</span>
              </a>
              <a 
                href={selectedDev.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-emerald-950 text-emerald-400 border border-emerald-500/20 hover:border-emerald-400 hover:text-white rounded-xl text-center text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
              >
                <LinkedinIcon />
                <span>LinkedIn Link</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
