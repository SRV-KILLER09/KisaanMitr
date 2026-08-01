import os
import redis

# Redis URL with fallback to local port
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

class MemoryRedisCache:
    """Local key-value store to simulate Redis hashes in offline sandbox mode."""
    def __init__(self):
        self.store = {}
        
    def hset(self, name: str, key: str = None, value: str = None, mapping: dict = None):
        if name not in self.store:
            self.store[name] = {}
        if mapping:
            for k, v in mapping.items():
                self.store[name][str(k)] = str(v)
        elif key is not None and value is not None:
            self.store[name][str(key)] = str(value)
            
    def hgetall(self, name: str):
        return self.store.get(name, {})
        
    def ping(self):
        return True

# Initialize client with connection validation ping
try:
    # Attempt connecting to Redis instance
    r_client = redis.Redis.from_url(REDIS_URL, decode_responses=True, socket_timeout=1)
    r_client.ping()
    redis_client = r_client
except Exception:
    # Fallback to local sandbox memory cache
    redis_client = MemoryRedisCache()
