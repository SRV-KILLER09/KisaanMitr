'use client';

import React, { useState, useEffect } from 'react';
import { Sprout, Sun, CloudRain, Thermometer, Droplet, Wind, Eye } from 'lucide-react';

interface FarmTwinProps {
  weather: any;
  soil: any;
  activeLanguage: string;
}

export default function FarmTwin({ weather, soil, activeLanguage }: FarmTwinProps) {
  const [growthStage, setGrowthStage] = useState<number>(2); // 1 = Sprout, 2 = Growing, 3 = Harvest Ready
  const [droneFlying, setDroneFlying] = useState<boolean>(true);
  const [hoveredPlot, setHoveredPlot] = useState<number | null>(null);

  // Translations
  const labels: any = {
    en: {
      title: "3D Digital Farm Twin",
      subtitle: "Real-time twin model simulating telemetry and crops",
      soilHealth: "Soil Health Plot",
      cropStatus: "Crop Growth Plot",
      weatherSimulation: "Atmospheric Simulation",
      automationDrone: "Drone Scouting Route",
      moisture: "Moisture",
      temp: "Temp",
      stage: "Growth Stage",
      growthSprout: "Sprout",
      growthVegetative: "Growing",
      growthMaturity: "Ready to Harvest",
      sensorStatus: "IoT Telemetry Status",
      active: "ACTIVE"
    },
    hi: {
      title: "3D डिजिटल फार्म ट्विन",
      subtitle: "वास्तविक समय का ट्विन मॉडल जो टेलीमेट्री और फसलों का अनुकरण करता है",
      soilHealth: "मिट्टी स्वास्थ्य क्षेत्र",
      cropStatus: "फसल विकास क्षेत्र",
      weatherSimulation: "वायुमंडलीय अनुकरण",
      automationDrone: "ड्रोन स्काउटिंग मार्ग",
      moisture: "नमी",
      temp: "तापमान",
      stage: "विकास का चरण",
      growthSprout: "अंकुर",
      growthVegetative: "बढ़ रहा है",
      growthMaturity: "कटाई के लिए तैयार",
      sensorStatus: "IoT टेलीमेट्री स्थिति",
      active: "सक्रिय"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  // Fetch rain probability to trigger rainy weather state in twin automatically
  const isRainy = weather?.rain_probability > 50;
  const currentTemp = weather?.temperature || 30;

  return (
    <div className="glass-panel p-6 overflow-hidden flex flex-col h-full relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-900">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            {t.title}
          </h2>
          <p className="text-xs text-emerald-700/80">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full">
          <Eye size={12} />
          {t.active}
        </div>
      </div>

      {/* 3D Isometric Viewport */}
      <div className="flex-1 min-h-[300px] flex items-center justify-center relative perspective-1000 bg-gradient-to-b from-emerald-50/20 to-emerald-100/10 rounded-xl border border-emerald-100/50">
        
        {/* Sky / Atmospheric Weather Particles Overlay */}
        {isRainy && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-[1.5px] bg-sky-400/70 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * -20}%`,
                  height: `${15 + Math.random() * 20}px`,
                  animationDuration: `${0.6 + Math.random() * 0.4}s`,
                  animationIterationCount: 'infinite',
                  transform: 'rotate(15deg)'
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Drone */}
        {droneFlying && (
          <div 
            className="absolute z-20 pointer-events-none transition-all duration-1000 ease-in-out"
            style={{
              transform: `translate3d(${Math.sin(Date.now() / 1500) * 100}px, ${Math.cos(Date.now() / 1500) * 40 - 80}px, 60px)`,
            }}
          >
            <div className="w-12 h-4 bg-zinc-800 rounded-full relative flex items-center justify-center shadow-lg">
              <div className="absolute -top-1 left-1 w-4 h-0.5 bg-zinc-600 animate-spin"></div>
              <div className="absolute -top-1 right-1 w-4 h-0.5 bg-zinc-600 animate-spin"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              {/* Drone Camera Laser Line */}
              <div className="absolute top-4 w-0.5 h-16 bg-gradient-to-b from-emerald-400/40 to-transparent"></div>
            </div>
          </div>
        )}

        {/* 3D Transform Wrapper */}
        <div 
          className="transform-style-3d transition-transform duration-700 select-none cursor-pointer"
          style={{
            transform: 'rotateX(55deg) rotateZ(-45deg) translateY(-20px)',
          }}
        >
          {/* Isometric Ground Layer */}
          <div className="grid grid-cols-2 gap-4 w-[280px] h-[280px] p-2 bg-amber-950/20 rounded-2xl transform-style-3d">
            
            {/* Plot 1: Soil Health (Top Left) */}
            <div 
              onMouseEnter={() => setHoveredPlot(1)}
              onMouseLeave={() => setHoveredPlot(null)}
              className={`h-[120px] rounded-xl transform-style-3d transition-all duration-300 relative flex flex-col justify-between p-3 border ${
                hoveredPlot === 1 
                  ? 'bg-amber-900 border-amber-400 -translate-y-3 shadow-[0_15px_30px_rgba(120,53,4,0.4)]' 
                  : 'bg-amber-950 border-amber-900/60 shadow-md'
              }`}
            >
              <div className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">{t.soilHealth}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Droplet className="text-sky-400" size={14} />
                <span className="text-xs font-bold text-white">{soil?.moisture || 48}%</span>
              </div>
              <div className="text-[9px] text-amber-300 font-medium">pH: {soil?.ph || 6.7}</div>
              <div className="w-full bg-amber-900/50 rounded-full h-1 mt-1 overflow-hidden">
                <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${soil?.moisture || 48}%` }}></div>
              </div>
            </div>

            {/* Plot 2: Crop Growth Stage (Top Right) */}
            <div 
              onMouseEnter={() => setHoveredPlot(2)}
              onMouseLeave={() => setHoveredPlot(null)}
              className={`h-[120px] rounded-xl transform-style-3d transition-all duration-300 relative flex flex-col justify-between p-3 border ${
                hoveredPlot === 2 
                  ? 'bg-emerald-800 border-emerald-400 -translate-y-3 shadow-[0_15px_30px_rgba(16,185,129,0.4)]' 
                  : 'bg-emerald-900/90 border-emerald-950/60 shadow-md'
              }`}
            >
              <div className="text-[10px] text-emerald-200/80 font-bold uppercase tracking-wider">{t.cropStatus}</div>
              
              {/* Animated 3D crop icons based on Growth Stage */}
              <div className="flex justify-center items-end gap-2 h-14">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="transition-all duration-500 transform-style-3d">
                    {growthStage === 1 && (
                      <Sprout className="text-emerald-300 animate-pulse" size={16} />
                    )}
                    {growthStage === 2 && (
                      <div className="flex flex-col items-center">
                        <Sprout className="text-emerald-400" size={20} />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></div>
                      </div>
                    )}
                    {growthStage === 3 && (
                      <div className="flex flex-col items-center">
                        <Sprout className="text-yellow-400 animate-bounce" size={24} />
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-[9px] text-emerald-300/90 font-medium text-center">{growthStage === 1 ? t.growthSprout : growthStage === 2 ? t.growthVegetative : t.growthMaturity}</div>
            </div>

            {/* Plot 3: Weather (Bottom Left) */}
            <div 
              onMouseEnter={() => setHoveredPlot(3)}
              onMouseLeave={() => setHoveredPlot(null)}
              className={`h-[120px] rounded-xl transform-style-3d transition-all duration-300 relative flex flex-col justify-between p-3 border ${
                hoveredPlot === 3 
                  ? 'bg-sky-900 border-sky-400 -translate-y-3 shadow-[0_15px_30px_rgba(14,165,233,0.4)]' 
                  : 'bg-sky-950/90 border-sky-950/60 shadow-md'
              }`}
            >
              <div className="text-[10px] text-sky-200/80 font-bold uppercase tracking-wider">{t.weatherSimulation}</div>
              <div className="flex justify-between items-center mt-2">
                {isRainy ? (
                  <CloudRain className="text-sky-400 animate-pulse-soft" size={24} />
                ) : (
                  <Sun className="text-amber-400 animate-spin" style={{ animationDuration: '20s' }} size={24} />
                )}
                <span className="text-xs font-bold text-white">{currentTemp}°C</span>
              </div>
              <div className="text-[9px] text-sky-300/80">{isRainy ? "Precipitation 92%" : "Clear Conditions"}</div>
            </div>

            {/* Plot 4: Tech & Automation (Bottom Right) */}
            <div 
              onMouseEnter={() => setHoveredPlot(4)}
              onMouseLeave={() => setHoveredPlot(null)}
              className={`h-[120px] rounded-xl transform-style-3d transition-all duration-300 relative flex flex-col justify-between p-3 border ${
                hoveredPlot === 4 
                  ? 'bg-zinc-800 border-zinc-400 -translate-y-3 shadow-[0_15px_30px_rgba(24,24,27,0.4)]' 
                  : 'bg-zinc-900 border-zinc-950/60 shadow-md'
              }`}
            >
              <div className="text-[10px] text-zinc-300/80 font-bold uppercase tracking-wider">{t.automationDrone}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Wind className="text-emerald-400" size={14} />
                <span className="text-xs text-white font-medium">Scanned: 82%</span>
              </div>
              <div className="text-[8px] text-zinc-400/90">Path tracking active. Continuous drone patrol.</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDroneFlying(!droneFlying);
                }}
                className={`text-[9px] font-bold py-1 px-2 rounded mt-1 transition-all ${
                  droneFlying ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {droneFlying ? "Recall Drone" : "Launch Drone"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Control Widgets at Bottom */}
      <div className="mt-6 space-y-4 pt-4 border-t border-emerald-100/50">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-emerald-950 flex items-center gap-1">
            <Sprout size={14} />
            {t.stage}:
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => setGrowthStage(val)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all border ${
                  growthStage === val 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {val === 1 ? t.growthSprout : val === 2 ? t.growthVegetative : t.growthMaturity}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Summary Bar */}
        <div className="grid grid-cols-3 gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/40 text-center">
          <div>
            <div className="text-[9px] text-emerald-700 font-semibold">{t.moisture}</div>
            <div className="text-xs font-bold text-emerald-900">{soil?.moisture || 48}%</div>
          </div>
          <div>
            <div className="text-[9px] text-emerald-700 font-semibold">{t.temp}</div>
            <div className="text-xs font-bold text-emerald-900">{currentTemp}°C</div>
          </div>
          <div>
            <div className="text-[9px] text-emerald-700 font-semibold">pH</div>
            <div className="text-xs font-bold text-emerald-900">{soil?.ph || 6.7}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
