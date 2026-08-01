import os
import hashlib
from typing import Dict, Any, List
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct

from app.core.seed_data import KNOWLEDGE_BASE
from app.agents.state import AgentState

# Qdrant configuration
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
COLLECTION_NAME = "kisaan_kb"
VECTOR_SIZE = 384  # Standard size for lightweight encoders

class FallbackVectorDB:
    """Local simulation of Qdrant Vector store using hashing and keyword metrics."""
    def __init__(self):
        self.data = KNOWLEDGE_BASE
        
    def query(self, query_text: str, limit: int = 2) -> List[str]:
        words = set(query_text.lower().split())
        scored = []
        for doc in self.data:
            doc_words = set(doc["query"].lower().split())
            overlap = len(words.intersection(doc_words))
            scored.append((overlap, doc["content"]))
        # Sort by match score descending
        scored.sort(key=lambda x: x[0], reverse=True)
        return [content for score, content in scored[:limit] if score > 0]

# Try initializing Qdrant client
qdrant_client = None
vector_store = FallbackVectorDB()

try:
    client = QdrantClient(url=QDRANT_URL, timeout=1.0)
    # Ping database
    client.get_collections()
    qdrant_client = client
    print("[Qdrant] Connected successfully.")
except Exception:
    print("[Qdrant] Server offline. Falling back to sandboxed keyword vector index.")

def get_hash_embedding(text: str) -> List[float]:
    """Generates a deterministic vector float list using SHA-256 for mock embeddings when offline."""
    hash_bytes = hashlib.sha256(text.encode('utf-8')).digest()
    vector = []
    for i in range(VECTOR_SIZE):
        val = hash_bytes[i % len(hash_bytes)]
        vector.append(float(val) / 255.0 - 0.5)
    return vector

def seed_qdrant_knowledge():
    """Seeds Qdrant with agricultural and medical RAG guidelines on startup."""
    if not qdrant_client:
        return
        
    try:
        # Recreate collection
        collections = qdrant_client.get_collections().collections
        exists = any(c.name == COLLECTION_NAME for c in collections)
        
        if not exists:
            qdrant_client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
            )
            
            # Index seed documents
            points = []
            for idx, item in enumerate(KNOWLEDGE_BASE):
                vector = get_hash_embedding(item["query"])
                points.append(
                    PointStruct(
                        id=idx,
                        vector=vector,
                        payload={"query": item["query"], "content": item["content"]}
                    )
                )
            
            qdrant_client.upsert(collection_name=COLLECTION_NAME, points=points)
            print(f"[Qdrant] Initialized and indexed {len(KNOWLEDGE_BASE)} documents.")
    except Exception as e:
        print(f"[Qdrant] Seeding error: {e}")

def knowledge_agent(state: AgentState) -> Dict[str, Any]:
    """Retrieves document chunks using Qdrant vector similarity or local fallback."""
    query = state.user_query.lower()
    results = []
    
    if qdrant_client:
        try:
            # Query embedding vector
            vector = get_hash_embedding(query)
            search_result = qdrant_client.search(
                collection_name=COLLECTION_NAME,
                query_vector=vector,
                limit=2
            )
            for hit in search_result:
                results.append(hit.payload.get("content", ""))
        except Exception:
            # Run fallback query if search operation throws
            results = vector_store.query(query)
    else:
        results = vector_store.query(query)
        
    if not results:
        results.append("KVK Advisory: Standard farming procedures suggest maintaining clean drainage, periodic weeding, and using seed varieties certified by regional agricultural universities.")
        
    explanation = "\n".join([f"- {r}" for r in results])
    return {
        "explanation": state.explanation + f"\n\n[Knowledge Retrieval (RAG via Qdrant)]\n{explanation}",
        "messages": state.messages + [{"role": "assistant", "content": f"[Knowledge Agent] Fetched {len(results)} RAG reference documents."}]
    }
