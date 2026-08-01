'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sprout, 
  Settings, 
  MapPin, 
  Cpu, 
  FileText, 
  Activity, 
  ActivitySquare,
  LogOut,
  UserCheck,
  Globe,
  Bell,
  Code,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import FarmMap from '@/components/dashboard/FarmMap';
import VoiceAssistant from '@/components/dashboard/VoiceAssistant';
import VisionAnalysis from '@/components/dashboard/VisionAnalysis';
import Marketprice from '@/components/dashboard/Marketprice';
import EmergencySOS from '@/components/dashboard/EmergencySOS';
import GovernmentSchemes from '@/components/dashboard/GovernmentSchemes';
import EducationPortal from '@/components/dashboard/EducationPortal';
import Preloader from '@/components/ui/Preloader';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("en");
  const [activeTab, setActiveTab] = useState<string>("overview"); // overview | diagnostics | market | crisis
  const [agentOutput, setAgentOutput] = useState<any>(null);
  const [showNotificationAlert, setShowNotificationAlert] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };
  
  const [telemetry, setTelemetry] = useState<any>({
    temperature: 30,
    humidity: 75,
    soil_moisture: 48,
    soil_ph: 6.7,
    nitrogen: 178,
    phosphorus: 41,
    potassium: 215,
    water_level_pct: 65
  });

  const [farmerProfile, setFarmerProfile] = useState<any>({
    farmer_name: "Farmer",
    location: "Loading...",
    current_crop: "Tomato",
    land_size_hectares: 1.5,
    soil_type: "Loam",
    ph: 6.7,
    irrigation_type: "Drip",
    budget: "Medium",
    historical_diseases: ["Early Blight (2025)"],
    lat: 30.2115,
    lng: 74.9525
  });

  const [explanationText, setExplanationText] = useState<string>(
    "🌾 **KisaanMitra Operating System initialized.**\n\nSpeak, type a query, or upload a leaf photo to trigger the multi-agent AI network.\n\nModify the **IoT Sensor Controller** below to simulate telemetry updates and watch the satellite map update coordinates."
  );

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
    { code: "or", label: "ଓਡ଼ਿଆ (Odia)" }
  ];

  // Localization Dictionary for Dashboard
  const localization: any = {
    en: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "Overview & Map",
      diagnostics: "AI Diagnostics",
      market: "Market & Mandi",
      crisis: "Crisis & Academy",
      title: "Farm Control Center",
      profileHeader: "[MEM_PROFILE_01]",
      profileSynced: "Synced",
      healthHeader: "[HEALTH_GAUGE]",
      healthLabel: "HEALTH_INDEX",
      calibHeader: "[CALIBRATION_COORDS]",
      advisoryHeader: "[DECISION_LOG_ADVISORY]",
      advisorySub: "Action Logs ready",
      signOut: "Sign Out",
      community: "Community Chat",
      nodeLabel: "NODE",
      regionLabel: "REGION",
      soilMoisture: "MOISTURE",
      soilPh: "SOIL pH",
      soilTemp: "TEMPERATURE",
      cropLabel: "active_crop",
      landLabel: "land_holding",
      restLabel: "REST Telemetry Active"
    },
    hi: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "अवलोकन और मानचित्र",
      diagnostics: "एआई निदान",
      market: "बाजार और मंडी",
      crisis: "संकट और अकादमी",
      title: "फार्म नियंत्रण केंद्र",
      profileHeader: "[स्मृति_प्रोफ़ाइल_01]",
      profileSynced: "सिंक किया हुआ",
      healthHeader: "[स्वास्थ्य_मापक]",
      healthLabel: "स्वास्थ्य_सूचकांक",
      calibHeader: "[अंशांकन_निर्देशांक]",
      advisoryHeader: "[निर्णय_लॉग_सलाह]",
      advisorySub: "सलाह लॉग तैयार हैं",
      signOut: "साइन आउट",
      community: "सामुदायिक चैट",
      nodeLabel: "नोड",
      regionLabel: "क्षेत्र",
      soilMoisture: "नमी",
      soilPh: "मिट्टी पीएच",
      soilTemp: "तापमान",
      cropLabel: "सक्रिय_फसल",
      landLabel: "भूमि_स्वामित्व",
      restLabel: "टेलीमेट्री सक्रिय"
    },
    pa: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "ਸੰਖੇਪ ਅਤੇ ਨਕਸ਼ਾ",
      diagnostics: "AI ਨਿਦਾਨ",
      market: "ਮਾਰਕੀਟ ਅਤੇ ਮੰਡੀ",
      crisis: "ਸੰਕਟ ਅਤੇ ਅਕੈਡਮੀ",
      title: "ਫਾਰਮ ਕੰਟਰੋਲ ਕੇਂਦਰ",
      profileHeader: "[ਮੈਮੋਰੀ_ਪ੍ਰੋਫਾਈਲ_01]",
      profileSynced: "ਸਿੰਕ ਕੀਤਾ",
      healthHeader: "[ਸਿਹਤ_ਮਾਪਕ]",
      healthLabel: "ਸਿਹਤ_ਸੂਚਕਾਂਕ",
      calibHeader: "[ਕੈਲੀਬਰੇਸ਼ਨ_ਕੋਆਰਡੀਨੇਟਸ]",
      advisoryHeader: "[ਫੈਸਲਾ_ਲੌਗ_ਸਲਾਹ]",
      advisorySub: "ਸਲਾਹ ਲੌਗ ਤਿਆਰ",
      signOut: "ਸਾਈਨ ਆਊਟ",
      community: "ਭਾਈਚਾਰਕ ਚੈਟ",
      nodeLabel: "ਨੋਡ",
      regionLabel: "ਖੇਤਰ",
      soilMoisture: "ਨਮੀ",
      soilPh: "ਮਿੱਟੀ pH",
      soilTemp: "ਤਾਪਮਾਨ",
      cropLabel: "ਸਰਗਰਮ_ਫਸਲ",
      landLabel: "ਜ਼ਮੀਨ_ਮਾਲਕੀ",
      restLabel: "ਟੈਲੀਮੈਟਰੀ ਸਰਗਰਮ"
    },
    mr: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "नकाशा व आढावा",
      diagnostics: "एआय निदान",
      market: "बाजार व मंडी",
      crisis: "संकट व अकादमी",
      title: "फार्म नियंत्रण केंद्र",
      profileHeader: "[स्मरण_प्रोफाइल_01]",
      profileSynced: "सिंक केलेले",
      healthHeader: "[आरोग्य_मापक]",
      healthLabel: "आरोग्य_निर्देशांक",
      calibHeader: "[कॅलिब्रेशन_गुणक]",
      advisoryHeader: "[निर्णय_नोंद_सल्ला]",
      advisorySub: "नोंदणी तयार",
      signOut: "बाहेर पडा",
      community: "चॅट रूम",
      nodeLabel: "नोड",
      regionLabel: "प्रदेश",
      soilMoisture: "ओलावा",
      soilPh: "माती पीएच",
      soilTemp: "तापमान",
      cropLabel: "सक्रिय_पीक",
      landLabel: "जमीन_धारणा",
      restLabel: "टेलीमेट्री चालू"
    },
    te: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "అవలోకనం & మ్యాప్",
      diagnostics: "AI డయాగ్నస్టిక్స్",
      market: "మార్కెట్ & మండి",
      crisis: "సంక్షోభం & అకాడమీ",
      title: "ఫార్మ్ కంట్రోల్ సెంటర్",
      profileHeader: "[ప్రొఫైల్_01]",
      profileSynced: "సమకాలీకరించబడింది",
      healthHeader: "[ఆరోగ్య_సూచిక]",
      healthLabel: "ఆరోగ్య_స్కోర్",
      calibHeader: "[అంశాంకన_సమన్వయం]",
      advisoryHeader: "[నిర్ణయ_సలహా_లాగ్]",
      advisorySub: "లాగ్స్ సిద్ధంగా ఉన్నాయి",
      signOut: "సైన్ అవుట్",
      community: "కమ్యూనిటీ చాట్",
      nodeLabel: "నోడ్",
      regionLabel: "ప్రాంతం",
      soilMoisture: "తేమ",
      soilPh: "నేల pH",
      soilTemp: "ఉష్ణోగ్రత",
      cropLabel: "సక్రియ_పంట",
      landLabel: "భూమి_పరిమాణం",
      restLabel: "టెలిమెట్రీ సక్రియంగా ఉంది"
    },
    ta: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "வரைபடம் & மேலாண்மை",
      diagnostics: "AI பகுப்பாய்வு",
      market: "சந்தை & மண்டி",
      crisis: "பேரிடர் & கல்வி",
      title: "பண்ணை கட்டுப்பாட்டு மையம்",
      profileHeader: "[விவரக்குறிப்பு_01]",
      profileSynced: "இணைக்கப்பட்டது",
      healthHeader: "[ஆரோக்கிய_மானி]",
      healthLabel: "ஆரோக்கிய_குறியீடு",
      calibHeader: "[அளவீட்டு_அமைப்புகள்]",
      advisoryHeader: "[முடிவு_ஆலோசனை_பதிவு]",
      advisorySub: "பதிவு தயார்",
      signOut: "வெளியேறு",
      community: "உரையாடல் அரங்கம்",
      nodeLabel: "முனையம்",
      regionLabel: "மண்டலம்",
      soilMoisture: "ஈரப்பதம்",
      soilPh: "மண் pH",
      soilTemp: "வெப்பநிலை",
      cropLabel: "செயலில்_உள்ள_பயிர்",
      landLabel: "நில_அளவு",
      restLabel: "தொலைத்தொடர்பு செயலில் உள்ளது"
    },
    kn: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "ಅವಲೋಕನ & ನಕ್ಷೆ",
      diagnostics: "AI ರೋಗನಿರ್ಣಯ",
      market: "ಮಾರುಕಟ್ಟೆ & ಮಂಡಿ",
      crisis: "ಬಿಕ್ಕಟ್ಟು & ಅಕಾಡೆಮಿ",
      title: "ಕೃಷಿ ನಿಯಂತ್ರಣ ಕೇಂದ್ರ",
      profileHeader: "[ಪ್ರೊಫೈಲ್_01]",
      profileSynced: "ಸಮನ್ವಯಗೊಂಡಿದೆ",
      healthHeader: "[ಆರೋಗ್ಯ_ಮಾನಕ]",
      healthLabel: "ಆರೋಗ್ಯ_ಸೂಚ್ಯಂಕ",
      calibHeader: "[ಅಂಶಾಂಕನ_ಅಕ್ಷಾಂಶ]",
      advisoryHeader: "[ಸಲಹಾ_ದಾಖಲೆ]",
      advisorySub: "ದಾಖಲೆಗಳು ಸಿದ್ಧ",
      signOut: "ಸೈನ್ ಔಟ್",
      community: "ಸಮುದಾಯ ಚರ್ಚೆ",
      nodeLabel: "ನೋಡ್",
      regionLabel: "ಪ್ರದೇಶ",
      soilMoisture: "ತೇವಾಂಶ",
      soilPh: "ಮಣ್ಣಿನ pH",
      soilTemp: "ತಾಪಮಾನ",
      cropLabel: "ಸಕ್ರಿಯ_ಬೆಳೆ",
      landLabel: "ಭೂಮಿಯ_ಅಳತೆ",
      restLabel: "ಟೆಲಿಮೆಟ್ರಿ ಸಕ್ರಿಯವಾಗಿದೆ"
    },
    gu: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "નકશો અને વિહંગાવલોકન",
      diagnostics: "AI નિદાન",
      market: "બજાર અને મંડી",
      crisis: "કટોકટી અને એકેડેમી",
      title: "ફાર્મ કંટ્રોલ સેન્ટર",
      profileHeader: "[પ્રોફાઇલ_01]",
      profileSynced: "સિંક થયેલ",
      healthHeader: "[આરોગ્ય_માપક]",
      healthLabel: "આરોગ્ય_આંક",
      calibHeader: "[કેલિબ્રેશન_માપદંડ]",
      advisoryHeader: "[નિર્ણય_સલાહ_લોગ]",
      advisorySub: "લોગ તૈયાર છે",
      signOut: "સાઇન આઉટ",
      community: "સમુદાય ચર્ચા",
      nodeLabel: "નોડ",
      regionLabel: "વિસ્તાર",
      soilMoisture: "ભેજ",
      soilPh: "જમીન pH",
      soilTemp: "તાપમાન",
      cropLabel: "સક્રિય_પાક",
      landLabel: "જમીન_ધારણા",
      restLabel: "ટેલિમેટ્રી સક્રિય છે"
    },
    bn: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "সারসংক্ষেপ ও মানচিত্র",
      diagnostics: "এআই রোগ নির্ণয়",
      market: "বাজার ও মান্ডি",
      crisis: "জরুরী ও একাডেমী",
      title: "খামার নিয়ন্ত্রণ কেন্দ্র",
      profileHeader: "[প্রোফাইল_০১]",
      profileSynced: "সংযুক্ত",
      healthHeader: "[স্বাস্থ্য_পরিমাপক]",
      healthLabel: "স্বাস্থ্য_সূচক",
      calibHeader: "[ক্যালিব্রেশন_প্যারামিটার]",
      advisoryHeader: "[সিদ্ধান্ত_পরামর্শ_লগ]",
      advisorySub: "পরামর্শ লগ প্রস্তুত",
      signOut: "সাইন আউট",
      community: "সম্প্রদায় চ্যাট",
      nodeLabel: "নোড",
      regionLabel: "অঞ্চল",
      soilMoisture: "আর্দ্রতা",
      soilPh: "মাটি pH",
      soilTemp: "তাপমাত্রা",
      cropLabel: "সক্রিয়_ফসল",
      landLabel: "জমির_পরিমাণ",
      restLabel: "টেলিমিট্রি সক্রিয়"
    },
    ml: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "അവലോകനം & ഭൂപടം",
      diagnostics: "AI രോഗനിർണ്ണയം",
      market: "വിപണി & മണ്ടി",
      crisis: "അടിയന്തിരം & അക്കാദമി",
      title: "ഫാം കൺട്രോൾ സെന്റർ",
      profileHeader: "[പ്രൊഫൈൽ_01]",
      profileSynced: "കണക്റ്റുചെയ്‌തു",
      healthHeader: "[ആരോഗ്യ_മാപിനി]",
      healthLabel: "ആരോഗ്യ_സൂചിക",
      calibHeader: "[അളവുകൾ]",
      advisoryHeader: "[തീരുമാന_രേഖ]",
      advisorySub: "രേഖകൾ തയ്യാറാണ്",
      signOut: "സൈൻ ഔട്ട്",
      community: "കമ്മ്യൂണിറ്റി ചാറ്റ്",
      nodeLabel: "നോഡ്",
      regionLabel: "മേഖല",
      soilMoisture: "ഈർപ്പം",
      soilPh: "മണ്ണ് pH",
      soilTemp: "താപനില",
      cropLabel: "സജീവ_വിള",
      landLabel: "ഭൂമിയുടെ_അളവ്",
      restLabel: "ടെലിമെട്രി സജീവമാണ്"
    },
    or: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      overview: "ସଂକ୍ଷିପ୍ତ ବିବରଣୀ & ମାନଚିତ୍ର",
      diagnostics: "AI ରୋଗ ନିରୂପଣ",
      market: "ବଜାର & ମଣ୍ଡି",
      crisis: "ଆପଦକାଳୀନ & ଏକାଡେମୀ",
      title: "କୃଷି ନିୟନ୍ତ୍ରଣ କେନ୍ଦ୍ର",
      profileHeader: "[ପ୍ରୋଫାଇଲ୍_୦୧]",
      profileSynced: "ସଂଯୁକ୍ତ",
      healthHeader: "[ସ୍ୱାସ୍ଥ୍ୟ_ମାପକ]",
      healthLabel: "ସ୍ୱାସ୍ଥ್ಯ_ସୂଚକାଙ୍କ",
      calibHeader: "[କ୍ୟାଲିବ୍ରେସନ୍]",
      advisoryHeader: "[ଫୈସଲା_ପରାମର୍ଶ_ଲଗ୍]",
      advisorySub: "ଲଗ୍ ପ୍ରସ୍ତୁତ ଅଛି",
      signOut: "ସାଇନ୍ ଆଉଟ୍",
      community: "ସମୁଦାୟ ଚାଟ୍",
      nodeLabel: "ନୋଡ୍",
      regionLabel: "ଅଞ୍ଚଳ",
      soilMoisture: "ଆଦ୍ରତା",
      soilPh: "ମାଟି pH",
      soilTemp: "ତାପମାତ୍ରା",
      cropLabel: "ସକ୍ରିୟ_ଫସଲ",
      landLabel: "ଜମି_ପରିମାଣ",
      restLabel: "ଟେଲିମେଟ୍ରି ସକ୍ରିಯ"
    }
  };

  const d = localization[activeLanguage] || localization["en"];

  // Authenticate session on load
  useEffect(() => {
    const session = localStorage.getItem("kisaan_session");
    if (!session) {
      router.push("/auth");
      return;
    }

    const storedUserStr = localStorage.getItem(`kisaan_user_${session}`);
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setFarmerProfile(storedUser);
    } else {
      setFarmerProfile((prev: any) => ({
        ...prev,
        farmer_name: session.toUpperCase(),
        location: "Punjab, India"
      }));
    }

    setIsAuthenticated(true);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("kisaan_session");
    router.push("/auth");
  };

  // Voice Command Controller for Dashboard navigation
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const controllerRec = new SpeechRecognition();
    controllerRec.continuous = true;
    controllerRec.interimResults = false;
    controllerRec.lang = 'en-US';

    controllerRec.onresult = (event: any) => {
      const speechVal = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log("Dashboard Voice Controller Recognized:", speechVal);

      if (speechVal.includes("overview") || speechVal.includes("map") || speechVal.includes("first tab")) {
        setActiveTab("overview");
        triggerToast("Vocal Navigation: Opening Farm Overview");
      } else if (speechVal.includes("diagnostic") || speechVal.includes("ai") || speechVal.includes("scan") || speechVal.includes("second tab")) {
        setActiveTab("diagnostics");
        triggerToast("Vocal Navigation: Opening AI Diagnostics");
      } else if (speechVal.includes("market") || speechVal.includes("mandi") || speechVal.includes("price") || speechVal.includes("third tab")) {
        setActiveTab("market");
        triggerToast("Vocal Navigation: Opening Market Rates");
      } else if (speechVal.includes("crisis") || speechVal.includes("emergency") || speechVal.includes("sos") || speechVal.includes("fourth tab") || speechVal.includes("academy")) {
        setActiveTab("crisis");
        triggerToast("Vocal Navigation: Opening Emergency SOS");
      } else if (speechVal.includes("sign out") || speechVal.includes("logout") || speechVal.includes("exit")) {
        triggerToast("Vocal Command: Signing Out");
        setTimeout(handleSignOut, 800);
      }
    };

    controllerRec.onend = () => {
      setTimeout(() => {
        if (localStorage.getItem("kisaan_session") !== null) {
          try {
            controllerRec.start();
          } catch (e) {}
        }
      }, 600);
    };

    try {
      controllerRec.start();
    } catch (e) {}

    return () => {
      try {
        controllerRec.stop();
      } catch (e) {}
    };
  }, []);

  const handleTelemetrySliderChange = async (key: string, val: number) => {
    const updated = { ...telemetry, [key]: val };
    setTelemetry(updated);

    try {
      await fetch("http://localhost:8000/api/iot/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
    } catch (e) {}
  };

  const handleAgentTrigger = (data: any) => {
    setAgentOutput(data);
    if (data.explanation) {
      setExplanationText(data.explanation);
    }
    if (data.profile) {
      setFarmerProfile(data.profile);
    }
  };

  const healthScore = (() => {
    let score = 90;
    if (telemetry.soil_moisture < 30 || telemetry.soil_moisture > 85) score -= 15;
    if (telemetry.soil_ph < 5.5 || telemetry.soil_ph > 8.0) score -= 10;
    if (agentOutput?.vision_results?.disease) score -= 20;
    return score;
  })();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050806] flex items-center justify-center relative">
        <Preloader />
        <div className="text-center space-y-4 relative z-10">
          <Cpu className="text-emerald-500 animate-spin mx-auto" size={32} />
          <p className="text-xs text-emerald-400 font-bold tracking-wider animate-pulse font-mono">[SECURING_SESSION]</p>
        </div>
      </div>
    );
  }

  const needleRotation = ((healthScore / 100) * 180) - 90;

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent text-[#e6f4ea] relative font-sans p-4 md:p-6 flex flex-col space-y-4 selection:bg-emerald-500 selection:text-white">
      
      <Preloader />

      {/* Gridline background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />

      {/* Main dashboard viewport bounds - forced single-screen container */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0 space-y-4 relative z-10">

        {/* Top Floating Capsule Navbar */}
        <nav className="rounded-full bg-black/85 border border-white/10 px-6 py-3.5 flex justify-between items-center backdrop-blur-md shadow-2xl relative z-20 shrink-0">
          
          {/* Left Side: Brand Logo */}
          <div 
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-all select-none"
          >
            <div className="flex gap-0.5 text-[#10b981] self-start mt-0.5">
              <Code size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-extrabold text-sm text-white tracking-tight">KisaanMitra</span>
              <span className="text-[7.5px] font-bold text-emerald-400 font-mono tracking-normal uppercase mt-0.5">
                {d.tagline}
              </span>
            </div>
          </div>

          {/* Center Tabs Navigation links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-extrabold tracking-wide">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`hover:text-white transition-colors py-1 cursor-pointer ${activeTab === 'overview' ? 'text-white border-b-2 border-emerald-500 font-black' : 'text-zinc-400'}`}
            >
              {d.overview}
            </button>
            <button 
              onClick={() => setActiveTab("diagnostics")}
              className={`hover:text-white transition-colors py-1 cursor-pointer ${activeTab === 'diagnostics' ? 'text-white border-b-2 border-fuchsia-500 font-black' : 'text-zinc-400'}`}
            >
              {d.diagnostics}
            </button>
            <button 
              onClick={() => setActiveTab("market")}
              className={`hover:text-white transition-colors py-1 cursor-pointer ${activeTab === 'market' ? 'text-white border-b-2 border-yellow-500 font-black' : 'text-zinc-400'}`}
            >
              {d.market}
            </button>
            <button 
              onClick={() => setActiveTab("crisis")}
              className={`hover:text-white transition-colors py-1 cursor-pointer ${activeTab === 'crisis' ? 'text-white border-b-2 border-red-500 font-black' : 'text-zinc-400'}`}
            >
              {d.crisis}
            </button>
          </div>

          {/* Right Side: Language, Bulletin link, Sign Out */}
          <div className="flex items-center gap-3">
            
            {/* Community Chat nav button */}
            <Link 
              href="/community"
              className="px-3 py-1.5 bg-[#0a0f0c] hover:bg-white/5 border border-white/10 rounded-full text-[10px] font-extrabold text-emerald-450 transition-all flex items-center gap-1 shadow animate-pulse-soft"
            >
              <MessageSquare size={12} className="text-emerald-500" />
              {d.community}
            </Link>

            {/* Regional Language Select */}
            <div className="bg-transparent px-2 py-1 flex items-center gap-1.5 text-zinc-400 border border-white/5 rounded-md text-[11px] font-bold">
              <Globe size={13} className={`animate-pulse ${
                activeTab === 'overview' ? 'text-emerald-400' :
                activeTab === 'diagnostics' ? 'text-fuchsia-400' :
                activeTab === 'market' ? 'text-yellow-400' :
                'text-red-400'
              }`} />
              <select 
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
                className={`bg-transparent outline-none cursor-pointer border-none text-[11px] font-bold ${
                  activeTab === 'overview' ? 'text-emerald-400' :
                  activeTab === 'diagnostics' ? 'text-fuchsia-400' :
                  activeTab === 'market' ? 'text-yellow-400' :
                  'text-red-400'
                }`}
              >
                {LANGUAGES.map((langOption) => (
                  <option key={langOption.code} value={langOption.code} className="bg-[#050806] text-white">
                    {langOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Floating circular bell */}
            <div 
              onClick={() => {
                alert("Alert logs synced: Pathogen alerts and weather conditions are up to date.");
                setShowNotificationAlert(false);
              }}
              className="relative w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer border border-white/10 transition-colors"
            >
              <Bell size={14} className="text-white" />
              {showNotificationAlert && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-black animate-pulse"></span>
              )}
            </div>

            <button 
              onClick={handleSignOut}
              className="text-zinc-450 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={12} />
              {d.signOut}
            </button>
          </div>
        </nav>

        {/* Mobile menu tab fallback */}
        <div className="md:hidden flex bg-[#0f1612] p-1.5 rounded-xl border border-white/10 text-xs font-bold text-emerald-400 shrink-0">
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-transparent text-emerald-400 font-bold outline-none border-none py-1.5"
          >
            <option value="overview" className="bg-[#050806]">{d.overview}</option>
            <option value="diagnostics" className="bg-[#050806]">{d.diagnostics}</option>
            <option value="market" className="bg-[#050806]">{d.market}</option>
            <option value="crisis" className="bg-[#050806]">{d.crisis}</option>
          </select>
        </div>

        {/* Dashboard Title Header */}
        <header className="glass-panel p-4 bg-black/60 border border-white/10 shadow-2xl relative overflow-hidden flex justify-between items-center shrink-0">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-0.5 text-left">
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              {d.title}
              <span className="text-[9px] font-black bg-emerald-600 text-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-mono">
                <UserCheck size={9} />
                {farmerProfile.farmer_name}
              </span>
            </h1>
          </div>

          <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono bg-[#0f1612] px-3.5 py-1.5 rounded border border-white/5">
            [{d.nodeLabel}: active // {d.regionLabel}: {farmerProfile.location}]
          </div>
        </header>

        {/* Content Viewports */}
        <div className="flex-1 min-h-0 transition-all duration-300">
          
          {/* TAB 1: OVERVIEW & MAP */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0 items-stretch">
              
              {/* Left Column (sliders and metrics) */}
              <div className="lg:col-span-4 h-full flex flex-col justify-between space-y-4 min-h-0">
                
                {/* Farmer Profile Memory Card */}
                <div className="glass-panel p-4 bg-black/40 border border-white/10 flex-1 min-h-0 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{d.profileHeader}</span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider font-mono">{d.profileSynced}</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] font-semibold text-zinc-300 text-left">
                    <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                      <span className="text-zinc-500 text-[9px]">farmer_name</span>
                      <span className="text-white font-bold">{farmerProfile.farmer_name}</span>
                    </div>
                    {farmerProfile.contact_number && (
                      <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                        <span className="text-zinc-500 text-[9px]">contact_number</span>
                        <span className="text-white font-bold">{farmerProfile.contact_number}</span>
                      </div>
                    )}
                    <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                      <span className="text-zinc-500 text-[9px]">{d.regionLabel}</span>
                      <span className="text-emerald-400 font-bold">📍 {farmerProfile.location}</span>
                    </div>
                    {farmerProfile.address && (
                      <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                        <span className="text-zinc-500 text-[9px]">farm_address</span>
                        <span className="text-white font-bold truncate max-w-[150px]">{farmerProfile.address}</span>
                      </div>
                    )}
                    <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                      <span className="text-zinc-500 text-[9px]">{d.cropLabel}</span>
                      <span className="text-white font-bold">{farmerProfile.current_crop}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-[#0a0f0c] rounded border border-white/5 font-mono">
                      <span className="text-zinc-500 text-[9px]">{d.landLabel}</span>
                      <span className="text-white font-bold">{farmerProfile.land_size_hectares} Hectares</span>
                    </div>
                  </div>
                </div>

                {/* Health Gauge */}
                <div className="glass-panel p-4 text-center space-y-2 bg-black/40 border border-white/10 shrink-0">
                  <div className="flex justify-between items-center mb-1 border-b border-white/10 pb-2">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{d.healthHeader}</span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wide font-mono">ONLINE</span>
                  </div>

                  <div className="relative w-36 h-20 mx-auto flex flex-col justify-end items-center">
                    <svg className="w-36 h-16" viewBox="0 0 100 50">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#131c17" strokeWidth="7" strokeLinecap="round" />
                      <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="none" 
                        stroke="url(#gauge-gradient-dashboard-map)" 
                        strokeWidth="7" 
                        strokeLinecap="round" 
                        strokeDasharray="125"
                        strokeDashoffset={125 * (1 - healthScore / 100)}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gauge-gradient-dashboard-map" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="60%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="4" fill="#ffffff" />
                      <line 
                        x1="50" y1="50" x2="50" y2="15" 
                        stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"
                        style={{
                          transform: `rotate(${needleRotation}deg)`,
                          transformOrigin: '50px 50px',
                          transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                    </svg>

                    <div className="text-center font-mono">
                      <span className="text-xl font-black text-white leading-none block">{healthScore}%</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{d.healthLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Google satellite farm map and sliders calibration */}
              <div className="lg:col-span-8 h-full flex flex-col justify-between space-y-4 min-h-0">
                
                <div className="flex-1 min-h-0 flex flex-col">
                  <FarmMap 
                    weather={agentOutput?.weather_info} 
                    soil={telemetry} 
                    activeLanguage={activeLanguage}
                    farmerLat={farmerProfile.lat}
                    farmerLng={farmerProfile.lng}
                  />
                </div>

                {/* IoT Calibration Sliders */}
                <div className="glass-panel p-4 space-y-3 bg-black/40 border border-white/10 shrink-0 text-left">
                  <div className="flex justify-between items-center mb-1 border-b border-white/10 pb-2">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{d.calibHeader}</span>
                    <span className="text-[8px] font-bold text-emerald-450 uppercase font-mono">{d.restLabel}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 bg-[#0a0f0c] p-2 rounded-lg border border-white/5">
                      <div className="flex justify-between text-[9px] font-bold font-mono">
                        <span className="text-zinc-500">{d.soilMoisture}</span>
                        <span className="text-emerald-400">{telemetry.soil_moisture}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={telemetry.soil_moisture}
                        onChange={(e) => handleTelemetrySliderChange("soil_moisture", parseInt(e.target.value))}
                        className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div className="space-y-1 bg-[#0a0f0c] p-2 rounded-lg border border-white/5">
                      <div className="flex justify-between text-[9px] font-bold font-mono">
                        <span className="text-zinc-500">{d.soilPh}</span>
                        <span className="text-emerald-400">{telemetry.soil_ph}</span>
                      </div>
                      <input 
                        type="range" 
                        min="4" 
                        max="10" 
                        step="0.1"
                        value={telemetry.soil_ph}
                        onChange={(e) => handleTelemetrySliderChange("soil_ph", parseFloat(e.target.value))}
                        className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div className="space-y-1 bg-[#0a0f0c] p-2 rounded-lg border border-white/5">
                      <div className="flex justify-between text-[9px] font-bold font-mono">
                        <span className="text-zinc-500">{d.soilTemp}</span>
                        <span className="text-emerald-400">{telemetry.temperature}°C</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        value={telemetry.temperature}
                        onChange={(e) => handleTelemetrySliderChange("temperature", parseInt(e.target.value))}
                        className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI MULTI-AGENT DIAGNOSTIC */}
          {activeTab === "diagnostics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-1.5 max-h-[76vh] h-full items-start pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/20 text-left">
              
              <div className="flex flex-col space-y-4">
                <VoiceAssistant 
                  onAgentTriggered={handleAgentTrigger}
                  activeLanguage={activeLanguage}
                  onLanguageChange={(langValue) => setActiveLanguage(langValue)}
                />
                
                <VisionAnalysis 
                  onAnalyzeComplete={handleAgentTrigger}
                  activeLanguage={activeLanguage}
                />
              </div>

              <div className="glass-panel p-5 border border-white/10 bg-black/40 shadow-inner flex flex-col justify-between min-h-[460px] w-full">
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2 shrink-0 font-mono">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{d.advisoryHeader}</span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase">{d.advisorySub}</span>
                  </div>

                  <div className="text-xs leading-relaxed text-zinc-300 font-medium space-y-3 overflow-y-auto pr-2 flex-1 text-left min-h-0">
                    {explanationText.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('-')) {
                        return (
                          <ul key={pIdx} className="list-disc list-inside space-y-1 bg-[#0a0f0c] p-2.5 rounded border border-white/5">
                            {paragraph.split('\n').map((bullet, bIdx) => (
                              <li key={bIdx} className="pl-1 text-white font-semibold leading-relaxed">
                                {bullet.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      return (
                        <p key={pIdx} className="font-medium whitespace-pre-line text-emerald-400 font-semibold">
                          {paragraph.split('**').map((text, i) => (
                            i % 2 === 1 ? <strong key={i} className="text-white font-black">{text}</strong> : text
                          ))}
                        </p>
                      );
                    })}

                    {/* If we have structured agentOutput, show a high-tech detailed diagnostic summary grid! */}
                    {agentOutput && (
                      <div className="border-t border-white/10 pt-3 mt-3 space-y-2 font-mono">
                        <div className="text-[9px] text-fuchsia-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Sparkles size={11} className="animate-spin" />
                          <span>Multi-Agent Diagnostics Breakdown</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[9.5px]">
                          {/* Vision Analysis Block */}
                          {agentOutput.vision_results && (
                            <div className="bg-[#0c080e]/60 border border-fuchsia-500/20 p-2 rounded-lg">
                              <span className="text-fuchsia-400 font-bold block mb-1">👁️ VISION_AGENT</span>
                              <div className="space-y-0.5 text-zinc-400">
                                <div>Target: <span className="text-white font-semibold">{agentOutput.vision_results.target}</span></div>
                                <div>Pathogen: <span className="text-white font-semibold">{agentOutput.vision_results.disease}</span></div>
                                <div>Confidence: <span className="text-emerald-400">{(agentOutput.vision_results.confidence * 100).toFixed(0)}%</span></div>
                              </div>
                            </div>
                          )}

                          {/* Weather Analysis Block */}
                          {agentOutput.weather_info && (
                            <div className="bg-[#080d0e]/60 border border-cyan-500/20 p-2 rounded-lg">
                              <span className="text-cyan-400 font-bold block mb-1">🌤️ METEOROLOGICAL_AGENT</span>
                              <div className="space-y-0.5 text-zinc-400">
                                <div>Temperature: <span className="text-white font-semibold">{agentOutput.weather_info.temperature}°C</span></div>
                                <div>Humidity: <span className="text-white font-semibold">{agentOutput.weather_info.humidity}%</span></div>
                                <div className="truncate text-amber-400" title={agentOutput.weather_info.advisory}>Advisory: {agentOutput.weather_info.advisory}</div>
                              </div>
                            </div>
                          )}

                          {/* Soil Analysis Block */}
                          {agentOutput.soil_data && (
                            <div className="bg-[#080e0a]/60 border border-emerald-500/20 p-2 rounded-lg">
                              <span className="text-emerald-400 font-bold block mb-1">🌱 TELEMETRY_SOIL_AGENT</span>
                              <div className="space-y-0.5 text-zinc-400">
                                <div>Soil Type: <span className="text-white font-semibold">{agentOutput.soil_data.soil_type}</span></div>
                                <div>pH Value: <span className="text-white font-semibold">{agentOutput.soil_data.ph}</span></div>
                                <div>NPK: <span className="text-zinc-300 font-semibold">{agentOutput.soil_data.nitrogen}N : {agentOutput.soil_data.phosphorus}P : {agentOutput.soil_data.potassium}K</span></div>
                              </div>
                            </div>
                          )}

                          {/* Mandi/Market Rates Block */}
                          {agentOutput.market_rates && (
                            <div className="bg-[#0d0d08]/60 border border-yellow-500/20 p-2 rounded-lg">
                              <span className="text-yellow-400 font-bold block mb-1">📈 MANDI_MARKET_AGENT</span>
                              <div className="space-y-0.5 text-zinc-400">
                                <div>Mandi: <span className="text-white font-semibold truncate block max-w-[130px]">{agentOutput.market_rates.mandi}</span></div>
                                <div>Price: <span className="text-white font-semibold">₹{agentOutput.market_rates.price}/q</span></div>
                                <div>Trend Advisory: <span className="text-amber-400 font-bold">{agentOutput.market_rates.best_time}</span></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#0a0f0c] border border-white/5 rounded-lg p-2 text-[8px] text-emerald-500/80 font-mono font-semibold mt-3 shrink-0 text-left">
                  <span>ORCHESTRATOR_PLANNING_STEPS: COMPILED_SUCCESSFULLY</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MARKET & SCHEMES */}
          {activeTab === "market" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0 items-stretch overflow-hidden">
              <div className="h-full min-h-0 overflow-y-auto">
                <Marketprice 
                  marketRates={agentOutput?.market_rates}
                  activeLanguage={activeLanguage}
                />
              </div>

              <div className="h-full min-h-0 overflow-y-auto">
                <GovernmentSchemes 
                  schemes={agentOutput?.schemes || []}
                  farmerProfile={farmerProfile}
                  activeLanguage={activeLanguage}
                />
              </div>
            </div>
          )}

          {/* TAB 4: CRISIS & ACADEMY */}
          {activeTab === "crisis" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0 items-stretch overflow-hidden">
              <div className="h-full min-h-0 overflow-y-auto">
                <EmergencySOS 
                  medicalAdvice={agentOutput?.medical_advice}
                  disasterAlerts={agentOutput?.disaster_alerts}
                  activeLanguage={activeLanguage}
                />
              </div>

              <div className="h-full min-h-0 overflow-y-auto">
                <EducationPortal 
                  tutorials={agentOutput?.tutorials || []}
                  activeLanguage={activeLanguage}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="text-center text-[9px] text-emerald-500/40 font-semibold py-2 border-t border-white/10 shrink-0 flex justify-between items-center bg-black/10 backdrop-blur-xs font-mono">
          <span>[SYSTEM_GATED: PERSISTENT] // [HACKATHON_ENTRY: ACTIVE]</span>
          <span>© 2026 KISAANMITRA_OS</span>
        </footer>

      </div>

      {/* Floating Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[9999] bg-[#090f0c]/90 backdrop-blur-lg border border-emerald-500 text-emerald-450 font-mono text-[10px] font-bold px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping"></span>
          {toastMessage}
        </div>
      )}

    </div>
  );
}
