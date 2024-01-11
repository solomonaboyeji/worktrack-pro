from src.config import Settings
from fastapi import Depends
from src.security import oauth2_scheme
import requests
from requests import Response

app_setting = Settings()
urls:dict = app_setting.external_urls

def get_current_active_user(token: str = Depends(oauth2_scheme)):
    return requests.get(urls["token_url"])