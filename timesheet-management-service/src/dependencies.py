from src.config import Settings
from fastapi import Depends
from src.security import oauth2_scheme
from httpx import Client

app_setting = Settings()

def get_current_active_user(token: str = Depends(oauth2_scheme)):
    return {}