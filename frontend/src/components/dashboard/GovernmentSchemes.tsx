'use client';

import React, { useState } from 'react';
import { Landmark, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface GovernmentSchemesProps {
  schemes: any[];
  farmerProfile: any;
  activeLanguage: string;
}

export default function GovernmentSchemes({ schemes, farmerProfile, activeLanguage }: GovernmentSchemesProps) {
  const [selectedSchemeIndex, setSelectedSchemeIndex] = useState<number>(0);

  const labels: any = {
    en: {
      title: "Pradhan Mantri Schemes Hub",
      subtitle: "Eligible central and state agriculture subsidies and schemes",
      benefits: "Benefits Offered",
      eligibility: "Eligibility Criteria",
      requiredDocs: "Documents Required",
      appSteps: "Application Checklist",
      eligibleBadge: "ELIGIBLE"
    },
    hi: {
      title: "प्रधानमंत्री योजना हब",
      subtitle: "पात्र केंद्रीय और राज्य कृषि सब्सिडी और योजनाएं",
      benefits: "प्रदत्त लाभ",
      eligibility: "पात्रता मापदंड",
      requiredDocs: "आवश्यक दस्तावेज़",
      appSteps: "आवेदन चरण",
      eligibleBadge: "योग्य"
    },
    pa: {
      title: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਯੋਜਨਾਵਾਂ ਹੱਬ",
      subtitle: "ਯੋਗ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਖੇਤੀਬਾੜੀ ਸਬਸਿਡੀਆਂ ਅਤੇ ਸਕੀਮਾਂ",
      benefits: "ਮਿਲਣ ਵਾਲੇ ਲਾਭ",
      eligibility: "ਯੋਗਤਾ ਮਾਪਦੰਡ",
      requiredDocs: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
      appSteps: "ਅਰਜ਼ੀ ਦੀ ਪ੍ਰਕਿਰਿਆ",
      eligibleBadge: "ਯੋਗ"
    },
    mr: {
      title: "पंतप्रधान कृषी योजना केंद्र",
      subtitle: "पात्र केंद्रीय आणि राज्य कृषी अनुदाने व योजना",
      benefits: "मिळणारे फायदे",
      eligibility: "पात्रता निकष",
      requiredDocs: "आवश्यक कागदपत्रे",
      appSteps: "अर्ज प्रक्रिया",
      eligibleBadge: "पात्र"
    },
    te: {
      title: "ప్రధాన మంత్రి పథకాల హబ్",
      subtitle: "అర్హత కలిగిన కేంద్ర మరియు రాష్ట్ర వ్యవసాయ రాయితీలు మరియు పథకాలు",
      benefits: "అందించే ప్రయోజనాలు",
      eligibility: "అర్హత ప్రమాణాలు",
      requiredDocs: "కావలసిన పత్రాలు",
      appSteps: "దరఖాస్తు చెక్‌లిస్ట్",
      eligibleBadge: "అర్హత"
    },
    ta: {
      title: "பிரதம மந்திரி திட்டங்கள் மையம்",
      subtitle: "தகுதியான மத்திய மற்றும் மாநில விவசாய மானியங்கள் மற்றும் திட்டங்கள்",
      benefits: "வழங்கப்படும் நன்மைகள்",
      eligibility: "தகுதி வரம்பு",
      requiredDocs: "தேவையான ஆவணங்கள்",
      appSteps: "விண்ணப்ப வழிமுறைகள்",
      eligibleBadge: "தகுதியானது"
    },
    kn: {
      title: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಯೋಜನೆಗಳ ಹಬ್",
      subtitle: "ಅರ್ಹ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಕೃಷಿ ಸಹಾಯಧನಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",
      benefits: "ನೀಡಲಾಗುವ ಪ್ರಯೋಜನಗಳು",
      eligibility: "ಅರ್ಹತೆಯ ಮಾನದಂಡಗಳು",
      requiredDocs: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
      appSteps: "ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಹಂತಗಳು",
      eligibleBadge: "ಅರ್ಹತೆ"
    },
    gu: {
      title: "પ્રધાનમંત્રી યોજનાઓ હબ",
      subtitle: "પાત્ર કેન્દ્રીય અને રાજ્ય કૃષિ સબસિડી અને યોજનાઓ",
      benefits: "મળતા લાભો",
      eligibility: "યોગ્યતા માપદંડ",
      requiredDocs: "જરૂરી દસ્તાવેજો",
      appSteps: "અરજી ચેકલિસ્ટ",
      eligibleBadge: "પાત્ર"
    },
    bn: {
      title: "প্রধান মন্ত্রী কৃষি প্রকল্প হাব",
      subtitle: "যোগ্য কেন্দ্রীয় ও রাজ্য কৃষি ভর্তুকি এবং প্রকল্পসমূহ",
      benefits: "প্রদেয় সুবিধাসমূহ",
      eligibility: "যোগ্যতার মানদণ্ড",
      requiredDocs: "প্রয়োজনীয় নথিপত্র",
      appSteps: "আবেদন প্রক্রিয়া",
      eligibleBadge: "যোগ্য"
    },
    ml: {
      title: "പ്രധാനമന്ത്രി കൃഷി പദ്ധതി ഹബ്ബ്",
      subtitle: "അർഹമായ കേന്ദ്ര-സംസ്ഥാന കാർഷിക സബ്‌സിഡികളും പദ്ധതികളും",
      benefits: "ലഭിക്കുന്ന ആനുകൂല്യങ്ങൾ",
      eligibility: "യോഗ്യതാ മാനദണ്ഡങ്ങൾ",
      requiredDocs: "ആവശ്യമായ രേഖകൾ",
      appSteps: "അപേക്ഷാ നടപടികൾ",
      eligibleBadge: "അർഹത"
    },
    or: {
      title: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଯୋଜନା ହବ୍",
      subtitle: "ଯୋଗ୍ୟ କେନ୍ଦ୍ରୀୟ ଏବଂ ରାଜ୍ୟ କୃଷି ସବସିଡି ଓ ଯୋଜନା",
      benefits: "ମିଳୁଥିବା ସୁବିଧା",
      eligibility: "ଯୋଗ୍ୟତା ମାପଦଣ୍ଡ",
      requiredDocs: "ଆବଶ୍ୟକ ଦସ୍ତାବେଜ",
      appSteps: "ଆବେଦନ ପ୍ରକ୍ରିୟା",
      eligibleBadge: "ଯୋଗ୍ୟ"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  const DEFAULT_SCHEMES = [
    {
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      benefits: "Rs. 6,000 per year in three equal installments directly to bank accounts.",
      eligibility: "Small and marginal landholding farmer families with cultivable land up to 2 hectares.",
      documents: ["Aadhaar Card", "Land ownership papers (Khasra Khatauni)", "Bank Passbook"],
      steps: ["Register on PM-KISAN Portal", "Upload land documents", "Submit Aadhaar & Bank info", "Aadhar verification by state government"]
    },
    {
      name: "PM Fasal Bima Yojana (Crop Insurance)",
      benefits: "Comprehensive insurance coverage against crop damage from sowing to harvest.",
      eligibility: "All farmers growing notified crops in notified areas (including tenant farmers).",
      documents: ["Land records", "Sowing certificate (Girdawari)", "Aadhaar Card", "Bank passbook"],
      steps: ["Register on Fasal Bima portal", "Submit sowing certificate", "Pay premium (1.5%-2% for food crops)", "Receive policy certificate"]
    },
    {
      name: "Subsidized Agriculture Machinery Scheme",
      benefits: "40% to 80% direct subsidy on tractors, tillers, solar water pumps, and drones.",
      eligibility: "Registered farmers with land holding, priority to women and SC/ST farmers.",
      documents: ["Land certificate", "Aadhaar Card", "Tractor registration (for machinery)", "Bank Details"],
      steps: ["Apply on State DBT Portal", "Obtain pre-approval from department", "Purchase machinery from dealer", "Submit invoice for subsidy release"]
    }
  ];

  const activeSchemes = schemes && schemes.length > 0 ? schemes : DEFAULT_SCHEMES;
  const currentScheme = activeSchemes[selectedSchemeIndex] || activeSchemes[0];

  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-emerald-950/10 to-transparent">
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Landmark className="text-emerald-500" size={20} />
            {t.title}
          </h2>
          <p className="text-xs text-emerald-400/80">{t.subtitle}</p>
        </div>

        {/* Tab Row of Scheme Names */}
        <div className="flex flex-col gap-1.5 mb-4">
          {activeSchemes.map((scheme, i) => (
            <button
              key={i}
              onClick={() => setSelectedSchemeIndex(i)}
              className={`w-full text-left p-3 rounded-lg text-xs font-bold transition-all border flex justify-between items-center ${
                selectedSchemeIndex === i 
                  ? 'bg-emerald-650 text-black border-emerald-500 shadow-sm shadow-emerald-950 font-black' 
                  : 'bg-[#0a0f0c] hover:bg-emerald-950/20 text-emerald-305 border-white/5'
              }`}
            >
              <span className="truncate pr-2">{scheme.name}</span>
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                selectedSchemeIndex === i ? 'bg-white text-emerald-600' : 'bg-emerald-950 text-emerald-400 border border-white/10'
              }`}>
                {t.eligibleBadge}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Scheme Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-[#0a0f0c] border border-white/5 rounded-lg p-3">
              <span className="text-[9px] font-bold text-emerald-400 block uppercase tracking-wider mb-1">{t.benefits}</span>
              <p className="text-xs text-white font-semibold leading-relaxed">{currentScheme.benefits}</p>
            </div>
            
            <div className="bg-[#0a0f0c] border border-white/5 rounded-lg p-3">
              <span className="text-[9px] font-bold text-emerald-400 block uppercase tracking-wider mb-1">{t.eligibility}</span>
              <p className="text-xs text-white font-semibold leading-relaxed">{currentScheme.eligibility}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-[#0a0f0c] border border-white/5 rounded-lg p-3">
              <span className="text-[9px] font-bold text-emerald-400 block uppercase tracking-wider mb-1.5 flex items-center gap-1 font-mono">
                <FileText size={12} />
                {t.requiredDocs}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentScheme.documents.map((doc: string, i: number) => (
                  <span key={i} className="bg-emerald-950/40 border border-white/5 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0f0c] border border-white/5 rounded-lg p-3">
              <span className="text-[9px] font-bold text-emerald-400 block uppercase tracking-wider mb-2">{t.appSteps}</span>
              <div className="space-y-1.5">
                {currentScheme.steps.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-emerald-250 font-semibold leading-tight">
                    <CheckCircle2 size={12} className="text-emerald-550 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2 bg-[#0a0f0c] border border-white/5 p-2.5 rounded-lg text-[10px] text-emerald-405 font-semibold">
        <AlertCircle size={14} className="text-emerald-500 shrink-0" />
        <span>Subsidies are disbursed directly via DBT (Direct Benefit Transfer) into linked Aadhaar bank accounts.</span>
      </div>
    </div>
  );
}
