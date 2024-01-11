import pytest
from src.config import Settings
from sqlalchemy.orm import Session
# from src.database import close_db_connections, get_engine, open_db_connections
# from src.main import app
from fastapi.testclient import TestClient
import httpx

@pytest.fixture()
def client():
    """
    Get a TestClient instance that reads/write to the test database.
    """

    yield httpx.Client(headers={})

@pytest.fixture()
def app_settings() -> Settings:
    return Settings()

# @pytest.fixture()
# def test_db():
#     open_db_connections()
#     db = Session(bind=get_engine())

#     try:
#         yield db
#     finally:
#         db.close()
#         close_db_connections()
