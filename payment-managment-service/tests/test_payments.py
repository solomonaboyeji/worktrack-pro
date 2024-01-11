import os
from fastapi.testclient import TestClient
from src.config import Settings

TEST_HTTP_VARIABLES = {}

def test_init(client: TestClient, app_setting: Settings):
    #populate the test database
    endpoint = os.getenv("TEST_API_POPULATE_URL")
    response = client.get(endpoint)

    assert response.status_code == 200
    assert response.json()["total"]>0
    TEST_HTTP_VARIABLES["TEST_TASK_ID"] = response.json()["timesheets"][0]["task_id"]
    TEST_HTTP_VARIABLES["TEST_USER_ID"] = response.json()["timesheets"][0]["user_id"]

def test_compute_task_timesheets(client: TestClient):
    endpoint = f"/compute-task-wages/{TEST_HTTP_VARIABLES['TEST_TASK_ID']}"
    response = client.post(
        endpoint,
    )
    assert response.status_code==200, response.json()

def test_get_all_wages_amount(client: TestClient):
    endpoint = "/tasks-wages/amount"
    response = client.get(
        endpoint,
    )
    assert response.status_code == 200, response.json()
    assert response.json()["total_amount"]>0

def test_get_task_wages_amount(client: TestClient):
    endpoint = f"/{TEST_HTTP_VARIABLES['TEST_TASK_ID']}/amount"
    response = client.get(
        endpoint,
    )
    assert response.status_code == 200, response.json()
    assert response.json()["total_amount"] > 0

def test_get_task_wages(client: TestClient):
    endpoint = f"/{TEST_HTTP_VARIABLES['TEST_TASK_ID']}/wages"
    response = client.get(
        endpoint,
    )
    assert response.status_code == 200, response.json()
    assert response.json()["total"] > 0
    assert response.json()["wages"][0]["task_id"]==TEST_HTTP_VARIABLES["TEST_TASK_ID"]

def test_get_user_wages(client: TestClient):
    endpoint = f"/{TEST_HTTP_VARIABLES['TEST_USER_ID']}/user-wages"
    response = client.get(
        endpoint,
    )
    assert response.status_code == 200, response.json()
    assert response.json()["total"] > 0
    assert response.json()["wages"][0]["user_id"]==TEST_HTTP_VARIABLES["user_id"]

def test_compute_all_tasks_wages(client: TestClient):
    endpoint = "/compute-all-wages"
    response = client.post(
        endpoint
    )
    assert response.status_code == 200, response.json()
    assert response.json()["total"]>0