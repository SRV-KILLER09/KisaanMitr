'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, HelpCircle, AlertCircle, ShoppingBag, MapPin, ClipboardList, RefreshCw } from 'lucide-react';

interface MarketpriceProps {
  marketRates: any;
  activeLanguage: string;
}

export default function Marketprice({ marketRates, activeLanguage }: MarketpriceProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
  const [loading, setLoading] = useState<boolean>(true);
  const [cropsData, setCropsData] = useState<any>(null);

  const labels: any = {
    en: {
      title: "Mandi Prices & MSP Tracker",
      subtitle: "Live market mandi prices and minimum support prices (MSP)",
      mandi: "Nearest Mandi",
      price: "Current Price",
      msp: "Govt MSP",
      trend: "Price Trend",
      demand: "Demand Forecast",
      sellWindow: "Best Time to Sell",
      selectCrop: "Select Crop Filter",
      chartTitle: "6-Month Pricing Trend (₹ / Quintal)",
      howToSellTitle: "How to Sell",
      whenToSellTitle: "When to Sell",
      whereToSellTitle: "Where to Sell",
      tradeCenterTitle: "Selling Intelligence Console",
      tickerTitle: "Live Market Tickers // All Commodities"
    },
    hi: {
      title: "मंडी भाव और एमएसपी ट्रैकर",
      subtitle: "लाइव बाजार मंडी भाव और न्यूनतम समर्थन मूल्य (MSP)",
      mandi: "निकटतम मंडी",
      price: "वर्तमान मूल्य",
      msp: "सरकारी MSP",
      trend: "मूल्य प्रवृत्ति",
      demand: "मांग का अनुमान",
      sellWindow: "बेचने का सबसे अच्छा समय",
      selectCrop: "फसल चुनें",
      chartTitle: "6-महीने का मूल्य रुझान (₹ / क्विंटल)",
      howToSellTitle: "कैसे बेचें",
      whenToSellTitle: "कब बेचें",
      whereToSellTitle: "कहाँ बेचें",
      tradeCenterTitle: "बिक्री आसूचना कंसोल",
      tickerTitle: "लाइव मार्केट टिकर // सभी जिंसों"
    },
    pa: {
      title: "ਮੰਡੀ ਭਾਅ ਅਤੇ MSP ਟਰੈਕਰ",
      subtitle: "ਲਾਈਵ ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ ਅਤੇ ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ (MSP)",
      mandi: "ਨੇੜਲੀ ਮੰਡੀ",
      price: "ਮੌਜੂਦਾ ਕੀਮਤ",
      msp: "ਸਰਕਾਰੀ MSP",
      trend: "ਕੀਮਤ ਦਾ ਰੁਝਾਨ",
      demand: "ਮੰਗ ਦਾ ਅਨੁਮਾਨ",
      sellWindow: "ਵੇਚਣ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ",
      selectCrop: "ਫਸਲ ਚੁਣੋ",
      chartTitle: "6-ਮਹੀਨੇ ਦਾ ਕੀਮਤ ਰੁਝਾਨ (₹ / ਕੁਇੰਟਲ)",
      howToSellTitle: "ਕਿਵੇਂ ਵੇਚਣਾ ਹੈ",
      whenToSellTitle: "ਕਦੋਂ ਵੇਚਣਾ ਹੈ",
      whereToSellTitle: "ਕਿੱਥੇ ਵੇਚਣਾ ਹੈ",
      tradeCenterTitle: "ਵੇਚਣ ਦੀ ਖੁਫੀਆ ਕੰਸੋल",
      tickerTitle: "ਲਾਈਵ ਮਾਰਕੀਟ ਟਿਕਰ // ਸਾਰੀਆਂ ਜਿਣਸਾਂ"
    },
    mr: {
      title: "मंडी भाव आणि एमएसपी ट्रॅकर",
      subtitle: "थेट बाजारपेठेतील मंडी भाव आणि किमान आधारभूत किंमत (MSP)",
      mandi: "जवळची बाजारपेठ",
      price: "चालू भाव",
      msp: "शासकीय MSP",
      trend: "किंमतीचा कल",
      demand: "मागणी अंदाज",
      sellWindow: "विक्रीची सर्वोत्तम वेळ",
      selectCrop: "पीक निवडा",
      chartTitle: "6-महिन्यांचा किंमत कल (₹ / क्विंटल)",
      howToSellTitle: "कसे विकायचे",
      whenToSellTitle: "कधी विकायचे",
      whereToSellTitle: "कुठे विकायचे",
      tradeCenterTitle: "विक्री गुप्तवार्ता कन्सोल",
      tickerTitle: "थेट बाजार टिकर // सर्व शेती माल"
    },
    te: {
      title: "మండి ధరలు & MSP ట్రాకర్",
      subtitle: "ప్రత్యక్ష మార్కెట్ ధరలు మరియు కనీస మద్దతు ధర (MSP)",
      mandi: "సమీప మార్కెట్",
      price: "ప్రస్తుత ధర",
      msp: "ప్రభుత్వ MSP",
      trend: "ధర ధోరణి",
      demand: "డిమాండ్ అంచనా",
      sellWindow: "విక్రయించడానికి ఉత్తమ సమయం",
      selectCrop: "పంటను ఎంచుకోండి",
      chartTitle: "6-నెలల ధర ధోరణి (₹ / క్వింటాల్)",
      howToSellTitle: "ఎలా అమ్మాలి",
      whenToSellTitle: "ఎప్పుడు అమ్మాలి",
      whereToSellTitle: "ఎక్కడ అమ్మాలి",
      tradeCenterTitle: "విక్రయాల ఇంటెలిజెన్స్ కన్సోల్",
      tickerTitle: "లైవ్ మార్కెట్ టిక్కర్లు // అన్ని సరుకులు"
    },
    ta: {
      title: "மண்டி விலைகள் மற்றும் MSP டிராக்கர்",
      subtitle: "நேரடி சந்தை மண்டி விலைகள் மற்றும் குறைந்தபட்ச ஆதரவு விலை (MSP)",
      mandi: "அருகிலுள்ள மண்டி",
      price: "தற்போதைய விலை",
      msp: "அரசு MSP",
      trend: "விலை போக்கு",
      demand: "தேவை முன்னறிவிப்பு",
      sellWindow: "விற்க சிறந்த நேரம்",
      selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
      chartTitle: "6-மாத விலை போக்கு (₹ / குவிண்டால்)",
      howToSellTitle: "எப்படி விற்பது",
      whenToSellTitle: "எப்போது விற்பது",
      whereToSellTitle: "எங்கு விற்பது",
      tradeCenterTitle: "விற்பனை நுண்ணறிவு கன்சோல்",
      tickerTitle: "நேரடி சந்தை டிக்கர்கள் // அனைத்து பொருட்கள்"
    },
    kn: {
      title: "ಮಾರುಕಟ್ಟೆ ದರಗಳು and MSP ಟ್ರ್ಯಾಕರ್",
      subtitle: "ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)",
      mandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ",
      price: "ಪ್ರಸ್ತುತ ಬೆಲೆ",
      msp: "ಸರ್ಕಾರದ MSP",
      trend: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ",
      demand: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      sellWindow: "ಮಾರಾಟ ಮಾಡಲು ಉತ್ತಮ ಸಮಯ",
      selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
      chartTitle: "6-ತಿಂಗಳ ಬೆಲೆ ಪ್ರವೃತ್ತಿ (₹ / ಕ್ವಿಂಟಲ್)",
      howToSellTitle: "ಹೇಗೆ ಮಾರಾಟ ಮಾಡುವುದು",
      whenToSellTitle: "ಯಾವಾಗ ಮಾರಾಟ ಮಾಡುವುದು",
      whereToSellTitle: "ಎಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದು",
      tradeCenterTitle: "ಮಾರಾಟ ಇಂಟೆಲಿಜೆನ್ಸ್ ಕನ್ಸೋಲ್",
      tickerTitle: "ಲೈವ್ ಮಾರ್ಕೆಟ್ ಟಿಕ್ಕರ್‌ಗಳು // ಎಲ್ಲಾ ಸರಕುಗಳು"
    },
    gu: {
      title: "મંડી ભાવો અને એમએસપી ટ્રેકર",
      subtitle: "જીવંત બજાર ભાવો અને લઘુત્તમ ટેકાના ભાવો (MSP)",
      mandi: "નજીકની મંડી",
      price: "વર્તમાન ભાવ",
      msp: "સરકારી MSP",
      trend: "ભાવ વલણ",
      demand: "માંગ અંદાજ",
      sellWindow: "વેચવાનો શ્રેષ્ઠ સમય",
      selectCrop: "પાક પસંદ કરો",
      chartTitle: "6-મહિનાનો ભાવ વલણ (₹ / ક્વિન્ટલ)",
      howToSellTitle: "કેવી રીતે વેચવું",
      whenToSellTitle: "ક્યારે વેચવું",
      whereToSellTitle: "ક્યાં વેચવું",
      tradeCenterTitle: "વેચાણ ઇન્ટેલિજન્સ કન્સોલ",
      tickerTitle: "લાઇવ માર્કેટ ટીકર્સ // તમામ કોમોડિટીઝ"
    },
    bn: {
      title: "মন্ডির দর ও এমএসপি ট্র্যাকার",
      subtitle: "লাইভ বাজার দর এবং সর্বনিম্ন সমর্থন মূল্য (MSP)",
      mandi: "নিকটবর্তী মন্ডি",
      price: "বর্তমান দাম",
      msp: "সরকারি MSP",
      trend: "দামের গতিধারা",
      demand: "চাহিদা পূর্বাভাস",
      sellWindow: "বিক্রির সেরা সময়",
      selectCrop: "ফসল নির্বাচন করুন",
      chartTitle: "৬-মাসের দামের গতিধারা (₹ / কুইন্টাল)",
      howToSellTitle: "কীভাবে বিক্রি করবেন",
      whenToSellTitle: "কখন বিক্রি করবেন",
      whereToSellTitle: "কোথায় বিক্রি করবেন",
      tradeCenterTitle: "বিক্রয় গোয়েন্দা কনসোল",
      tickerTitle: "লাইভ মার্কেট টিকার // সমস্ত পণ্য"
    },
    ml: {
      title: "മണ്ടി വിലയും എംഎസ്പി ട്രാക്കറും",
      subtitle: "തത്സമയ വിപണി വിലകളും കുറഞ്ഞ താങ്ങുവിലയും (MSP)",
      mandi: "അടുത്തുള്ള മണ്ടി",
      price: "ഇപ്പോഴത്തെ വില",
      msp: "ഗവ. MSP",
      trend: "വില നിലവാരം",
      demand: "ഡിമാൻഡ് പ്രവചനം",
      sellWindow: "വിൽക്കാൻ പറ്റിയ സമയം",
      selectCrop: "വിള തിരഞ്ഞെടുക്കുക",
      chartTitle: "6-മാസത്തെ വില നിലവാരം (₹ / ക്വിന്റൽ)",
      howToSellTitle: "എങ്ങനെ വിൽക്കാം",
      whenToSellTitle: "എപ്പോൾ വിൽക്കണം",
      whereToSellTitle: "എവിടെ വിൽക്കണം",
      tradeCenterTitle: "സെയിൽസ് ഇന്റലിജൻസ് കൺസോൾ",
      tickerTitle: "തത്സമയ വിപണി ടിക്കറുകൾ // എല്ലാ ചരക്കുകളും"
    },
    or: {
      title: "ମଣ୍ଡି ଦର ଓ ଏମଏସପି ଟ୍ରାକର୍",
      subtitle: "ଲାଇଭ୍ ବଜାର ଦର ଏବଂ ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ (MSP)",
      mandi: "ନିକଟସ୍ଥ ମଣ୍ଡି",
      price: "ଚଳିତ ଦର",
      msp: "ସରକାରୀ MSP",
      trend: "ଦରର ଗତିବିଧି",
      demand: "ଚାହିଦା ଆକଳନ",
      sellWindow: "ବିକ୍ରି ପାଇଁ ସର୍ବୋତ୍ତਮ ସମୟ",
      selectCrop: "ଫସଲ ଚୟନ କରନ୍ତು",
      chartTitle: "୬-ମାସର ଦର ଗତିବिଧି (₹ / କ୍ୱିଣ୍ଟାଲ)",
      howToSellTitle: "କିପରି ବିକ୍ରି କରିବେ",
      whenToSellTitle: "କେବେ ବିକ୍ରି କରିବେ",
      whereToSellTitle: "କେଉଁଠି ବିକ୍ରି କରିବେ",
      tradeCenterTitle: "ବିକ୍ରୟ ବୁଦ୍ଧିମତା କନସୋଲ",
      tickerTitle: "ଲାଇଭ୍ ବଜାର ଟିକର୍ // ସମସ୍ତ ସାମଗ୍ରୀ"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  const loadRealTimePrices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/mandi?lang=${activeLanguage}`);
      const result = await res.json();
      if (result.success) {
        setCropsData(result.crops);
      }
    } catch (err) {
      console.error("Error loading real mandi rates:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch automatically whenever the language changes!
  useEffect(() => {
    loadRealTimePrices();
  }, [activeLanguage]);

  const activeRates = cropsData ? cropsData[selectedCrop] : null;

  // Construct main chart vectors if crop is active
  let points = "";
  let chartHistory: any[] = [];
  let minPrice = 0;
  let maxPrice = 1;

  if (activeRates && activeRates.chart) {
    chartHistory = activeRates.chart;
    maxPrice = Math.max(...chartHistory.map((d: any) => d.price));
    minPrice = Math.min(...chartHistory.map((d: any) => d.price));
    points = chartHistory.map((d: any, i: number) => {
      const x = 30 + i * 44;
      const y = 110 - ((d.price - minPrice) / (maxPrice - minPrice || 1)) * 80;
      return `${x},${y}`;
    }).join(' ');
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* COLUMN 1: Live Mandi Price & MSP Tracker */}
        <div className="glass-panel p-6 flex flex-col justify-between bg-gradient-to-tr from-yellow-950/10 via-black/40 to-transparent border border-white/10 rounded-3xl">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Target className="text-yellow-500 animate-pulse" size={20} />
                  {t.title}
                </h2>
                <p className="text-xs text-yellow-450/70 mt-0.5">{t.subtitle}</p>
              </div>
              
              {/* Crop switcher */}
              <div className="bg-[#0a0f0c] px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2 font-mono self-stretch md:self-auto justify-between">
                <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wider">{t.selectCrop}:</span>
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="text-xs font-bold text-yellow-400 bg-transparent outline-none border-none cursor-pointer"
                >
                  <option value="Tomato" className="bg-[#050806] text-white">Tomato</option>
                  <option value="Onion" className="bg-[#050806] text-white">Onion</option>
                  <option value="Rice" className="bg-[#050806] text-white">Rice</option>
                  <option value="Wheat" className="bg-[#050806] text-white">Wheat</option>
                  <option value="Cotton" className="bg-[#050806] text-white">Cotton</option>
                  <option value="Soybean" className="bg-[#050806] text-white">Soybean</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-3 text-zinc-500 font-mono text-xs">
                <RefreshCw className="animate-spin text-yellow-500" size={24} />
                <span>Translating real financial price metrics...</span>
              </div>
            ) : activeRates ? (
              <>
                <div className="grid grid-cols-2 gap-3 mb-6 font-mono">
                  <div className="bg-yellow-950/10 border border-white/5 p-3 rounded-2xl text-left relative overflow-hidden group">
                    <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-wider block">{t.mandi}</span>
                    <span className="text-xs font-extrabold text-white block mt-1 truncate">{activeRates.mandi}</span>
                  </div>
                  
                  <div className="bg-yellow-950/10 border border-white/5 p-3 rounded-2xl text-left relative overflow-hidden group">
                    <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-wider block">{t.price}</span>
                    <span className="text-sm font-black text-yellow-400 block mt-0.5">₹{activeRates.price} / q</span>
                  </div>
                  
                  <div className="bg-yellow-950/10 border border-white/5 p-3 rounded-2xl text-left relative overflow-hidden group">
                    <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-wider block">{t.msp}</span>
                    <span className="text-xs font-extrabold text-white block mt-1">
                      {activeRates.msp > 0 ? `₹${activeRates.msp} / q` : "N/A"}
                    </span>
                  </div>

                  <div className="bg-yellow-950/10 border border-white/5 p-3 rounded-2xl text-left flex flex-col justify-center relative overflow-hidden group">
                    <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-wider block">{t.trend}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {activeRates.trend === "up" ? (
                        <TrendingUp className="text-emerald-500 animate-bounce" size={16} />
                      ) : activeRates.trend === "down" ? (
                        <TrendingDown className="text-red-500 animate-pulse" size={16} />
                      ) : (
                        <span className="text-xs font-bold text-yellow-400">Stable</span>
                      )}
                      <span className="text-xs font-black uppercase text-white">{activeRates.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Live Trend Line Graph */}
                <div className="bg-[#040605]/80 border border-white/5 rounded-2xl p-4.5 mb-5 relative overflow-hidden">
                  <h4 className="text-[10px] font-bold text-zinc-400 mb-3.5 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <AlertCircle size={13} className="text-yellow-500" />
                    <span>{selectedCrop} {t.chartTitle}</span>
                  </h4>

                  <div className="relative w-full h-32">
                    {points && (
                      <svg className="w-full h-full" viewBox="0 0 280 130" preserveAspectRatio="none">
                        <line x1="30" y1="20" x2="260" y2="20" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="65" x2="260" y2="65" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="110" x2="260" y2="110" stroke="#333" strokeWidth="1" />

                        <polyline
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          points={points}
                          className="transition-all duration-700"
                        />

                        {chartHistory.map((d: any, i: number) => {
                          const [xStr, yStr] = points.split(' ')[i].split(',');
                          const x = parseFloat(xStr);
                          const y = parseFloat(yStr);

                          return (
                            <g key={i} className="group cursor-pointer">
                              <circle
                                cx={x}
                                cy={y}
                                r="3.5"
                                fill="#ffffff"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                className="hover:scale-125 transition-transform"
                              />
                              <text
                                x={x}
                                y={y - 8}
                                textAnchor="middle"
                                className="text-[8px] font-mono font-bold fill-white opacity-0 group-hover:opacity-100 transition-opacity bg-black"
                              >
                                ₹{d.price}
                              </text>
                            </g>
                          );
                        })}

                        {chartHistory.map((d: any, i: number) => (
                          <text
                            key={i}
                            x={30 + i * 44}
                            y="124"
                            textAnchor="middle"
                            className="text-[8px] font-bold fill-yellow-500/70 font-mono"
                          >
                            {d.month}
                          </text>
                        ))}
                      </svg>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {activeRates && !loading && (
            <div className="flex justify-between items-center text-xs bg-yellow-950/20 border border-white/5 p-3 rounded-2xl font-mono mt-auto">
              <div className="flex items-center gap-1.5">
                <HelpCircle size={14} className="text-yellow-500" />
                <span className="font-bold text-yellow-450/80">{t.sellWindow}:</span>
              </div>
              <span className="font-extrabold bg-yellow-600 text-black px-3 py-1 rounded-xl text-[10px] uppercase tracking-wide">
                {activeRates.best_time}
              </span>
            </div>
          )}
        </div>

        {/* COLUMN 2: Selling Intelligence Console (How, When, Where to Sell) */}
        <div className="glass-panel p-6 flex flex-col justify-between bg-gradient-to-br from-white/[0.01] via-black/40 to-transparent border border-white/10 rounded-3xl text-left">
          <div>
            <div className="flex items-center gap-2 mb-5 border-b border-white/5 pb-4">
              <ShoppingBag className="text-yellow-500" size={20} />
              <div>
                <h2 className="text-xl font-bold text-white">{t.tradeCenterTitle}</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Automated logistics and market entry advisories</p>
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-3 text-zinc-500 font-mono text-xs">
                <RefreshCw className="animate-spin text-yellow-500" size={24} />
                <span>Translating channel metadata...</span>
              </div>
            ) : activeRates ? (
              <div className="space-y-5">
                
                {/* When to Sell */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <TrendingUp size={12} />
                    <span>{t.whenToSellTitle}</span>
                  </h4>
                  <div className="bg-yellow-950/10 border border-yellow-500/10 p-3 rounded-2xl text-[11px] leading-relaxed text-zinc-300 font-medium select-text">
                    {activeRates.whenToSell}
                  </div>
                </div>

                {/* How to Sell */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <ClipboardList size={12} />
                    <span>{t.howToSellTitle}</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-zinc-300 font-mono select-text">
                    {activeRates.howToSell.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                        <span className="text-yellow-500 font-bold">0{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Where to Sell */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <MapPin size={12} />
                    <span>{t.whereToSellTitle}</span>
                  </h4>
                  <div className="space-y-1.5 font-mono select-text">
                    {activeRates.whereToSell.map((market: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-2 rounded-xl text-[10px]">
                        <div>
                          <span className="font-extrabold text-white block">{market.name}</span>
                          <span className="text-[8px] text-zinc-500 block uppercase mt-0.5">{market.type}</span>
                        </div>
                        <span className="bg-yellow-950/40 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-[8px] font-extrabold shrink-0">
                          {market.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : null}
          </div>
        </div>

      </div>

      {/* Grid of all crop graphs - "Live Market Tickers" */}
      {cropsData && !loading && (
        <div className="mt-8 border-t border-white/5 pt-6 text-left">
          <h3 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-1.5 select-none">
            <ShoppingBag size={14} className="animate-pulse" />
            <span>{t.tickerTitle}</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.keys(cropsData).map((cropName) => {
              const cropInfo = cropsData[cropName];
              const sHistory = cropInfo.chart || [];
              const sMax = Math.max(...sHistory.map((d: any) => d.price));
              const sMin = Math.min(...sHistory.map((d: any) => d.price));
              const sparkPoints = sHistory.map((d: any, i: number) => {
                const x = i * 16;
                const y = 25 - ((d.price - sMin) / (sMax - sMin || 1)) * 20;
                return `${x},${y}`;
              }).join(' ');

              return (
                <div 
                  key={cropName}
                  onClick={() => setSelectedCrop(cropName)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-left font-mono relative overflow-hidden select-none ${
                    selectedCrop === cropName 
                      ? 'bg-yellow-950/20 border-yellow-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <span className="text-[10px] font-sans font-extrabold text-white block">{cropName}</span>
                      <span className="text-[8px] text-zinc-400 block mt-0.5">₹{cropInfo.price}/q</span>
                    </div>
                    <span className={`text-[7px] font-bold px-1 py-0.5 rounded ${
                      cropInfo.trend === 'up' 
                        ? 'bg-emerald-950/40 text-emerald-450 border border-emerald-500/10' 
                        : 'bg-red-950/40 text-red-450 border border-red-500/10'
                    }`}>
                      {cropInfo.trend === 'up' ? '▲ UP' : '▼ DOWN'}
                    </span>
                  </div>
                  
                  {/* Micro Sparkline Chart */}
                  <div className="h-6 w-full mt-3">
                    <svg className="w-full h-full" viewBox="0 0 80 30" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke={cropInfo.trend === 'up' ? '#10b981' : '#ef4444'}
                        strokeWidth="1.5"
                        points={sparkPoints}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
