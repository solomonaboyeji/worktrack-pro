import sys

# ? Allows this script read the src folder.
sys.path.append(".")

from src.database import SessionLocal
from src.config import Settings
from src.exceptions import BaseConflictException, GeneralException
from src.config import setup_logger
from src.payments import models
from src.database import engine


logger = setup_logger()

app_settings = Settings()

if not app_settings.is_database_credentials_set():
    raise GeneralException("Database URL not configured")

def init_platform():
    pass


if __name__ == "__main__":
    init_platform()
