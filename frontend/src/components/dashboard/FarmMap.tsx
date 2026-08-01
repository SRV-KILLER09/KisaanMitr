'use client';

import React, { useState, useEffect } from 'react';
import { Map, Layers, Radio, AlertTriangle, Crosshair, Check } from 'lucide-react';

interface FarmMapProps {
  weather: any;
  soil: any;
  activeLanguage: string;
  farmerLat?: number;
  farmerLng?: number;
}

export default function FarmMap({ weather, soil, activeLanguage, farmerLat, farmerLng }: FarmMapProps) {
  // Center coordinates state: Default to Bhatinda, Punjab or registered coordinates
  const [coords, setCoords] = useState({ lat: farmerLat || 30.2115, lng: farmerLng || 74.9525 });
  const [locationStatus, setLocationStatus] = useState<string>("SYNCING_GPS");

  // Layer visibility toggles
  const [showCrops, setShowCrops] = useState<boolean>(true);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [showPathogens, setShowPathogens] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const labels: any = {
    en: {
      title: "Farmland Satellite Geomap",
      subtitle: "Live satellite geofencing, IoT coordinate tracking, and pathogen logs",
      toggleCrops: "Crop Boundaries",
      toggleSensors: "IoT Telemetry Nodes",
      toggleAlerts: "Pathogen Alerts",
      detailsTitle: "Sensor Node Coordinates",
      moisture: "Moisture",
      temp: "Temp",
      ph: "pH",
      gpsFetching: "FETCHING_GPS_PERMISSION",
      gpsOk: "GPS_SYNC_OK",
      gpsFailed: "DEFAULT_GPS_ Punjab"
    },
    hi: {
      title: "कृषि भूमि उपग्रह मानचित्र",
      subtitle: "लाइव उपग्रह भू-बाड़ लगाना, IoT समन्वय ट्रैकिंग, और रोगज़नक़ लॉग",
      toggleCrops: "फसल सीमाएं",
      toggleSensors: "IoT सेंसर नोड्स",
      toggleAlerts: "संक्रमण अलर्ट",
      detailsTitle: "सेंसर नोड विवरण",
      moisture: "नमी",
      temp: "तापमान",
      ph: "पीएच",
      gpsFetching: "स्थान खोजा जा रहा है",
      gpsOk: "जीपीएस सिंक ओके",
      gpsFailed: "डिफ़ॉल्ट पंजाब स्थान"
    },
    pa: {
      title: "ਕ੍ਰਿਸ਼ੀ ਭੂਮੀ ਸੈਟੇਲਾਈਟ ਨਕਸ਼ਾ",
      subtitle: "ਲਾਈਵ ਸੈਟੇਲਾਈਟ ਜਿਓਫੈਂਸਿੰਗ, IoT ਕੋਆਰਡੀਨੇਟ ਅਤੇ ਰੋਗ ਲੌਗ",
      toggleCrops: "ਫਸਲ ਦੀਆਂ ਸੀਮਾਵਾਂ",
      toggleSensors: "IoT ਸੈਂਸਰ ਨੋਡਸ",
      toggleAlerts: "ਪੈਥੋਜਨ ਚੇਤਾਵਨੀ",
      detailsTitle: "ਸੈਂਸਰ ਨੋਡ ਵੇਰਵਾ",
      moisture: "ਨਮੀ",
      temp: "ਤਾਪਮาน",
      ph: "pH",
      gpsFetching: "ਜੀਪੀਐਸ ਲੱਭ ਰਿਹਾ ਹੈ",
      gpsOk: "ਜੀਪੀਐਸ ਓਕੇ",
      gpsFailed: "ਪੰਜਾਬ ਕੋਆਰਡੀਨੇਟਸ"
    },
    mr: {
      title: "कृषी भूमी उपग्रह नकाशा",
      subtitle: "थेट उपग्रह जिओफेन्सिंग, आयओटी ट्रॅकिंग आणि रोग लॉग",
      toggleCrops: "पीक सीमांकन",
      toggleSensors: "IoT सेन्सर्स नोड्स",
      toggleAlerts: "रोग चेतावणी",
      detailsTitle: "सेन्सर नोड तपशील",
      moisture: "ओलावा",
      temp: "तापमान",
      ph: "pH",
      gpsFetching: "स्थान शोधत आहे",
      gpsOk: "जीपीएस ओके",
      gpsFailed: "डीफॉल्ट पंजाब स्थान"
    },
    te: {
      title: "వ్యవసాయ భూమి శాటిలైట్ మ్యాప్",
      subtitle: "ప్రత్యక్ష శాటిలైట్ జియోఫెన్సింగ్, IoT ట్రాకింగ్ మరియు వ్యాధి లాగ్స్",
      toggleCrops: "పంట సరిహద్దులు",
      toggleSensors: "IoT సెన్సార్ నోడ్స్",
      toggleAlerts: "వ్యాధి హెచ్చరికలు",
      detailsTitle: "సెన్సార్ నోడ్ వివరాలు",
      moisture: "తేమ",
      temp: "ఉష్ణోగ్రత",
      ph: "pH",
      gpsFetching: "GPS స్థానాన్ని శోధిస్తోంది",
      gpsOk: "GPS సింక్ ఓకే",
      gpsFailed: "డిఫాల్ట్ పంజాబ్ స్థానం"
    },
    ta: {
      title: "விவசாய நில செயற்கைக்கோள் வரைபடம்",
      subtitle: "நேரடி செயற்கைக்கோள் ஜியோஃபென்சிங், IoT கண்காணிப்பு மற்றும் நோய் பதிவுகள்",
      toggleCrops: "பயிர் எல்லைகள்",
      toggleSensors: "IoT சென்சார் முனையங்கள்",
      toggleAlerts: "நோய் எச்சரிக்கைகள்",
      detailsTitle: "சென்சார் முனைய விவரాలు",
      moisture: "ஈரப்பதம்",
      temp: "வெப்பநிலை",
      ph: "pH",
      gpsFetching: "ஜிபிஎஸ் தேடுகிறது",
      gpsOk: "ஜிபிஎஸ் இணைக்கப்பட்டது",
      gpsFailed: "பஞ்சாப் இருப்பிடம்"
    },
    kn: {
      title: "ಕೃಷಿ ಭೂಮಿ ಉಪಗ್ರಹ ನಕ್ಷೆ",
      subtitle: "ಲೈವ್ ಉಪಗ್ರಹ ಜಿಯೋಫೆನ್ಸಿಂಗ್, IoT ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ರೋಗ ದಾಖಲೆಗಳು",
      toggleCrops: "ಬೆಳೆ ಗಡಿಗಳು",
      toggleSensors: "IoT ಸೆನ್ಸಾರ್ ನೋಡ್‌ಗಳು",
      toggleAlerts: "ರೋಗದ ಎಚ್ಚರಿಕೆಗಳು",
      detailsTitle: "ಸೆನ್ಸಾರ್ ನೋಡ್ ವಿವರಗಳು",
      moisture: "ತೇವಾಂಶ",
      temp: "ತಾಪಮಾನ",
      ph: "pH",
      gpsFetching: "ಜಿಪಿಎಸ್ ಪಡೆಯಲಾಗುತ್ತಿದೆ",
      gpsOk: "ಜಿಪಿಎಸ್ ಸಿಂಕ್ ಓಕೆ",
      gpsFailed: "ಪಂಜಾಬ್ ಜಮೀನು"
    },
    gu: {
      title: "કૃષિ જમીન સેટેલાઇટ નકશો",
      subtitle: "લાઇવ સેટેલાઇટ જીઓફેન્સિંગ, આઇઓટી ટ્રેકિંગ અને રોગચાળો લોગ",
      toggleCrops: "પાકની સરહદો",
      toggleSensors: "IoT સેન્સર નોડ્સ",
      toggleAlerts: "રોગચાળો ચેતવણીઓ",
      detailsTitle: "સેન્સર નોડ વિગતો",
      moisture: "ભેજ",
      temp: "તાપમાન",
      ph: "pH",
      gpsFetching: "જીપીએસ મેળવી રહ્યું છે",
      gpsOk: "જીપીએસ સિન્ક ઓકે",
      gpsFailed: "પંજાબ સ્થાન"
    },
    bn: {
      title: "কৃষি জমি স্যাটেলাইট ম্যাপ",
      subtitle: "লাইভ স্যাটেলাইট জিওফেন্সিং, আইওটি ট্র্যাকিং এবং রোগলগ",
      toggleCrops: "ফসল সীমানা",
      toggleSensors: "IoT সেন্সর নোডস",
      toggleAlerts: "প্যাথোজেন সতর্কতা",
      detailsTitle: "সেন্সর নোড তথ্য",
      moisture: "আর্দ্রতা",
      temp: "তাপমাত্রা",
      ph: "pH",
      gpsFetching: "জিপিএস খোঁজা হচ্ছে",
      gpsOk: "জিপিএস সিঙ্ক ওকে",
      gpsFailed: "ডিফল্ট পাঞ্জাব স্থান"
    },
    ml: {
      title: "കാർഷിക ഭൂമി ഉപഗ്രഹ ഭൂപടം",
      subtitle: "തത്സമയ സാറ്റലൈറ്റ് ജിയോഫെൻസിങ്, ഐഒടി ട്രാക്കിങ്, രോഗ ലോഗുകൾ",
      toggleCrops: "വിള അതിരുകൾ",
      toggleSensors: "IoT സെൻസർ നോഡുകൾ",
      toggleAlerts: "രോഗ ബാധ മുന്നറിയിപ്പുകൾ",
      detailsTitle: "സെൻസർ നോഡ് വിവരങ്ങൾ",
      moisture: "ഈർപ്പം",
      temp: "താപനില",
      ph: "pH",
      gpsFetching: "ജിപിഎസ് വിവരങ്ങൾ ശേഖരിക്കുന്നു",
      gpsOk: "ജിപിഎസ് സിങ്ക് വിജയിച്ചു",
      gpsFailed: "പഞ്ചാബ് കോർഡിനേറ്റ്സ്"
    },
    or: {
      title: "କୃଷି ଜମି ସାଟେଲାଇଟ୍ ମାନଚିତ୍ର",
      subtitle: "ଲାଇଭ୍ ସାଟେଲାଇଟ୍ ଜିଓଫେନ୍ସିଂ, IoT ଟ୍ରାକିଂ ଏବଂ ରୋଗ ଲଗ୍",
      toggleCrops: "ଫସଲ ସୀମา",
      toggleSensors: "IoT ସେନ୍ସର ନୋଡ୍",
      toggleAlerts: "ରୋଗ ଚେତାବନୀ",
      detailsTitle: "ସେନ୍ସର ନୋଡ୍ ବିବରଣୀ",
      moisture: "ଆଦ୍ରତା",
      temp: "ତାପମାତ୍ରା",
      ph: "pH",
      gpsFetching: "ଜିପିଏସ୍ ସନ୍ଧାନ ଚାଲିଛି",
      gpsOk: "ଜିପିଏସ୍ ସିଙ୍କ୍ ଓକେ",
      gpsFailed: "ପଞ୍ଜାବ ସ୍ଥାନ"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  // Sync coords state if props update from profile
  useEffect(() => {
    if (farmerLat && farmerLng) {
      setCoords({ lat: farmerLat, lng: farmerLng });
      setLocationStatus("GPS_SYNC_OK");
    }
  }, [farmerLat, farmerLng]);

  // Request HTML5 Location coordinates on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      setLocationStatus("FETCHING_GPS_PERMISSION");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus("GPS_SYNC_OK");
        },
        (error) => {
          // If browser GPS is blocked, fall back to props coordinate or Bhatinda default
          if (!farmerLat || !farmerLng) {
            setCoords({ lat: 30.2115, lng: 74.9525 });
          }
          setLocationStatus("GPS_FAILED_FALLBACK");
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
      );
    }
  }, [farmerLat, farmerLng]);

  // Google satellite terrain view clean URL structure (t=k forces satellite maps without redirect search panels)
  const mapIframeUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=k&z=17&output=embed`;

  return (
    <div className="glass-panel p-6 bg-black/40 border border-white/10 flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Top bar info */}
      <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3 z-10">
        <div>
          <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 uppercase tracking-wide font-mono">
            <Map size={16} className="text-emerald-400" />
            [FARM_SATELLITE_GEOMAP]
          </h3>
          <p className="text-[10px] text-emerald-400/80 mt-0.5 font-semibold">{t.subtitle}</p>
        </div>
        
        {/* Active badge */}
        <span className="text-[8px] font-bold text-emerald-450 uppercase tracking-widest font-mono bg-emerald-950 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-450 rounded-full animate-ping"></span>
          {locationStatus === "GPS_SYNC_OK" ? t.gpsOk : locationStatus === "FETCHING_GPS_PERMISSION" ? t.gpsFetching : t.gpsFailed}
        </span>
      </div>

      {/* Map Content Viewport - Increased height to h-[450px] for full visibility inside dashboard */}
      <div className="relative h-[450px] w-full rounded-xl overflow-hidden border border-white/10 shadow-inner group">
        
        <iframe 
          src={mapIframeUrl}
          className="absolute left-1/2 top-0 transform -translate-x-1/2 scale-[1.06] w-[120%] h-full border-none filter brightness-[0.75] contrast-[1.1] saturate-[1.2]"
          allowFullScreen={false}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-emerald-950/5 pointer-events-none" />

        {/* Interactive SVGs (Geofence Boundaries & Plot Overlays) */}
        {showCrops && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Plot 1: Tomato Crop Geofence */}
            <polygon 
              points="60,80 220,60 250,200 90,240" 
              className="stroke-[#10b981] stroke-2 fill-emerald-500/10 cursor-pointer pointer-events-auto"
              style={{ strokeDasharray: '4 4' }}
              onClick={() => setSelectedNode("tomato_plot")}
            />
            <text x="110" y="140" fill="#10b981" className="text-[10px] font-mono font-bold select-none">
              Tomato Plot (0.8 Ha)
            </text>

            {/* Plot 2: Rice Crop Geofence */}
            <polygon 
              points="280,80 420,100 400,280 250,250" 
              className="stroke-[#0ea5e9] stroke-2 fill-sky-500/10 cursor-pointer pointer-events-auto"
              style={{ strokeDasharray: '4 4' }}
              onClick={() => setSelectedNode("rice_plot")}
            />
            <text x="300" y="180" fill="#0ea5e9" className="text-[10px] font-mono font-bold select-none">
              Rice Plot (0.7 Ha)
            </text>
          </svg>
        )}

        {/* Interactive Telemetry Sensor Node Icons */}
        {showSensors && (
          <div className="absolute inset-0 pointer-events-none z-15">
            {/* Sensor Node 1 */}
            <div 
              className="absolute pointer-events-auto cursor-pointer" 
              style={{ left: '140px', top: '110px' }}
              onClick={() => setSelectedNode("sensor_01")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-emerald-500/30 animate-ping"></span>
                <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center">
                  <Radio size={6} className="text-black" />
                </div>
                <span className="absolute left-4 bg-black/85 text-white border border-white/10 font-mono text-[8px] px-1 py-0.5 rounded leading-none whitespace-nowrap">
                  Node 1 // M: {soil.soil_moisture}%
                </span>
              </div>
            </div>

            {/* Sensor Node 2 */}
            <div 
              className="absolute pointer-events-auto cursor-pointer" 
              style={{ left: '330px', top: '200px' }}
              onClick={() => setSelectedNode("sensor_02")}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-sky-500/30 animate-ping"></span>
                <div className="w-3 h-3 rounded-full bg-sky-500 border-2 border-white shadow flex items-center justify-center">
                  <Radio size={6} className="text-black" />
                </div>
                <span className="absolute left-4 bg-black/85 text-white border border-white/10 font-mono text-[8px] px-1 py-0.5 rounded leading-none whitespace-nowrap">
                  Node 2 // pH: {soil.soil_ph}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pathogen Alerts warning beacon */}
        {showPathogens && (
          <div className="absolute pointer-events-auto cursor-pointer z-15" style={{ left: '170px', top: '170px' }}>
            <div className="relative flex items-center justify-center" onClick={() => setSelectedNode("warning_beacon")}>
              <span className="absolute w-8 h-8 rounded-full bg-red-500/30 animate-ping"></span>
              <div className="w-4 h-4 rounded-full bg-red-650 border border-white flex items-center justify-center shadow-lg">
                <AlertTriangle size={10} className="text-white" />
              </div>
              <span className="absolute left-5 bg-red-600/90 text-white font-mono text-[8px] px-1 py-0.5 rounded leading-none whitespace-nowrap animate-pulse">
                PATHOGEN_ALERT // Early Blight Detected
              </span>
            </div>
          </div>
        )}

        {/* Popup Detail Panel */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/90 border border-white/10 p-3 rounded-lg z-20 font-mono text-[9px] text-emerald-300 flex justify-between items-center shadow-2xl">
            {selectedNode === "sensor_01" && (
              <div>
                <span className="text-white font-bold block">[SOIL_NODE_01_TELEMETRY]</span>
                <span>Moisture: {soil.soil_moisture}% • pH: {soil.soil_ph} • Temp: {soil.temperature}°C</span>
              </div>
            )}
            {selectedNode === "sensor_02" && (
              <div>
                <span className="text-white font-bold block">[SOIL_NODE_02_TELEMETRY]</span>
                <span>Moisture: {soil.soil_moisture + 5}% • pH: {soil.soil_ph} • Temp: {soil.temperature - 1}°C</span>
              </div>
            )}
            {selectedNode === "tomato_plot" && (
              <div>
                <span className="text-white font-bold block">[TOMATO_PLOT_MEM]</span>
                <span>Area: 0.8 Hectares • Variety: Roma Tomatoes • Sown: Oct 2025</span>
              </div>
            )}
            {selectedNode === "rice_plot" && (
              <div>
                <span className="text-white font-bold block">[RICE_PLOT_MEM]</span>
                <span>Area: 0.7 Hectares • Variety: Basmati • Sown: Nov 2025</span>
              </div>
            )}
            {selectedNode === "warning_beacon" && (
              <div>
                <span className="text-red-400 font-bold block">[YOLOv11_PATHOGEN_SCAN]</span>
                <span className="text-white">Fungal Early Blight detected on leaf nodes. Remediation: Spray Neem Oil immediately.</span>
              </div>
            )}
            <button 
              onClick={() => setSelectedNode(null)} 
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-2 py-0.5 rounded text-[8px]"
            >
              Clear
            </button>
          </div>
        )}

      </div>

      {/* Layer selector bar */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-bold font-mono">
        <button 
          onClick={() => setShowCrops(!showCrops)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-all ${
            showCrops 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/40 shadow-inner' 
              : 'bg-[#0f1612] text-zinc-500 border-white/5'
          }`}
        >
          {t.toggleCrops}
          {showCrops && <Check size={10} className="ml-0.5 text-emerald-400" />}
        </button>

        <button 
          onClick={() => setShowSensors(!showSensors)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-all ${
            showSensors 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/40 shadow-inner' 
              : 'bg-[#0f1612] text-zinc-500 border-white/5'
          }`}
        >
          {t.toggleSensors}
          {showSensors && <Check size={10} className="ml-0.5 text-emerald-400" />}
        </button>

        <button 
          onClick={() => setShowPathogens(!showPathogens)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-all ${
            showPathogens 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/40 shadow-inner' 
              : 'bg-[#0f1612] text-zinc-500 border-white/5'
          }`}
        >
          {t.toggleAlerts}
          {showPathogens && <Check size={10} className="ml-0.5 text-emerald-400" />}
        </button>
      </div>

    </div>
  );
}
