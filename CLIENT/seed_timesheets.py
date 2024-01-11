import json
from random import randint

import requests

USERS_API_URL = "http://192.168.64.10:30011"
TASK_API_URL = "http://192.168.64.10:30010"

TIME_SHEET_URL = "http://192.168.64.10:30001/timesheet"
PAYMENT_URL = "http://192.168.64.10:30000"


data = json.loads(open("./data.json", "r").read())


admins = data["admin"]

# login admin
response = requests.post(f"{USERS_API_URL}/api/users/signin", json=admins[0])
if response.status_code == 200:
    token = response.json()["responseData"]["token"]
    token_headers = {"Authorization": f"Bearer {token}"}
else:
    print(response.json())
    raise ValueError("Admin Sign In not successful")
    # print(response.content)
    # print(response.status_code)

# Load all the staffs in the database
response = requests.get(f"{USERS_API_URL}/api/users", headers=token_headers)
api_staffs = [
    user for user in response.json()["responseData"] if user["role"] == "Staff"
]

# Clock each of this staff in for today
url = f"{USERS_API_URL}/api/usertasks"
response = requests.get(url, headers=token_headers)
staff_tasks = response.json()["responseData"]


for assigned_task in staff_tasks:
    # get all the task this user has been assigned to

    # url = f"{USERS_API_URL}/api/usertasks/user/assigned"
    staff = assigned_task["user"]
    clock_in_data = {
        "user_id": assigned_task["user"]["id"],
        "task_id": assigned_task["taskId"],
        "hours_spent": -1,
    }
    response = requests.post(
        f"{TIME_SHEET_URL}/clock-in", json=clock_in_data, headers=token_headers
    )
    if response.status_code == 200:
        print(
            f"{staff['firstName']} {staff['lastName']} clocked in at {response.json()['date_clocked_in']}"
        )
    else:
        print(response.status_code, response.content)

    # clock the user out
    clock_out_data = {
        "user_id": assigned_task["user"]["id"],
        "task_id": assigned_task["taskId"],
        "hours_spent": randint(5, 8),
    }
    response = requests.post(
        f"{TIME_SHEET_URL}/clock-out", json=clock_out_data, headers=token_headers
    )
    if response.status_code == 200:
        print(
            f"{staff['firstName']} {staff['lastName']} clocked out at {response.json()['date_clocked_out']}"
        )
        # compute wages
        response = requests.post(
            f"{PAYMENT_URL}/{assigned_task['taskId']}/compute-task-wages",
            headers=token_headers,
        )
        assert (
            response.status_code == 200
        ), f"There was a problem computing the wage of a staff {response.content}"
    else:
        print(response.status_code, response.content)

    print("\n\n")
