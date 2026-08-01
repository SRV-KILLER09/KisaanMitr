'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Globe, Sparkles, RefreshCw } from 'lucide-react';

interface VoiceAssistantProps {
  onAgentTriggered: (data: any) => void;
  activeLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export default function VoiceAssistant({ onAgentTriggered, activeLanguage, onLanguageChange }: VoiceAssistantProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Tap microphone to speak");
  const [transcription, setTranscription] = useState<string>("");
  const [activePlan, setActivePlan] = useState<string[]>([]);
  const [currentExecutingIndex, setCurrentExecutingIndex] = useState<number>(-1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी (Hindi)" },
    { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ml", label: "മലയാളം (Malayalam)" },
    { code: "or", label: "ଓଡ଼ିଆ (Odia)" }
  ];

  const localizations: any = {
    en: {
      placeholder: "Tap mic or type a farming query...",
      listening: "Listening...",
      processing: "Orchestrating agents...",
      transcriptionLabel: "Transcription",
      activeAgent: "Executing Agent",
      playResponse: "Listen to Advice",
      defaultSpeak: "To treat early blight spots: spray neem oil, prune lower leaves, and suspend watering."
    },
    hi: {
      placeholder: "माइक दबाएं या खेती से जुड़ा सवाल लिखें...",
      listening: "सुन रहा हूँ...",
      processing: "एजेंटों का संयोजन...",
      transcriptionLabel: "अनुवादित पाठ",
      activeAgent: "सक्रिय एजेंट",
      playResponse: "सलाह सुनें",
      defaultSpeak: "अगेती झुलसा का उपचार: नीम का तेल छिड़कें, निचले पत्तों को काटें और सिंचाई रोकें।"
    },
    pa: {
      placeholder: "ਮਾਈਕ ਦਬਾਓ ਜਾਂ ਖੇਤੀ ਬਾਰੇ ਸਵਾਲ ਲਿਖੋ...",
      listening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
      processing: "ਏਜੰਟਾਂ ਦੀ ਯੋਜਨਾਬੰਦੀ...",
      transcriptionLabel: "ਲਿਖਤ ਰੂਪ",
      activeAgent: "ਸਰਗਰਮ ਏਜੰਟ",
      playResponse: "ਸਲਾਹ ਸੁਣੋ",
      defaultSpeak: "ਪੱਤਿਆਂ ਦੇ ਧੱਬਿਆਂ ਦਾ ਇਲਾਜ: ਨਿੰਮ ਦਾ ਤੇਲ ਛਿੜਕੋ, ਹੇਠਲੇ ਪੱਤੇ ਕੱਟੋ ਅਤੇ ਪਾਣੀ ਦੇਣਾ ਬੰਦ ਕਰੋ।"
    },
    mr: {
      placeholder: "माइक दाबा किंवा शेतीचा प्रश्न लिहा...",
      listening: "ऐकत आहे...",
      processing: "एजंट्सचे नियोजन सुरू आहे...",
      transcriptionLabel: "भाषांतरित मजकूर",
      activeAgent: "सक्रिय एजंट",
      playResponse: "सल्ला ऐका",
      defaultSpeak: "अगेती करपा उपचार: कडुनिंब तेल फवारा, खालची पाने कापून टाका आणि पाणी देणे थांबवा."
    },
    te: {
      placeholder: "మైక్ నొక్కండి లేదా వ్యవసాయ ప్రశ్న టైప్ చేయండి...",
      listening: "వింటున్నది...",
      processing: "ఏజెంట్ సమన్వయం...",
      transcriptionLabel: "ట్రాన్స్క్రిప్షన్",
      activeAgent: "సక్రియ ఏజెంట్",
      playResponse: "సలహా వినండి",
      defaultSpeak: "ఆకు మచ్చల నివారణ: వేప నూనె పిచికారీ చేయండి, క్రింది ఆకులను కత్తిరించండి మరియు నీటి తడులు నిలిపివేయండి."
    },
    ta: {
      placeholder: "மைக்கை அழுத்தவும் அல்லது விவசாய கேள்வியை தட்டச்சு செய்யவும்...",
      listening: "கேட்கிறது...",
      processing: "முகவர்கள் ஒருங்கிணைப்பு...",
      transcriptionLabel: "உரை வடிவம்",
      activeAgent: "செயலில் உள்ள முகவர்",
      playResponse: "அறிவுரை கேளுங்கள்",
      defaultSpeak: "இலைப்புள்ளி நோய் சிகிச்சை: வேப்ப எண்ணெய் தெளிக்கவும், கீழ் இலைகளை கத்தரிக்கவும் மற்றும் நீர் பாய்ச்சுவதை நிறுத்தவும்."
    },
    kn: {
      placeholder: "ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ...",
      listening: "ಕೇಳುತ್ತಿದೆ...",
      processing: "ಏಜೆಂಟ್ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ...",
      transcriptionLabel: "ಲಿಖಿತ ರೂಪ",
      activeAgent: "ಕಾರ್ಯನಿರ್ವಾಹಕ ಏಜೆಂಟ್",
      playResponse: "ಸಲಹೆ ಆಲಿಸಿ",
      defaultSpeak: "ಎಲೆ ಚುಕ್ಕೆ ರೋಗದ ಚಿಕಿತ್ಸೆ: ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ, ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ನೀರುಣಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ."
    },
    gu: {
      placeholder: "માઇક દબાવો અથવા ખેતીનો પ્રશ્ન લખો...",
      listening: "સાંભળી રહ્યું છે...",
      processing: "એજન્ટ આયોજન...",
      transcriptionLabel: "લખાણ",
      activeAgent: "સક્રિય એજન્ટ",
      playResponse: "સલાહ સાંભળો",
      defaultSpeak: "પાનના ટપકા નો ઉપચાર: લીમડાના તેલનો છંટકાવ કરો, નીચેના પાન કાપો અને પિયત રોકો."
    },
    bn: {
      placeholder: "মাইক চাপুন বা চাষাবাদ সংক্রান্ত প্রশ্ন লিখুন...",
      listening: "শুনছে...",
      processing: "এজেন্টদের সমন্বয় করা হচ্ছে...",
      transcriptionLabel: "অনুলিখন",
      activeAgent: "সक्रिय এজেন্ট",
      playResponse: "পরামর্শ শুনুন",
      defaultSpeak: "পাতার দাগের চিকিৎসা: নিম তেল স্প্রে করুন, নিচের পাতা ছাঁটাই করুন এবং জল দেওয়া বন্ধ রাখুন।"
    },
    ml: {
      placeholder: "മൈക്ക് അമർത്തുക അല്ലെങ്കിൽ കാർഷിക ചോദ്യം എഴുതുക...",
      listening: "ശ്രദ്ധിക്കുന്നു...",
      processing: "ഏജൻ്റുകളുടെ ഏകോപനം...",
      transcriptionLabel: "ട്രാൻസ്ക്രിപ്ഷൻ",
      activeAgent: "സജീവ ഏജന്റ്",
      playResponse: "ഉപദേശം കേൾക്കുക",
      defaultSpeak: "ഇലപ്പുള്ളി രോഗ നിയന്ത്രണം: വേപ്പെണ്ണ തളിക്കുക, താഴത്തെ ഇലകൾ മുറിച്ചു മാറ്റുക, നനയ്ക്കുന്നത് നിർത്തുക."
    },
    or: {
      placeholder: "මାଇକ୍ ଦବାନ୍ତୁ କିମ୍ବା କୃଷି ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...",
      listening: "ଶୁଣୁଅଛି...",
      processing: "ଏଜେଣ୍ଟ ସମନ୍ୱୟ...",
      transcriptionLabel: "ଅନುଲିଖନ",
      activeAgent: "ସକ୍ରିୟ ଏଜେଣ୍ଟ",
      playResponse: "ପରାମର୍ଶ ଶୁଣନ୍ତୁ",
      defaultSpeak: "ପତ୍ର ଦାଗ ର ଚିକିତ୍ସା: ନିମ ତେଲ ସ୍ପ୍ରେ କରନ୍ତୁ, ତଳ ପତ୍ର କାଟି ଦିଅନ୍ତୁ ଏବଂ ଜଳସେଚନ ବନ୍ଦ ରଖନ୍ତୁ।"
    }
  };

  const t = localizations[activeLanguage] || localizations["en"];

  useEffect(() => {
    setStatusText(isRecording ? t.listening : "Tap microphone to speak");
  }, [activeLanguage, isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        stream.getTracks().forEach(track => track.stop());
        setStatusText(t.processing);
        
        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.wav");
          formData.append("language", activeLanguage);

          const res = await fetch("http://localhost:8000/api/voice/process", {
            method: "POST",
            body: formData
          });

          if (!res.ok) throw new Error("Offline");
          
          const data = await res.json();
          setTranscription(data.transcription);
          animateAgentPipeline(data.agents_routed || data.execution_plan || [], data);
          
        } catch (err) {
          simulateSandboxVoice();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatusText(t.listening);
      setTranscription("");
      setActivePlan([]);
      setCurrentExecutingIndex(-1);
      setAudioUrl(null);
    } catch (err) {
      console.error("Microphone access failed", err);
      simulateSandboxVoice();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const animateAgentPipeline = (plan: string[], finalData: any) => {
    if (!plan || plan.length === 0) {
      plan = ["planner", "memory", "vision", "weather", "agriculture", "government", "explanation"];
    }
    setActivePlan(plan);
    let idx = 0;
    
    const interval = setInterval(() => {
      if (idx < plan.length) {
        setCurrentExecutingIndex(idx);
        idx++;
      } else {
        clearInterval(interval);
        onAgentTriggered(finalData);
        setStatusText("Complete plan generated.");
        if (finalData.speech_url) {
          setAudioUrl(`http://localhost:8000${finalData.speech_url}`);
        }
      }
    }, 1000);
  };

  const simulateSandboxVoice = () => {
    const fallbackTranscripts: any = {
      en: "My tomato leaves have yellow spots.",
      hi: "मेरे टमाटर के पत्तों पर पीले धब्बे हैं।",
      pa: "ਮੇਰੇ ਟਮਾਟਰ ਦੇ ਪੱਤਿਆਂ 'ਤੇ ਪੀਲੇ ਧੱਬੇ ਹਨ।",
      mr: "माझ्या टोमॅটোच्या पानांवर पिवळे डाग पडले आहेत.",
      ta: "என் தக்காளி இலைகளில் மஞ்சள் புள்ளிகள் உள்ளன.",
      te: "నా టమోటా ఆకులపై పసుపు మచ్చలు ఉన్నాయి.",
      kn: "ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ਚುಕ್ಕೆಗಳಿವೆ.",
      gu: "મારા ટામેટાના પાંદડા પર પીળા ડાઘ છે.",
      bn: "আমার টমেটো পাতায় হলুদ দাগ রয়েছে।",
      ml: "എന്റെ തക്കാളി ഇലകളിൽ മഞ്ഞ പാടുകൾ ഉണ്ട്.",
      or: "ମୋର ଟମାଟୋ ପତ୍ରରେ ହଳଦିଆ ଦାଗ ଅଛି ।"
    };

    const queryText = fallbackTranscripts[activeLanguage] || fallbackTranscripts["en"];
    setTranscription(queryText);

    const simulatedPlan = ["planner", "memory", "vision", "weather", "agriculture", "government", "explanation"];
    
    let idx = 0;
    setActivePlan(simulatedPlan);
    
    const interval = setInterval(() => {
      if (idx < simulatedPlan.length) {
        setCurrentExecutingIndex(idx);
        idx++;
      } else {
        clearInterval(interval);
        
        const fallbackResponse = {
          execution_plan: simulatedPlan,
          vision_results: {
            target: "Tomato Leaf",
            disease: "Early Blight (Fungal)",
            confidence: 0.91,
            bbox: [15, 20, 50, 45]
          },
          weather_info: {
            temperature: 28,
            humidity: 85,
            rain_probability: 90,
            warning: "None",
            advisory: "Rain predicted. Suspend irrigation."
          },
          soil_data: {
            soil_type: "Loam",
            ph: 6.8,
            moisture: 45,
            nitrogen: 180,
            phosphorus: 42,
            potassium: 220,
            advisory: "Apply 50 kg Urea (Nitrogen) and 30 kg Potash in split doses."
          },
          market_rates: {
            mandi: "Azadpur Mandi, Delhi",
            price: 3200,
            msp: 0,
            trend: "down",
            best_time: "Sell Immediately"
          },
          schemes: [{
            name: "PM Fasal Bima Yojana (Crop Insurance)",
            benefits: "Insurance cover against crop failure due to diseases.",
            documents: ["Land records", "Sowing certificate"],
            steps: ["Apply at nearest Bank", "Pay 2% premium"]
          }],
          medical_advice: null,
          disaster_alerts: null,
          tutorials: [{
            title: "How to treat yellow spots on Tomato leaves",
            summary: "Early Blight (fungal). Keep soil moisture uniform, apply Neem oil.",
            duration: "5 mins",
            quiz_id: "quiz_tomato"
          }],
          explanation: `**KisaanMitra Smart Action Plan**\n\n- **[Vision Analysis]**: Detected Early Blight on Tomato Leaf (Confidence: 91%).\n- **[Weather]**: Suspension of watering recommended. Rain probability is 90%.\n- **[Soil]**: Nitrogen reserves are optimal. Apply organic compost.\n- **[Market]**: Mandi prices are ₹3,200. Sell immediately due to downward trend.\n- **[Government Schemes]**: Eligible for PM Fasal Bima Yojana crop protection cover.`
        };
        
        onAgentTriggered(fallbackResponse);
        setStatusText("Sandbox simulation complete.");
      }
    }, 1000);
  };

  const [typedQuery, setTypedQuery] = useState<string>("");
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedQuery.trim()) return;

    setStatusText(t.processing);
    setTranscription(typedQuery);
    setTypedQuery("");
    setActivePlan([]);
    setCurrentExecutingIndex(-1);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: typedQuery,
          language: activeLanguage,
          profile: { current_crop: "Tomato" }
        })
      });

      if (!res.ok) throw new Error("Offline fallback");
      const data = await res.json();
      animateAgentPipeline(data.execution_plan || data.agents_routed || [], data);
    } catch (err) {
      simulateSandboxVoice();
    }
  };

  const handlePlayVoice = () => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(t.defaultSpeak);
      utterance.lang = activeLanguage === "hi" ? "hi-IN" : activeLanguage === "pa" ? "pa-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass-panel p-4 flex flex-col justify-between h-full bg-gradient-to-tr from-cyan-950/15 via-black/40 to-transparent border border-white/10 shadow-md min-h-0">
      
      {/* Top bar */}
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400 animate-pulse" size={16} />
          <h3 className="font-bold text-white text-xs">AI Voice Assistant</h3>
        </div>
        
        {/* Language selector */}
        <div className="flex items-center gap-1.5 bg-[#0a0f0c] px-2 py-0.5 rounded-full border border-white/5 font-mono">
          <Globe size={11} className="text-cyan-400" />
          <select 
            value={activeLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="text-[10px] font-bold text-cyan-300 bg-transparent outline-none border-none cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-[#050806] text-white">{lang.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main console */}
      <div className="flex-1 flex flex-col items-center justify-center py-2 relative min-h-0">
        <div className="relative mb-3">
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-cyan-500/25 animate-ping" />
          )}
          <button 
            onClick={handleToggleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] border-2 cursor-pointer ${
              isRecording 
                ? 'bg-red-900 border-red-500 hover:bg-red-800 text-white animate-pulse' 
                : 'bg-cyan-950 border-cyan-500 hover:bg-cyan-900 text-cyan-400 shadow-cyan-950/40'
            }`}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
        </div>

        {isRecording && (
          <div className="flex items-end justify-center gap-1 h-3 mb-2 select-none shrink-0">
            <span className="w-0.5 bg-cyan-400 rounded-full h-1.5 animate-[pulse_0.8s_infinite]" />
            <span className="w-0.5 bg-cyan-400 rounded-full h-3 animate-[pulse_0.8s_infinite_0.2s]" />
            <span className="w-0.5 bg-cyan-400 rounded-full h-1 animate-[pulse_0.8s_infinite_0.4s]" />
          </div>
        )}

        <div className="text-center w-full min-h-0">
          <p className="text-[10px] font-bold text-cyan-300 mb-1.5 font-mono">{statusText}</p>
          {transcription && (
            <div className="bg-[#0a0f0c] p-2 rounded border border-white/5 max-w-sm mx-auto shadow-sm font-mono overflow-y-auto max-h-[50px] scrollbar-none">
              <span className="text-[7.5px] font-bold text-cyan-400 block mb-0.5 uppercase tracking-wider">transcription</span>
              <p className="text-[10px] text-white italic font-sans truncate">"{transcription}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Agent path */}
      {activePlan.length > 0 && (
        <div className="my-2 p-2 bg-black/60 rounded border border-white/5 font-mono text-left shrink-0">
          <div className="text-[8px] font-bold text-cyan-455 mb-1 uppercase tracking-wide flex items-center gap-1">
            <RefreshCw size={9} className="animate-spin" />
            agent_execution_mesh
          </div>
          
          <div className="flex flex-wrap items-center gap-1">
            {activePlan.map((agent, i) => {
              const isExecuting = i === currentExecutingIndex;
              const isCompleted = i < currentExecutingIndex;
              
              return (
                <React.Fragment key={agent}>
                  <div className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded transition-all duration-300 ${
                    isExecuting 
                      ? 'bg-cyan-600 text-white scale-105 shadow-md shadow-cyan-800 animate-pulse'
                      : isCompleted 
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/20 flex items-center gap-0.5' 
                        : 'bg-zinc-900 text-zinc-650 border border-zinc-800'
                  }`}>
                    {agent.toUpperCase()}
                  </div>
                  {i < activePlan.length - 1 && (
                    <span className="text-cyan-950 text-[8px]">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Voice controls */}
      <div className="mt-2 flex flex-col gap-1.5 shrink-0">
        {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
        {transcription && (
          <button 
            onClick={handlePlayVoice}
            className="w-full flex items-center justify-center gap-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 font-bold py-1.5 rounded text-[10px] transition-colors border border-white/5 font-mono cursor-pointer"
          >
            <Volume2 size={12} />
            {t.playResponse}
          </button>
        )}

        <form onSubmit={handleTextSubmit} className="flex items-center gap-1.5 bg-[#040605] rounded border border-white/10 p-1">
          <input 
            type="text" 
            value={typedQuery}
            onChange={(e) => setTypedQuery(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 text-[10.5px] text-white bg-transparent outline-none px-1.5 py-0.5 placeholder-cyan-950 font-semibold"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded px-2.5 py-0.5 text-[10px] font-bold transition-all font-mono cursor-pointer">
            Send
          </button>
        </form>
      </div>

    </div>
  );
}
