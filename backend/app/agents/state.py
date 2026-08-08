from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentState(BaseModel):
    # Inputs
    user_query: str = ""
    language: str = "en"
    farmer_profile: Dict[str, Any] = Field(default_factory=dict)
    
    # Internal agent orchestration
    current_agent: str = "planner"
    execution_plan: List[str] = Field(default_factory=list)
    llm_already_called: bool = False
    
    # Specialized outputs from each agent
    vision_results: Optional[Dict[str, Any]] = None
    weather_info: Optional[Dict[str, Any]] = None
    soil_data: Optional[Dict[str, Any]] = None
    market_rates: Optional[Dict[str, Any]] = None
    schemes: List[Dict[str, Any]] = Field(default_factory=list)
    medical_advice: Optional[Dict[str, Any]] = None
    disaster_alerts: Optional[Dict[str, Any]] = None
    tutorials: List[Dict[str, Any]] = Field(default_factory=list)
    
    # Final explainable system recommendations and trace logs
    explanation: str = ""
    messages: List[Dict[str, Any]] = Field(default_factory=list)
