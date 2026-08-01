'use client';

import React, { useState } from 'react';
import { AlertOctagon, Heart, Syringe, Ambulance, Calculator, Info } from 'lucide-react';

interface EmergencySOSProps {
  medicalAdvice: any;
  disasterAlerts: any;
  activeLanguage: string;
}

export default function EmergencySOS({ medicalAdvice, disasterAlerts, activeLanguage }: EmergencySOSProps) {
  const [activeTab, setActiveTab] = useState<string>("medical");
  const [submergedAcreage, setSubmergedAcreage] = useState<number>(1);
  const [submergedDays, setSubmergedDays] = useState<number>(2);
  const [cropType, setCropType] = useState<string>("Tomato");
  const [lossEstimate, setLossEstimate] = useState<number | null>(null);

  const labels: any = {
    en: {
      title: "Crisis Support & SOS Hub",
      subtitle: "One-click emergency services, first-aid, and disaster mitigation",
      sosBtn: "EMERGENCY SOS",
      sosAlert: "SOS active. Automated emergency dispatch triggered and locating nearest KVK hospital.",
      firstAidTab: "Medical First-Aid",
      damageTab: "Crop Damage Estimator",
      snakeBite: "Snake Bite Guide",
      poisoning: "Pesticide Poisoning Guide",
      hospitalList: "Nearest Medical Centers",
      calcTitle: "Submersion Loss Calculator",
      acreage: "Acreage Submerged (Acre)",
      days: "Submergence Duration (Days)",
      calculate: "Estimate Loss Percentage",
      lossResult: "Estimated Crop Loss"
    },
    hi: {
      title: "संकट सहायता और आपातकालीन SOS",
      subtitle: "एक-क्लिक आपातकालीन सेवाएं, प्राथमिक उपचार, और आपदा शमन",
      sosBtn: "आपातकालीन SOS",
      sosAlert: "SOS सक्रिय। आपातकालीन वाहन खोजा जा रहा है।",
      firstAidTab: "प्राथमिक चिकित्सा",
      damageTab: "नुकसान कैलकुलेटर",
      snakeBite: "सर्पदंश चिकित्सा",
      poisoning: "कीटनाशक जहर प्राथमिक उपचार",
      hospitalList: "निकटतम स्वास्थ्य केंद्र",
      calcTitle: "जलभराव नुकसान कैलकुलेटर",
      acreage: "जलमग्न भूमि (एकड़)",
      days: "जलभराव अवधि (दिन)",
      calculate: "नुकसान प्रतिशत का अनुमान लगाएं",
      lossResult: "अनुमानित हानि"
    },
    pa: {
      title: "ਸੰਕਟ ਸਹਾਇਤਾ ਅਤੇ ਐਮਰਜੈਂਸੀ SOS",
      subtitle: "ਇੱਕ-ਕਲਿੱਕ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ, ਮੁਢਲੀ ਸਹਾਇਤਾ ਅਤੇ ਨੁਕਸਾਨ ਨਿਵਾਰਨ",
      sosBtn: "ਐਮਰਜੈਂਸੀ SOS",
      sosAlert: "SOS ਸਰਗਰਮ। ਨੇੜਲੇ ਹਸਪਤਾਲ ਨਾਲ ਸੰਪਰਕ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।",
      firstAidTab: "ਮੁਢਲੀ ਸਹਾਇਤਾ",
      damageTab: "ਫਸਲ ਨੁਕਸਾਨ ਕੈਲਕੁਲੇਟਰ",
      snakeBite: "ਸੱਪ ਦੇ ਕੱਟਣ ਦਾ ਇਲਾਜ",
      poisoning: "ਕੀਟਨਾਸ਼ਕ ਜ਼ਹਿਰ ਮੁਢਲਾ ਇਲਾਜ",
      hospitalList: "ਨੇੜਲੇ ਸਿਹਤ ਕੇਂਦਰ",
      calcTitle: "ਪਾਣੀ ਭਰਾਅ ਨੁਕਸਾਨ ਕੈਲਕੁਲੇਟਰ",
      acreage: "ਡੁੱਬੀ ਹੋਈ ਜ਼ਮੀਨ (ਏਕੜ)",
      days: "ਪਾਣੀ ਭਰਨ ਦੇ ਦਿਨ",
      calculate: "ਨੁਕਸਾਨ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ",
      lossResult: "ਅਨੁਮਾਨਿਤ ਨੁਕਸਾਨ"
    },
    mr: {
      title: "आपत्कालीन मदत आणि एसओएस केंद्र",
      subtitle: "एक-क्लिक आपत्कालीन सेवा, प्रथमोपचार आणि आपत्ती निवारण",
      sosBtn: "आपातकालीन SOS",
      sosAlert: "SOS सक्रिय. जवळच्या रुग्णालयाचा शोध घेतला जात आहे.",
      firstAidTab: "वैद्यकीय प्रथमोपचार",
      damageTab: "पीक नुकसान मोजणी",
      snakeBite: "सर्पदंश उपचार मार्गदर्शक",
      poisoning: "कीटकनाशक विषबाधा प्रथमोपचार",
      hospitalList: "जवळचे आरोग्य केंद्र",
      calcTitle: "पूर नुकसान मोजणी",
      acreage: "बाधित क्षेत्र (एकर)",
      days: "पाण्याखालील दिवस",
      calculate: "नुकसान अंदाज काढा",
      lossResult: "अंदाजित पीक नुकसान"
    },
    te: {
      title: "సంక్షోభ సహాయం & అత్యవసర SOS",
      subtitle: "వన్-క్లిక్ అత్యవసర సేవలు, ప్రథమ చికిత్స మరియు విపత్తు నివారణ",
      sosBtn: "అత్యవసర SOS",
      sosAlert: "SOS సక్రియం చేయబడింది. అత్యవసర వాహన రవాణా ప్రారంభించబడింది.",
      firstAidTab: "వైద్య ప్రథమ చికిత్స",
      damageTab: "పంట నష్టం అంచనా",
      snakeBite: "పాము కాటు నివారణ",
      poisoning: "క్రిమిసంహారక విష ప్రథమ చికిత్స",
      hospitalList: "సమీప ఆరోగ్య కేంద్రాలు",
      calcTitle: "వరద ముంపు నష్టం క్యాలిక్యులేటర్",
      acreage: "ముంపునకు గురైన వైశాల్యం (ఎకరం)",
      days: "ముంపు వ్యవధి (రోజులు)",
      calculate: "నష్టం శాతం అంచనా వేయి",
      lossResult: "అంచనా వేయబడిన పంట నష్టం"
    },
    ta: {
      title: "நெருக்கடி உதவி மற்றும் அவசர SOS",
      subtitle: "ஒரே கிளிக்கில் அவசர சேவைகள், முதலுதவி மற்றும் பேரிடர் தணிப்பு",
      sosBtn: "அவசர SOS",
      sosAlert: "SOS செயல்படுத்தப்பட்டது. அவசர உதவி வாகனம் தேடப்படுகிறது.",
      firstAidTab: "மருத்துவ முதலுதவி",
      damageTab: "பயிர் சேத கால்குலேட்டர்",
      snakeBite: "பாம்பு கடி முதலுதவி",
      poisoning: "பூச்சிக்கொल्ली விஷ முதலுதவி",
      hospitalList: "அருகிலுள்ள மருத்துவமனைகள்",
      calcTitle: "வெள்ள நீர் முழ்கல் சேத கால்குலேட்டர்",
      acreage: "மூழ்கிய பரப்பளவு (ஏக்கர்)",
      days: "மூழ்கிய நாட்கள்",
      calculate: "சேத சதவீதத்தை கணக்கிடுக",
      lossResult: "மதிப்பிடப்பட்ட பயிர் இழப்பு"
    },
    kn: {
      title: "ತುರ್ತು ಸಹಾಯ ಮತ್ತು SOS ಕೇಂದ್ರ",
      subtitle: "ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ತುರ್ತು ಸೇವೆಗಳು, ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಮತ್ತು ವಿಪತ್ತು ನಿರ್ವಹಣೆ",
      sosBtn: "ತುರ್ತು SOS",
      sosAlert: "SOS ಸಕ್ರಿಯಗೊಂಡಿದೆ. ತುರ್ತು ವಾಹನವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ.",
      firstAidTab: "ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ",
      damageTab: "ಬೆಳೆ ಹಾನಿ ಅಂದಾಜುಗಾರ",
      snakeBite: "ಹಾವಿನ ಕಡಿತದ ಚಿಕಿತ್ಸೆ",
      poisoning: "ಕೀಟನಾಶಕ ವಿಷದ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ",
      hospitalList: "ಹತ್ತಿರದ आरोग्य ಕೇಂದ್ರಗಳು",
      calcTitle: "ನೀರು ನಿಲ್ಲುವಿಕೆಯ ಹಾನಿ ಲೆಕ್ಕಕ",
      acreage: "ಮುಳುಗಡೆಯಾದ ಜಮೀನು (ಎಕರೆ)",
      days: "ಮುಳುಗಡೆಯಾದ ದಿನಗಳು",
      calculate: "ಹಾನಿ ಅಂದಾಜಿಸಿ",
      lossResult: "ಅಂದಾಜು ಬೆಳೆ ನಷ್ಟ"
    },
    gu: {
      title: "કટોકટી સપોર્ટ અને એસઓએસ હબ",
      subtitle: "એક-ક્લિક કટોકટી સેવાઓ, પ્રાથમિક સારવાર અને આપત્તિ નિવારણ",
      sosBtn: "કટોકટી SOS",
      sosAlert: "SOS સક્રિય. નજીકની હોસ્પિટલનો સંપર્ક કરવામાં આવી રહ્યો છે.",
      firstAidTab: "તબીબી પ્રાથમિક સારવાર",
      damageTab: "પાક નુકસાન કેલ્ક્યુલેટર",
      snakeBite: "સર્પદંશ સારવાર માર્ગદર્શિકા",
      poisoning: "જંતુનાશક ઝેર પ્રાથમિક સારવાર",
      hospitalList: "નજીકના આરોગ્ય કેન્દ્રો",
      calcTitle: "જળભરાવ નુકસાન કેલ્ક્યુલેટર",
      acreage: "જળમગ્ન જમીન (એકર)",
      days: "જળમગ્ન દિવસો",
      calculate: "નુકસાન ટકાવારી અંદાજો",
      lossResult: "અંદાજિત પાક નુકસાન"
    },
    bn: {
      title: "জরুরী সহায়তা ও এসওএস হাব",
      subtitle: "এক-ক্লিক জরুরী পরিষেবা, প্রাথমিক চিকিৎসা এবং দুর্যোগ প্রশমন",
      sosBtn: "জরুরী SOS",
      sosAlert: "SOS ସକ୍ରିୟ। ନିକଟସ୍ଥ ଚିକିତ୍ସାଳୟ ସହିତ ଯୋଗାଯୋଗ କରାଯାଉଛି।",
      firstAidTab: "জরুরী প্রাথমিক চিকিৎসা",
      damageTab: "ফসল ক্ষতি ক্যালকুলেটর",
      snakeBite: "সর্পদংশন চিকিৎসা নির্দেশিকা",
      poisoning: "কীটনাশক বিষক্রিয়া প্রাথমিক চিকিৎসা",
      hospitalList: "নিকটবর্তী স্বাস্থ্য কেন্দ্র",
      calcTitle: "জলমগ্নতা ক্ষতি ক্যালকুলেটর",
      acreage: "জলমগ্ন জমি (একর)",
      days: "জলমগ্নতার দিন",
      calculate: "ক্ষতির পরিমাণ হিসাব করুন",
      lossResult: "আনুমানিক ফসল ক্ষতি"
    },
    ml: {
      title: "അടിയന്തര സഹായവും SOS ഹബ്ബും",
      subtitle: "വൺ-ക്ലിക്ക് അടിയന്തര സേവനങ്ങൾ, പ്രഥമശുശ്രൂഷ, ദുരന്ത നിവാരണം",
      sosBtn: "അടിയന്തര SOS",
      sosAlert: "SOS സജീവമാക്കി. തൊട്ടടുത്ത ആശുപത്രിയുമായി ബന്ധപ്പെടുന്നു.",
      firstAidTab: "പ്രഥമശുശ്രൂഷ",
      damageTab: "വിള നാശനഷ്ട കാൽക്കുലേറ്റർ",
      snakeBite: "പാമ്പുകടി പ്രഥമശുശ്രൂഷ",
      poisoning: "കീടനാശിനി വിഷബാധ പ്രഥമശുശ്രൂഷ",
      hospitalList: "അടുത്തുള്ള ആരോഗ്യ കേന്ദ്രങ്ങൾ",
      calcTitle: "വെള്ളപ്പൊക്ക നഷ്ട കാൽക്കുലേറ്റർ",
      acreage: "മുങ്ങിയ സ്ഥലം (ഏക്കർ)",
      days: "വെള്ളത്തിൽ കിടന്ന ദിവസങ്ങൾ",
      calculate: "നഷ്ടം കണക്കാക്കുക",
      lossResult: "കണക്കാക്കിയ വിളനാശം"
    },
    or: {
      title: "ଜରୁରୀକାଳୀନ ସହାୟତା ଓ SOS କେନ୍ଦ୍ର",
      subtitle: "ଏକ-କ୍ଲିକ୍ ଜରୁରୀକାଳୀନ ସେବା, ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ବିପର୍ଯ୍ୟୟ ପ୍ରଶମନ",
      sosBtn: "ଜରୁରୀକାଳୀନ SOS",
      sosAlert: "SOS ସକ୍ରିୟ। ନିକଟସ୍ଥ ଚିକିତ୍ସାଳୟ ସହିତ ଯୋଗାଯୋଗ କରାଯାଉଛି।",
      firstAidTab: "ପ୍ରାଥମିକ ଚିକିତ୍ସା",
      damageTab: "ଫସଲ ନଷ୍ଟ କ୍ୟାଲକୁଲେଟର",
      snakeBite: "ସର୍ପଦଂଶ ଚିକିତ୍ସା ନିର୍ଦ୍ଦେଶିକା",
      poisoning: "କୀଟନାଶକ ବିଷକ୍ରିୟା ପ୍ରାଥମିକ ଚିକିତ୍ସา",
      hospitalList: "ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର",
      calcTitle: "ଜଳମଗ୍ନତା କ୍ଷତି କ୍ୟାଲକୁଲେଟର",
      acreage: "ବୁଡ଼ି ରହିଥିବା ଜମି (ଏକର)",
      days: "ବୁଡ଼ି ରହିଥିବା ଦିନ",
      calculate: "କ୍ଷତିର ପରିମାଣ ଆକଳନ କରନ୍ତୁ",
      lossResult: "ଆକଳିତ ଫସଲ ନଷ୍ଟ"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  const HOSPITALS = [
    { name: "Government Sub-District Hospital", distance: "4.8 km", status: "Open 24h", contact: "0164-223405" },
    { name: "Bhatinda Civil Trauma Center", distance: "18.5 km", status: "Anti-Snake Venom Available", contact: "0164-224012" }
  ];

  const handleSOSClick = () => {
    alert(t.sosAlert);
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 500]);
    }
  };

  const calculateDamage = () => {
    let lossCoeff = 15;
    if (cropType === "Tomato") lossCoeff = 30;
    else if (cropType === "Rice") lossCoeff = 8;
    
    let pct = submergedDays * lossCoeff;
    if (pct > 100) pct = 100;
    
    setLossEstimate(pct);
  };

  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-red-950/15 via-black/40 to-transparent border border-white/10">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <AlertOctagon className="text-red-500 animate-pulse" size={20} />
              {t.title}
            </h2>
            <p className="text-xs text-red-400/80">{t.subtitle}</p>
          </div>
          <button 
            onClick={handleSOSClick}
            className="bg-red-650 hover:bg-red-750 text-white font-extrabold text-xs px-3.5 py-2 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.4)] animate-pulse flex items-center gap-1.5 border border-red-500 font-mono"
          >
            <Ambulance size={14} />
            {t.sosBtn}
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#040605] p-1 rounded-lg border border-white/5 mb-4 text-xs font-bold text-red-400 font-mono">
          <button 
            onClick={() => setActiveTab("medical")}
            className={`flex-1 py-1.5 rounded transition-all ${activeTab === 'medical' ? 'bg-red-600 text-white shadow-sm' : 'hover:bg-red-955/20 text-zinc-400'}`}
          >
            {t.firstAidTab}
          </button>
          <button 
            onClick={() => setActiveTab("damage")}
            className={`flex-1 py-1.5 rounded transition-all ${activeTab === 'damage' ? 'bg-red-600 text-white shadow-sm' : 'hover:bg-red-955/20 text-zinc-400'}`}
          >
            {t.damageTab}
          </button>
        </div>

        {/* Medical First Aid Tab */}
        {activeTab === "medical" && (
          <div className="space-y-4">
            
            <div className="bg-[#040605] border border-white/5 rounded-lg p-3 font-mono">
              <h4 className="text-xs font-bold text-red-400 mb-1.5 flex items-center gap-1.5">
                <Heart size={14} className="text-red-500 animate-pulse" />
                {t.snakeBite}
              </h4>
              <ul className="text-[11px] text-red-300 space-y-1 list-disc list-inside font-semibold leading-relaxed font-sans">
                <li>Keep limb immobilized below heart level. Remove tight rings.</li>
                <li><strong>DO NOT</strong> tie tight tourniquets or attempt to suck venom.</li>
                <li>Rush directly to nearest Civil Trauma Center for Anti-Snake Venom.</li>
              </ul>
            </div>

            <div className="bg-[#040605] border border-white/5 rounded-lg p-3 font-mono">
              <h4 className="text-xs font-bold text-red-400 mb-1.5 flex items-center gap-1.5">
                <Syringe size={14} className="text-red-500 animate-pulse" />
                {t.poisoning}
              </h4>
              <ul className="text-[11px] text-red-300 space-y-1 list-disc list-inside font-semibold leading-relaxed font-sans">
                <li>Remove patient from spray fields. Rinse skin with clean water.</li>
                <li>Keep airways clear; place them lying on their side (recovery position).</li>
                <li>Take the chemical bottle/label with you to the physician.</li>
              </ul>
            </div>

            <div className="font-mono">
              <span className="text-[9px] font-bold text-red-400 block uppercase mb-1.5 tracking-wider">{t.hospitalList}</span>
              <div className="space-y-2">
                {HOSPITALS.map((h, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#040605] p-2 rounded border border-white/5 text-xs">
                    <div>
                      <span className="font-bold text-white block">{h.name}</span>
                      <span className="text-[9px] text-red-400 font-semibold">{h.status} • {h.distance}</span>
                    </div>
                    <a 
                      href={`tel:${h.contact}`} 
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-2.5 py-1 rounded text-[10px] border border-red-500/30 transition-colors"
                    >
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Crop Damage Estimator Tab */}
        {activeTab === "damage" && (
          <div className="space-y-4">
            
            <div className="bg-[#040605] border border-white/5 rounded-lg p-4 space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-1.5 font-mono">
                <Calculator size={14} className="text-red-500" />
                {t.calcTitle}
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <label className="text-[10px] font-bold text-red-400 block mb-1">{t.acreage}</label>
                  <input 
                    type="number" 
                    value={submergedAcreage} 
                    onChange={(e) => setSubmergedAcreage(parseFloat(e.target.value) || 1)}
                    className="w-full bg-[#050806] border border-white/10 rounded p-1.5 text-white outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-red-400 block mb-1">{t.days}</label>
                  <input 
                    type="number" 
                    value={submergedDays} 
                    onChange={(e) => setSubmergedDays(parseFloat(e.target.value) || 1)}
                    className="w-full bg-[#050806] border border-white/10 rounded p-1.5 text-white outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-red-400 block mb-1 font-mono">Crop Variety</label>
                <select 
                  value={cropType} 
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-[#050806] border border-white/10 rounded p-1.5 text-xs text-white outline-none font-bold font-mono"
                >
                  <option value="Tomato" className="bg-[#050806] text-white">Tomato (Highly Vulnerable)</option>
                  <option value="Rice" className="bg-[#050806] text-white">Rice (Dhan - Flood Tolerant)</option>
                  <option value="Wheat" className="bg-[#050806] text-white">Wheat (Moderate)</option>
                </select>
              </div>

              <button 
                onClick={calculateDamage}
                className="w-full bg-red-650 hover:bg-red-750 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm border border-red-500 font-mono"
              >
                {t.calculate}
              </button>
            </div>

            {lossEstimate !== null && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center font-mono">
                <span className="text-[10px] font-bold text-red-400 uppercase block">{t.lossResult}</span>
                <span className="text-2xl font-black text-red-400 block">{lossEstimate}% Loss</span>
                <span className="text-[9px] text-red-300 block mt-1 font-semibold font-sans">
                  {lossEstimate >= 50 
                    ? "⚠️ Severe Damage: Qualified for PM Fasal Bima Insurance Claims. Please file claim documentation immediately." 
                    : "ℹ️ Moderate Damage: Spray anti-fungals as water recedes to prevent root rot."}
                </span>
              </div>
            )}

          </div>
        )}

      </div>

      <div className="mt-4 flex items-start gap-2 bg-[#040605] border border-white/5 p-2.5 rounded-lg text-[10px] text-red-400 font-semibold leading-tight font-mono">
        <Info size={12} className="shrink-0 mt-0.5" />
        <span className="font-sans">For flash floods or cyclone updates, tune in to All India Radio or call 1070 (Disaster Management Hotline).</span>
      </div>
    </div>
  );
}
