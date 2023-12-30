from pydantic import BaseModel


class ParentPydanticModel(BaseModel):
    class Config:
        orm_mode = True

class UrlsConfiguration(ParentPydanticModel):
    token_url: str
    get_current_user: str
    get_task_url: str
    get_timesheets_by_task_id_url: str
    get_timesheets_url: str