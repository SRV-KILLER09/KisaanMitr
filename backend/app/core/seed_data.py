# Seed Data for Kisaanमित्र

MANDI_PRICES = [
    {"crop": "Rice (Dhan)", "mandi": "Khanna Mandi, Punjab", "price": 2300, "msp": 2183, "trend": "up", "best_time": "Next 10 Days", "demand": "High"},
    {"crop": "Wheat (Kanak)", "mandi": "Karnal Mandi, Haryana", "price": 2450, "msp": 2275, "trend": "stable", "best_time": "Now", "demand": "Medium"},
    {"crop": "Tomato (Tamatar)", "mandi": "Azadpur Mandi, Delhi", "price": 3200, "msp": 0, "trend": "down", "best_time": "Sell Immediately", "demand": "High"},
    {"crop": "Cotton (Kapaas)", "mandi": "Rajkot Mandi, Gujarat", "price": 7100, "msp": 6620, "trend": "up", "best_time": "Mid August", "demand": "High"},
    {"crop": "Soybean", "mandi": "Indore Mandi, Madhya Pradesh", "price": 4600, "msp": 4600, "trend": "stable", "best_time": "End of Month", "demand": "Medium"},
    {"crop": "Onion (Pyaz)", "mandi": "Lasalgaon Mandi, Maharashtra", "price": 2800, "msp": 0, "trend": "up", "best_time": "Next 2 Weeks", "demand": "High"},
]

GOVERNMENT_SCHEMES = [
    {
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "benefits": "Rs. 6,000 per year in three equal installments directly to bank accounts.",
        "eligibility": "Small and marginal farmers holding cultivable land up to 2 hectares.",
        "documents": ["Aadhaar Card", "Land Ownership Papers", "Bank Account Details"],
        "steps": ["Register on PM-KISAN Portal", "Upload land documents", "Submit Aadhaar & Bank info", "Aadhar verification by state government"]
    },
    {
        "name": "PM Fasal Bima Yojana (Crop Insurance)",
        "benefits": "Insurance cover against crop failure due to natural disasters, pests & diseases.",
        "eligibility": "All farmers growing notified crops in notified areas, including sharecroppers.",
        "documents": ["Land records", "Sowing certificate", "Bank details", "ID proof"],
        "steps": ["Apply through Bank or CSC Center within 15 days of sowing", "Pay premium (1.5%-2% for food crops, 5% for commercial)", "Verification by insurance agent"]
    },
    {
        "name": "Subsidized Agriculture Machinery Scheme",
        "benefits": "40% to 80% subsidy on buying tractors, rotavators, power tillers, and drones.",
        "eligibility": "Registered farmers with land holding, priority to women and SC/ST farmers.",
        "documents": ["Tractor registration (if applicable)", "Land certificate", "Aadhaar Card", "Quotation of machine"],
        "steps": ["Apply on State DBT Agriculture Portal", "Select approved dealer", "Obtain pre-approval", "Purchase and submit invoice for subsidy release"]
    }
]

HEALTHCARE_GUIDES = {
    "snake_bite": {
        "title": "Snake Bite First Aid",
        "steps": [
            "Keep the patient calm and reassure them. Keep them as still as possible.",
            "Remove tight clothing, rings, or shoes from the bitten limb before swelling starts.",
            "Immobilize the bitten limb using a splint or bandage (do not tie it so tight that blood flow stops).",
            "DO NOT cut the wound, DO NOT try to suck out the venom, DO NOT apply ice or electric shock.",
            "Immediately transport the patient to the nearest hospital that stocks Anti-Snake Venom (ASV)."
        ],
        "symptoms": ["Double vision", "Difficulty breathing", "Swelling and redness around bite", "Nausea"]
    },
    "pesticide_poisoning": {
        "title": "Pesticide Poisoning Treatment",
        "steps": [
            "Immediately remove the patient from the sprayed area to fresh air.",
            "Drench skin and hair with clean water if pesticide splashed on them. Remove contaminated clothes.",
            "If pesticide was swallowed and patient is conscious, rinse mouth with water. DO NOT induce vomiting unless specified on the label.",
            "Keep the patient warm and lying on their side to prevent choking.",
            "Take the pesticide bottle/label and rush to the nearest primary health center (PHC)."
        ]
    },
    "heat_stroke": {
        "title": "Heat Stroke Relief",
        "steps": [
            "Move the farmer to a cool, shaded area immediately.",
            "Cool the patient by spraying or sponging with cold water, fan vigorously.",
            "If conscious, give cool water or ORS (Oral Rehydration Solution) to drink.",
            "Place ice packs under arms, groin, and neck."
        ]
    }
}

DISASTER_GUIDES = {
    "lightning": {
        "title": "Lightning Storm Safety",
        "steps": [
            "Immediately stop working in open fields. Seek shelter inside a solid building.",
            "Avoid standing under tall trees, electric poles, or near metal farm equipment (like tractors).",
            "If caught in the open with no shelter, squat low on the balls of your feet. Do not lie flat on the ground.",
            "Keep away from water bodies (ponds, irrigation channels)."
        ]
    },
    "flood": {
        "title": "Flood Preparedness and Damage Estimation",
        "steps": [
            "Move livestock and machines to elevated ground.",
            "Turn off power supplies in fields and farm buildings.",
            "Do not enter fast-flowing water. Keep emergency food, water, and flashlights ready.",
            "To estimate crop damage: Document water logging duration. Crops submerged for more than 48 hours suffer significant root damage. Take photos for insurance claim."
        ]
    }
}

EDUCATION_TUTORIALS = [
    {
        "id": "tut_1",
        "title": "How to treat yellow spots on Tomato leaves",
        "crop": "Tomato",
        "duration": "5 mins",
        "summary": "Yellow spots on tomato leaves usually point to Early Blight (fungal) or nutrient deficiency. Keep the soil moisture uniform, apply Neem oil for pests, or use Mancozeb fungicide in severe cases.",
        "quiz_id": "quiz_tomato"
    },
    {
        "id": "tut_2",
        "title": "Drip Irrigation & Water Management",
        "crop": "All Crops",
        "duration": "7 mins",
        "summary": "Drip irrigation saves up to 50% water. Set the dripper lines close to crop root zones. Test soil moisture using a simple tensiometer before scheduling irrigation.",
        "quiz_id": "quiz_irrigation"
    }
]

QUIZZES = [
    {
        "id": "quiz_tomato",
        "title": "Tomato Disease Quiz",
        "questions": [
            {
                "question": "What is the primary cause of Early Blight in tomatoes?",
                "options": ["Fungus (Alternaria)", "Virus", "Lack of Nitrogen", "Excessive Watering"],
                "answer": "Fungus (Alternaria)",
                "explanation": "Early blight is caused by the fungus Alternaria solani, which thrives in warm, humid weather."
            },
            {
                "question": "Which organic spray helps control initial fungal spots?",
                "options": ["Neem Oil spray", "Salt water", "Sugar syrup", "Kerosene"],
                "answer": "Neem Oil spray",
                "explanation": "Neem oil has natural antifungal and insecticidal properties suitable for organic farming."
            }
        ]
    },
    {
        "id": "quiz_irrigation",
        "title": "Smart Irrigation Quiz",
        "questions": [
            {
                "question": "How much water can drip irrigation save compared to flood irrigation?",
                "options": ["10-20%", "30-50%", "80-90%", "0%"],
                "answer": "30-50%",
                "explanation": "Drip irrigation delivers water directly to root zones, cutting down evaporation and runoff losses."
            }
        ]
    }
]

KNOWLEDGE_BASE = [
    {"query": "yellow spots tomato leaves", "content": "ICAR Tomato Manual: Yellow spots with concentric rings suggest Early Blight (Alternaria solani). Apply copper-based fungicide or Neem oil. Ensure proper spacing for airflow."},
    {"query": "rice leaves turning brown", "content": "KVK Bulletin: Brown spots on rice leaves indicate Brown Spot disease (fungal). It occurs in nutrient-deficient soils. Apply Potash fertilizer and spray Hexaconazole if severity is high."},
    {"query": "lightning guidelines for farmer", "content": "National Disaster Authority: Farmers should leave fields immediately during lightning. Squat on insulated surfaces, avoid tractors or open tube-wells."},
    {"query": "pesticide poisoning first aid", "content": "WHO Pesticide Safety Manual: Wash contaminated skin immediately. Avoid inducing vomiting for organophosphate poisoning. Administer Atropine under medical supervision."}
]
