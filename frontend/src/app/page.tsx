'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sprout, 
  ArrowRight, 
  Database, 
  Radio, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Languages, 
  Activity, 
  HeartPulse, 
  AlertTriangle, 
  GraduationCap,
  Terminal,
  Server,
  User,
  Workflow,
  X,
  Globe,
  Settings,
  MessageSquare
} from 'lucide-react';
import Preloader from '@/components/ui/Preloader';

export default function LandingPage() {
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showBlueprint, setShowBlueprint] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");

  // Typewriter Log Stream state
  const [typedLogs, setTypedLogs] = useState<string[]>([""]);

  const LOG_POOL = [
    "→ Initializing Kisaanमित्र Core OS v2.1...",
    "→ Establishing telemetry link to local Krishi Vigyan Kendra (KVK)...",
    "→ IoT telemetry buffers initialized successfully [OK]",
    "→ Connecting to Qdrant vector database: Index kisaan_kb loaded",
    "→ Seeding 4 RAG knowledge bulletins (KVK + ICAR manuals)...",
    "→ LangGraph workflow network compiled: 12 nodes initialized",
    "→ Vision Node: YOLOv11 leaf pathogen analyzer weights checked",
    "→ Vision Node: SAM2 segmented coordinate maps ready",
    "→ MCP Server: Exposing tools: fetch_weather, locate_mandis"
  ];

  // Character-by-character typewriter loop
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timer: NodeJS.Timeout;

    const typeChar = () => {
      if (lineIdx < LOG_POOL.length) {
        const currentFullLine = LOG_POOL[lineIdx];
        if (charIdx < currentFullLine.length) {
          setTypedLogs((prev) => {
            const next = [...prev];
            next[lineIdx] = currentFullLine.slice(0, charIdx + 1);
            return next;
          });
          charIdx++;
          timer = setTimeout(typeChar, 18);
        } else {
          // Finished typing current line, prepare next
          lineIdx++;
          charIdx = 0;
          if (lineIdx < LOG_POOL.length) {
            setTypedLogs((prev) => [...prev, ""]);
            timer = setTimeout(typeChar, 150); // delay between lines
          } else {
            // Loop reset after delay
            timer = setTimeout(() => {
              lineIdx = 0;
              charIdx = 0;
              setTypedLogs([""]);
              typeChar();
            }, 6000);
          }
        }
      }
    };

    typeChar();
    return () => clearTimeout(timer);
  }, []);

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

  // Multi-lingual localizations dictionary
  const localization: any = {
    en: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "SCATTERED FARMS.",
      heroTitle2: "ONE DICTIONARY.",
      heroSub: "Where heritage farming meets autonomous orchestration. Kisaanमित्र synthesizes live soil telemetry, localized meteorological bulletins, and neural leaf diagnostics into an action-ready agricultural cockpit.",
      launchOS: "Launch Farm OS",
      seeFeatures: "See Features",
      capTitle: "SYSTEM CAPABILITIES",
      capSubtitle: "Health scores & structural audits.",
      capDesc: "Get a dynamic farm health grade, sensor telemetry charts, and an issues log with remediation tips loaded directly.",
      howTitle: "STEP-BY-STEP CALIBRATION",
      howSubtitle: "How To Orchestrate Your Farm",
      howDesc: "Learn the core concept and execution pipeline behind Kisaanमित्र's AI-to-Farmer orchestrations.",
      howBtn: "Launch Schematic Blueprint",
      step1Title: "Create Smart Farm Node",
      step1Desc: "Input your village name, target crop variety, and land size coordinates in the Auth Portal to calibrate mapping parameters.",
      step2Title: "Upload Telemetry logs",
      step2Desc: "Stream sensor NPK metrics, trigger flood alarms, or take picture uploads of infected plant leaves for disease classification.",
      step3Title: "Execute Action loops",
      step3Desc: "Receive coordinated LangGraph advisories translating weather, crop remedies, government schemes, and mandi MSPs.",
      meshTitle: "Autonomous orchestration",
      meshSubtitle: "Multi-Agent Coordination Mesh",
      meshDesc: "Kisaanमित्र deploys a compiled state graph of LangGraph agents to compute action advisories dynamically based on soil metrics and sensor logs. Hover over any outer agent node on the constellation circle to inspect tools and roles.",
      bpTitle: "Interactive Schematic Blueprint",
      bpTag: "KISAANMITRA SYSTEM ARCHITECTURE",
      bpClose: "Acknowledge Blueprint",
      stage1Title: "Unstructured Inputs",
      stage1Desc: "Ingests raw farmer inputs: regional voice notes, YOLO leaf disease scans, and IoT moisture indices.",
      stage2Title: "LangGraph Router",
      stage2Desc: "Planner compiles state graph. Dispatches loops to weather indices and similarity collections.",
      stage3Title: "Decision Cockpit",
      stage3Desc: "Serves structured guides, selling window MSP rates, and emergency warnings."
    },
    hi: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "बिखरे हुए खेत।",
      heroTitle2: "एक ही शब्दकोश।",
      heroSub: "जहां पारंपरिक खेती और स्वायत्त ऑर्केस्ट्रेशन का मिलन होता है। किसानमित्र मिट्टी की लाइव टेलीमेट्री, स्थानीय मौसम बुलेटिन और न्यूरल लीफ निदान को एक कार्य-तैयार कृषि कॉकपिट में संश्लेषित करता है।",
      launchOS: "फार्म ओएस लॉन्च करें",
      seeFeatures: "विशेषताएं देखें",
      capTitle: "सिस्टम क्षमताएं",
      capSubtitle: "स्वास्थ्य स्कोर और संरचनात्मक ऑडिट।",
      capDesc: "सीधे लोड किए गए सुधार युक्तियों के साथ एक गतिशील कृषि स्वास्थ्य ग्रेड, सेंसर टेलीमेट्री चार्ट और समस्या लॉग प्राप्त करें।",
      howTitle: "कदम-दर-कदम अंशांकन",
      howSubtitle: "अपने फार्म को कैसे व्यवस्थित करें",
      howDesc: "किसानमित्र के एआई-टू-किसान ऑर्केस्ट्रेशन के पीछे मुख्य अवधारणा और निष्पादन पाइपलाइन सीखें।",
      howBtn: "योजनाबद्ध खाका खोलें",
      step1Title: "स्मार्ट फार्म नोड बनाएं",
      step1Desc: "मानचित्रण मापदंडों को कैलिब्रेट करने के लिए ऑथ पोर्टल में अपने गाँव का नाम, लक्षित फसल और भूमि का आकार दर्ज करें।",
      step2Title: "टेलीमेट्री लॉग अपलोड करें",
      step2Desc: "रोग वर्गीकरण के लिए सेंसर एनपीके मेट्रिक्स स्ट्रीम करें, बाढ़ अलार्म ट्रिगर करें, या संक्रमित पत्तियों की तस्वीरें लें।",
      step3Title: "एक्शन लूप निष्पादित करें",
      step3Desc: "मौसम, फसल उपचार, सरकारी योजनाओं और मंडी एमएसपी का अनुवाद करने वाली समन्वित लैंगग्राफ सलाह प्राप्त करें।",
      meshTitle: "स्वायत्त ऑर्केस्ट्रेशन",
      meshSubtitle: "मल्टी-एजेंट समन्वय जाल",
      meshDesc: "किसानमित्र मिट्टी के मेट्रिक्स और सेंसर लॉग के आधार पर गतिशील रूप से कार्रवाई सलाह की गणना करने के लिए लैंगग्राफ एजेंटों के एक संकलित राज्य ग्राफ को तैनात करता है। उपकरणों और भूमिकाओं का निरीक्षण करने के लिए नक्षत्र चक्र पर किसी भी बाहरी एजेंट नोड पर होवर करें।",
      bpTitle: "इंटरैक्टिव योजनाबद्ध खाका",
      bpTag: "किसानमित्र प्रणाली वास्तुकला",
      bpClose: "खाका स्वीकार करें",
      stage1Title: "असंरचित इनपुट",
      stage1Desc: "किसान से सीधे इनपुट लेता है: क्षेत्रीय आवाज नोट्स, पत्ती स्कैन और आईओटी नमी सूचकांक।",
      stage2Title: "लैंगग्राफ स्टेट राउटर",
      stage2Desc: "केंद्रीय योजनाकार राज्य ग्राफ संकलित करता है। मौसम सूचकांकों और वेक्टर संग्रहों को क्वेरी भेजता है।",
      stage3Title: "निर्णय कॉकपिट",
      stage3Desc: "फार्म डैशबोर्ड पर संरचित सलाह प्रदान करता है: भू-बाड़ सीमाएं, सब्सिडी लिंक और चेतावनी।"
    },
    pa: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "ਖਿਲਰੇ ਹੋਏ ਖੇਤ।",
      heroTitle2: "ਇੱਕੋ ਸ਼ਬਦਕੋਸ਼।",
      heroSub: "ਜਿੱਥে ਪਰੰਪਰਾਗਤ ਖੇਤੀ ਅਤੇ ਸਵੈ-ਚਾਲਿਤ ਆਰਕੈਸਟ੍ਰੇਸ਼ਨ ਦਾ ਮੇਲ ਹੁੰਦਾ ਹੈ। ਕਿਸਾਨਮਿੱਤਰ ਮਿੱਟੀ ਦੀ ਲਾਈਵ ਟੈਲੀਮੈਟਰੀ, ਸਥਾਨਕ ਮੌਸਮ ਬੁਲੇਟਿਨ ਅਤੇ ਨਿਊਰਲ ਪੱਤਿਆਂ ਦੇ ਨਿਦਾਨ ਨੂੰ ਇੱਕ ਫਾਰਮ ਕਾਕਪਿਟ ਵਿੱਚ ਇਕੱਠਾ ਕਰਦਾ ਹੈ।",
      launchOS: "ਫਾਰਮ OS ਲਾਂਚ ਕਰੋ",
      seeFeatures: "ਵਿਸ਼ੇಶਤਾਵਾਂ ਦੇਖੋ",
      capTitle: "ਸਿਸਟਮ ਸਮਰੱਥਾਵਾਂ",
      capSubtitle: "ਸਿਹਤ ਸਕੋਰ ਅਤੇ ਢਾਂਚਾਗਤ ਆਡਿਟ।",
      capDesc: "ਸਿੱਧੇ ਲੋਡ ਕੀਤੇ ਗਏ ਸੁਧਾਰ ਸੁਝਾਵਾਂ ਦੇ ਨਾਲ ਇੱਕ ਗਤੀਸ਼ੀਲ ਫਾਰਮ ਸਿਹਤ ਗ੍ਰੇਡ, ਸੈਂਸਰ ਟੈਲੀਮੈਟਰੀ ਚਾਰਟ ਅਤੇ ਸਮੱਸਿਆ ਲੌਗ ਪ੍ਰਾਪਤ ਕਰੋ।",
      howTitle: "ਕਦਮ-ਦਰ-ਕਦਮ ਕੈਲੀਬਰੇਸ਼ਨ",
      howSubtitle: "ਆਪਣੇ ਫਾਰਮ ਨੂੰ ਕਿਵੇਂ ਵਿਵਸਥਿਤ ਕਰਨਾ ਹੈ",
      howDesc: "ਕਿਸਾਨਮਿੱਤਰ ਦੇ AI-ਤੋਂ-ਕਿਸਾਨ ਆਰਕੈਸਟ੍ਰੇਸ਼ਨਾਂ ਦੇ ਪਿੱਛੇ ਮੁੱਖ ਸੰਕਲਪ ਅਤੇ ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਪਾਈਪਲਾਈਨ ਸਿੱਖੋ।",
      howBtn: "ਯੋਜਨਾਬੱਧ ਬਲੂਪ੍ਰਿੰտ ਖੋਲ੍ਹੋ",
      step1Title: "ਸਮਾਰਟ ਫਾਰਮ ਨੋਡ ਬਣਾਓ",
      step1Desc: "ਮੈਪਿੰਗ ਮਾਪਦੰਡਾਂ ਨੂੰ ਕੈਲੀਬਰੇਟ ਕਰਨ ਲਈ ਅਥਾਰਟੀ ਪੋਰਟਲ ਵਿੱਚ ਆਪਣੇ ਪਿੰਡ ਦਾ ਨਾਮ, ਨਿਸ਼ਾਨਾ ਫਸਲ ਅਤੇ ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ ਦਰਜ ਕਰੋ।",
      step2Title: "ਟੈਲੀਮੈਟਰੀ ਲੌਗ ਅੱਪਲੋਡ ਕਰੋ",
      step2Desc: "ਰੋਗ ਵਰਗੀਕਰਨ ਲਈ ਸੈਂਸਰ NPK ਮੈਟ੍ਰਿਕਸ ਸਟ੍ਰੀਮ ਕਰੋ, ਹੜ੍ਹ ਦੇ ਅਲਾਰਮ ਨੂੰ ਟ੍ਰਿਗਰ ਕਰੋ, ਜਾਂ ਸੰਕਰਮਿਤ ਪੱਤਿਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਲਓ।",
      step3Title: "ਐਕਸ਼ਨ ਲੂਪਸ ਚਲਾਓ",
      step3Desc: "ਮੌਸਮ, ਫਸਲਾਂ ਦੇ ਉਪਚਾਰ, ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਮੰਡੀ MSP ਦਾ ਅਨੁਵਾਦ ਕਰਨ ਵਾਲੀ ਤਾਲਮੇલ ਵਾਲੀ ਲੈਂਗਗ੍ਰਾਫ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ।",
      meshTitle: "ਖੁਦਮੁਖਤਿਆਰ ਆਰਕੈਸਟ੍ਰੇਸ਼ਨ",
      meshSubtitle: "ਮਲਟੀ-ਏਜੰਟ ਤਾਲਮेਲ ਜਾਲ",
      meshDesc: "ਕਿਸਾਨਮਿੱਤਰ ਮਿੱਟੀ ਦੇ ਮੈਟ੍ਰਿਕਸ ਅਤੇ ਸੈਂਸਰ ਲੌਗਸ ਦੇ ਅਧਾਰ 'ਤੇ ਗਤੀਸ਼ੀล ਤੌਰ 'ਤੇ ਕਾਰਵਾਈ ਦੀ ਸਲਾਹ ਦੀ ਗਣਨਾ ਕਰਨ ਲਈ ਲੈਂਗਗ੍ਰਾਫ ਏਜੰਟਾਂ ਦੇ ਇੱਕ ਸੰਕਲਿਤ ਸਟੇਟ ਗ੍ਰਾଫ ਨੂੰ ਤੈਨਾਤ ਕਰਦਾ ਹੈ। ਟੂଲਸ ਅਤੇ ਭੂਮਿਕਾਵਾਂ ਦਾ ਮੁਆਇਨਾ ਕਰਨ ਲਈ ਤਾਰਾਮੰਡਲ ਸਰਕਲ 'ਤੇ ਕਿਸੇ ਵੀ ਬਾਹਰੀ ਏਜੰਟ ਨੋਡ 'ਤੇ ਹੋਵਰ ਕਰੋ।",
      bpTitle: "ਇੰਟਰਐਕਟਿਵ ਯੋਜನಾਬੱਧ ਬਲੂਪ੍ਰਿੰտ",
      bpTag: "ਕਿਸਾਨਮਿੱਤਰ ਪ੍ਰਣਾਲੀ ਆਰਕੀਟੈਕਚਰ",
      bpClose: "ਬਲੂਪ੍ਰਿੰտ ਸਵੀਕਾਰ ਕਰੋ",
      stage1Title: "ਗੈਰ-ਸੰਗਠਿਤ ਇਨਪੁਟਸ",
      stage1Desc: "ਕਿਸਾਨ ਤੋਂ ਸਿੱਧੇ ਇਨਪੁਟ ਲੈਂਦਾ ਹੈ: ਖੇਤਰੀ ਆਵਾਜ਼ ਨੋਟਸ, ਪੱਤੇ ਦੇ ਸਕੈน ਅਤੇ IoT ਨਮੀ ਸੈਂਸਰ।",
      stage2Title: "ਲੈਂਗਗ੍ਰਾਫ ਸਟੇਟ ਰਾਊਟਰ",
      stage2Desc: "ਕੇਂਦਰੀ ਯੋਜನಾਕਾਰ ਰਾਊਟਿੰਗ ਕੰਪਾਈਲ ਕਰਦਾ ਹੈ। ਮੌਸਮ ਸੂਚਕਾਂਕ ਅਤੇ ਵੈਕਟਰ ਸੰਗ੍ਰਹਿ ਨੂੰ ਸਵਾਲ ਭੇਜਦਾ ਹੈ।",
      stage3Title: "ਫੈਸਲਾ ਕਾਕਪਿਟ",
      stage3Desc: "ਫਾਰਮ ਡੈਸ਼ဘੋਰਡ 'ਤੇ ਢਾਂਚਾਗਤ ਸਲਾਹ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ: ਫਸਲਾਂ ਦੀਆਂ ਸੀਮਾਵਾਂ, ਸਬਸिਡੀ ਲਿੰਕ ਅਤੇ ਹੌਟਲਾਈਨ।"
    },
    mr: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "विखुरलेली शेती.",
      heroTitle2: "एकच शब्दकोश.",
      heroSub: "जेथे पारंपारिक शेती आणि स्वायत्त संचलन एकत्र येतात. किसानमित्र थेट मातीची केलीमेट्री, स्थानिक हवामान अंदाज आणि पानावरील रोगांचे न्यूरल विश्लेषण या सर्वांचे एकत्रीकरण करून एक प्रगत कृषी डॅशबोर्ड तयार करतो।",
      launchOS: "फार्म ओएस उघडा",
      seeFeatures: "वैशिष्ट्ये पहा",
      capTitle: "सिस्टम क्षमता",
      capSubtitle: "आरोग्य स्कोअर आणि स्ट्रक्चरल ऑडिट.",
      capDesc: "गतिशील फार्म आरोग्य श्रेणी आणि उपाय नोंदी थेट लोड करा.",
      howTitle: "पायरी-दर-पायरी अंशांकन",
      howSubtitle: "आपला फार्म कसा व्यवस्थापित करावा",
      howDesc: "किसानमित्रच्या एआय-टू-किसान कार्यपद्धतीची रचना येथे शिका.",
      howBtn: "योजनाबद्ध आराखडा उघडा",
      step1Title: "स्मार्ट फार्म नोड तयार करा",
      step1Desc: "नकाशाचे घटक मोजण्यासाठी तुमचे गाव, पीक आणि जमीन क्षेत्राची नोंदणी करा.",
      step2Title: "माहिती अपलोड करा",
      step2Desc: "माती घटक मोजा किंवा पानांची छायाचित्रे रोगांच्या विश्लेषणासाठी सबमिट करा.",
      step3Title: "उपाय लूप्स कार्यान्वित करा",
      step3Desc: "हवामान, पीक उपाय, सरकारी योजना आणि थेट मंडीचे दर जाणून घ्या.",
      meshTitle: "स्वायत्त संचलन",
      meshSubtitle: "मल्टी-एजंट समन्वय मॅप",
      meshDesc: "मातीचे गुणक तपासून लैंगग्राफ तंत्रज्ञानावर कार्य करणारे नोड्स माहिती दर्शवतात.",
      bpTitle: "परस्पर आराखडा",
      bpTag: "किसानमित्र प्रणाली वास्तुकला",
      bpClose: "आराखडा स्वीकारा",
      stage1Title: "असंरचित इनपुट",
      stage1Desc: "शेतकऱ्याकडून मिळणारी थेट माहिती गोळा करते.",
      stage2Title: "लैंगग्राफ राउटर",
      stage2Desc: "माहितीचे सुयोग्य वर्गीकरण करून योजना बनवते.",
      stage3Title: "निर्णय कॉकपिट",
      stage3Desc: "डॅशबोर्डवर योग्य सल्ला आणि बाजारपेठेचे दर दर्शवते."
    },
    te: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "చెల్లాచెదురైన పొలాలు.",
      heroTitle2: "ఒక నిఘంటువు.",
      heroSub: "సాంప్రదాయ వ్యవసాయం మరియు స్వయంప్రతిపత్త సమన్వయం కలిసే చోటు. కిసాన్ మిత్ర భూమి తేమ వివరాలు, వాతావరణ నివేదికలు మరియు పంట తెగుళ్ల విశ్લેషణలను క్రోడీకరించి ఒకే డిజిటల్ కంట్రోಲ್ సెంటర్ అందిస్తుంది.",
      launchOS: "ఫార్మ్ OS ప్రారంభించండి",
      seeFeatures: "ఫీచర్లు చూడండి",
      capTitle: "వ్యవస్థ సామర్థ్యాలు",
      capSubtitle: "ఆరోగ్య స్కోర్ & తనిఖీలు.",
      capDesc: "ఖచ్చితమైన నేల పరీక్షలు, తెగుళ్ల గుర్తింపు వివరాలను పొందండి.",
      howTitle: "పద్ధతి వివరణ",
      howSubtitle: "మీ వ్యవసాయాన్ని ఎలా నిర్వహించాలి",
      howDesc: "కిసాన్ మిత్ర స్మార్ట్ అగ్రి సిస్టమ్ పద్ధతిని తెలుసుకోండి.",
      howBtn: "రూపకల్పన పటం తెరవండి",
      step1Title: "స్మార్ట్ ఫార్మ్ నోడ్ సృష్టించండి",
      step1Desc: "మీ గ్రామం పేరు, పంట మరియు విస్తీర్ణం వివరాలను నమోదు చేయండి.",
      step2Title: "టెలిమెట్రీని అందించండి",
      step2Desc: "పంట ఆకుల ఫోటోలు లేదా భూమి నేల తేమ వివరాలను నమోదు చేయండి.",
      step3Title: "ఆలోచనలను అమలు చేయండి",
      step3Desc: "మండి ధరలు, వాతావరణం మరియు సబ్సిడీల వివరాలను పొందండి.",
      meshTitle: "స్వయంప్రతిపత్త సమన్వయం",
      meshSubtitle: "మల్టి-ఏజెంట్ కోఆర్డినేషన్ మెష్",
      meshDesc: "వివిధ ప్రత్యేక ఏజెంట్లు సమన్వయంతో విశ్లేషించి రైతుకు సలహాలు ఇస్తాయి.",
      bpTitle: "ఇంటరాక్టివ్ బ్లూప్రింట్",
      bpTag: "కిసాన్‌మిత్ర సిస్టమ్ ఆర్కిటెక్చర్",
      bpClose: "బ్లూప్రింట్ ఆమోదించండి",
      stage1Title: "అన్ స్ట్రక్చర్డ్ ఇన్పుట్స్",
      stage1Desc: "నేల తేమ, ఆకు స్కాన్లు మరియు వాయిస్ ఆదేశాలను సేకరిస్తుంది.",
      stage2Title: "లాంగ్రాఫ్ రూటర్",
      stage2Desc: "ప్రత్యేక నెట్‌వర్క్‌ల ద్వారా శోధనలను పూర్తి చేస్తుంది.",
      stage3Title: "నిర్ణయ కేంద్రం",
      stage3Desc: "సహాయక సలహాలు మరియు మండి ధరలను రైతుకు అందిస్తుంది."
    },
    ta: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "சிதறிய பண்ணைகள்.",
      heroTitle2: "ஒரு அகராதி.",
      heroSub: "பாரம்பரிய விவசாயமும் தன்னாட்சி ஒருங்கிணைப்பும் இணையும் இடம். கிசான்மித்ரா மண் தரவுகள், உள்ளூர் வானிலை தகவல்கள் மற்றும் இலை நோய் பகுப்பாய்வுகளை ஒருங்கிணைத்து சிறந்த பண்ணை மேலாண்மை அமைப்பை வழங்குகிறது.",
      launchOS: "பண்ணை OS-ஐ துவக்கு",
      seeFeatures: "அம்சங்களை காண்க",
      capTitle: "கணினி திறன்கள்",
      capSubtitle: "ஆரோக்கிய அளவீடுகள் & தணிக்கைகள்.",
      capDesc: "பண்ணை ஆரோக்கியம், மண் அளவீடுகள் மற்றும் தீர்வு பதிவுகளை பெறுக.",
      howTitle: "வழிமுறை அமைப்புகள்",
      howSubtitle: "பண்ணையை எவ்வாறு நிர்வகிப்பது",
      howDesc: "கிசான்மித்ராவின் செயற்கை நுண்ணறிவு விவசாய வழிமுறையை அறியுங்கள்.",
      howBtn: "வரைபட அமைப்பை காண்க",
      step1Title: "ஸ்மார்ட் பண்ணை முனையத்தை உருவாக்கு",
      step1Desc: "வடிவமைப்புகளை சரிசெய்ய உங்கள் கிராமம், பயிர் வகை மற்றும் நில அளவை உள்ளிடவும்.",
      step2Title: "விவரங்களை பதிவேற்றவும்",
      step2Desc: "மண் அளவீடுகளை கண்காணிக்கவும் அல்லது இலை நோய் பகுப்பாய்விற்கு புகைப்படம் எடுக்கவும்.",
      step3Title: "ஆலோசனைகளை செயல்படுத்து",
      step3Desc: "வானிலை, பயிர் தீர்வுகள், அரசு திட்டங்கள் மற்றும் மண்டி விலைகளை பெறுக.",
      meshTitle: "தன்னாட்சி ஒருங்கிணைப்பு",
      meshSubtitle: "முகவர் ஒருங்கிணைப்பு கட்டமைப்பு",
      meshDesc: "பல்வேறு சிறப்பு முகவர்கள் இணைந்து விவசாயிகளுக்கு தேவையான பரிந்துரைகளை வழங்குகின்றன.",
      bpTitle: "ஊடாடும் வரைபடம்",
      bpTag: "கிசான்மித்ரா கணினி வடிவமைப்பு",
      bpClose: "அமைப்பை உறுதிசெய்",
      stage1Title: "கட்டமைக்கப்படாத உள்ளீடுகள்",
      stage1Desc: "குரல் பதிவுகள், இலை ஸ்கேன்கள் மற்றும் மண் தரவுகளை பெறுகிறது.",
      stage2Title: "லாங்க்ராப் ரூட்டர்",
      stage2Desc: "நுண்ணறிவு தேடல்கள் மூலம் சிறந்த வழிகளை கண்டறிகிறது.",
      stage3Title: "முடிவு மையம்",
      stage3Desc: "பரிந்துரைகள் மற்றும் மண்டி விலைகளை விவசாயிகளுக்கு காட்டுகிறது."
    },
    kn: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "ಹರಡಿದ ಹೊಲಗಳು.",
      heroTitle2: "ಒಂದೇ ನಿಘಂಟು.",
      heroSub: "ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ಸಮನ್ವಯತೆಯ ಸಂಗಮ. ಕಿಸಾನ್ ಮಿತ್ರ ಕೃಷಿ ಮಣ್ಣಿನ ಟೆಲಿಮೆಟ್ರಿ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಎಲೆ ರೋಗನಿರ್ಣಯವನ್ನು ಕ್ರೋಢೀಕರಿಸಿ ಸಮಗ್ರ ಕೃಷಿ ನಿಯಂತ್ರಣ ಒದಗಿಸುತ್ತದೆ.",
      launchOS: "ಕೃಷಿ OS ಪ್ರಾರಂಭಿಸಿ",
      seeFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ",
      capTitle: "ವ್ಯವಸ್ಥೆಯ ಸಾಮರ್ಥ್ಯಗಳು",
      capSubtitle: "ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಮತ್ತು ಕೃಷಿ ತಪಾಸಣೆ.",
      capDesc: "ಖಚಿತವಾದ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ ಮತ್ತು ತಪಾಸಣೆ ವಿವರಗಳನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.",
      howTitle: "ಹಂತ-ಹಂತದ ತಪಾಸಣೆ",
      howSubtitle: "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುವುದು",
      howDesc: "ಕಿಸಾನ್ ಮಿತ್ರ ಕೃಷಿ ನಿರ್ವಹಣೆ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಇಲ್ಲಿ ತಿಳಿಯಿರಿ.",
      howBtn: "ಬ್ಲೂಪ್ರಿಂಟ್ ನಕ್ಷೆ ತೆರೆಯಿರಿ",
      step1Title: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನೋಡ್ ರಚಿಸಿ",
      step1Desc: "ನಕ್ಷೆ ಅಳತೆಗಾಗಿ ನಿಮ್ಮ ಗ್ರಾಮ, ಬೆಳೆ ಮತ್ತು ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ ದಾಖಲಿಸಿ.",
      step2Title: "ಮಾಹಿತಿ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      step2Desc: "ಮಣ್ಣಿನ ತೇವಾಂಶ ದಾಖಲಿಸಿ ಅಥವಾ ರೋಗ ವಿಶ್ಲೇಷಣೆಗೆ ಎಲೆಗಳ ಚಿತ್ರಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
      step3Title: "ಸಲಹೆಗಳನ್ನು ಜಾರಿಗೊಳಿಸಿ",
      step3Desc: "ಹವಾಮಾನ ವರದಿ, ಕೃಷಿ ರಕ್ಷಣೆ ಸಲಹೆಗಳು ಮತ್ತು ಮಂಡಿ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
      meshTitle: "ಸ್ವಯಂಚಾಲಿತ ನಿರ್ವಹಣೆ",
      meshSubtitle: "ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಸಮನ್ವಯ ಜಾಲ",
      meshDesc: "ವಿವಿಧ ವಿಶೇಷ ವ್ಯವಸ್ಥೆಗಳು ಸಮನ್ವಯದಿಂದ ಕಾರ್ಯನಿರ್ವಹಿಸಿ ರೈತರಿಗೆ ನೆರವಾಗುತ್ತವೆ.",
      bpTitle: "ಇಂಟರಾಕ್ಟಿವ್ ಬ್ಲೂಪ್ರಿಂಟ್",
      bpTag: "ಕಿಸಾನ್ ಮಿತ್ರ ಸಿಸ್ಟಮ್ ಆರ್ಕಿಟೆಕ್ಚರ್",
      bpClose: "ಬ್ಲೂಪ್ರಿಂಟ್ ಒಪ್ಪಿಕೊಳ್ಳಿ",
      stage1Title: "ಅನ್ ಸ್ಟ್ರಕ್ಚರ್ಡ್ ಇನ್ಪುಟ್ಸ್",
      stage1Desc: "ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್, ಎಲೆಗಳ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪಡೆಯುತ್ತದೆ.",
      stage2Title: "ಲ್ಯಾಂಗ್ ಗ್ರಾಫ್ ರೂಟರ್",
      stage2Desc: "ವಿಶೇಷ ನೆಟ್‌ವರ್ಕ್‌ಗಳ ಮೂಲಕ ಶೋಧನೆ ನಡೆಸುತ್ತದೆ.",
      stage3Title: "ನಿರ್ಧಾರ ಕೇಂದ್ರ",
      stage3Desc: "ಅಗತ್ಯ ಸಲಹೆಗಳು ಮತ್ತು ಮಂಡಿ ದರಗಳನ್ನು ರೈತರಿಗೆ ಒದಗಿಸುತ್ತದೆ."
    },
    gu: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "વિખરાયેલા ખેતરો.",
      heroTitle2: "એક જ શબ્દકોશ.",
      heroSub: "જ્યાં પરંપરાગત ખેતી અને સ્વાયત્ત સંચાલન મળે છે. કિસાનમિત્ર જમીનની ટેલિમેટ્રી, સ્થાનિક હવામાન આગાહી અને રોગ નિદાનને એક પ્રગત કૃષિ કંટ્રોલ પેનલમાં રૂપાંતરિત કરે છે.",
      launchOS: "ફાર્મ OS શરૂ કરો",
      seeFeatures: "વિશેષતાઓ જુઓ",
      capTitle: "સિસ્ટમ ક્ષમતાઓ",
      capSubtitle: "આરોગ્ય સ્કોર અને ઓડિટ.",
      capDesc: "ખેતી આરોગ્ય અને સુધારણા લોગ સીધા જ મેળવો.",
      howTitle: "પગલાં-દર-પગલાં કેલિબ્રેશન",
      howSubtitle: "ખેતીનું સંચાલન કેવી રીતે કરવું",
      howDesc: "કિસાનમિત્રની આર્ટિફિશિયલ ઇન્ટેલિજન્સ સંચાલન પદ્ધતિ સમજો.",
      howBtn: "નકશો અને બ્લુપ્રિન્ટ જુઓ",
      step1Title: "સ્માર્ટ ફાર્મ નોડ બનાવો",
      step1Desc: "નકશા સેટિંગ્સ માટે ગામનું નામ, પાક અને જમીનનું માપ દાખલ કરો.",
      step2Title: "ટેલિમેટ્રી ડેટા અપલોડ કરો",
      step2Desc: "જમીન ભેજ તપાસો અથવા રોગ નિદાન માટે પાંદડાના ફોટા અપલોડ કરો.",
      step3Title: "ભલામણોનો અમલ કરો",
      step3Desc: "હવામાન આગાહી, પાક સારવાર અને જીવંત મંડી ભાવો મેળવો.",
      meshTitle: "સ્વાયત્ત સંચાલન",
      meshSubtitle: "મલ્ટી-એજન્ટ કોઓર્ડિનેશન મેશ",
      meshDesc: "વિવિધ એજન્ટો એકબીજા સાથે જોડાઈને ખેડૂત માટે ભલામણો બનાવે છે.",
      bpTitle: "ઇન્ટરેક્ટિવ બ્લુપ્રિન્ટ",
      bpTag: "કિસાનમિત્ર સિસ્ટમ આર્કિટેક્ચર",
      bpClose: "બ્લુપ્રિન્ટ સ્વીકારો",
      stage1Title: "અસંરચિત ઇનપુટ્સ",
      stage1Desc: "અવાજ નોંધો, પાંદડાના સ્કેન અને જમીનની ભેજ એકત્રિત કરે છે.",
      stage2Title: "લેંગગ્રાફ રૂટર",
      stage2Desc: "ચોક્કસ નેટવર્ક્સ દ્વારા માહિતી શોધી કાઢે છે.",
      stage3Title: "નિર્ણય કેન્દ્ર",
      stage3Desc: "ડેશબોર્ડ પર યોગ્ય સલાહ અને મંડી ભાવો બતાવે છે."
    },
    bn: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "ছড়ানো খামার।",
      heroTitle2: "একটি অভিধান।",
      heroSub: "যেখানে ঐতিহ্যবাহী চাষ ও স্বয়ংক্রিয় সমন্বয় মিলিত হয়। কিসানমিত্র মাটির টেলিমেট্রি, স্থানীয় আবহাওয়া বার্তা এবং পাতার রোগ বিশ্লেষণকে একত্রিত করে একটি প্রগতিশীল কৃষি ককপিট প্রদান করে।",
      launchOS: "খামার OS চালু করুন",
      seeFeatures: "বৈশিষ্ট্য দেখুন",
      capTitle: "সিস্টেমের ক্ষমতা",
      capSubtitle: "স্বাস্থ্য স্কোর ও অডিট।",
      capDesc: "খামারের স্বাস্থ্য সূচক এবং প্রতিকারের বিবরণ সরাসরি পান।",
      howTitle: "ধাপে ধাপে ক্যালিব্রেশন",
      howSubtitle: "খামার পরিচালনা করার নিয়ম",
      howDesc: "কিসানমিত্রের এআই-টু-কৃষক কাজের পদ্ধতিটি জানুন।",
      howBtn: "ব্লুপ্রিন্ট ম্যাপ খুলুন",
      step1Title: "স্মার্ট খামার নোড তৈরি করুন",
      step1Desc: "মানচিত্র সেট করতে আপনার গ্রাম, ফসল এবং জমির পরিমাণ লিখুন।",
      step2Title: "তথ্য আপলোড করুন",
      step2Desc: "মাটির আর্দ্রতা পরীক্ষা করুন বা রোগ নির্ণয়ের জন্য পাতার ছবি দিন।",
      step3Title: "উপদেশ বাস্তবায়ন করুন",
      step3Desc: "আবহাওয়া, ফসলের প্রতিকার, সরকারি প্রকল্প এবং মান্ডির দাম জানুন।",
      meshTitle: "স্বয়ংক্রিয় সমন্বয়",
      meshSubtitle: "মাল্টি-এজেন্ট সমন্বয় নেটওয়ার্ক",
      meshDesc: "বিভিন্ন বিশেষ এজেন্ট সমন্বিতভাবে কাজ করে কৃষককে উপদেশ দেয়।",
      bpTitle: "ইন্টারেক্টিভ ব্লুপ্রিন্ট",
      bpTag: "কিসানমিত্র সিস্টেম আর্কিটেকচার",
      bpClose: "ব্লুপ্রিন্ট স্বীকার করুন",
      stage1Title: "অসংগঠিত ইনপুট",
      stage1Desc: "কণ্ঠস্বর রেকর্ড, পাতার ছবি এবং মাটির আর্দ্রতা সংগ্রহ করে।",
      stage2Title: "ল্যাংগ্রাফ রাউটার",
      stage2Desc: "বিশেষ নেটওয়ার্কের মাধ্যমে সঠিক তথ্য খুঁজে বের করে।",
      stage3Title: "সিদ্ধান্ত কেন্দ্র",
      stage3Desc: "ড্যাশবোর্ডে সঠিক উপদেশ ও মান্ডির দাম দেখায়।"
    },
    ml: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "ചിതറിക്കിടക്കുന്ന കൃഷിയിടങ്ങൾ.",
      heroTitle2: "ഒരു നിഘണ്ടു.",
      heroSub: "പരമ്പരാഗത കൃഷിയും സ്വയംഭരണാധികാരമുള്ള ഏകോപനവും സംഗമിക്കുന്ന ഇടം. കിസാൻമിത്ര കൃഷിമണ്ണ് ഈർപ്പം, കാലാവസ്ഥാ സൂചനകൾ, ഇലരോഗ നിർണ്ണയം എന്നിവയെ ഏകോപിപ്പിച്ച് സമഗ്ര ഫാം കൺട്രോൾ സെന്റർ ഒരുക്കുന്നു.",
      launchOS: "ഫാം OS ആരംഭിക്കുക",
      seeFeatures: "സവിശേഷതകൾ കാണുക",
      capTitle: "സിസ്റ്റം കഴിവുകൾ",
      capSubtitle: "ആരോഗ്യ സ്കോറും ഓഡിറ്റുകളും.",
      capDesc: "കൃഷി ആരോഗ്യ വിവരങ്ങളും പരിഹാരങ്ങളും നേരിട്ട് ലഭ്യമാക്കുക.",
      howTitle: "ഘട്ടം ഘട്ടമായുള്ള ക്രമീകരണം",
      howSubtitle: "കൃഷി എങ്ങനെ നിയന്ത്രിക്കാം",
      howDesc: "കിസാൻമിത്രയുടെ എഐ കർഷക പ്രവർത്തനങ്ങൾ മനസ്സിലാക്കുക.",
      howBtn: "ബ്ലൂപ്രിന്റ് നക്ഷത്രം തുറക്കുക",
      step1Title: "സ്മാർട്ട് ഫാം നോഡ് സൃഷ്ടിക്കുക",
      step1Desc: "ഭൂപടം സജ്ജമാക്കാൻ ഗ്രാമം, വിള, സ്ഥലത്തിന്റെ അളവ് എന്നിവ നൽകുക.",
      step2Title: "ടെലിമെട്രി നൽകുക",
      step2Desc: "മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുകയോ ഇല രോഗങ്ങൾക്കായി ഫോട്ടോ എടുക്കുകയോ ചെയ്യുക.",
      step3Title: "പരിഹാരങ്ങൾ നടപ്പിലാക്കുക",
      step3Desc: "കാലാവസ്ഥ, വിള രോഗ പരിഹാരങ്ങൾ, മണ്ടി വിലകൾ എന്നിവ നേടുക.",
      meshTitle: "സ്വയംഭരണാധികാരമുള്ള ഏകോപനം",
      meshSubtitle: "മൾട്ടി-ഏജന്റ് കോർഡിനേഷൻ മെഷ്",
      meshDesc: "വിവിധ പ്രത്യേക ഏജന്റുകൾ ഏകോപിതമായി പ്രവർത്തിച്ച് കർഷകന് നിർദ്ദേശങ്ങൾ നൽകുന്നു.",
      bpTitle: "ഇന്ററാക്ടീവ് ബ്ലൂപ്രിന്റ്",
      bpTag: "കിസാൻമിത്ര സിസ്റ്റം ആർക്കിടെക്ചർ",
      bpClose: "ബ്ലൂപ്രിന്റ് അംഗീകരിക്കുക",
      stage1Title: "അസംഘടിത വിവരങ്ങൾ",
      stage1Desc: "കർഷകനിൽ നിന്നുള്ള ശബ്ദരേഖകൾ, ഇല സ്കാനുകൾ എന്നിവ ശേഖരിക്കുന്നു.",
      stage2Title: "ലാംഗ് ഗ്രാഫ് റൂട്ടർ",
      stage2Desc: "പ്രത്യേക ശൃംഖല വഴി വിവരങ്ങൾ അന്വേഷിക്കുന്നു.",
      stage3Title: "തീരുമാന കേന്ദ്രം",
      stage3Desc: "ഡാഷ്‌ബോർഡിൽ നിർദ്ദേശങ്ങളും മണ്ടി വിലകളും കാണിക്കുന്നു."
    },
    or: {
      tagline: "खेती होगी स्मार्ट, भविष्य होगा मजबूत.",
      heroTitle1: "ବିକ୍ଷିପ୍ତ ଚାଷଜମି।",
      heroTitle2: "ଗୋଟିଏ ଅଭିଧାନ।",
      heroSub: "ଯେଉଁଠି ପାରମ୍ପରିକ କୃଷି ଏବଂ ସ୍ୱୟଂଚାଳିତ ସମନ୍ୱୟର ମିଳନ ହୁଏ । କିସାନମିତ୍ର ମାଟିର ପରୀକ୍ଷା, ସ୍ଥାନୀୟ ପାଣିପାଗ ଏବଂ ପତ୍ର ରୋଗ ନିରୂପଣକୁ ଏକତ୍ର କରି ଏକ ଉନ୍နତ କୃଷି କଣ୍ଟ୍ରୋଲ୍ ସେଣ୍ଟର୍ ପ୍ରଦାନ କରେ ।",
      launchOS: "କୃଷି OS ଆରମ୍ଭ କରନ୍ତୁ",
      seeFeatures: "ବିଶେଷତା ଦେଖନ୍ତು",
      capTitle: "ପ୍ରଣାଳୀର ଦକ୍ଷତା",
      capSubtitle: "ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର ଓ ଅଡିଟ୍।",
      capDesc: "ଜମିର ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ ଏବଂ ପ୍ରତିକାର ବିବରଣୀ ସିଧାସଳଖ ପାଆନ୍ତୁ।",
      howTitle: "ପର୍ଯ୍ୟାୟକ୍ରମିକ କାର୍ଯ୍ୟ",
      howSubtitle: "କୃଷି କିପରି ପରିଚାଳନା କରିବେ",
      howDesc: "କିସାନମିତ୍ରର କାର୍ଯ୍ୟ ପ୍ରଣାଳୀ ବିଷୟରେ ଜାଣନ୍ତୁ।",
      howBtn: "ବ୍ଲୁପ୍ରିଣ୍ଟ ମାନଚିତ୍ର ଖୋଲନ୍ତୁ",
      step1Title: "ସ୍ମାର୍ଟ କୃଷି ନୋଡ୍ ଗଠନ କରନ୍ତୁ",
      step1Desc: "ମାନଚିତ୍ର ସେଟ୍ କରିବାକୁ ଆପଣଙ୍କ ଗାଁ, ଫସଲ ଓ ଜମିର ପରିମାଣ ଲେଖନ୍ତು।",
      step2Title: "ତଥ୍ୟ ଅପଲୋଡ୍ କରନ୍ତୁ",
      step2Desc: "ମାଟିର ଆଦ୍ରତା ମାପନ୍ତୁ କିମ୍ବା ରୋଗ ଚିହ୍ନଟ ପାଇଁ ପତ୍ରର ଫଟୋ ଦିଅନ୍ତୁ।",
      step3Title: "ପରାମର୍ଶ କାର୍ଯ୍ୟକାରୀ କରନ୍ତು",
      step3Desc: "ପାଣିପାଗ, ଫସଲ ପ୍ରତିକାର, ସରକାରୀ ଯୋଜନା ଓ ମଣ୍ଡି ଦର ଜାଣନ୍ତୁ।",
      meshTitle: "ସ୍ୱୟଂଚାଳିତ ସମନ୍ୱୟ",
      meshSubtitle: "ମଲ୍ଟି-ଏଜେଣ୍ଟ ସମନ୍ୱୟ ଜାଲ",
      meshDesc: "ବିଭିନ୍ନ ବିଶେଷଜ୍ଞ ଏଜେଣ୍ଟ ମିଳିତ ଭାବେ କାର୍ଯ୍ୟ କରି ଚାଷୀଙ୍କୁ ପରାମର୍ଶ ଦିଅନ୍ତି।",
      bpTitle: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ବ୍ଲୁପ୍ରିଣ୍ଟ",
      bpTag: "କିସାନମିତ୍ର ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର",
      bpClose: "ବ୍ଲୁପ୍ରିଣ୍ଟ ସ୍ୱୀକାର କରନ୍ତು",
      stage1Title: "ଅସଂଗଠିତ ତଥ୍ୟ",
      stage1Desc: "ଚାଷୀଙ୍କ କଣ୍ଠସ୍ୱର, ପତ୍ର ସ୍କାନ ଓ ମାଟିର ଆଦ୍ରତା ସଂଗ୍ରହ କରେ।",
      stage2Title: "ଲ୍ୟାଙ୍ଗଗ୍ରାଫ୍ ରାଉଟର୍",
      stage2Desc: "ସ୍ୱତନ୍ତ୍ର ନେଟୱର୍କ ମାଧ୍ୟମରେ ସଠିକ୍ ତଥ୍ୟ ଖୋଜିଥାଏ।",
      stage3Title: "ନିର୍ଣ୍ଣୟ କେନ୍ଦ୍ର",
      stage3Desc: "ଡ୍ୟାସବୋର୍ଡରେ ସଠିକ୍ ପରାମର୍ଶ ଓ ମଣ୍ଡି ଦର ଦେଖାଏ।"
    }
  };

  const t = localization[lang] || localization["en"];

  // 10 Specialized Agents with custom styles
  const SPECIALIZED_AGENTS = [
    { 
      name: "Vision Agent", 
      icon: Activity, 
      desc: "Scans uploaded crop leaves to diagnose diseases and pest coordinates.", 
      tools: ["YOLOv11 Detector", "SAM2 Segmenter"], 
      angle: 0,
      textColor: "text-fuchsia-400",
      hoverBorder: "hover:border-fuchsia-500 hover:text-fuchsia-300",
      bgSelected: "bg-fuchsia-600",
      borderSelected: "border-fuchsia-400",
      bgText: "bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-500/20",
      badgeColor: "bg-fuchsia-400",
      strokeColor: "#d946ef",
      rgb: "217,70,239"
    },
    { 
      name: "Weather Agent", 
      icon: Radio, 
      desc: "Retrieves localized warnings and meteorological irrigation guides.", 
      tools: ["OpenWeather API", "Frost & Heat Alerts"], 
      angle: 36,
      textColor: "text-sky-400",
      hoverBorder: "hover:border-sky-500 hover:text-sky-300",
      bgSelected: "bg-sky-600",
      borderSelected: "border-sky-400",
      bgText: "bg-sky-950/40 text-sky-400 border border-sky-500/20",
      badgeColor: "bg-sky-400",
      strokeColor: "#38bdf8",
      rgb: "56,189,248"
    },
    { 
      name: "Soil Agent", 
      icon: Sprout, 
      desc: "Calibrates NPK imbalances, calculates soil pH, and suggests dose adjustments.", 
      tools: ["IoT Telemetry", "pH Correction"], 
      angle: 72,
      textColor: "text-emerald-400",
      hoverBorder: "hover:border-emerald-500 hover:text-emerald-300",
      bgSelected: "bg-emerald-600",
      borderSelected: "border-emerald-400",
      bgText: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
      badgeColor: "bg-emerald-400",
      strokeColor: "#10b981",
      rgb: "16,185,129"
    },
    { 
      name: "Marketplace Agent", 
      icon: Database, 
      desc: "Tracks live mandi rates, forecasts demands, and highlights government MSPs.", 
      tools: ["Mandi Price Scraper", "Window Tracker"], 
      angle: 108,
      textColor: "text-yellow-450",
      hoverBorder: "hover:border-yellow-500 hover:text-yellow-400",
      bgSelected: "bg-yellow-600",
      borderSelected: "border-yellow-400",
      bgText: "bg-yellow-950/40 text-yellow-450 border border-yellow-500/20",
      badgeColor: "bg-yellow-450",
      strokeColor: "#eab308",
      rgb: "234,179,8"
    },
    { 
      name: "Scheme Agent", 
      icon: ShieldCheck, 
      desc: "Matches farmers to eligible PM-KISAN schemes, loans, and subsidies.", 
      tools: ["DBT Matcher", "Fasal Bima Filter"], 
      angle: 144,
      textColor: "text-teal-400",
      hoverBorder: "hover:border-teal-500 hover:text-teal-300",
      bgSelected: "bg-teal-600",
      borderSelected: "border-teal-400",
      bgText: "bg-teal-950/40 text-teal-400 border border-teal-500/20",
      badgeColor: "bg-teal-400",
      strokeColor: "#14b8a6",
      rgb: "20,184,166"
    },
    { 
      name: "Healthcare Agent", 
      icon: HeartPulse, 
      desc: "Advises critical first-aid guidelines for snake bites or pesticide exposure.", 
      tools: ["ASV Locator", "PHC Poisoning Guides"], 
      angle: 180,
      textColor: "text-rose-450",
      hoverBorder: "hover:border-rose-500 hover:text-rose-405",
      bgSelected: "bg-rose-600",
      borderSelected: "border-rose-400",
      bgText: "bg-rose-950/40 text-rose-450 border border-rose-500/20",
      badgeColor: "bg-rose-450",
      strokeColor: "#f43f5e",
      rgb: "244,63,94"
    },
    { 
      name: "Disaster Agent", 
      icon: AlertTriangle, 
      desc: "Pipes flood warnings and calculates water submergence damage scales.", 
      tools: ["SOS Dispatcher", "Damage Estimator"], 
      angle: 216,
      textColor: "text-red-400",
      hoverBorder: "hover:border-red-500 hover:text-red-305",
      bgSelected: "bg-red-600",
      borderSelected: "border-red-450",
      bgText: "bg-red-955/20 text-red-400 border border-red-500/20",
      badgeColor: "bg-red-400",
      strokeColor: "#ef4444",
      rgb: "239,68,68"
    },
    { 
      name: "Education Agent", 
      icon: GraduationCap, 
      desc: "Hosts video summaries, audio guides, and gamified farming MCQ quizzes.", 
      tools: ["TTS Synthesizer", "MCQ Reward Tally"], 
      angle: 252,
      textColor: "text-indigo-400",
      hoverBorder: "hover:border-indigo-500 hover:text-indigo-300",
      bgSelected: "bg-indigo-600",
      borderSelected: "border-indigo-400",
      bgText: "bg-indigo-950/40 text-indigo-400 border border-indigo-500/20",
      badgeColor: "bg-indigo-400",
      strokeColor: "#6366f1",
      rgb: "99,102,241"
    },
    { 
      name: "Memory Agent", 
      icon: Network, 
      desc: "Reads and writes soil, location, and crop profile data persistently.", 
      angle: 288,
      tools: ["SQLAlchemy DB", "Farmer Cache"],
      textColor: "text-violet-400",
      hoverBorder: "hover:border-violet-500 hover:text-violet-300",
      bgSelected: "bg-violet-600",
      borderSelected: "border-violet-400",
      bgText: "bg-violet-950/40 text-violet-400 border border-violet-500/20",
      badgeColor: "bg-violet-400",
      strokeColor: "#8b5cf6",
      rgb: "139,92,246"
    },
    { 
      name: "Knowledge Agent", 
      icon: Languages, 
      desc: "Executes semantic RAG searches on research manuals and government PDFs.", 
      angle: 324,
      textColor: "text-cyan-400",
      hoverBorder: "hover:border-cyan-500 hover:text-cyan-300",
      bgSelected: "bg-cyan-600",
      borderSelected: "border-cyan-400",
      bgText: "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20",
      badgeColor: "bg-cyan-400",
      strokeColor: "#06b6d4",
      rgb: "6,182,212"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#e6f4ea] relative overflow-hidden font-sans p-4 md:p-6 space-y-4 selection:bg-emerald-500 selection:text-white">
      <Preloader />

      {/* Gridline background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Navbar */}
        <nav className="glass-panel px-6 py-2.5 flex justify-between items-center bg-[#090d0a]/80 border border-white/10 rounded-full shadow-lg relative z-50">
          <div className="flex flex-col text-left">
            <span className="text-sm font-black text-white leading-none tracking-wide flex items-center gap-1 font-sans">
              <Sprout className="text-emerald-500" size={16} />
              Kisaanमित्र
            </span>
            <span className="text-[8px] font-bold text-zinc-400 mt-0.5 uppercase tracking-wide">
              {t.tagline}
            </span>
          </div>

          <div className="flex gap-4 items-center">
            {/* Community Chat nav button */}
            <Link 
              href="/community"
              className="px-3.5 py-1.5 bg-[#0a0f0c] hover:bg-white/5 border border-white/10 text-zinc-300 font-extrabold rounded-full text-[10px] transition-all flex items-center gap-1.5 shadow"
            >
              <MessageSquare size={12} className="text-emerald-400 animate-pulse" />
              Community Chat
            </Link>

            {/* Header Language Dropdown */}
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-emerald-400">
              <Globe size={11} />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)} 
                className="bg-transparent outline-none border-none text-emerald-300 cursor-pointer font-bold font-sans animate-pulse-soft"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#050806] text-white">{l.label}</option>
                ))}
              </select>
            </div>
            
            <Link 
              href="/dashboard"
              className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-full text-[10px] transition-all flex items-center gap-1 shadow"
            >
              {t.launchOS}
              <ArrowRight size={10} />
            </Link>
          </div>
        </nav>

        {/* Hero Section - covers the full default screen fold */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-white/10 min-h-[calc(100vh-80px)] py-8">
          
          {/* Left Side: Serif Headings & Tagline */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="space-y-1">
              <h1 className="text-5xl md:text-7xl font-normal font-serif tracking-tight text-white leading-[1.05]">
                {t.heroTitle1}<br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent font-serif">{t.heroTitle2}</span>
              </h1>
            </div>
            
            <p className="text-sm md:text-base text-zinc-355 max-w-lg leading-relaxed font-semibold">
              {t.heroSub}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link 
                href="/dashboard"
                className="px-6 py-3 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-lg shadow-lg hover:shadow-emerald-950 transition-all text-xs flex items-center justify-center gap-2 border border-emerald-500"
              >
                {t.launchOS}
                <ArrowRight size={12} />
              </Link>
              <a 
                href="#features"
                className="px-6 py-3 bg-transparent hover:bg-white/5 text-white font-bold rounded-lg border border-white/10 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                {t.seeFeatures}
              </a>
            </div>
          </div>

          {/* Right Side: Log terminal with typewriter logs loop */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-fuchsia-500/10 via-cyan-500/10 to-yellow-500/10 blur-xl opacity-80" />
            
            <div className="relative glass-panel bg-black/85 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#080c09] px-4 py-2.5 border-b border-white/10 flex justify-between items-center select-none font-mono">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 block"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 block"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 block"></span>
                </div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  _ TELEMETRY_STREAM // SYSTEM_ACTIVE
                </span>
                <span className="w-4"></span>
              </div>

              {/* Typewriter logs container */}
              <div className="p-4 font-mono text-[9.5px] leading-relaxed overflow-x-auto space-y-1.5 h-[210px] text-left select-text scrollbar-thin">
                {typedLogs.map((log, index) => {
                  let colorClass = "text-zinc-350";
                  if (log.includes("Kisaanमित्र Core")) colorClass = "text-white font-bold";
                  else if (log.includes("initialized successfully")) colorClass = "text-emerald-300 font-semibold";
                  else if (log.includes("Qdrant vector")) colorClass = "text-cyan-300";
                  else if (log.includes("LangGraph workflow")) colorClass = "text-white font-semibold";
                  else if (log.includes("Vision Node")) colorClass = "text-fuchsia-300";
                  else if (log.includes("MCP Server")) colorClass = "text-yellow-400 font-medium";

                  const isCurrentWritingLine = index === typedLogs.length - 1 && typedLogs.length < LOG_POOL.length;

                  return (
                    <div key={index} className="flex items-start gap-1">
                      <span className="text-cyan-500 shrink-0 select-none">→</span>
                      <span className={colorClass}>
                        {log}
                        {isCurrentWritingLine && <span className="animate-pulse">_</span>}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#080c09] border-t border-white/10 p-2.5 flex justify-between items-center text-[9px] font-bold font-mono">
                <span className="text-zinc-500 uppercase tracking-wider">telemetry_calibrator_v2.log</span>
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-1.5 py-0.5 rounded animate-pulse">100% ONLINE</span>
              </div>
            </div>
          </div>

        </section>

        {/* Features Section - Compact spacing */}
        <section id="features" className="py-10 border-b border-white/10 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">{t.capTitle}</span>
              <h2 className="text-2xl md:text-3xl font-normal font-serif text-white">{t.capSubtitle}</h2>
            </div>
            <p className="text-xs text-emerald-400 max-w-xs font-semibold leading-relaxed">
              {t.capDesc}
            </p>
          </div>

          {/* High-Fidelity 6-Card Grid (Compressed Height to h-[235px]) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1: Soil Telemetry */}
            <div className="glass-panel p-5 bg-black/40 border border-white/10 hover:border-amber-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">DATA INTEGRITY</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">schema_dump.sql</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">IoT Soil Telemetry</h3>
                <p className="text-[10.5px] text-zinc-350 font-semibold leading-normal">
                  Calibrates soil moisture, pH, and nitrogen indexes using dynamic sliders. Shows a Grade circular gauge and active alerts.
                </p>
              </div>
              
              <div className="flex items-center justify-between bg-[#0a0f0c] p-2.5 rounded-lg border border-white/10 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-450 text-[10px] font-extrabold">A+</div>
                  <div>
                    <span className="text-[9px] text-white font-bold block leading-none">NPK Status</span>
                    <span className="text-[8px] text-amber-450 font-medium">94% Accuracy</span>
                  </div>
                </div>
                <div className="w-10 bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2: Pathogen Vision */}
            <div className="glass-panel p-5 bg-black/40 border border-white/10 hover:border-fuchsia-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-fuchsia-500 uppercase tracking-wider">VISION SYSTEM</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">leaf_scan.jpeg</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Pathogen Bounding Scans</h3>
                <p className="text-[10.5px] text-zinc-355 font-semibold leading-normal">
                  Upload crop leaves to trace blight and fungal coordinates. Plotted overlays automatically render with YOLOv11 bounding metrics.
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded">
                  YOLOv11 SCANNER
                </span>
                <span className="bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded">
                  SAM2 SEGMENT
                </span>
              </div>
            </div>

            {/* Card 3: Agent Orchestration */}
            <div className="glass-panel p-5 bg-black/40 border border-white/10 hover:border-cyan-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">AI POWERED</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">langgraph.py</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Agent-to-Agent Mesh</h3>
                <p className="text-[10.5px] text-zinc-350 font-semibold leading-normal">
                  Ask queries in regional languages. Kisaanमित्र automatically orchestrates a flow among 10 agents via compiled LangGraph workflows.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-cyan-400">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                <span>10 specialized agents connected</span>
              </div>
            </div>

            {/* Card 4: Mandi Ticker */}
            <div className="glass-panel p-6 bg-black/40 border border-white/10 hover:border-yellow-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wider">MARKET RATES</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">mandi_scraper.rs</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Mandi & MSP Ticker</h3>
                <p className="text-[10.5px] text-zinc-350 font-semibold leading-normal">
                  Tracks live mandi rates, highlights government Minimum Support Prices (MSP), and calculates best selling windows.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-yellow-500/10 p-1.5 rounded border border-yellow-500/20 text-[9px] font-bold text-yellow-400 w-max">
                <span>MSP: ₹2,275</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Trend: UP ↑</span>
              </div>
            </div>

            {/* Card 5: SOS Response */}
            <div className="glass-panel p-6 bg-black/40 border border-white/10 hover:border-red-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">CRISIS RESPONSE</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">sos_broadcast.sh</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Emergency SOS Portal</h3>
                <p className="text-[10.5px] text-zinc-350 font-semibold leading-normal">
                  Flashing alert alarms that vibration-feedback phones, with hospital locators and water logs damage estimators.
                </p>
              </div>
              <div className="text-[8.5px] font-bold text-red-400 bg-red-950/40 border border-red-500/20 px-2 py-1 rounded w-max font-mono">
                SOS TRIGGER ACTIVE
              </div>
            </div>

            {/* Card 6: Semantic Vector */}
            <div className="glass-panel p-6 bg-black/40 border border-white/10 hover:border-indigo-500/30 flex flex-col justify-between h-[235px] transition-all text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">KNOWLEDGE</span>
                  <span className="bg-[#0a0f0c] border border-white/10 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">vector_db.json</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Semantic Vector Search</h3>
                <p className="text-[10.5px] text-zinc-350 font-semibold leading-normal">
                  Indexes agricultural research documents and emergency guides in a Qdrant collection, executing similarity RAG lookup.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 text-[9px] font-bold text-indigo-400 w-max">
                <Database size={10} />
                <span>Qdrant indexed collections</span>
              </div>
            </div>

          </div>
        </section>

        {/* How to Use Section (Step-by-Step interactive guide) */}
        <section id="how-to-use" className="py-10 border-b border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-widest block mb-1 font-mono">{t.howTitle}</span>
              <h2 className="text-2xl md:text-3xl font-normal font-serif text-white">{t.howSubtitle}</h2>
              <p className="text-xs text-zinc-450 mt-1 max-w-lg font-semibold leading-relaxed">
                {t.howDesc}
              </p>
            </div>
            
            {/* Interactive Blueprint Modal trigger */}
            <button 
              onClick={() => setShowBlueprint(true)}
              className="px-5 py-2.5 bg-gradient-to-tr from-fuchsia-650 to-fuchsia-500 hover:from-fuchsia-700 hover:to-fuchsia-600 text-white font-bold rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(217,70,239,0.25)] border border-fuchsia-500 font-mono cursor-pointer"
            >
              <Workflow size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
              {t.howBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-fuchsia-955/10 via-black/40 to-transparent border border-white/10 rounded-xl space-y-3 relative text-left group hover:border-fuchsia-500/30 transition-colors">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded bg-fuchsia-955/40 text-fuchsia-400 border border-fuchsia-500/20">
                  <User size={16} />
                </div>
                <span className="text-xs font-black text-fuchsia-400 font-mono tracking-widest">01 / REGISTRATION</span>
              </div>
              <h3 className="text-sm font-bold text-white">{t.step1Title}</h3>
              <p className="text-[11px] text-zinc-350 leading-relaxed font-semibold font-sans">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-cyan-950/10 via-black/40 to-transparent border border-white/10 rounded-xl space-y-3 relative text-left group hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                  <Terminal size={16} />
                </div>
                <span className="text-xs font-black text-cyan-400 font-mono tracking-widest">02 / INGESTION</span>
              </div>
              <h3 className="text-sm font-bold text-white">{t.step2Title}</h3>
              <p className="text-[11px] text-zinc-350 leading-relaxed font-semibold font-sans">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-yellow-955/10 via-black/40 to-transparent border border-white/10 rounded-xl space-y-3 relative text-left group hover:border-yellow-500/30 transition-colors">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded bg-yellow-950/40 text-yellow-500 border border-yellow-500/20">
                  <Workflow size={16} />
                </div>
                <span className="text-xs font-black text-yellow-500 font-mono tracking-widest">03 / EXECUTION</span>
              </div>
              <h3 className="text-sm font-bold text-white">{t.step3Title}</h3>
              <p className="text-[11px] text-zinc-350 leading-relaxed font-semibold font-sans">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* SVG Agent Mesh Map Section */}
        <section id="mesh" className="py-10 border-b border-white/10 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Column: Constellation SVG */}
          <div className="w-full max-w-[440px] aspect-square relative flex items-center justify-center bg-[#070b08]/30 rounded-full border border-white/5 shadow-inner select-none shrink-0">
            <svg className="absolute inset-0 w-full h-full animate-pulse-soft" viewBox="0 0 460 460">
              {SPECIALIZED_AGENTS.map((agent) => {
                const radAngle = (agent.angle * Math.PI) / 180;
                const nodeX = Math.round((centerX + radius * Math.cos(radAngle)) * 100) / 100;
                const nodeY = Math.round((centerY + radius * Math.sin(radAngle)) * 100) / 100;
                const isHovered = selectedAgent === agent.name;

                return (
                  <g key={agent.name}>
                    <line 
                      x1={centerX} 
                      y1={centerY} 
                      x2={nodeX} 
                      y2={nodeY} 
                      stroke="rgba(255, 255, 255, 0.08)" 
                      strokeWidth="1.2" 
                      strokeDasharray="4 4" 
                    />
                    {isHovered && (
                      <line 
                        x1={centerX} 
                        y1={centerY} 
                        x2={nodeX} 
                        y2={nodeY} 
                        stroke={agent.strokeColor} 
                        strokeWidth="3.2" 
                        style={{
                          strokeDasharray: '8 4',
                          animation: 'dash 12s linear infinite'
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central Node */}
            <div className="absolute z-20 w-22 h-22 rounded-full bg-emerald-950 border border-emerald-400 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Cpu className="text-emerald-400 animate-pulse mb-1" size={22} />
              <span className="text-[10px] font-black text-white leading-none font-mono">PLANNER</span>
              <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5 font-mono">Router</span>
            </div>

            {/* Surrounding Nodes */}
            {SPECIALIZED_AGENTS.map((agent) => {
              const radAngle = (agent.angle * Math.PI) / 180;
              const nodeX = Math.round((centerX + radius * Math.cos(radAngle)) * 100) / 100;
              const nodeY = Math.round((centerY + radius * Math.sin(radAngle)) * 100) / 100;
              const IconComp = agent.icon;
              const isHovered = selectedAgent === agent.name;

              return (
                <div 
                  key={agent.name}
                  onMouseEnter={() => setSelectedAgent(agent.name)}
                  onMouseLeave={() => setSelectedAgent(null)}
                  className={`absolute z-20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border ${
                    isHovered 
                      ? `${agent.bgSelected} ${agent.borderSelected} text-white scale-115` 
                      : `bg-[#040605] border-white/10 ${agent.textColor} ${agent.hoverBorder}`
                  }`}
                  style={{
                    left: `${nodeX - 20}px`,
                    top: `${nodeY - 20}px`,
                    boxShadow: isHovered ? `0 0 15px rgba(${agent.rgb}, 0.6)` : 'none'
                  }}
                >
                  <IconComp size={15} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Descriptions & Details */}
          <div className="flex-1 space-y-6 text-left w-full">
            
            {/* Clean, Unboxed Coordination Mesh Description */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block font-mono">{t.meshTitle}</span>
              <h2 className="text-2xl md:text-3xl font-normal font-serif text-white leading-tight">
                {t.meshSubtitle}
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold font-sans">
                {t.meshDesc}
              </p>
            </div>

            {/* Dynamic Card shifting color borders based on hovered node - Boxed Detail Display */}
            {(() => {
              const target = selectedAgent ? SPECIALIZED_AGENTS.find(a => a.name === selectedAgent) : null;
              
              return (
                <div 
                  className="glass-panel p-5 bg-black/60 border rounded-xl h-40 flex flex-col justify-between relative overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: target ? target.strokeColor : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: target ? `0 0 25px rgba(${target.rgb}, 0.15)` : 'none'
                  }}
                >
                  {target ? (
                    <div className="space-y-3 font-mono">
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                        <div className={`p-1.5 rounded-lg ${target.bgText}`}>
                          <target.icon size={15} />
                        </div>
                        <span className="text-xs font-black text-white">{target.name}</span>
                        <span className={`text-[8px] font-black ${target.badgeColor} text-black px-1.5 py-0.5 rounded ml-auto font-mono`}>A2A NODE</span>
                      </div>
                      <p className="text-[11px] text-zinc-355 font-semibold leading-relaxed font-sans">{target.desc}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {target.tools?.map((tool: string, idx: number) => (
                          <span key={idx} className={`${target.bgText} font-bold text-[8px] px-2 py-0.5 rounded font-mono`}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center text-center text-xs text-zinc-500 font-semibold gap-1 font-mono">
                      <Server size={18} className="animate-pulse text-emerald-500" />
                      <span>[HOVER_NODES_TO_INSPECT_METADATA]</span>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 font-mono">
              <Network size={12} className="text-emerald-555 animate-pulse" />
              <span>IoT telemetry array buffers & Qdrant vector index loaded.</span>
            </div>
          </div>

        </section>

        {/* IDE / Agent Integration Section */}
        <section id="integration" className="py-10 border-b border-white/10 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-4 text-left">
            <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-widest block font-mono">SECURE INTERFACES</span>
            <h2 className="text-2xl md:text-3xl font-normal font-serif text-white">Kisaanमित्र in your workspace.</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold max-w-md">
              Connect via Model Context Protocol (MCP) servers and query your farm telemetry, check crop advisories, and ask questions of autonomous agents directly from your developer workspace.
            </p>

            <div className="flex gap-2 font-mono">
              {[].map((t) => (
                <span key={t} className="bg-emerald-950/40 border border-white/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-transparent blur-md" />
            
            <div className="relative glass-panel bg-black/85 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#080c09] px-4 py-2.5 border-b border-white/10 flex justify-between items-center select-none font-mono">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 block"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 block"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 block"></span>
                </div>
                <span className="text-[9px] font-bold text-zinc-400">cursor/mcp.json</span>
                <span className="w-4"></span>
              </div>

              <div className="p-4 font-mono text-[9.5px] text-zinc-350 leading-relaxed overflow-x-auto space-y-1 text-left select-text">
                <div><span className="text-purple-400">{"{"}</span></div>
                <div className="pl-4"><span className="text-emerald-400">"mcpServers"</span>: <span className="text-purple-400">{"{"}</span></div>
                <div className="pl-8"><span className="text-emerald-400">"kisaan_mcp"</span>: <span className="text-purple-400">{"{"}</span></div>
                <div className="pl-12"><span className="text-emerald-400">"command"</span>: <span className="text-yellow-400">"python"</span>,</div>
                <div className="pl-12"><span className="text-emerald-400">"args"</span>: <span className="text-purple-400">["app/mcp/mcp_server.py"]</span></div>
                <div className="pl-8"><span className="text-purple-400">{"}"}</span></div>
                <div className="pl-4"><span className="text-purple-400">{"}"}</span></div>
                <div><span className="text-purple-400">{"}"}</span></div>
              </div>
              
              <div className="bg-[#080c09] border-t border-white/10 p-2.5 text-[9px] font-bold text-emerald-400 flex flex-wrap gap-1.5 font-mono select-none">
                <span className="text-zinc-500 mr-2 flex items-center gap-1"><Terminal size={12} /> Exposing:</span>
                {["fetch_weather", "locate_mandis", "query_schemes"].map((tool: string) => (
                  <span key={tool} className="bg-emerald-600 text-black px-1.5 py-0.5 rounded font-black font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Footer Banner & Links */}
        <section className="py-10 relative z-10">
          
          <div className="glass-panel p-10 bg-gradient-to-tr from-emerald-955/10 via-black to-[#080c09] border border-white/10 rounded-2xl text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 to-transparent pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl font-normal font-serif text-white max-w-xl mx-auto leading-tight">
              Your farm, optimized with AI in seconds.
            </h2>
            <p className="text-xs text-zinc-355 max-w-md mx-auto font-semibold leading-relaxed">
              Calibrate soil sensors, segment leaf pathogen diseases, forecast mandi price trends, and match government subsidies instantly.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <Link 
                href="/dashboard"
                className="px-6 py-3 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-lg text-xs transition-all flex items-center gap-1 shadow-md shadow-emerald-950/50 border border-emerald-500"
              >
                Launch Farm OS
                <ArrowRight size={10} />
              </Link>
              <Link 
                href="/dashboard"
                className="px-6 py-3 bg-black hover:bg-white/5 text-white font-bold rounded-lg border border-white/10 text-xs transition-all"
              >
                Open Dashboard
              </Link>
            </div>
          </div>

          {/* Sleek, colorful footer layout with neon division line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-yellow-500 opacity-25 mt-10 mb-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left text-xs font-sans">
            <div className="space-y-3 col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 text-white font-black">
                <Sprout size={16} className="text-fuchsia-400" />
                <span>Kisaanमित्र</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                AI-powered crop disease detection, soil moisture telemetry, and multi-agent coordination for smart Indian farmers.
              </p>
            </div>
            
            <div>
              <span className="font-bold text-fuchsia-450 block mb-2 uppercase tracking-wider text-[9px] font-mono">OS Features</span>
              <ul className="space-y-1.5 text-[10px] text-zinc-400 font-semibold">
                <li><Link href="/dashboard" className="hover:text-fuchsia-400 transition-colors">IoT Telemetry</Link></li>
                <li><Link href="/dashboard" className="hover:text-fuchsia-400 transition-colors">Pathogen Vision</Link></li>
                <li><Link href="/dashboard" className="hover:text-fuchsia-400 transition-colors">Weather Guides</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-cyan-400 block mb-2 uppercase tracking-wider text-[9px] font-mono">Platform</span>
              <ul className="space-y-1.5 text-[10px] text-zinc-400 font-semibold">
                <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">OS Dashboard</Link></li>
                <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Agent Mesh</Link></li>
                <li><Link href="/developers" className="hover:text-cyan-400 transition-colors">Meet the Developers</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-yellow-450 block mb-2 uppercase tracking-wider text-[9px] font-mono">Integrations</span>
              <ul className="space-y-1.5 text-[10px] text-zinc-400 font-semibold">
                <li><a href="#integration" className="hover:text-yellow-400 transition-colors">MCP Setup</a></li>
                <li><Link href="/dashboard" className="hover:text-yellow-400 transition-colors">Mandi Prices</Link></li>
                <li><Link href="/dashboard" className="hover:text-yellow-400 transition-colors">Krishi Academy</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center text-[9px] text-zinc-650 font-bold py-6 border-t border-white/5 mt-8 font-mono select-none">
            © 2026 KISAANMITRA. ALL RIGHTS RESERVED.
          </div>
        </section>

      </div>

      {/* Interactive Flowchart Walkthrough Modal */}
      {showBlueprint && (
        <div className="fixed inset-0 bg-black/85 z-[99999] backdrop-blur-md flex items-center justify-center p-4 select-none">
          <div className="glass-panel w-full max-w-4xl p-5 md:p-6 bg-[#070b08]/95 border border-white/10 rounded-2xl flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.18)] relative overflow-hidden animate-pulse-soft">
            
            {/* Ambient background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3 relative z-10">
              <div className="text-left space-y-0.5">
                <span className="text-[7.5px] font-black text-emerald-450 border border-emerald-500/20 bg-emerald-950/40 px-2 py-0.5 rounded-full w-max block font-mono animate-pulse">
                  {t.bpTag}
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">{t.bpTitle}</h3>
              </div>

              {/* Language switcher inside the popup modal */}
              <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 text-[9.5px] font-mono text-emerald-400 ml-4">
                <Globe size={11} className="text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)} 
                  className="bg-transparent outline-none border-none text-emerald-300 cursor-pointer font-bold font-sans"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#050806] text-white">{l.label}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={() => setShowBlueprint(false)}
                className="p-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-3"
              >
                <X size={14} />
              </button>
            </div>

            {/* Flowchart Schematic Layout */}
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 my-3 relative z-10 overflow-visible w-full">
              
              {/* Stage 1 Ingestion Box */}
              <div className="flex-1 glass-panel p-4 bg-gradient-to-br from-fuchsia-955/15 via-black/40 to-transparent border border-fuchsia-500/35 rounded-xl flex flex-col justify-between shadow-[0_0_15px_rgba(217,70,239,0.06)] text-left min-h-[175px]">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pb-1 border-b border-white/5 font-mono">
                    <span className="text-[8.5px] font-bold text-fuchsia-400">STAGE_01 // INGESTION</span>
                    <Activity size={13} className="text-fuchsia-400 animate-pulse" />
                  </div>
                  <h4 className="text-xs font-black text-white font-serif">{t.stage1Title}</h4>
                  <p className="text-[9.5px] text-zinc-350 leading-relaxed font-sans font-semibold">
                    {t.stage1Desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[7.5px] font-bold text-fuchsia-400">
                  <span className="bg-fuchsia-950/40 border border-fuchsia-500/20 px-1.5 py-0.5 rounded">YOLOv11</span>
                  <span className="bg-fuchsia-950/40 border border-fuchsia-500/20 px-1.5 py-0.5 rounded">IoT NPK</span>
                </div>
              </div>

              {/* Arrow Connector 1 */}
              <div className="flex items-center justify-center shrink-0 self-center">
                {/* Horizontal on Desktop */}
                <svg className="hidden md:block w-10 h-6" viewBox="0 0 40 24">
                  <path d="M 0,12 L 32,12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 0,12 L 32,12" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="10 10" style={{
                    animation: 'dash 12s linear infinite'
                  }} />
                  <polygon points="30,6 38,12 30,18" fill="#06b6d4" />
                </svg>
                {/* Vertical on Mobile */}
                <svg className="block md:hidden w-6 h-6 my-0.5" viewBox="0 0 24 24">
                  <line x1="12" y1="0" x2="12" y2="16" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="6,12 12,18 18,12" fill="#06b6d4" />
                </svg>
              </div>

              {/* Stage 2 State Graph Routing Box */}
              <div className="flex-1 glass-panel p-4 bg-gradient-to-br from-cyan-950/10 via-black/40 to-transparent border border-cyan-500/35 rounded-xl flex flex-col justify-between shadow-[0_0_15px_rgba(6,182,212,0.06)] text-left min-h-[175px]">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pb-1 border-b border-white/5 font-mono">
                    <span className="text-[8.5px] font-bold text-cyan-400">STAGE_02 // AGENT_MESH</span>
                    <Cpu size={13} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <h4 className="text-xs font-black text-white font-serif">{t.stage2Title}</h4>
                  <p className="text-[9.5px] text-zinc-355 leading-relaxed font-sans font-semibold">
                    {t.stage2Desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[7.5px] font-bold text-cyan-400">
                  <span className="bg-cyan-950/40 border border-cyan-500/20 px-1.5 py-0.5 rounded">LangGraph</span>
                  <span className="bg-cyan-950/40 border border-cyan-500/20 px-1.5 py-0.5 rounded">Qdrant RAG</span>
                </div>
              </div>

              {/* Arrow Connector 2 */}
              <div className="flex items-center justify-center shrink-0 self-center">
                {/* Horizontal on Desktop */}
                <svg className="hidden md:block w-10 h-6" viewBox="0 0 40 24">
                  <path d="M 0,12 L 32,12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 0,12 L 32,12" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="10 10" style={{
                    animation: 'dash 12s linear infinite'
                  }} />
                  <polygon points="30,6 38,12 30,18" fill="#eab308" />
                </svg>
                {/* Vertical on Mobile */}
                <svg className="block md:hidden w-6 h-6 my-0.5" viewBox="0 0 24 24">
                  <line x1="12" y1="0" x2="12" y2="16" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="6,12 12,18 18,12" fill="#eab308" />
                </svg>
              </div>

              {/* Stage 3 Decision Cockpit Box */}
              <div className="flex-1 glass-panel p-4 bg-gradient-to-br from-yellow-955/15 via-black/40 to-transparent border border-yellow-500/35 rounded-xl flex flex-col justify-between shadow-[0_0_15px_rgba(234,179,8,0.06)] text-left min-h-[175px]">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pb-1 border-b border-white/5 font-mono">
                    <span className="text-[8.5px] font-bold text-yellow-500">STAGE_03 // DECISION_COCKPIT</span>
                    <Settings size={13} className="text-yellow-500 animate-pulse" />
                  </div>
                  <h4 className="text-xs font-black text-white font-serif">{t.stage3Title}</h4>
                  <p className="text-[9.5px] text-zinc-350 leading-relaxed font-sans font-semibold">
                    {t.stage3Desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[7.5px] font-bold text-yellow-500">
                  <span className="bg-yellow-950/40 border border-yellow-500/20 px-1.5 py-0.5 rounded">FarmMap</span>
                  <span className="bg-yellow-950/40 border border-yellow-500/20 px-1.5 py-0.5 rounded">MSP Scraper</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-[9px] text-zinc-500 font-bold border-t border-white/10 pt-3 mt-4 relative z-10 font-mono select-none">
              <span className="flex items-center gap-1 leading-none">
                <Network size={11} className="text-emerald-500 animate-pulse" />
                LangGraph routing executes loops in &lt;60s.
              </span>
              <button 
                onClick={() => setShowBlueprint(false)}
                className="bg-[#10b981] hover:bg-emerald-600 text-black px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans"
              >
                {t.bpClose}
              </button>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -120;
          }
        }
      `}</style>

    </div>
  );
}

const centerX = 230;
const centerY = 230;
const radius = 175;
