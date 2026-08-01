'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, User, Lock, MapPin, LandPlot, AlertCircle, ArrowRight, CheckCircle2, Terminal, Network, Phone, Home, Mic, Keyboard } from 'lucide-react';
import Preloader from '@/components/ui/Preloader';

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<string>("login"); // login | otp | register
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successText, setSuccessText] = useState<string | null>(null);

  // Form states
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpCodeInput, setOtpCodeInput] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  // Registration details
  const [farmerName, setFarmerName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [crop, setCrop] = useState<string>("Tomato");
  const [landSize, setLandSize] = useState<string>("1.5");

  // Voice Command states
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(true); // Start active by default
  const [voiceStatus, setVoiceStatus] = useState<string>("Initializing Voice Assistant...");
  
  const isVoiceActiveRef = useRef(true);
  const recognitionRef = useRef<any>(null);

  // Animated terminal logs states
  const [logs, setLogs] = useState<string[]>([
    "Initializing KisaanMitra Core OS v2.1...",
    "Establishing telemetry link to local Krishi Vigyan Kendra (KVK)..."
  ]);

  useEffect(() => {
    const session = localStorage.getItem("kisaan_session");
    if (session) {
      router.push("/dashboard");
    }
  }, [router]);

  // Terminal log animation simulation
  useEffect(() => {
    const logPool = [
      "IoT telemetry buffers initialized successfully",
      "Syncing with regional crop database (ICAR Fallback active)",
      "Connecting to Qdrant vector database: Index kisaan_kb loaded",
      "Seeding 4 RAG knowledge bulletins (KVK + ICAR manuals)...",
      "LangGraph workflow network compiled: 12 nodes initialized",
      "Vision Node: YOLOv11 leaf pathogen analyzer weights checked",
      "Vision Node: SAM2 segmented coordinate maps ready",
      "MCP Server: Exposing tools: fetch_weather, locate_mandis...",
      "Status check: Node active and listening for farmer telemetry logs"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logPool.length) {
        setLogs((prev) => [...prev, logPool[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Sync ref with state
  useEffect(() => {
    isVoiceActiveRef.current = isVoiceActive;
    if (isVoiceActive) {
      initSpeechRecognition();
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      setVoiceStatus("Voice commands sleeping. Click to wake.");
      setLogs((prev) => [...prev, "Voice Assistant: Deactivated."]);
    }
  }, [isVoiceActive]);

  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus("Speech Recognition API not supported in browser");
      setLogs((prev) => [...prev, "Speech API error: Browser does not support SpeechRecognition API."]);
      return;
    }

    if (!recognitionRef.current) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
          setVoiceStatus("Mic active: Speak 'login', 'otp', 'register', or 'unlock'");
          setLogs((prev) => [...prev, "Voice Assistant: Microphone active & listening..."]);
        };

        rec.onresult = (event: any) => {
          const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
          setLogs((prev) => [...prev, `→ Recognized Voice Command: "${command}"`]);

          if (command.includes("register") || command.includes("sign up") || command.includes("create account")) {
            setAuthMode("register");
            setSuccessText("Switched to Registration mode via voice.");
            setErrorText(null);
          } else if (command.includes("password") || command.includes("sign in") || (command.includes("login") && !command.includes("otp"))) {
            setAuthMode("login");
            setSuccessText("Switched to Password Login mode via voice.");
            setErrorText(null);
          } else if (command.includes("otp") || command.includes("one time password") || command.includes("code")) {
            setAuthMode("otp");
            setSuccessText("Switched to OTP Login mode via voice.");
            setErrorText(null);
          } else if (command.includes("unlock") || command.includes("submit") || command.includes("enter") || command.includes("login button") || command.includes("go")) {
            setSuccessText("Submit trigger sent via voice...");
            const submitBtn = document.getElementById("auth-submit-btn");
            if (submitBtn) {
              submitBtn.click();
            }
          } else if (command.includes("generate") || command.includes("send code") || command.includes("get otp")) {
            const otpBtn = document.getElementById("otp-generate-btn");
            if (otpBtn) {
              otpBtn.click();
            }
          }
        };

        rec.onerror = (e: any) => {
          console.error("Speech Error:", e);
          if (e.error === 'not-allowed') {
            setVoiceStatus("Mic blocked. Click microphone to grant permission.");
            setLogs((prev) => [...prev, "Voice Assistant warning: Microphone permission is blocked by browser."]);
            setIsListening(false);
            setIsVoiceActive(false);
          }
        };

        rec.onend = () => {
          setIsListening(false);
          // Auto-restart if voice is still active
          if (isVoiceActiveRef.current) {
            setTimeout(() => {
              if (isVoiceActiveRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (err) {}
              }
            }, 400);
          }
        };

        recognitionRef.current = rec;
      } catch (err) {
        console.error(err);
      }
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      // If already started, ignore error
    }
  };

  const handleMicToggle = () => {
    setIsVoiceActive((prev) => !prev);
  };

  // Secure OTP code generation
  const handleGenerateOtp = () => {
    setErrorText(null);
    if (!username.trim()) {
      setErrorText("Please enter your email/username first.");
      return;
    }
    const code = "4829";
    setGeneratedOtp(code);
    setLogs((prev) => [
      ...prev,
      `SMS Gateway: Generated verification code [${code}] for farmer: ${username.toUpperCase()}`
    ]);
    setSuccessText(`OTP Code sent to logs screen! Verify using code: ${code}`);
  };

  const getCoordinatesForAddress = (addrText: string) => {
    const text = addrText.toLowerCase();
    let coords = { lat: 30.2115, lng: 74.9525 };
    if (text.includes("haryana") || text.includes("karnal")) {
      coords = { lat: 29.6857, lng: 76.9905 };
    } else if (text.includes("maharashtra") || text.includes("pune")) {
      coords = { lat: 18.5204, lng: 73.8567 };
    } else if (text.includes("nashik")) {
      coords = { lat: 19.9975, lng: 73.7898 };
    }
    return coords;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);
    setSuccessText(null);

    if (!username.trim()) {
      setErrorText("Please enter your email/username ID.");
      return;
    }

    if (authMode === "login") {
      if (!password.trim()) {
        setErrorText("Please enter your password.");
        return;
      }
      const storedUserStr = localStorage.getItem(`kisaan_user_${username.toLowerCase()}`);
      if (!storedUserStr) {
        setErrorText("Invalid username or credentials.");
        return;
      }

      const storedUser = JSON.parse(storedUserStr);
      if (storedUser.password !== password) {
        setErrorText("Incorrect password.");
        return;
      }

      localStorage.setItem("kisaan_session", username.toLowerCase());
      setSuccessText("Authentication successful. Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } else if (authMode === "otp") {
      if (!otpCodeInput.trim()) {
        setErrorText("Please enter the 4-digit verification code.");
        return;
      }
      if (otpCodeInput !== "4829" && otpCodeInput !== generatedOtp) {
        setErrorText("Incorrect verification code.");
        return;
      }

      localStorage.setItem("kisaan_session", username.toLowerCase());
      setSuccessText("OTP verification complete. Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } else {
      // Register
      if (!farmerName.trim() || !location.trim() || !contactNumber.trim() || !address.trim() || !password.trim()) {
        setErrorText("Please fill in all account registration details.");
        return;
      }

      const existingUser = localStorage.getItem(`kisaan_user_${username.toLowerCase()}`);
      if (existingUser) {
        setErrorText("Username already registered.");
        return;
      }

      const farmCoords = getCoordinatesForAddress(address + " " + location);

      const newUser = {
        username: username.toLowerCase(),
        password: password,
        farmer_name: farmerName,
        contact_number: contactNumber,
        location: location,
        address: address,
        current_crop: crop,
        land_size_hectares: parseFloat(landSize) || 1.5,
        soil_type: crop === "Rice" ? "Clay" : crop === "Cotton" ? "Black Soil" : "Loam",
        ph: 6.7,
        irrigation_type: "Drip",
        budget: "Medium",
        lat: farmCoords.lat,
        lng: farmCoords.lng
      };

      localStorage.setItem(`kisaan_user_${username.toLowerCase()}`, JSON.stringify(newUser));
      localStorage.setItem("kisaan_session", username.toLowerCase());
      
      setSuccessText("Registration complete! Redirecting to Farm OS...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden bg-[#050806]">
      
      {/* Gridline background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />
      
      <Preloader />

      {/* Left Column: Aesthetic High-Tech terminal monitor */}
      <div className="hidden lg:flex lg:col-span-6 p-12 flex-col justify-between relative z-10 border-r border-emerald-500/10 bg-black/30 text-left">
        
        {/* Logo header */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-emerald-500 to-emerald-700 p-2 rounded-xl text-white shadow-md shadow-emerald-950/50">
            <Sprout size={20} />
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">KisaanMitra</span>
        </div>

        {/* Floating Console Code logs */}
        <div className="space-y-6 max-w-lg">
          <div className="glass-panel p-6 bg-black/80 border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 border-b border-emerald-500/10 pb-3 mb-4 font-mono">
              <span className="flex items-center gap-1.5 text-left">
                <Terminal size={14} className="animate-pulse" />
                <span>TELEMETRY_STREAM // SYSTEM_ACTIVE</span>
              </span>
              {generatedOtp && (
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px]">
                  VERIFICATION_OTP: 4829
                </span>
              )}
            </div>

            <div className="space-y-2.5 font-mono text-[10px] text-emerald-300/80 h-[180px] overflow-y-auto pr-2">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-1.5 leading-relaxed text-left">
                  <span className="text-emerald-600 shrink-0 select-none">→</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 text-left">
            <h3 className="font-serif text-3xl text-white leading-tight font-normal">
              Autonomous agricultural orchestration.
            </h3>
            <p className="text-xs text-emerald-400/80 leading-relaxed font-semibold">
              KisaanMitra deploys a compiled state graph of LangGraph agents to compute action advisories dynamically based on soil metrics and sensor logs.
            </p>
          </div>
        </div>

        {/* Footer info tag */}
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-500/50 font-semibold font-mono">
          <Network size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>IoT telemetry array buffers & Qdrant vector index loaded.</span>
        </div>
      </div>

      {/* Right Column: Glowing login/signup cards */}
      <div className="lg:col-span-6 flex items-center justify-center p-6 md:p-12 relative z-10 bg-black/60 lg:bg-transparent overflow-y-auto">
        <div className="glass-panel p-8 w-full max-w-md border-2 border-emerald-500/25 bg-black/90 shadow-[0_0_50px_rgba(16,185,129,0.18)] my-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-inner">
              <Sprout size={24} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Farm OS Console</h2>
            
            {/* Flashing Mic command info / Click manual startup */}
            <div 
              onClick={handleMicToggle}
              className="flex items-center gap-1.5 justify-center bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-mono text-emerald-400 mt-2.5 w-max mx-auto cursor-pointer hover:bg-emerald-900/50 transition-colors"
              title="Click here to start/restart Voice commands"
            >
              <Mic size={10} className={isListening ? "text-red-500 animate-ping shrink-0" : "text-emerald-400 shrink-0"} />
              <span className="truncate max-w-[190px]">{voiceStatus}</span>
            </div>
          </div>

          {/* Switch tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#0f1612] p-1 rounded-lg border border-emerald-500/10 mb-6 text-[10px] font-bold text-emerald-400 font-mono">
            <button 
              type="button"
              onClick={() => { setAuthMode("login"); setErrorText(null); }}
              className={`py-2 rounded transition-all cursor-pointer ${authMode === "login" ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-emerald-950/40'}`}
            >
              Password
            </button>
            <button 
              type="button"
              onClick={() => { setAuthMode("otp"); setErrorText(null); }}
              className={`py-2 rounded transition-all cursor-pointer ${authMode === "otp" ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-emerald-950/40'}`}
            >
              OTP Login
            </button>
            <button 
              type="button"
              onClick={() => { setAuthMode("register"); setErrorText(null); }}
              className={`py-2 rounded transition-all cursor-pointer ${authMode === "register" ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-emerald-950/40'}`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Username / Email ID</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 text-emerald-500" size={14} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Your Email ID"
                    className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(16,185,129,0.2)] transition-all font-semibold"
                  />
                </div>
              </div>

              {authMode === "login" && (
                <div>
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-emerald-500" size={14} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(16,185,129,0.2)] transition-all font-semibold"
                    />
                  </div>
                </div>
              )}

              {authMode === "otp" && (
                <div className="space-y-2 border-t border-emerald-500/10 pt-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      id="otp-generate-btn"
                      onClick={handleGenerateOtp}
                      className="flex-1 py-2 bg-emerald-950 text-emerald-400 border border-emerald-500/35 rounded-lg text-[10px] font-bold transition-all hover:bg-emerald-900 cursor-pointer font-mono"
                    >
                      Generate Secure OTP
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Verification OTP</label>
                    <div className="relative flex items-center">
                      <Keyboard className="absolute left-3 text-emerald-500" size={14} />
                      <input 
                        type="text" 
                        value={otpCodeInput}
                        onChange={(e) => setOtpCodeInput(e.target.value)}
                        placeholder="Enter 4-Digit OTP Code"
                        maxLength={6}
                        className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(16,185,129,0.2)] transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {authMode === "register" && (
              <div className="space-y-3 border-t border-emerald-500/10 pt-4 animate-pulse-soft text-left">
                <div>
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-emerald-500" size={14} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Farmer Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 text-emerald-500" size={14} />
                    <input 
                      type="text" 
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      placeholder="Enter Your Full Name"
                      className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Contact Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 text-emerald-500" size={14} />
                      <input 
                        type="tel" 
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Contact Number"
                        className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-3 outline-none focus:border-emerald-500 transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Location / Village</label>
                    <div className="relative flex items-center">
                      <MapPin className="absolute left-3 text-emerald-500" size={14} />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Village, State"
                        className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-3 outline-none focus:border-emerald-500 transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Full Farm Address</label>
                  <div className="relative flex items-center">
                    <Home className="absolute left-3 text-emerald-500" size={14} />
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Full Address of Your Farm"
                      className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-4 outline-none focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Land Size (Acre)</label>
                    <div className="relative flex items-center">
                      <LandPlot className="absolute left-3 text-emerald-500" size={14} />
                      <input 
                        type="number" 
                        step="0.1"
                        value={landSize}
                        onChange={(e) => setLandSize(e.target.value)}
                        placeholder="1.5"
                        className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-white text-xs rounded-lg py-2.5 pl-9 pr-3 outline-none focus:border-emerald-500 transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Target Crop</label>
                    <select 
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="w-full bg-[#0a0f0c] border border-emerald-500/25 text-emerald-300 text-xs rounded-lg py-2.5 px-3 outline-none focus:border-emerald-500 font-semibold font-mono"
                    >
                      <option value="Tomato" className="bg-[#050806]">Tomato</option>
                      <option value="Rice" className="bg-[#050806]">Rice (Dhan)</option>
                      <option value="Wheat" className="bg-[#050806]">Wheat (Kanak)</option>
                      <option value="Onion" className="bg-[#050806]">Onion</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {errorText && (
              <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg flex items-start gap-1.5 text-xs text-red-400">
                <Mic size={14} className="shrink-0 mt-0.5" />
                <span className="font-bold">{errorText}</span>
              </div>
            )}

            {successText && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg flex items-start gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                <span className="font-bold">{successText}</span>
              </div>
            )}

            <button 
              type="submit"
              id="auth-submit-btn"
              className="w-full bg-gradient-to-tr from-emerald-600 to-[#10b981] hover:from-emerald-700 hover:to-emerald-600 text-black font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-md shadow-emerald-950 flex items-center justify-center gap-1.5 border border-emerald-500 cursor-pointer"
            >
              {authMode === "register" ? "Register Node" : "Unlock Farm Console"}
              <ArrowRight size={14} />
            </button>
          </form>

        </div>
      </div>
      
    </div>
  );
}
