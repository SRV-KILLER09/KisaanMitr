from langgraph.graph import StateGraph, END
from typing import Dict, Any

from app.agents.state import AgentState
from app.agents.agents import (
    planner_agent, agriculture_agent, vision_agent, weather_agent,
    soil_agent, marketplace_agent, government_agent, healthcare_agent,
    disaster_agent, education_agent, memory_agent, knowledge_agent
)

# Wrapper nodes to update the current_agent tracking variable during execution
def make_node(agent_fn, agent_name: str):
    def node(state: AgentState) -> Dict[str, Any]:
        result = agent_fn(state)
        # Ensure current_agent is set to this agent so router knows where we are
        result["current_agent"] = agent_name
        return result
    return node

# Router function to decide the next node
def route_next(state: AgentState) -> str:
    plan = state.execution_plan
    curr = state.current_agent
    
    if not plan:
        return "explanation"
        
    try:
        idx = plan.index(curr)
        if idx + 1 < len(plan):
            next_agent = plan[idx + 1]
            return next_agent
        else:
            return "explanation"
    except ValueError:
        # If we are at the planner or explanation, route to first plan item or end
        if curr == "planner" and plan:
            return plan[0]
        return "explanation"

# Explanation / Aggregator Node
def explanation_node(state: AgentState) -> Dict[str, Any]:
    # Formulate final response based on language selection
    exp = state.explanation
    lang = state.language.lower()
    
    # Mock Translation dictionary for explainable response headers in regional languages
    headers = {
        "en": "🌾 **KisaanMitra Smart Action Plan** 🌾\nHere is your multi-agent consolidated recommendation plan:",
        "hi": "🌾 **किसानमित्र स्मार्ट कार्य योजना** 🌾\nयहाँ आपकी बहु-एजेंट समेकित सिफारिश योजना है:",
        "pa": "🌾 **ਕਿਸਾਨਮਿੱਤਰ ਸਮਾਰਟ ਐਕਸ਼ਨ ਪਲਾਨ** 🌾\nਇੱਥੇ ਤੁਹਾਡੀ ਮਲਟੀ-ਏਜੰਟ ਏਕੀਕ੍ਰਿਤ ਸਿਫਾਰਸ਼ ਯੋਜਨਾ ਹੈ:",
        "mr": "🌾 **किसानमित्र स्मार्ट ॲक्शन प्लॅन** 🌾\nतुमची एकत्रित बहु-एजेंट शिफारस योजना खालीलप्रमाणे आहे:",
        "ta": "🌾 **கிசான்மித்ரா ஸ்மார்ட் செயல் திட்டம்** 🌾\nஇதோ உங்கள் மல்டி-ஏஜென்ட் ஒருங்கிணைந்த பரிந்துரை திட்டம்:",
        "te": "🌾 **కిసాన్మిత్ర స్మార్ట్ కార్యాచరణ ప్రణాళిక** 🌾\nఇక్కడ మీ మల్టీ-ఏజెంట్ ఏకీకృత సిఫార్సు ప్లాన్ ఉంది:",
        "kn": "🌾 **ಕಿಸಾನ್ಮಿತ್ರ ಸ್ಮಾರ್ಟ್ ಆಕ್ಷನ್ ಪ್ಲಾನ್** 🌾\nಇಲ್ಲಿ ನಿಮ್ಮ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಕ್ರೋಡೀಕರಿಸಿದ ಶಿಫಾರಸು ಯೋಜನೆ ಇದೆ:",
        "gu": "🌾 **કિસાનમિત્ર સ્માર્ટ એક્શન પ્લાન** 🌾\nઅહીં તમારી મલ્ટી-એજન્ટ સંકલિત ભલામણ યોજના છે:",
        "bn": "🌾 **কিষাণমিত্র স্মার্ট অ্যাকশন প্ল্যান** 🌾\nএখানে আপনার বহু-এজেন্ট একত্রিত সুপারিশ পরিকল্পনা রয়েছে:",
        "ml": "🌾 **കിസാൻമിത്ര സ്മാർട്ട് ആക്ഷൻ പ്ലാൻ** 🌾\nനിങ്ങളുടെ മൾട്ടി-ഏജന്റ് ഏകീകൃത ശുപാർശ പ്ലാൻ ഇതാ:",
        "or": "🌾 **କିଷାନମିତ୍ର ସ୍ମାର୍ଟ ଆକ୍ସନ ପ୍ଲାନ** 🌾\nଏଠାରେ ଆପଣଙ୍କର ମଲ୍ଟି-ଏଜେଣ୍ଟ ଏକତ୍ରିତ ସୁପାରିଶ ଯୋଜନା ଅଛି:"
    }
    
    header = headers.get(lang, headers["en"])
    final_output = f"{header}\n{exp}\n\n---\n*💡 Every advisory is backed by Explainable AI logic. Modify inputs or sensors in the dashboard to update recommendations.*"
    
    # If a specific translation is required and we are in fallback, simulate local translation updates
    if lang != "en":
        # Simulating regional text structure updates for the summary
        final_output = final_output.replace("[Weather Forecast]", "[मौसम पूर्वानुमान]" if lang == "hi" else "[ਹਵਾ-ਪਾਣੀ ਪੂਰਵ-ਅਨੁਮାନ]" if lang == "pa" else "[Weather Forecast]")
        final_output = final_output.replace("[Soil Health Assessment]", "[मिट्टी स्वास्थ्य मूल्यांकन]" if lang == "hi" else "[Soil Health Assessment]")
        final_output = final_output.replace("[Marketplace Rates]", "[मंडी दर और बाजार]" if lang == "hi" else "[Marketplace Rates]")
        
    return {
        "explanation": final_output,
        "current_agent": "explanation",
        "messages": state.messages + [{"role": "assistant", "content": final_output}]
    }

# Build LangGraph workflow
workflow = StateGraph(AgentState)

# Add Agent Nodes
workflow.add_node("planner", planner_agent)
workflow.add_node("memory", make_node(memory_agent, "memory"))
workflow.add_node("agriculture", make_node(agriculture_agent, "agriculture"))
workflow.add_node("vision", make_node(vision_agent, "vision"))
workflow.add_node("weather", make_node(weather_agent, "weather"))
workflow.add_node("soil", make_node(soil_agent, "soil"))
workflow.add_node("market", make_node(marketplace_agent, "market"))
workflow.add_node("government", make_node(government_agent, "government"))
workflow.add_node("healthcare", make_node(healthcare_agent, "healthcare"))
workflow.add_node("disaster", make_node(disaster_agent, "disaster"))
workflow.add_node("education", make_node(education_agent, "education"))
workflow.add_node("knowledge", make_node(knowledge_agent, "knowledge"))
workflow.add_node("explanation", explanation_node)

# Entrypoint
workflow.set_entry_point("planner")

# Standard router target dictionary
router_targets = {
    "memory": "memory",
    "agriculture": "agriculture",
    "vision": "vision",
    "weather": "weather",
    "soil": "soil",
    "market": "market",
    "government": "government",
    "healthcare": "healthcare",
    "disaster": "disaster",
    "education": "education",
    "knowledge": "knowledge",
    "explanation": "explanation"
}

# Add router edges from planner and all agents to route_next
workflow.add_conditional_edges("planner", route_next, router_targets)

for node_name in router_targets.keys():
    if node_name != "explanation":
        workflow.add_conditional_edges(node_name, route_next, router_targets)

# Link explanation to END
workflow.add_edge("explanation", END)

# Compile graph
compiled_graph = workflow.compile()
