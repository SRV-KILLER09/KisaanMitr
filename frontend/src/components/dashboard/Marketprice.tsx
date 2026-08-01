'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, HelpCircle, AlertCircle } from 'lucide-react';

interface MarketpriceProps {
  marketRates: any;
  activeLanguage: string;
}

export default function Marketprice({ marketRates, activeLanguage }: MarketpriceProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
  const [pricesList, setPricesList] = useState<any[]>([]);

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
      chartTitle: "6-Month Pricing Trend (₹ / Quintal)"
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
      chartTitle: "6-महीने का मूल्य रुझान (₹ / क्विंटल)"
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
      chartTitle: "6-ਮਹੀਨੇ ਦਾ ਕੀਮਤ ਰੁਝਾਨ (₹ / ਕੁਇੰਟਲ)"
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
      chartTitle: "6-महिन्यांचा किंमत कल (₹ / क्विंटल)"
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
      chartTitle: "6-నెలల ధర ధోరణి (₹ / క్వింటాల్)"
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
      chartTitle: "6-மாத விலை போக்கு (₹ / குவிண்டால்)"
    },
    kn: {
      title: "ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು MSP ಟ್ರ್ಯಾಕರ್",
      subtitle: "ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)",
      mandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ",
      price: "ಪ್ರಸ್ತುತ ಬೆಲೆ",
      msp: "ಸರ್ಕಾರದ MSP",
      trend: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ",
      demand: "ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ",
      sellWindow: "ಮಾರಾಟ ಮಾಡಲು ಉತ್ತಮ ಸಮಯ",
      selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
      chartTitle: "6-ತಿಂಗಳ ಬೆಲೆ ಪ್ರವृత్తి (₹ / ಕ್ವಿಂಟಲ್)"
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
      chartTitle: "6-મહિનાનો ભાવ વલણ (₹ / ક્વિન્ટલ)"
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
      chartTitle: "৬-মাসের দামের গতিধারা (₹ / কুইন্টাল)"
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
      chartTitle: "6-മാസത്തെ വില നിലവാരം (₹ / ക്വിന്റൽ)"
    },
    or: {
      title: "ମଣ୍ଡି ଦର ଓ ଏମଏସପି ଟ୍ରାକର୍",
      subtitle: "ଲାଇଭ୍ ବଜାର ଦର ଏବଂ ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ (MSP)",
      mandi: "ନିକଟସ୍ଥ ମଣ୍ଡି",
      price: "ଚଳିତ ଦର",
      msp: "ସରକାରୀ MSP",
      trend: "ଦରର ଗତିବିଧି",
      demand: "ଚାହିଦା ଆକଳନ",
      sellWindow: "ବିକ୍ରି ପାଇଁ ସର୍ବୋତ୍ତମ ସମୟ",
      selectCrop: "ଫସଲ ଚୟନ କରନ୍ତୁ",
      chartTitle: "୬-ମାସର ଦର ଗତିବିଧି (₹ / କ୍ୱିଣ୍ଟାଲ)"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  const CROP_DATASETS: any = {
    Tomato: [
      { month: "Feb", price: 1800 },
      { month: "Mar", price: 2100 },
      { month: "Apr", price: 2600 },
      { month: "May", price: 4200 },
      { month: "Jun", price: 3800 },
      { month: "Jul", price: 3200 }
    ],
    Rice: [
      { month: "Feb", price: 2100 },
      { month: "Mar", price: 2150 },
      { month: "Apr", price: 2200 },
      { month: "May", price: 2220 },
      { month: "Jun", price: 2250 },
      { month: "Jul", price: 2300 }
    ],
    Wheat: [
      { month: "Feb", price: 2200 },
      { month: "Mar", price: 2300 },
      { month: "Apr", price: 2400 },
      { month: "May", price: 2450 },
      { month: "Jun", price: 2420 },
      { month: "Jul", price: 2450 }
    ],
    Onion: [
      { month: "Feb", price: 1500 },
      { month: "Mar", price: 1800 },
      { month: "Apr", price: 2000 },
      { month: "May", price: 2400 },
      { month: "Jun", price: 2700 },
      { month: "Jul", price: 2800 }
    ]
  };

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/marketplace/prices");
        if (!res.ok) throw new Error("Offline");
        const data = await res.json();
        setPricesList(data);
      } catch (err) {
        setPricesList([
          { crop: "Tomato", mandi: "Azadpur Mandi, Delhi", price: 3200, msp: 0, trend: "down", best_time: "Sell Immediately", demand: "High" },
          { crop: "Rice (Dhan)", mandi: "Khanna Mandi, Punjab", price: 2300, msp: 2183, trend: "up", best_time: "Next 10 Days", demand: "High" },
          { crop: "Wheat (Kanak)", mandi: "Karnal Mandi, Haryana", price: 2450, msp: 2275, trend: "stable", best_time: "Now", demand: "Medium" },
          { crop: "Onion (Pyaz)", mandi: "Lasalgaon Mandi, Maharashtra", price: 2800, msp: 0, trend: "up", best_time: "Next 2 Weeks", demand: "High" }
        ]);
      }
    };
    loadPrices();
  }, [marketRates]);

  const activeRates = pricesList.find(p => p.crop.toLowerCase().includes(selectedCrop.toLowerCase())) || 
                      (pricesList.length > 0 ? pricesList[0] : null);

  const chartHistory = CROP_DATASETS[selectedCrop] || CROP_DATASETS["Tomato"];
  
  const maxPrice = Math.max(...chartHistory.map((d: any) => d.price));
  const minPrice = Math.min(...chartHistory.map((d: any) => d.price));
  const points = chartHistory.map((d: any, i: number) => {
    const x = 40 + i * 50;
    const y = 110 - ((d.price - minPrice) / (maxPrice - minPrice || 1)) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-yellow-950/15 via-black/40 to-transparent border border-white/10">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Target className="text-yellow-500 animate-pulse" size={20} />
              {t.title}
            </h2>
            <p className="text-xs text-yellow-450/85">{t.subtitle}</p>
          </div>
          {/* Crop switcher */}
          <div className="bg-[#0a0f0c] px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5 font-mono">
            <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wider">{t.selectCrop}:</span>
            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="text-xs font-bold text-yellow-400 bg-transparent outline-none border-none cursor-pointer"
            >
              <option value="Tomato" className="bg-[#050806] text-white">Tomato</option>
              <option value="Rice" className="bg-[#050806] text-white">Rice</option>
              <option value="Wheat" className="bg-[#050806] text-white">Wheat</option>
              <option value="Onion" className="bg-[#050806] text-white">Onion</option>
            </select>
          </div>
        </div>

        {activeRates && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 font-mono">
            <div className="bg-yellow-950/10 border border-white/5 p-2.5 rounded-lg text-center">
              <span className="text-[9px] font-bold text-yellow-500 uppercase block">nearest_mandi</span>
              <span className="text-xs font-bold text-white block truncate">{activeRates.mandi}</span>
            </div>
            <div className="bg-yellow-950/10 border border-white/5 p-2.5 rounded-lg text-center">
              <span className="text-[9px] font-bold text-yellow-500 uppercase block">market_price</span>
              <span className="text-sm font-extrabold text-yellow-400 block">₹{activeRates.price} / q</span>
            </div>
            <div className="bg-yellow-950/10 border border-white/5 p-2.5 rounded-lg text-center">
              <span className="text-[9px] font-bold text-yellow-500 uppercase block">government_msp</span>
              <span className="text-xs font-bold text-white block">
                {activeRates.msp > 0 ? `₹${activeRates.msp} / q` : "N/A"}
              </span>
            </div>
            <div className="bg-yellow-950/10 border border-white/5 p-2.5 rounded-lg text-center flex flex-col justify-center items-center">
              <span className="text-[9px] font-bold text-yellow-500 uppercase block">price_trend</span>
              <div className="flex items-center gap-1 mt-0.5">
                {activeRates.trend === "up" ? (
                  <TrendingUp className="text-emerald-500 animate-bounce" size={16} />
                ) : activeRates.trend === "down" ? (
                  <TrendingDown className="text-red-500 animate-pulse" size={16} />
                ) : (
                  <span className="text-xs font-bold text-yellow-400">Stable</span>
                )}
                <span className="text-xs font-extrabold capitalize text-white">{activeRates.trend}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Trend Line Graph */}
        <div className="bg-[#040605] border border-white/5 rounded-xl p-4 mb-4">
          <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-1 font-mono">
            <AlertCircle size={12} className="text-yellow-500 animate-pulse" />
            {selectedCrop} {t.chartTitle}
          </h4>

          <div className="relative w-full h-32">
            <svg className="w-full h-full" viewBox="0 0 300 130">
              <line x1="30" y1="20" x2="280" y2="20" stroke="#16140e" strokeWidth="1" />
              <line x1="30" y1="65" x2="280" y2="65" stroke="#16140e" strokeWidth="1" />
              <line x1="30" y1="110" x2="280" y2="110" stroke="#2d2611" strokeWidth="1.5" />

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
                      r="4"
                      fill="#ffffff"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-white opacity-0 group-hover:opacity-100 transition-opacity bg-black"
                    >
                      ₹{d.price}
                    </text>
                  </g>
                );
              })}

              {chartHistory.map((d: any, i: number) => (
                <text
                  key={i}
                  x={40 + i * 50}
                  y="124"
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-yellow-500 font-mono"
                >
                  {d.month}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {activeRates && (
        <div className="flex justify-between items-center text-xs bg-yellow-950/20 border border-white/5 p-2.5 rounded-lg font-mono">
          <div className="flex items-center gap-1.5">
            <HelpCircle size={14} className="text-yellow-500 animate-pulse" />
            <span className="font-bold text-yellow-400">{t.sellWindow}:</span>
          </div>
          <span className="font-extrabold bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-0.5 rounded shadow-sm">
            {activeRates.best_time}
          </span>
        </div>
      )}
    </div>
  );
}
