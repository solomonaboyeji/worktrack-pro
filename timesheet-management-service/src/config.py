"""Global Configs"""

import os
from loguru import logger
from pydantic import BaseSettings, BaseModel


def setup_logger():
    return logger


class ResponseErrorMessage(BaseModel):
    detail: str


class Settings(BaseSettings):
    #urls from external apis
    external_urls: dict = {
        "token_url": os.getenv("USER_TOKEN", ""),
        "get_current_user": os.getenv("CURRENT_USER_URL", ""),
        "get_task_url": os.getenv("GET_TASK_URL", ""),
        "get_timesheets_by_task_id_url": os.getenv("GET_TIMESHEETS_BY_TASKID", ""),
    }
    external_api_requests_timeout: int = int(os.getenv("EXT_REQUESTS_TIMEOUT", "30"))

    openapi_url: str = os.getenv("OPENAPI_URL", "/openapi.json")

    app_name: str = os.getenv("APP_NAME", "WTP-timesheets HTTP API")
    api_version: str = os.getenv("API_VERSION", "1.0")

    db_host: str = os.getenv("DB_HOST", None)  # type: ignore
    db_port: str = os.getenv("DB_PORT", None)  # type: ignore
    db_password: str = os.getenv("DB_PASSWORD", None)  # type: ignore
    db_name: str = os.getenv("DB_NAME", None)  # type: ignore
    db_user: str = os.getenv("DB_USER", None)  # type: ignore

    allowed_origins: list[str] = os.getenv(
        "ALLOW_ORIGINS", "http://localhost,http://localhost:8000"
    ).split(",")

    allow_origin_regex: str = os.getenv(
        "ALLOW_ORIGIN_REGEX",
        "*",
    )

    doc_url: str = f"/{os.getenv('DOC_URL', 'docs')}"
    redoc_url: str = f"/{os.getenv('REDOC_URL', 'redoc')}"

    login_ui_url: str = os.getenv("LOGIN_UI_URL", "not-set")  # type: ignore

    display_scopes: bool = os.getenv("DISPLAY_SCOPES_IN_DOCUMENTATION", "False") == "True"  # type: ignore

    cloud_sql_instance_name: str = os.getenv("CLOUD_SQL_INSTANCE_NAME", None)  # type: ignore
    sql_database_provider: str = os.getenv("SQL_DATABASE_PROVIDER", None)  # type: ignore


    def get_full_database_url(self):
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"

    def is_database_credentials_set(self):
        if self.sql_database_provider != "CLOUD_SQL":
            if (
                self.db_host is None
                or self.db_password is None
                or self.db_name is None
                or self.db_user is None
                or self.db_port is None
            ):
                return False
        elif self.sql_database_provider == "CLOUD_SQL":
            if (
                self.db_name is None
                or self.db_user is None
                or self.db_password is None
                or self.cloud_sql_instance_name is None
            ):
                return False
        else:
            return False

        return True
