import json
from random import randint

import requests

USERS_API_URL = "http://192.168.64.8:30011"
TASK_API_URL = "http://192.168.64.8:30010"

data = json.loads(open("./data.json", "r").read())


admins = data["admin"]
staffs = data["staff"]
skills = data["skills"]
tasks = data["tasks"]


# Create all the admin if we have not created them
for admin in admins:
    response = requests.post(f"{USERS_API_URL}/api/users", json=admin)
    if response.status_code == 200:
        print(admin["firstName"], admin["lastName"], " admin account created")
    else:
        pass
        # print(response.json()["message"], "\n")


# Create all the staff if we have not created them
for staff in staffs:
    response = requests.post(f"{USERS_API_URL}/api/users", json=staff)
    if response.status_code == 200:
        print(staff["firstName"], staff["lastName"], " staff account created")
    else:
        pass
        # print(response.content)
        # print(response.json()["message"], "\n")

# login admin
response = requests.post(f"{USERS_API_URL}/api/users/signin", json=admins[0])
if response.status_code == 200:
    token = response.json()["responseData"]["token"]
    token_headers = {"Authorization": f"Bearer {token}"}
else:
    pass
    # print(response.content)
    # print(response.status_code)


# Create all the skills if we have not created them
for skill in skills:
    response = requests.post(
        f"{USERS_API_URL}/api/skills", json=skill, headers=token_headers
    )
    if response.status_code == 200:
        print(skill["title"], " skill created.")
    else:
        pass
        # print(response.status_code)
        # print(response.content)
        # print(response.json()["message"], "\n")

# Create all the tasks if we have not created them
for task in tasks:
    response = requests.post(f"{TASK_API_URL}/task", json=task, headers=token_headers)
    if response.status_code == 201:
        print(task["title"], " task created.")

    else:
        pass
        # print(response.content)
        # print(response.json()["message"], "\n")

# Load all the skills and tasks we have in the database
response = requests.get(f"{TASK_API_URL}/task", headers=token_headers)
api_tasks = response.json()["data"]

response = requests.get(f"{USERS_API_URL}/api/skills", headers=token_headers)
api_skills = response.json()["responseData"]

# Load all the staffs in the database
response = requests.get(f"{USERS_API_URL}/api/users", headers=token_headers)
api_staffs = [
    user for user in response.json()["responseData"] if user["role"] == "Staff"
]

for api_task in api_tasks[randint(randint(0, 3), 4) : len(api_tasks)]:
    # Randomly select some skills to each task
    selected_skills = api_skills[randint(randint(0, 2), 3) : len(api_skills)]
    for selected_skill in selected_skills:
        task_skill_data = {
            "taskId": api_task["taskId"],
            "skillId": selected_skill["id"],
            "skillName": selected_skill["title"],
        }
        response = requests.post(
            f"{TASK_API_URL}/taskskill", json=task_skill_data, headers=token_headers
        )
        if response.status_code == 201:
            print(f"{selected_skill['title']} skill added to task {api_task['title']}.")


# Assign skills to each staff
for staff in api_staffs:
    selected_skills = api_skills[randint(randint(0, 2), 3) : len(api_skills)]
    for selected_skill in selected_skills:
        staff_skill_data = {"skillId": selected_skill["id"], "userId": staff["id"]}
        response = requests.post(
            f"{USERS_API_URL}/api/userskills",
            json=staff_skill_data,
            headers=token_headers,
        )
        if response.status_code == 200:
            print(
                f"{selected_skill['title']} skill assigned to {staff['firstName']} {staff['lastName']}."
            )
