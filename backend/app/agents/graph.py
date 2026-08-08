from langgraph.graph import StateGraph, END
from typing import Dict, Any

from app.agents.state import AgentState
from app.agents.agents import (
    planner_agent, agriculture_agent, vision_agent, weather_agent,
    soil_agent, marketplace_agent, government_agent, healthcare_agent,
    disaster_agent, education_agent, memory_agent, knowledge_agent,
    explanation_agent
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
workflow.add_node("explanation", make_node(explanation_agent, "explanation"))

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
