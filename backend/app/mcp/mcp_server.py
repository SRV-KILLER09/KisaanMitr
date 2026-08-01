from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from app.core.seed_data import MANDI_PRICES, GOVERNMENT_SCHEMES

mcp_router = APIRouter(prefix="/api/mcp", tags=["mcp"])

class MCPToolCall(BaseModel):
    name: str
    arguments: Dict[str, Any] = Field(default_factory=dict)

class ToolDefinition(BaseModel):
    name: str
    description: str
    input_schema: Dict[str, Any]

# Define the standard list of tools exposed by this MCP server
EXPOSED_TOOLS = [
    ToolDefinition(
        name="fetch_weather",
        description="Retrieve weather, rain forecast, and alerts for a given latitude and longitude or regional name.",
        input_schema={
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "Name of the location e.g. Bhatinda, Punjab"},
                "days": {"type": "integer", "description": "Number of forecast days", "default": 1}
            },
            "required": ["location"]
        }
    ),
    ToolDefinition(
        name="locate_mandis",
        description="Find nearby crop selling markets (mandis), their current prices, and MSP details.",
        input_schema={
            "type": "object",
            "properties": {
                "crop": {"type": "string", "description": "Name of the crop e.g. Tomato, Rice"},
                "location": {"type": "string", "description": "Location to filter nearest mandis"}
            },
            "required": ["crop"]
        }
    ),
    ToolDefinition(
        name="query_schemes",
        description="Query the Indian government agricultural schemes database based on land size and crop type.",
        input_schema={
            "type": "object",
            "properties": {
                "crop": {"type": "string", "description": "Target crop"},
                "land_size_hectares": {"type": "number", "description": "Size of land holding in hectares"}
            },
            "required": []
        }
    )
]

@mcp_router.get("/tools", response_model=List[ToolDefinition])
def list_tools():
    """List all secure tools available through this MCP server."""
    return EXPOSED_TOOLS

@mcp_router.post("/execute")
def execute_tool(call: MCPToolCall):
    """Execute a specific tool with parameters."""
    name = call.name.lower()
    args = call.arguments
    
    if name == "fetch_weather":
        loc = args.get("location", "Bhatinda, Punjab")
        return {
            "status": "success",
            "data": {
                "location": loc,
                "temperature": 29,
                "humidity": 82,
                "rain_probability": 85,
                "advisory": "Rain is predicted tomorrow. Suspend chemical spraying."
            }
        }
        
    elif name == "locate_mandis":
        crop = args.get("crop", "Tomato").lower()
        matched = [m for m in MANDI_PRICES if crop in m["crop"].lower()]
        return {
            "status": "success",
            "data": matched if matched else MANDI_PRICES
        }
        
    elif name == "query_schemes":
        crop = args.get("crop", "")
        land = args.get("land_size_hectares", 1.0)
        
        matched = []
        for s in GOVERNMENT_SCHEMES:
            if "PM-KISAN" in s["name"] and land <= 2.0:
                matched.append(s)
            elif "Fasal Bima" in s["name"]:
                matched.append(s)
        return {
            "status": "success",
            "data": matched
        }
        
    else:
        raise HTTPException(status_code=404, detail=f"Tool '{call.name}' not found on this MCP server.")
