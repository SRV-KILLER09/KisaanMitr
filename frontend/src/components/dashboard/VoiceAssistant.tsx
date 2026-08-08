'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Globe, Sparkles, RefreshCw, Key, ShieldCheck } from 'lucide-react';

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

  const [geminiKey, setGeminiKey] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

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
      placeholder: "Tap mic or type farming query...",
      listening: "Listening...",
      processing: "Orchestrating agents...",
      transcriptionLabel: "Transcription",
      activeAgent: "Executing Agent",
      playResponse: "Listen to Advice",
      defaultSpeak: "To treat early blight spots: spray neem oil, prune lower leaves, and suspend watering."
    },
    hi: {
      placeholder: "माइक दबाएं या सवाल लिखें...",
      listening: "सुन रहा हूँ...",
      processing: "एजेंटों का संयोजन...",
      transcriptionLabel: "अनुवादित पाठ",
      activeAgent: "सक्रिय एजेंट",
      playResponse: "सलाह सुनें",
      defaultSpeak: "अगेती झुलसा का उपचार: नीम का तेल छिड़कें, निचले पत्तों को काटें और सिंचाई रोकें।"
    },
    pa: {
      placeholder: "ਮਾਈਕ ਦਬਾਓ ਜਾਂ ਸਵਾਲ ਲਿਖੋ...",
      listening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
      processing: "ਏਜੰਟਾਂ ਦੀ ਯੋਜਨਾਬੰਦੀ...",
      transcriptionLabel: "ਲਿਖਤ ਰੂਪ",
      activeAgent: "ਸਰਗਰਮ ਏਜੰਟ",
      playResponse: "ਸਲਾਹ ਸੁਣੋ",
      defaultSpeak: "ਪੱਤਿਆਂ ਦੇ ਧੱਬਿਆਂ ਦਾ ਇਲਾਜ: ਨਿੰਮ ਦਾ ਤੇਲ ਛਿੜਕੋ, ਹੇਠਲੇ ਪੱਤੇ ਕੱਟੋ ਅਤੇ ਪਾਣੀ ਦੇਣਾ ਬੰਦ ਕਰੋ।"
    },
    mr: {
      placeholder: "माइक दाबा किंवा प्रश्न लिहा...",
      listening: "ऐकत आहे...",
      processing: "एजंट्सचे नियोजन सुरू आहे...",
      transcriptionLabel: "भाषांतरित मजकूर",
      activeAgent: "सक्रिय एजंट",
      playResponse: "सल्ला ऐका",
      defaultSpeak: "अगेती करपा उपचार: कडुनिंब तेल फवारा, खालची पाने कापून टाका आणि पाणी देणे थांबवा."
    },
    te: {
      placeholder: "మైక్ నొక్కండి లేదా ప్రశ్న రాయండి...",
      listening: "వింటున్నది...",
      processing: "ఏజెంట్ సమన్వయం...",
      transcriptionLabel: "ట్రాన్స్క్రిప్షన్",
      activeAgent: "సక్రియ ఏజెంట్",
      playResponse: "సలహా వినండి",
      defaultSpeak: "ఆకు మచ్చల నివారణ: వేప నూనె పిచికారీ చేయండి, క్రింది ఆకులను కత్తిరించండి మరియు నీటి తడులు నిలిపివేయండి."
    },
    ta: {
      placeholder: "மைக்கை அழுத்தவும் அல்லது எழுதவும்...",
      listening: "கேட்கிறது...",
      processing: "முகவர்கள் ஒருங்கிணைப்பு...",
      transcriptionLabel: "உரை வடிவம்",
      activeAgent: "செயலில் உள்ள முகவர்",
      playResponse: "அறிவுரை கேளுங்கள்",
      defaultSpeak: "இலைப்புள்ளி நோய் சிகிச்சை: வேப்ப எண்ணெய் தெளிக்கவும், கீழ் இலைகளை கத்தரிக்கவும் மற்றும் நீர் பாய்ச்சுவதை நிறுத்தவும்."
    },
    kn: {
      placeholder: "ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ...",
      listening: "ಕೇಳುತ್ತಿದೆ...",
      processing: "ಏಜೆಂಟ್ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ...",
      transcriptionLabel: "ಲಿಖಿತ ರೂಪ",
      activeAgent: "ಕಾರ್ಯನಿರ್ವಾহक ಏಜೆಂಟ್",
      playResponse: "ಸಲಹೆ ಆಲಿಸಿ",
      defaultSpeak: "ಎಲೆ ಚುक्के ರೋಗದ ಚಿಕಿತ್ಸೆ: ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ, ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ನೀರುಣಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ."
    },
    gu: {
      placeholder: "માઇક દબાવો અથવા પ્રશ્ન લખો...",
      listening: "સાંભળી રહ્યું છે...",
      processing: "એજન્ટ આયોજન...",
      transcriptionLabel: "લખાણ",
      activeAgent: "સક્રિય એજન્ટ",
      playResponse: "સલાહ સાંભળો",
      defaultSpeak: "પાનના ટપકા નો ઉપચાર: લીમડાના તેલનો છંટકાવ કરો, નીચેના પાન કાપો અને પિયત રોકો."
    },
    bn: {
      placeholder: "মাইক চাপুন বা প্রশ্ন লিখুন...",
      listening: "শুনছে...",
      processing: "এজেন্টদের সমন্বয় করা হচ্ছে...",
      transcriptionLabel: "অনুলিখন",
      activeAgent: "সক্রিয় এজেন্ট",
      playResponse: "পরামর্শ শুনুন",
      defaultSpeak: "পাতার দাগের চিকিৎসা: নিম তেল স্প্রে করুন, নিচের পাতা ছাঁটাই করুন এবং জল দেওয়া বন্ধ রাখুন।"
    },
    ml: {
      placeholder: "മൈക്ക് അമർത്തു ക അല്ലെങ്കിൽ എഴുതുക...",
      listening: "ശ്രദ്ധിക്കുന്നു...",
      processing: "ഏജൻ്റുകളുടെ ഏകോപനം...",
      transcriptionLabel: "ട്രാൻസ്ക്രിപ്ഷൻ",
      activeAgent: "സജീവ ഏജന്റ്",
      playResponse: "ഉപദേശം കേൾക്കുക",
      defaultSpeak: "ഇലപ്പുള്ളി രോഗ നിയന്ത്രണം: വേപ്പെണ്ണ തളിക്കുക, താഴത്തെ іലകൾ മുറിച്ചു മാറ്റുക, നനയ്ക്കുന്നത് നിർത്തുക."
    },
    or: {
      placeholder: "මාලික් ଦବାନ୍ତୁ କିମ୍ବା ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...",
      listening: "ଶୁଣୁଅଛି...",
      processing: "ଏଜେଣ୍ଟ ସମନ୍ୱୟ...",
      transcriptionLabel: "ଅନୁଲିଖନ",
      activeAgent: "ସକ୍ରିୟ ଏଜେଣ୍ଟ",
      playResponse: "ପରାମର୍ଶ ଶୁଣନ୍ତୁ",
      defaultSpeak: "ପତ୍ର ଦାଗ ର ଚିକିତ୍ସା: ନିମ ତେଲ ସ୍ପ୍ରେ କରନ୍ତୁ, ତଳ ପତ୍ର କାଟି ଦିଅନ୍ତୁ ଏବଂ ଜଳସେଚନ ବନ୍ଦ ରଖନ୍ତୁ।"
    }
  };

  const t = localizations[activeLanguage] || localizations["en"];

  useEffect(() => {
    const envKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (envKey) {
      setGeminiKey(envKey);
    } else {
      const savedKey = localStorage.getItem("gemini_api_key");
      if (savedKey) {
          setGeminiKey(savedKey);
      }
    }
  }, []);

  useEffect(() => {
    if (!isRecording) {
      setStatusText("Tap microphone to speak");
    }
  }, [activeLanguage, isRecording]);



  const startRecording = async () => {
    setTranscription("");
    setActivePlan([]);
    setCurrentExecutingIndex(-1);
    setAudioUrl(null);

    // Try Web Speech API recognition first for instant transcribing
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;

        const langTags: any = {
          en: 'en-US',
          hi: 'hi-IN',
          pa: 'pa-IN',
          mr: 'mr-IN',
          te: 'te-IN',
          ta: 'ta-IN',
          kn: 'kn-IN',
          gu: 'gu-IN',
          bn: 'bn-IN',
          ml: 'ml-IN',
          or: 'or-IN'
        };

        recognition.lang = langTags[activeLanguage] || 'en-US';
        setIsRecording(true);
        setStatusText(t.listening);

        recognition.onresult = (event: any) => {
          setIsRecording(false);
          const textResult = event.results[0][0].transcript;
          setTranscription(textResult);
          triggerAgentFlowWithText(textResult);
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error fallback to audio stream:", event.error);
          recognition.stop();
          recognitionRef.current = null;
          startRecordingAudioFallback();
        };

        recognition.onend = () => {
          //setIsRecording(false);
          if (recognitionRef.current === recognition) {
            setIsRecording(false);
            recognitionRef.current = null;
          }
        };

        recognition.start();
      } catch (err) {
        startRecordingAudioFallback();
      }
    } else {
      startRecordingAudioFallback();
    }
  };

  const startRecordingAudioFallback = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Let the browser pick its preferred supported mimeType
      const options = MediaRecorder.isTypeSupported('audio/webm')
        ? { mimeType: 'audio/webm' }
        : {};

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);

        // 2. Use the actual recorded mimeType from MediaRecorder
        const recordedType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: recordedType });

        stream.getTracks().forEach(track => track.stop());
        setStatusText(t.processing);

        try {
          // Get farmer profile
          const session = localStorage.getItem("kisaan_session");
          if (!session) throw new Error("No session found");

          const farmerProfile = localStorage.getItem(`kisaan_user_${session}`);
          if (!farmerProfile) throw new Error("No farmer profile found");

          // 3. Match file extension to the actual format (webm/mp4/wav)
          const fileExt = recordedType.includes('mp4') ? 'mp4' : 'webm';

          const formData = new FormData();
          formData.append("file", audioBlob, `recording.${fileExt}`);
          formData.append("language", activeLanguage);
          formData.append("farmer_profile", farmerProfile);

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
    } catch (err) {
      console.error("Microphone access failed", err);
      setIsRecording(false);
      setStatusText("Mic Blocked. Starting Sandbox...");
      simulateSandboxVoice();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecordingAudioFallback();
    }
  };

  const animateAgentPipeline = (plan: string[], finalData: any) => {
    if (!plan || plan.length === 0) {
      plan = ["planner", "memory", "vision", "weather", "agriculture", "explanation"];
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
    }, 800);
  };

  const fetchGeminiResponse = async (text: string, key: string) => {
    setStatusText("Consulting AI...");
    try {

      const prompt = `You are Kisaanमित्र, a highly advanced multi-agent farming oracle. The user is asking: "${text}".
Language: "${activeLanguage}".
Write a detailed, structured, highly professional response.

Structure it exactly like this:
First, write one or two paragraphs summarizing the advice or diagnosis.
Then, write a bulleted list of 3-5 immediate action items. Each bullet MUST start with a dash and a space like: "- **[Category]**: detailed action".

Keep the tone supportive, precise, and tech-aesthetic. Translate everything fully into the language requested.`;

      const res = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: prompt,
          language: activeLanguage,
        }),
      });


      if (!res.ok) throw new Error("CHATBOT API Error");

      const data = await res.json();
      const answer = data.answer;

      // Parse crop from user query
      const query = text.toLowerCase();
      let crop = "Tomato";
      if (query.includes("wheat") || query.includes("गेंहू") || query.includes("ਕਣਕ")) crop = "Wheat";
      else if (query.includes("rice") || query.includes("paddy") || query.includes("चावल") || query.includes("ਝੋਨਾ")) crop = "Rice";
      else if (query.includes("potato") || query.includes("आलू") || query.includes("ਆਲੂ")) crop = "Potato";
      else if (query.includes("cotton") || query.includes("कपास") || query.includes("ਰੂੰ")) crop = "Cotton";

      // Detect potential disease
      let disease = "General Crop Health Check";
      if (query.includes("spot") || query.includes("blight") || query.includes("धब्बा") || query.includes("ਰੋਗ")) {
        disease = "Fungal Spot Infection";
      } else if (query.includes("insect") || query.includes("pest") || query.includes("कीड़ा")) {
        disease = "Insect Infestation";
      }

      const agentOutputData = {
        execution_plan: ["planner", "memory", "vision", "weather", "agriculture", "explanation"],
        vision_results: {
          target: `${crop} Leaf`,
          disease: disease,
          confidence: 0.94,
          bbox: [10, 15, 45, 40]
        },
        weather_info: {
          temperature: 29,
          humidity: 78,
          rain_probability: 45,
          warning: "None",
          advisory: "Conditions are favorable. Standard field tasks can proceed."
        },
        soil_data: {
          soil_type: "Loam",
          ph: 6.6,
          moisture: 45,
          nitrogen: 165,
          phosphorus: 42,
          potassium: 220,
          advisory: "Soil parameters are balanced."
        },
        market_rates: {
          mandi: "Local Mandi",
          price: 3200,
          best_time: "Hold for stable price"
        },
        explanation: answer
      };

      animateAgentPipeline(["planner", "memory", "vision", "weather", "agriculture", "explanation"], agentOutputData);

    } catch (err) {
      console.error(err);
      setStatusText("AI failed. Running local fallback...");
      simulateAgentPipelineOffline(text);
    }
  };

  const triggerAgentFlowWithText = async (text: string) => {
    setIsRecording(false);
    setStatusText(t.processing);

    // Use live Gemini API if user has configured their API Key
    // if (geminiKey.trim()) {
    //   await fetchGeminiResponse(text, geminiKey);
    //   return;
    // }

    try {
      const session = localStorage.getItem("kisaan_session");
      if (!session) throw new Error("No session found");

      const farmerProfile = localStorage.getItem(`kisaan_user_${session}`);
      if (!farmerProfile) throw new Error("No farmer profile found");

      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          language: activeLanguage,
          profile: JSON.parse(farmerProfile)
        })
      });

      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      animateAgentPipeline(data.execution_plan || data.agents_routed || [], data);
    } catch (err) {
      simulateAgentPipelineOffline(text);
    }
  };

  const simulateAgentPipelineOffline = (text: string) => {
    const query = text.toLowerCase();
    console.log("Fuck it its not working")
    // Detect Crop
    let crop = "Tomato";
    if (query.includes("wheat") || query.includes("गेंहू") || query.includes("ਕਣਕ")) crop = "Wheat";
    else if (query.includes("rice") || query.includes("paddy") || query.includes("चावल") || query.includes("ਝੋਨਾ")) crop = "Rice";
    else if (query.includes("potato") || query.includes("आलू") || query.includes("ਆਲੂ")) crop = "Potato";
    else if (query.includes("cotton") || query.includes("कпас") || query.includes("ਰੂੰ")) crop = "Cotton";

    // Detect Problem / Disease
    let disease = "Early Blight (Fungal)";
    let remedy = "Spray Neem oil, prune lower leaves, and maintain proper crop spacing.";

    if (query.includes("insect") || query.includes("pest") || query.includes("कीड़ा") || query.includes("ਕੀੜਾ")) {
      disease = "Aphids & Whiteflies Infestation";
      remedy = "Apply organic neem oil spray or introduce natural predators like ladybugs.";
    } else if (query.includes("rot") || query.includes("सड़न") || query.includes("ਗਲਣਾ")) {
      disease = "Root Rot (Fungal/Waterlogging)";
      remedy = "Improve soil aeration drainage channels and spray copper fungicide.";
    } else if (query.includes("yellow") || query.includes("पीला") || query.includes("ਪੀਲਾ")) {
      disease = "Nitrogen Deficiency";
      remedy = "Apply dynamic doses of organic compost or nitrogen-rich bio-fertilizer.";
    }

    const fallbackResponse = {
      execution_plan: ["planner", "memory", "vision", "weather", "agriculture", "explanation"],
      vision_results: {
        target: `${crop} Leaf`,
        disease: disease,
        confidence: 0.90,
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
        soil_type: "Clay Loam",
        ph: 6.7,
        moisture: 42,
        nitrogen: 155,
        phosphorus: 40,
        potassium: 210,
        advisory: "Soil parameters are stable."
      },
      market_rates: {
        mandi: "Local Mandi",
        price: crop === "Wheat" ? 2275 : crop === "Rice" ? 2183 : 3200,
        msp: 0,
        trend: "up",
        best_time: "Sell Immediately"
      },
      schemes: [{
        name: "PM Krishi Sinchayee Yojana",
        benefits: "Insurance cover against crop failure due to diseases.",
        documents: ["Land records", "Sowing certificate"],
        steps: ["Apply at local agri-office"]
      }],
      medical_advice: null,
      disaster_alerts: null,
      tutorials: [{
        title: `How to treat ${disease} on ${crop}`,
        summary: `Keep soil moisture uniform, apply Neem oil and prune leaves.`,
        duration: "5 mins",
        quiz_id: "quiz_tomato"
      }],
      explanation: `**Kisaanमित्र AI Agent Advisory**\n\n- **[Voice Transcription]**: "${text}"\n- **[Vision Scanner]**: Detected ${disease} on ${crop} leaf (90% Confidence).\n- **[Meteorology]**: Rain expected. Postpone irrigation to avoid fungal acceleration.\n- **[Prescription]**: ${remedy}\n- **[Market]**: Average rates are ₹3,200/q. Selling trend is optimal.`
    };

    animateAgentPipeline(["planner", "memory", "vision", "weather", "agriculture", "explanation"], fallbackResponse);
  };

  const simulateSandboxVoice = () => {
    setIsRecording(false);
    const fallbackTranscripts: any = {
      en: "My tomato leaves have yellow spots.",
      hi: "मेरे टमाटर के पत्तों पर पीले धब्बे हैं।",
      pa: "ਮੇਰੇ ਟਮਾਟਰ ਦੇ ਪੱਤਿਆਂ 'ਤੇ ਪੀਲੇ ਧੱਬੇ ਹਨ।",
      mr: "माझ्या टोमॅटोच्या पानांवर पिवळे डाग पडले आहेत.",
      ta: "என் தக்காளி இலைகளில் மஞ்சள் புள்ளிகள் உள்ளன.",
      te: "నా టమోటా ఆకులపై పసుపు మచ్చలు ఉన్నాయి.",
      kn: "ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಚುಕ್ಕೆಗಳಿವೆ.",
      gu: "મારા ટામેટાના પાંદડા પર પીળા ડાઘ છે.",
      bn: "আমার টমেটো পাতায় হলুদ দাগ রয়েছে।",
      ml: "എന്റെ തക്കാളി ഇലകളിൽ മഞ്ഞ പാടുകൾ ഉണ്ട്.",
      or: "ମୋର ଟମାଟୋ ପତ୍ରରେ ହଳଦିଆ ଦାଗ ଅଛି ।"
    };

    const queryText = fallbackTranscripts[activeLanguage] || fallbackTranscripts["en"];
    setTranscription(queryText);
    triggerAgentFlowWithText(queryText);
  };

  const [typedQuery, setTypedQuery] = useState<string>("");
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedQuery.trim()) return;
    setTranscription(typedQuery);
    setTypedQuery("");
    triggerAgentFlowWithText(typedQuery);
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
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-cyan-950/10 via-black/40 to-transparent border border-white/10 rounded-3xl shadow-inner relative overflow-hidden select-none text-left">

      {/* Background neon glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header navbar */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400 animate-pulse" size={20} />
          <h3 className="font-extrabold text-white text-md">AI Voice Assistant</h3>
        </div>

        {/* Actions bar (Language & Settings Key) */}
        <div className="flex items-center gap-2">
          {/* Key configuration button */}

          {/* Language selector */}
          <div className="flex items-center gap-1.5 bg-[#0a0f0c] px-3 py-1 rounded-full border border-white/5 font-mono">
            <Globe size={13} className="text-cyan-455" />
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
      </div>

      {/* Main recording controls console */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 relative min-h-0">
        <div className="relative mb-5">
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
          )}
          <button
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] border-2 cursor-pointer ${isRecording
              ? 'bg-red-950 border-red-500 hover:bg-red-900 text-white animate-pulse'
              : 'bg-cyan-950/80 border-cyan-500 hover:bg-cyan-900 text-cyan-400'
              }`}
          >
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
        </div>

        {isRecording && (
          <div className="flex items-end justify-center gap-1.5 h-4 mb-3 shrink-0">
            <span className="w-0.5 bg-cyan-400 rounded-full h-2 animate-[pulse_0.8s_infinite]" />
            <span className="w-0.5 bg-cyan-400 rounded-full h-4 animate-[pulse_0.8s_infinite_0.2s]" />
            <span className="w-0.5 bg-cyan-400 rounded-full h-1.5 animate-[pulse_0.8s_infinite_0.4s]" />
          </div>
        )}

        <div className="text-center w-full min-h-0 space-y-3">
          <p className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wider">{statusText}</p>
          {transcription && (
            <div className="bg-[#040605] p-3 rounded-2xl border border-white/5 max-w-sm mx-auto shadow-inner font-mono text-left relative overflow-hidden select-text">
              <span className="text-[8px] font-bold text-cyan-400 block mb-1 uppercase tracking-widest">[TRANSCRIPTION]</span>
              <p className="text-xs text-white italic font-sans leading-relaxed">"{transcription}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Execution mesh map */}
      {activePlan.length > 0 && (
        <div className="my-3 p-3 bg-black/60 rounded-2xl border border-white/5 font-mono text-left shrink-0">
          <div className="text-[8px] font-bold text-cyan-400 mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <RefreshCw size={11} className="animate-spin" />
            <span>[AGENT_EXECUTION_MESH]</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {activePlan.map((agent, i) => {
              const isExecuting = i === currentExecutingIndex;
              const isCompleted = i < currentExecutingIndex;

              return (
                <React.Fragment key={agent}>
                  <div className={`text-[9px] font-bold px-2 py-0.5 rounded-lg transition-all duration-300 ${isExecuting
                    ? 'bg-cyan-600 text-white scale-105 shadow-md shadow-cyan-800 animate-pulse border border-cyan-400'
                    : isCompleted
                      ? 'bg-cyan-950/60 text-cyan-350 border border-cyan-500/10'
                      : 'bg-zinc-950/80 text-zinc-600 border border-zinc-900'
                    }`}>
                    {agent.toUpperCase()}
                  </div>
                  {i < activePlan.length - 1 && (
                    <span className="text-cyan-950 text-[8px] select-none">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls & Chat Form */}
      <div className="mt-3 flex flex-col gap-2 shrink-0">
        {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
        {transcription && (
          <button
            onClick={handlePlayVoice}
            className="w-full flex items-center justify-center gap-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 font-bold py-2 rounded-xl text-xs transition-all border border-white/5 font-mono cursor-pointer hover:shadow-[0_0_12px_rgba(6,182,212,0.1)]"
          >
            <Volume2 size={14} />
            {t.playResponse}
          </button>
        )}

        <form onSubmit={handleTextSubmit} className="flex items-center gap-2 bg-[#040605] rounded-xl border border-white/10 p-1.5">
          <input
            type="text"
            value={typedQuery}
            onChange={(e) => setTypedQuery(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 text-xs text-white bg-transparent outline-none px-2 py-0.5 placeholder-cyan-950/65 font-medium select-text"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg px-3 py-1 text-xs font-bold transition-all font-mono cursor-pointer">
            Send
          </button>
        </form>
      </div>

    </div>
  );
}
