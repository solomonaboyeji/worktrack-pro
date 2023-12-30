"""Global Configs"""

import os
from loguru import logger as loguruLogger
from pydantic import BaseSettings, BaseModel


def setup_logger():
    return loguruLogger


logger = setup_logger()


class ResponseErrorMessage(BaseModel):
    detail: str


class Settings(BaseSettings):

    db_host: str = os.getenv("DB_HOST", None)  # type: ignore
    db_port: str = os.getenv("DB_PORT", None)  # type: ignore
    db_password: str = os.getenv("DB_PASSWORD", None)  # type: ignore
    db_name: str = os.getenv("DB_NAME", None)  # type: ignore
    db_user: str = os.getenv("DB_USER", None)  # type: ignore

    allowed_origins: list[str] = os.getenv(
        "ALLOW_ORIGINS", "http://localhost,http://localhost:8000"
    ).split(",")


    def get_full_database_url(self):
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"

