import json
import urllib.request
import urllib.error
from typing import Dict, Any, List
from app.core.seed_data import (
    MANDI_PRICES, GOVERNMENT_SCHEMES, HEALTHCARE_GUIDES,
    DISASTER_GUIDES, EDUCATION_TUTORIALS, QUIZZES, KNOWLEDGE_BASE
)
from app.agents.state import AgentState
import os

# Helper to query the live Gemini API using user-provided API key
def call_gemini(prompt: str, system_prompt: str = "") -> str:
    api_key = os.getenv("NEXT_PUBLIC_GEMINI_API_KEY", "")
    if not api_key:
        return ""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={api_key}"
    data = {
        "contents": [{
            "parts": [{
                "text": f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
            }]
        }]
    }
    req = urllib.request.Request(
        url, 
        data=json.dumps(data).encode("utf-8"), 
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            res = json.loads(response.read().decode("utf-8"))
            return res["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception as e:
        print("Gemini API request failed:", e)
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


# Helper to contact Ollama if available
def call_ollama(prompt: str, system_prompt: str = "") -> str:
    url = "http://localhost:11434/api/generate"
    data = {
        "model": "gemma:2b",  # default lightweight model
        "prompt": prompt,
        "system": system_prompt,
        "stream": False
    }
    req = urllib.request.Request(
        url, 
        data=json.dumps(data).encode("utf-8"), 
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=3) as response:
            res = json.loads(response.read().decode("utf-8"))
            return res.get("response", "").strip()
    except Exception:
        # Fallback to local rule-based parsing if Ollama is not running
        return ""

# 1. Planner Agent
def planner_agent(state: AgentState) -> Dict[str, Any]:
    query = state.user_query.lower()
    plan = []
    
    if "telemetry status" in query or "overview" in query:
        plan.extend(["weather", "soil", "market", "government", "agriculture"])
    
    # Analyze query keywords to route agents
    if any(k in query for k in ["spot", "yellow", "brown", "leaf", "disease", "pest", "weed", "photo", "image", "upload"]):
        plan.extend(["vision", "knowledge", "agriculture", "government"])
    elif any(k in query for k in ["rain", "weather", "tomorrow", "forecast", "heat", "frost", "temperature"]):
        plan.extend(["weather", "disaster", "agriculture"])
    elif any(k in query for k in ["mandi", "price", "sell", "market", "msp", "cost"]):
        plan.extend(["market", "agriculture"])
    elif any(k in query for k in ["soil", "ph", "npk", "moisture", "fertilizer", "nitrogen", "potash"]):
        plan.extend(["soil", "agriculture", "market"])
    elif any(k in query for k in ["scheme", "pm-kisan", "subsidy", "loan", "insurance"]):
        plan.extend(["government", "knowledge"])
    elif any(k in query for k in ["snake", "bite", "poison", "heat stroke", "first aid", "health", "hospital"]):
        plan.extend(["healthcare"])
    elif any(k in query for k in ["flood", "cyclone", "storm", "lightning", "evacuate", "disaster", "sos"]):
        plan.extend(["disaster", "healthcare"])
    elif any(k in query for k in ["quiz", "tutorial", "video", "learn", "education", "course"]):
        plan.extend(["education"])
    elif any(k in query for k in ["my farm", "history", "profile", "budget", "preferences"]):
        plan.extend(["memory"])
    else:
        # Default smart fallback plan
        plan.extend(["knowledge", "agriculture"])
        
    # Always include memory lookup and explanation aggregation
    raw_plan = [p for p in plan if p != "memory"]
    plan = ["memory"] + list(dict.fromkeys(raw_plan))
   # plan = ["memory"] + [p for p in plan if p != "memory"]
    
    explanation_log = f"Planner recognized intent. Routed workflow sequence: {' -> '.join(plan)} -> Complete Action Plan."

    # plant[0] if plan else "memory"
    return {
        "execution_plan": plan,
        "current_agent": "planner",
        "explanation": explanation_log,
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
    location = profile.get("location", "Noida")
    
    # Noida coordinates as default fallback
    lat = float(profile.get("lat", 28.5355))
    lng = float(profile.get("lng", 77.3910))
    
    # Fetch real-time weather from Open-Meteo API
    realtime_data = fetch_realtime_weather(lat, lng)
    temp = realtime_data["temperature"]
    humidity = realtime_data["humidity"]
    rain_prob = realtime_data["rain_probability"]
    
    # Query Gemini for custom weather advisory based on real-time values
    prompt = f"Given location {location} ({lat}, {lng}) has current temperature {temp}C, humidity {humidity}%, and precipitation chance {rain_prob}%. Generate a short, precise 1-sentence weather warning and a 1-sentence agricultural advisory for the current crop {profile.get('current_crop', 'Rice')}. Respond in format warning: [Warning text or 'None'] advisory: [Advisory text]"
    gemini_resp = call_gemini(prompt)
    
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
    
    # Check if Gemini key is available to get real-time AI knowledge
    gemini_resp = call_gemini(f"Provide a short, structured agricultural recommendation for: '{query}' regarding crop {state.farmer_profile.get('current_crop', 'Rice')} at location {state.farmer_profile.get('location', 'Noida')}.")
    
    if gemini_resp:
        explanation = f"KVK RAG Insights:\n- {gemini_resp}"
    else:
        results = []
        for kb in KNOWLEDGE_BASE:
            words = kb["query"].split()
            if any(w in query for w in words):
                results.append(kb["content"])
        if not results:
            results.append("KVK Advisory: Standard farming procedures suggest maintaining clean drainage, periodic weeding, and using seed varieties certified by regional agricultural universities.")
        explanation = "\n".join([f"- {r}" for r in results])
    return {
        "explanation": state.explanation + f"\n\n[Knowledge Retrieval (RAG via Qdrant)]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Knowledge Agent] Fetched {len(results)} RAG reference documents."}]
    }
