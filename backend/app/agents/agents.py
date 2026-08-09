import json
import urllib.request
import urllib.error
from typing import Dict, Any, List
from app.core.seed_data import (
    MANDI_PRICES, GOVERNMENT_SCHEMES, HEALTHCARE_GUIDES,
    DISASTER_GUIDES, EDUCATION_TUTORIALS, QUIZZES, KNOWLEDGE_BASE
)
from app.agents.state import AgentState

# Calls the new chatbot api directly instead of using gemini
def call_chatbot_api(
    prompt: str,
    system_prompt: str = None,
    language: str = "en",
    farmer_profile: Dict[str, Any] = None
) -> str:
    url = "http://localhost:8000/api/chatbot"
    payload = json.dumps({
        "query": prompt,
        "system_prompt": system_prompt,
        "language": language,
        "profile": farmer_profile
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            res = json.loads(response.read().decode("utf-8"))
            # The reponse is someow has br in it
            answer = (res.get("answer") or "").strip()
            answer = answer.replace("<br>", "\n")
            answer = answer.replace("<br/>", "\n")
            answer = answer.replace("<br />", "\n")

            return answer

    except Exception as e:
        print("Backend /api/chatbot request failed:", e)
        return ""

# Helper to fetch real-time weather from Open-Meteo API using latitude and longitude coordinates
def fetch_realtime_weather(lat: float, lng: float) -> dict:
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,relative_humidity_2m&daily=precipitation_probability_max&forecast_days=1&timezone=auto"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode("utf-8"))
            current = data.get("current", {})
            daily = data.get("daily", {})
            rain_prob = 30
            if "precipitation_probability_max" in daily and len(daily["precipitation_probability_max"]) > 0:
                rain_prob = daily["precipitation_probability_max"][0]
            return {
                "temperature": round(current.get("temperature_2m", 30)),
                "humidity": round(current.get("relative_humidity_2m", 70)),
                "rain_probability": round(rain_prob)
            }
    except Exception as e:
        print("Failed to fetch real-time Open-Meteo weather:", e)
        return {"temperature": 30, "humidity": 70, "rain_probability": 30}


# 1. Planner Agent
def planner_agent(state: AgentState) -> Dict[str, Any]:
    query = state.user_query.lower()
    plan = []

    if "telemetry status" in query or "overview" in query or "टेलीमेट्री" in query or "अवलोकन" in query:
        plan.extend(["weather", "soil", "market", "government", "agriculture"])

    # Disease / vision keywords (English + Hindi + Punjabi + Tamil + Telugu + others)
    disease_kw = [
        "spot", "yellow", "brown", "leaf", "disease", "pest", "weed", "photo", "image", "upload",
        "धब्बा", "पीला", "पत्ती", "रोग", "कीड़ा", "बीमारी",
        "ਧੱਬਾ", "ਪੀਲਾ", "ਪੱਤਾ", "ਰੋਗ", "ਕੀੜਾ",
        "डाग", "पान", "रोग", "किडा",
        "புள்ளி", "மஞ்சள்", "இலை", "நோய்", "பூச்சி",
        "మచ్చ", "పసుపు", "ఆకు", "వ్యాధి", "పురుగు",
        "ಚುಕ್ಕೆ", "ಹಳದಿ", "ಎಲೆ", "ರೋಗ", "ಕೀಟ",
        "ડાઘ", "પીળો", "પાન", "રોગ", "જીવાત",
        "দাগ", "হলুদ", "পাতা", "রোগ", "পোকা",
        "പാട്", "മഞ്ഞ", "ഇല", "രോഗം", "കീടം",
        "ଦାଗ", "ହଳଦିଆ", "ପତ୍ର", "ରୋଗ", "କୀଟ"
    ]
    if any(k in query for k in disease_kw):
        plan.extend(["vision", "knowledge", "agriculture", "government"])

    # Weather keywords (English + regional)
    weather_kw = [
        "rain", "weather", "tomorrow", "forecast", "heat", "frost", "temperature", "humidity",
        "बारिश", "मौसम", "कल", "गर्मी", "ठंड", "तापमान", "नमी",
        "ਮੀਂਹ", "ਮੌਸਮ", "ਕੱਲ੍ਹ", "ਗਰਮੀ", "ਠੰਡ",
        "पाऊस", "हवामान", "उद्या",
        "மழை", "வானிலை", "நாளை",
        "వర్షం", "వాతావరణం", "రేపు",
        "ಮಳೆ", "ಹವಾಮಾನ", "ನಾಳೆ",
        "વરસાદ", "હવામાન", "આવતીકાલે",
        "বৃষ্টি", "আবহাওয়া", "কাল",
        "മഴ", "കാലാവസ്ഥ", "നാളെ",
        "ବର୍ଷା", "ପାଣିପାଗ", "ଆସନ୍ତାକାଲି"
    ]
    if any(k in query for k in weather_kw):
        plan.extend(["weather", "disaster", "agriculture"])

    # Market / mandi keywords
    market_kw = [
        "mandi", "price", "sell", "market", "msp", "cost", "rate",
        "मंडी", "कीमत", "बेचना", "बाजार", "भाव",
        "ਮੰਡੀ", "ਕੀਮਤ", "ਵੇਚਣਾ", "ਬਾਜ਼ਾਰ",
        "बाजार", "दर", "विक्री",
        "சந்தை", "விலை", "விற்பனை",
        "మార్కెట్", "ధర", "అమ్మకం",
        "ಮಾರುಕಟ್ಟೆ", "ಬೆಲೆ", "ಮಾರಾಟ",
        "બજાર", "ભાવ", "વેચાણ",
        "বাজার", "দাম", "বিক্রি",
        "വിപണി", "വില", "വിൽപ്പന",
        "ବଜାର", "ଦର", "ବିକ୍ରି"
    ]
    if any(k in query for k in market_kw):
        plan.extend(["market", "agriculture"])

    # Agriculture / general farming keywords (English + regional)
    agriculture_kw = [
        "farm", "farming", "crop", "harvest", "sow", "sowing", "plant", "planting",
        "irrigation", "water", "fertilize", "fertilizer", "compost", "manure",
        "yield", "produce", "cultivation", "agriculture", "agri", "kisan",
        "खेती", "फसल", "कटाई", "बुवाई", "पौधा", "पौधे", "सिंचाई", "खाद",
        "उर्वरक", "उपज", "किसान", "कृषि",
        "ਖੇਤੀ", "ਫਸਲ", "ਬਿਜਾਈ", "ਪੌਦਾ", "ਸਿੰਚਾਈ", "ਖਾਦ", "ਕਿਸਾਨ",
        "शेती", "पीक", "लागवड", "पाणी", "खत", "शेतकरी",
        "பயிர்", "விவசாயம்", "நீர்", "உரம்", "அறுவடை", "விதைப்பு",
        "పంట", "వ్యవసాయం", "నీరు", "ఎరువు", "పంటలు", "విత్తనం",
        "ಬೆಳೆ", "ಕೃಷಿ", "ನೀರು", "ಗೊಬ್ಬರ", "ರೈತ",
        "ખેતી", "પાક", "પાણી", "ખાતર", "ખેડૂત",
        "চাষ", "ফসল", "পানি", "সার", "কৃষক",
        "കൃഷി", "വിള", "വെള്ളം", "വളം", "കർഷകൻ",
        "ଚାଷ", "ଫସଲ", "ପାଣି", "ସାର", "କୃଷକ"
    ]

    if any(k in query for k in agriculture_kw):
        plan.extend(["agriculture", "knowledge"])

    # Soil / fertilizer keywords
    soil_kw = [
        "soil", "ph", "npk", "moisture", "fertilizer", "nitrogen", "potash", "phosphorus",
        "मिट्टी", "खाद", "उर्वरक", "नमी",
        "ਮਿੱਟੀ", "ਖਾਦ",
        "माती", "खत",
        "மண்", "உரம்",
        "మట్టి", "ఎరువు",
        "ಮಣ್ಣು", "ಗೊಬ್ಬರ",
        "માટી", "ખાતર",
        "মাটি", "সার",
        "മണ്ണ്", "വളം",
        "ମାଟି", "ସାର"
    ]
    if any(k in query for k in soil_kw):
        plan.extend(["soil", "agriculture", "market"])

    # Government scheme keywords
    scheme_kw = [
        "scheme", "pm-kisan", "subsidy", "loan", "insurance", "yojana",
        "योजना", "सब्सिडी", "ऋण", "बीमा", "किसान",
        "ਯੋਜਨਾ", "ਸਬਸਿਡੀ", "ਬੀਮਾ",
        "योजना", "अनुदान",
        "திட்டம்", "கடன்", "காப்பீடு",
        "పథకం", "రుణం", "బీమా",
        "ಯೋಜನೆ", "ಸಬ್ಸಿಡಿ", "ವಿಮೆ",
        "યોજના", "સબસિડી", "વીમો",
        "প্রকল্প", "ভর্তুকি", "বীমা",
        "പദ്ധതി", "സബ്സിഡി", "ഇൻഷുറൻസ്",
        "ଯୋଜନା", "ବୀମା"
    ]
    if any(k in query for k in scheme_kw):
        plan.extend(["government", "knowledge"])

    # Healthcare / first aid keywords
    health_kw = [
        "snake", "bite", "poison", "heat stroke", "first aid", "health", "hospital",
        "सांप", "डंक", "जहर", "प्राथमिक", "अस्पताल", "स्वास्थ्य",
        "ਸੱਪ", "ਡੰਗ", "ਜ਼ਹਿਰ", "ਹਸਪਤਾਲ",
        "साप", "विष", "रुग्णालय",
        "பாம்பு", "விஷம்", "மருத்துவமனை",
        "పాము", "విషం", "ఆసుపత్రి",
        "ಹಾವು", "ವಿಷ", "ಆಸ್ಪತ್ರೆ",
        "સાપ", "ઝેર", "હોસ્પિટલ",
        "সাপ", "বিষ", "হাসপাতাল",
        "പാമ്പ്", "വിഷം", "ആശുപത്രി",
        "ସାପ", "ବିଷ", "ଡାକ୍ତରଖାନା"
    ]
    if any(k in query for k in health_kw):
        plan.extend(["healthcare"])

    # Disaster keywords
    disaster_kw = [
        "flood", "cyclone", "storm", "lightning", "evacuate", "disaster", "sos",
        "बाढ़", "तूफान", "आपदा", "बिजली",
        "ਹੜ੍ਹ", "ਤੂਫ਼ਾਨ", "ਆਫ਼ਤ",
        "पूर", "वादळ",
        "வெள்ளம்", "புயல்",
        "వరద", "తుఫాను",
        "ಪ್ರವಾಹ", "ಚಂಡಮಾರುತ",
        "પૂર", "તોફાન",
        "বন্যা", "ঝড়",
        "വെള്ളപ്പൊക്കം", "കൊടുങ്കാറ്റ്",
        "ବନ୍ୟା", "ଝଡ଼"
    ]
    if any(k in query for k in disaster_kw):
        plan.extend(["disaster", "healthcare"])

    # Education keywords
    edu_kw = [
        "quiz", "tutorial", "video", "learn", "education", "course",
        "सीखना", "पाठ", "शिक्षा",
        "ਸਿੱਖਿਆ", "ਕੋਰਸ",
        "शिक्षण", "कोर्स",
        "கற்றல்", "வீடியோ",
        "నేర్చుకోవడం", "వీడియో",
        "ಕಲಿಕೆ", "ವೀಡಿಯೋ",
        "શીખવું", "વિડિઓ",
        "শেখা", "ভিডিও",
        "പഠനം", "വീഡിയോ",
        "ଶିକ୍ଷା", "ଭିଡିଓ"
    ]
    if any(k in query for k in edu_kw):
        plan.extend(["education"])

    # Memory / profile keywords
    # memory_kw = [
    # "my farm", "history", "profile", "budget", "preferences",
    # "मेरा खेत", "इतिहास", "प्रोफ़ाइल", "बजट", "पसंद",
    # "ਮੇਰਾ ਖੇਤ", "ਇਤਿਹਾਸ", "ਪ੍ਰੋਫਾਈਲ", "ਬਜਟ", "ਤਰਜੀਹਾਂ",
    # "माझे शेत", "इतिहास", "प्रोफाइल", "बजेट", "प्राधान्ये",
    # "எனது பண்ணை", "வரலாறு", "சுயவிவரம்", "பட்ஜெட்", "விருப்பங்கள்",
    # "నా పొలం", "చరిత్ర", "ప్రొఫైల్", "బడ్జెట్", "ప్రాధాన్యతలు",
    # "ನನ್ನ ಹೊಲ", "ಇತಿಹಾಸ", "ಪ್ರೊಫೈಲ್", "ಬಜೆಟ್", "ಆದ್ಯತೆಗಳು",
    # "મારું ખેતર", "ઇતિહાસ", "પ્રોફાઇલ", "બજેટ", "પસંદગીઓ",
    # "আমার খামার", "ইতিহাস", "প্রোফাইল", "বাজেট", "পছন্দসমূহ",
    # "എന്റെ കൃഷിയിടം", "ചരിത്രം", "പ്രൊഫൈൽ", "ബജറ്റ്", "മുൻഗണനകൾ",
    # "ମୋର ଚାଷ ଜମି", "ଇତିହାସ", "ପ୍ରୋଫାଇଲ୍", "ବଜେଟ୍", "ପସନ୍ଦ"]

    # if any(k in query for k in memory_kw):
    #     plan.extend(["memory"])

    # If nothing matched, use a smart default that includes vision + weather + agriculture
    # so the dashboard always has rich data on first load.
    if not plan:
        plan.extend(["vision", "agriculture", "weather"])

    # Always include memory lookup and explanation aggregation
    raw_plan = [p for p in plan if p != "memory" and p != "explanation"]
    plan = ["memory"] + list(dict.fromkeys(raw_plan)) + ["explanation"]

   # explanation_log = f"Planner recognized intent. Routed workflow sequence: {' -> '.join(plan)} -> Complete Action Plan."

    return {
        "execution_plan": plan,
        "current_agent": "planner",
        "explanation": "",
        "messages": state.messages + [{"role": "assistant", "content": f"[Planner] Scheduled action plan: {plan}"}]
    }

# 2. Agriculture Agent
def agriculture_agent(state: AgentState) -> Dict[str, Any]:
    rec = []
    crop = state.farmer_profile.get("current_crop", "Tomato")
    
    if state.vision_results:
        disease = state.vision_results.get("disease", "")
        if "Blight" in disease:
            rec.append(f"To manage {disease}: Space plants for ventilation, prune lower leaves, and spray Neem oil or Mancozeb fungicide.")
        elif "Spot" in disease:
            rec.append(f"To manage {disease}: Avoid overhead watering, rotate crops next season, and spray copper-based organic copper hydroxide.")
            
    if state.weather_info:
        rain_prob = state.weather_info.get("rain_probability", 0)
        if rain_prob > 70:
            rec.append("Hold back irrigation today as rain is forecasted with high confidence.")
            
    if state.soil_data:
        moisture = state.soil_data.get("moisture", 50)
        if moisture < 30:
            rec.append("Soil moisture is low. Schedule a light drip irrigation cycle in the morning.")
        elif moisture > 80:
            rec.append("Soil is saturated. Ensure proper drainage channels are clear.")
            
    if not rec:
        rec.append(f"General advisory for {crop}: Ensure balanced NPK application, monitor weekly for whiteflies/pests, and weed the borders.")

    explanation = "\n- ".join(rec)
    return {
        "explanation": state.explanation + f"\n\n[Agriculture Advice]\n- {explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Agriculture] Advisories generated for {crop}."}]
    }

# 3. Vision Agent
def vision_agent(state: AgentState) -> Dict[str, Any]:
    # Simulate computer vision classification (e.g. YOLO/SAM2 output)
    query = state.user_query.lower()
    
    disease = "Early Blight (Fungal)"
    confidence = 0.89
    label = "Tomato Leaf"
    box = [120, 180, 240, 260] # bounding box in [x, y, width, height] format
    
    if "rice" in query or "brown" in query:
        disease = "Brown Spot Disease (Fungal)"
        confidence = 0.92
        label = "Rice Leaf"
        box = [150, 200, 210, 280]
    elif "weed" in query:
        disease = "Broadleaf Weed"
        confidence = 0.85
        label = "Weed Ingress"
        box = [80, 210, 310, 340]
        
    vision_results = {
        "target": label,
        "disease": disease,
        "confidence": confidence,
        "bbox": box
    }
    
    return {
        "vision_results": vision_results,
        "explanation": state.explanation + f"\n\n[Vision Agent Analysis]\nDetected: {disease} on {label} (Confidence: {confidence:.0%}). Bounding box annotated on dashboard.",
        "messages": state.messages + [{"role": "assistant", "content": f"[Vision] Identified {disease} with {confidence:.0%} confidence."}]
    }

# 4. Weather Agent
def weather_agent(state: AgentState) -> Dict[str, Any]:
    profile = state.farmer_profile or {}
    allowed_profile_fields = {
    "farmer_name",
    "location",
    "current_crop",
    "land_size_hectares",
    "soil_type",
    "ph",
    "irrigation_type",
    "budget"}

    safe_profile = {key: value for key, value in profile.items() if key in allowed_profile_fields}
    location = profile.get("location", "Noida")
    
    # Noida coordinates as default fallback
    lat = float(profile.get("lat", 28.5355))
    lng = float(profile.get("lng", 77.3910))
    
    # Fetch real-time weather from Open-Meteo API
    realtime_data = fetch_realtime_weather(lat, lng)
    temp = realtime_data["temperature"]
    humidity = realtime_data["humidity"]
    rain_prob = realtime_data["rain_probability"]
    
    # Query backend LLM for custom weather advisory based on real-time values
    prompt = f"Given location {location} ({lat}, {lng}) has current temperature {temp}C, humidity {humidity}%, and precipitation chance {rain_prob}%. Generate a short, precise 1-sentence weather warning and a 1-sentence agricultural advisory for the current crop {safe_profile.get('current_crop', 'Rice')}. Respond in format warning: [Warning text or 'None'] advisory: [Advisory text]"
    gemini_resp = call_chatbot_api(prompt=prompt, language=state.language, farmer_profile=safe_profile)
    
    warning = "None"
    advisory = "Irrigate crop in early morning." if rain_prob < 50 else "Suspend irrigation, clear drainage paths."
    
    if gemini_resp and "warning:" in gemini_resp.lower() and "advisory:" in gemini_resp.lower():
        try:
            parts = gemini_resp.split("advisory:")
            w_part = parts[0].replace("warning:", "").replace("Warning:", "").strip()
            a_part = parts[1].replace("advisory:", "").replace("Advisory:", "").strip()
            if w_part and "none" not in w_part.lower():
                warning = w_part
            if a_part:
                advisory = a_part
        except Exception:
            pass

    weather_info = {
        "temperature": temp,
        "humidity": humidity,
        "rain_probability": rain_prob,
        "warning": warning,
        "advisory": advisory
    }
    
    exp_warning = f" WARNING: {warning}" if warning != "None" else ""
    return {
        "weather_info": weather_info,
        "explanation": state.explanation + f"\n\n[Weather Forecast]\nTemp: {temp}°C, Humidity: {humidity}%, Rain Probability: {rain_prob}%. Advisory: {weather_info['advisory']}.{exp_warning}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Weather] Current conditions: {temp}°C, Rain chance: {rain_prob}%."}]
    }

# 5. Soil Agent
def soil_agent(state: AgentState) -> Dict[str, Any]:
    profile = state.farmer_profile
    soil_type = profile.get("soil_type", "Clay Loam")
    ph = profile.get("ph", 6.5)
    location = profile.get("location", "").lower()
    
    # Calculate soil readings from state or provide smart recommendations
    n = int(profile.get("nitrogen", 178))
    p = int(profile.get("phosphorus", 41))
    k = int(profile.get("potassium", 215))
    
    moisture = 48
    if "noida" in location:
        moisture = 48
    elif "pune" in location or "maharashtra" in location:
        moisture = 65
    elif "haryana" in location or "karnal" in location:
        moisture = 42
    elif "punjab" in location:
        moisture = 55
    
    rec_fertilizer = "Apply 50 kg Urea (Nitrogen) and 30 kg MOP (Potash) per acre in split doses."
    if ph < 5.5:
        rec_fertilizer += " Apply 200 kg agricultural lime to raise soil pH."
    elif ph > 7.8:
        rec_fertilizer += " Apply gypsum to reduce soil alkalinity."

    soil_data = {
        "soil_type": soil_type,
        "ph": ph,
        "moisture": moisture,
        "nitrogen": n,
        "phosphorus": p,
        "potassium": k,
        "advisory": rec_fertilizer
    }
    
    return {
        "soil_data": soil_data,
        "explanation": state.explanation + f"\n\n[Soil Health Assessment]\nType: {soil_type}, pH: {ph}, Soil Moisture: {moisture}%. Advisory: {rec_fertilizer}",
        "messages": state.messages + [{"role": "assistant", "content": "[Soil] Completed nutrient analysis."}]
    }

# 6. Marketplace Agent
def marketplace_agent(state: AgentState) -> Dict[str, Any]:
    crop = state.farmer_profile.get("current_crop", "Tomato")
    # Match crop to mandi price list
    mandi_info = None
    for item in MANDI_PRICES:
        if crop.lower() in item["crop"].lower():
            mandi_info = item
            break
            
    if not mandi_info:
        mandi_info = MANDI_PRICES[0] # Default to Rice

    mandi_name = mandi_info["mandi"]
    location = state.farmer_profile.get("location", "").lower()
    if "noida" in location:
        mandi_name = "Noida Sec-88 Mandi"
    elif "pune" in location or "maharashtra" in location:
        mandi_name = "Pune Hadapsar Mandi"
    elif "karnal" in location or "haryana" in location:
        mandi_name = "Karnal New Grain Mandi"
    elif "punjab" in location:
        mandi_name = "Ludhiana Central Mandi"

    market_rates = {
        "mandi": mandi_name,
        "price": mandi_info["price"],
        "msp": mandi_info["msp"],
        "trend": mandi_info["trend"],
        "best_time": mandi_info["best_time"],
        "demand": mandi_info["demand"]
    }
    
    exp = f"Mandi: {mandi_info['mandi']}. Price: ₹{mandi_info['price']}/quintal (MSP: ₹{mandi_info['msp']}). Trend: {mandi_info['trend']}. Recommended Selling Window: {mandi_info['best_time']}."
    return {
        "market_rates": market_rates,
        "explanation": state.explanation + f"\n\n[Marketplace Rates]\n{exp}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Marketplace] Fetched mandi rates for {crop}."}]
    }

# 7. Government Scheme Agent
def government_agent(state: AgentState) -> Dict[str, Any]:
    # Match schemes based on profile/crop
    matched = []
    crop = state.farmer_profile.get("current_crop", "Tomato")
    land_size = state.farmer_profile.get("land_size_hectares", 1.5)
    
    for scheme in GOVERNMENT_SCHEMES:
        if "PM-KISAN" in scheme["name"] and land_size <= 2.0:
            matched.append(scheme)
        elif "Fasal Bima" in scheme["name"]:
            matched.append(scheme)
        elif "Machinery" in scheme["name"] and "drone" in state.user_query.lower():
            matched.append(scheme)
            
    if not matched:
        matched = [GOVERNMENT_SCHEMES[0]] # Fallback to PM-KISAN

    explanation_list = []
    for s in matched:
        explanation_list.append(f"- **{s['name']}**: {s['benefits']} (Required documents: {', '.join(s['documents'])}). Steps: {s['steps'][0]} -> {s['steps'][-1]}.")
        
    explanation = "\n".join(explanation_list)
    return {
        "schemes": matched,
        "explanation": state.explanation + f"\n\n[Government Schemes Recommendations]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Government Scheme] Matched {len(matched)} programs."}]
    }

# 8. Healthcare Agent
def healthcare_agent(state: AgentState) -> Dict[str, Any]:
    query = state.user_query.lower()
    
    advice = HEALTHCARE_GUIDES["heat_stroke"] # default advice
    key = "heat_stroke"
    
    if "snake" in query or "bite" in query:
        advice = HEALTHCARE_GUIDES["snake_bite"]
        key = "snake_bite"
    elif "poison" in query or "pesticide" in query or "spray" in query:
        advice = HEALTHCARE_GUIDES["pesticide_poisoning"]
        key = "pesticide_poisoning"
        
    medical_advice = {
        "condition": key.replace("_", " ").title(),
        "first_aid": advice["steps"],
        "emergency_contact": "108 (National Ambulance Helpline)",
        "nearest_hospitals": ["Sub-Divisional Hospital (5km)", "District General Hospital (18km)"]
    }
    
    steps_str = "\n- ".join(advice["steps"])
    explanation = f"Emergency Protocol for **{medical_advice['condition']}**:\n- {steps_str}\n\nCall emergency helpline **108** immediately."
    
    return {
        "medical_advice": medical_advice,
        "explanation": state.explanation + f"\n\n[Healthcare Support]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Healthcare] First aid loaded for {medical_advice['condition']}."}]
    }

# 9. Disaster Agent
def disaster_agent(state: AgentState) -> Dict[str, Any]:
    query = state.user_query.lower()
    
    disaster_type = "lightning"
    guide = DISASTER_GUIDES["lightning"]
    
    if "flood" in query or "submerge" in query or "water" in query:
        disaster_type = "flood"
        guide = DISASTER_GUIDES["flood"]
        
    # Crop damage calculator
    damage_est = "N/A"
    if disaster_type == "flood":
        # Estimate damage based on water logging duration
        damage_est = "Crops submerged for over 48 hours suffer roughly 60-80% yield loss. Fungal root rots may set in."
        
    disaster_alerts = {
        "alert_type": disaster_type.upper(),
        "steps": guide["steps"],
        "damage_estimator": damage_est,
        "active_warnings": ["Yellow Warning: Light-to-moderate lightning storms forecasted over the sub-district." if disaster_type == "lightning" else "High Alert: River levels expected to cross danger mark."]
    }
    
    steps_str = "\n- ".join(guide["steps"])
    explanation = f"**{disaster_type.upper()} ALERT**\nActive Warnings: {', '.join(disaster_alerts['active_warnings'])}\nAction steps:\n- {steps_str}"
    if damage_est != "N/A":
        explanation += f"\nCrop Damage Estimate: {damage_est}"
        
    return {
        "disaster_alerts": disaster_alerts,
        "explanation": state.explanation + f"\n\n[Disaster Response]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Disaster] Alert triggered for {disaster_type}."}]
    }

# 10. Education Agent
def education_agent(state: AgentState) -> Dict[str, Any]:
    matched_tuts = []
    query = state.user_query.lower()
    
    for tut in EDUCATION_TUTORIALS:
        if tut["crop"].lower() in query or "irrigation" in query:
            matched_tuts.append(tut)
            
    if not matched_tuts:
        matched_tuts = [EDUCATION_TUTORIALS[0]]
        
    tutorials_list = []
    for t in matched_tuts:
        quiz_ref = [q for q in QUIZZES if q["id"] == t["quiz_id"]]
        quiz_title = quiz_ref[0]["title"] if quiz_ref else "Farming Quiz"
        tutorials_list.append({
            "title": t["title"],
            "summary": t["summary"],
            "duration": t["duration"],
            "quiz_title": quiz_title,
            "quiz_id": t["quiz_id"]
        })
        
    exp_arr = [f"📚 **{t['title']}** ({t['duration']}): {t['summary']} (Quiz available: *{t['quiz_title']}*)" for t in tutorials_list]
    explanation = "\n".join(exp_arr)
    
    return {
        "tutorials": tutorials_list,
        "explanation": state.explanation + f"\n\n[Education Hub]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Education] Loaded tutorial links: {[t['title'] for t in tutorials_list]}."}]
    }

# 11. Memory Agent
def memory_agent(state: AgentState) -> Dict[str, Any]:
    # Default memory parameters if profile is empty
    profile = state.farmer_profile or {}
    
    if not profile:
        profile = {
            "farmer_name": "Ramesh Kumar",
            "location": "Bhatinda, Punjab",
            "current_crop": "Tomato",
            "land_size_hectares": 1.5,
            "soil_type": "Loam",
            "ph": 6.8,
            "irrigation_type": "Drip",
            "budget": "Medium",
            "historical_diseases": ["Early Blight (2025)"],
            "language": state.language
        }
    
    # Save any new preferences extracted from user query
    query = state.user_query.lower()
    if "rice" in query:
        profile["current_crop"] = "Rice"
        profile["soil_type"] = "Clay"
        profile["ph"] = 6.2
    elif "cotton" in query:
        profile["current_crop"] = "Cotton"
        profile["soil_type"] = "Black Soil"
        profile["ph"] = 7.4
        
    if "punjabi" in query:
        state.language = "pa"
    elif "hindi" in query:
        state.language = "hi"
        
    profile["language"] = state.language

    farmer_name = profile.get("farmer_name", "Ramesh Kumar")
    current_crop = profile.get("current_crop", "Tomato")
    soil_type = profile.get("soil_type", "Loam")
    exp = f"Memory loaded for Farmer: {farmer_name}. Crop: {current_crop}, Soil type: {soil_type}."
    return {
        "farmer_profile": profile,
        "explanation": state.explanation + f"\n\n[Memory Context Retrieval]\n{exp}",
        "messages": state.messages + [{"role": "assistant", "content": "[Memory] Retrieved profile and preference constraints."}]
    }

# 12. Knowledge Agent (RAG)
def knowledge_agent(state: AgentState) -> Dict[str, Any]:
    query = state.user_query.lower()
    profile = state.farmer_profile or {}
    allowed_profile_fields = {
    "farmer_name",
    "location",
    "current_crop",
    "land_size_hectares",
    "soil_type",
    "ph",
    "irrigation_type",
    "budget"}

    safe_profile = {key: value for key, value in profile.items() if key in allowed_profile_fields}
    # Check if backend LLM is available to get real-time AI knowledge
    gemini_resp = call_chatbot_api(prompt=f"Provide a short, structured agricultural recommendation for: '{query}' regarding crop {safe_profile.get('current_crop', 'Rice')} at location {safe_profile.get('location', 'Noida')}.", language=state.language, farmer_profile=safe_profile)
    
    if gemini_resp:
        explanation = f"KVK RAG Insights:\n- {gemini_resp}"
        doc_count = 1
    else:
        results = []
        for kb in KNOWLEDGE_BASE:
            words = kb["query"].split()
            if any(w in query for w in words):
                results.append(kb["content"])
        if not results:
            results.append("KVK Advisory: Standard farming procedures suggest maintaining clean drainage, periodic weeding, and using seed varieties certified by regional agricultural universities.")
        explanation = "\n".join([f"- {r}" for r in results])
        doc_count = len(results)
    return {
        "explanation": state.explanation + f"\n\n[Knowledge Retrieval (RAG via Qdrant)]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Knowledge Agent] Fetched {doc_count} RAG reference documents."}]
    }


# 13. Explanation Agent (Aggregator + LLM-powered final response)
def explanation_agent(state: AgentState) -> Dict[str, Any]:
    """
    Aggregates outputs from all upstream agents and produces a polished,
    language-aware final advisory using the hosted LLM.

    Falls back to a deterministic template if the LLM is unreachable so the
    pipeline always returns a usable response.
    """
    lang = (state.language or "en").lower()

    allowed_profile_fields = {
    "farmer_name",
    "location",
    "current_crop",
    "land_size_hectares",
    "soil_type",
    "ph",
    "irrigation_type",
    "budget"}

    safe_profile = {key: value for key, value in state.farmer_profile.items() if key in allowed_profile_fields}


    # Build a structured context payload from every agent's output so the LLM
    # has the full picture when generating the final advisory.
    context_parts = []

    context_parts.append(f"User Query: {state.user_query}")
    context_parts.append(f"Farmer Profile: {safe_profile}")

    if state.vision_results:
        context_parts.append(
            f"Vision Analysis: target={state.vision_results.get('target')}, "
            f"disease={state.vision_results.get('disease')}, "
            f"confidence={state.vision_results.get('confidence')}"
        )
    if state.weather_info:
        context_parts.append(
            f"Weather: temp={state.weather_info.get('temperature')}C, "
            f"humidity={state.weather_info.get('humidity')}%, "
            f"rain_probability={state.weather_info.get('rain_probability')}%, "
            f"advisory={state.weather_info.get('advisory')}, "
            f"warning={state.weather_info.get('warning')}"
        )
    if state.soil_data:
        context_parts.append(
            f"Soil: type={state.soil_data.get('soil_type')}, "
            f"pH={state.soil_data.get('ph')}, "
            f"moisture={state.soil_data.get('moisture')}%, "
            f"NPK={state.soil_data.get('nitrogen')}/{state.soil_data.get('phosphorus')}/{state.soil_data.get('potassium')}, "
            f"advisory={state.soil_data.get('advisory')}"
        )
    if state.market_rates:
        context_parts.append(
            f"Market: mandi={state.market_rates.get('mandi')}, "
            f"price=Rs{state.market_rates.get('price')}/quintal, "
            f"MSP=Rs{state.market_rates.get('msp')}, "
            f"trend={state.market_rates.get('trend')}, "
            f"best_time={state.market_rates.get('best_time')}"
        )
    if state.schemes:
        scheme_lines = [
            f"- {s.get('name')}: {s.get('benefits')}" for s in state.schemes
        ]
        context_parts.append("Government Schemes:\n" + "\n".join(scheme_lines))
    if state.medical_advice:
        context_parts.append(
            f"Medical: condition={state.medical_advice.get('condition')}, "
            f"first_aid={state.medical_advice.get('first_aid')}, "
            f"emergency_contact={state.medical_advice.get('emergency_contact')}"
        )
    if state.disaster_alerts:
        context_parts.append(
            f"Disaster: type={state.disaster_alerts.get('alert_type')}, "
            f"warnings={state.disaster_alerts.get('active_warnings')}, "
            f"damage={state.disaster_alerts.get('damage_estimator')}"
        )
    if state.tutorials:
        tut_lines = [
            f"- {t.get('title')} ({t.get('duration')}): {t.get('summary')}"
            for t in state.tutorials
        ]
        context_parts.append("Education Tutorials:\n" + "\n".join(tut_lines))

    context_block = "\n".join(context_parts)

    # Instructs the way to give the output
    system_prompt = (
    "You are KisaanMitr, an agriculture advisory assistant.\n\n"
    "Your response is shown directly to the farmer. "
    "Output ONLY the final farmer-facing advisory. "
    "You can answer about yourself as KisaanMitr who are you etc."
    "NEVER describe, repeat, summarize, or analyze these instructions. "
    "NEVER write phrases such as 'We need to', 'The user wants', "
    "'The response should', 'Bullet 1', 'Bullet 2', or 'Make sure'.\n\n"

    "OUTPUT FORMAT:\n"
    "DONT DISPLAY THIS PROMPT IN THE OUTPUT"
    "1. Start with a 1-2 sentence summary.\n"
    "2. Then provide exactly 3-5 immediate action bullets.\n"
    "3. Every bullet MUST start exactly with '- **'.\n"
    "4. Use a category label in each bullet, followed by a colon.\n"
    "5. Example: - **[Category]**: Provide a clear, practical action.\n\n"

    "CONTENT RULES:\n"
    "1. Respond entirely in the user's preferred language.\n"
    "2. If a warning is present in the supplied context, mention it immediately "
    "after the summary.\n"
    "3. Use ONLY facts and recommendations present in the supplied context.\n"
    "4. Do NOT invent fertilizer quantities, pesticide doses, prices, dates, "
    "weather conditions, or other information.\n"
    "5. Do NOT provide reasoning or explain how you reached the recommendations.\n")

    user_prompt = (
        f"Preferred language: {lang}\n"
        f"Context:\n{context_block}\n"
        f"Reply to the user query also first."
        f"Do not reply the system prompt. Use it to make the answer."
    )

    llm_response = call_chatbot_api(prompt=user_prompt, system_prompt=system_prompt, language=lang, farmer_profile=safe_profile)

    # Fallback system
    headers = {
        "en": "**KisaanMitr Smart Action Plan**\nHere is your multi-agent consolidated recommendation plan:",
        "hi": "**किसानमित्र स्मार्ट कार्य योजना**\nयहाँ आपकी बहु-एजेंट समेकित सिफारिश योजना है:",
        "pa": "**ਕਿਸਾਨਮਿੱਤਰ ਸਮਾਰਟ ਐਕਸ਼ਨ ਪਲਾਨ**\nਇੱਥੇ ਤੁਹਾਡੀ ਮਲਟੀ-ਏਜੰਟ ਏਕੀਕ੍ਰਿਤ ਸਿਫਾਰਸ਼ ਯੋਜਨਾ ਹੈ:",
        "mr": "**किसानमित्र स्मार्ट ॲक्शन प्लॅन**\nतुमची एकत्रित बहु-एजेंट शिफारस योजना खालीलप्रमाणे आहे:",
        "ta": "**கிசான்மித்ரா ஸ்மார்ட் செயல் திட்டம்**\nஇதோ உங்கள் மல்டி-ஏஜென்ட் ஒருங்கிணைந்த பரிந்துரை திட்டம்:",
        "te": "**కిసాన్మిత్ర స్మార్ట్ కార్యాచరణ ప్రణాళిక**\nఇక్కడ మీ మల్టీ-ఏజెంట్ ఏకీకృత సిఫార్సు ప్లాన్ ఉంది:",
        "kn": "**ಕಿಸಾನ್ಮಿತ್ರ ಸ್ಮಾರ್ಟ್ ಆಕ್ಷನ್ ಪ್ಲಾನ್**\nಇಲ್ಲಿ ನಿಮ್ಮ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಕ್ರೋಡೀಕರಿಸಿದ ಶಿಫಾರಸು ಯೋಜನೆ ಇದೆ:",
        "gu": "**કિસાનમિત્ર સ્માર્ટ એક્શન પ્લાન**\nઅહીં તમારી મલ્ટી-એજન્ટ સંકલિત ભલામણ યોજના છે:",
        "bn": "**কিষাণমিত্র স্মার্ট অ্যাকশন প্ল্যান**\nএখানে আপনার বহু-এজেন্ট একত্রিত সুপারিশ পরিকল্পনা রয়েছে:",
        "ml": "**കിസാൻമിത്ര സ്മാർട്ട് ആക്ഷൻ പ്ലാൻ**\nനിങ്ങളുടെ മൾട്ടി-ഏജന്റ് ഏകീകൃത ശുപാർശ പ്ലാൻ ഇതാ:",
        "or": "**କିଷାନମିତ୍ର ସ୍ମାର୍ଟ ଆକ୍ସନ ପ୍ଲାନ**\nଏଠାରେ ଆପଣଙ୍କର ମଲ୍ଟି-ଏଜେଣ୍ଟ ଏକତ୍ରିତ ସୁପାରିଶ ଯୋଜନା ଅଛି:",
    }
    header = headers.get(lang, headers["en"])

    fallback_body = state.explanation or "No upstream agent outputs were produced."
    fallback_output = (
        f"{header}\n{fallback_body}\n"
        "*Every advisory is backed by Explainable AI logic. Modify inputs or "
        "sensors in the dashboard to update recommendations.*"
    )

    if llm_response:
        final_output = f"{llm_response.strip()}"
        source = "llm"
    else:
        final_output = fallback_output
        source = "fallback"
    return {
        "explanation": final_output,
        "current_agent": "explanation",
        "messages": state.messages
        + [{"role": "assistant", "content": final_output}],
        "llm_already_called": True
    }
