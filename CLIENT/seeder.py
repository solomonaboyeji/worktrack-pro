import json

import requests

USERS_API_URL = "http://192.168.64.8:30011"
TASK_API_URL = "http://192.168.64.8:30010"

data = json.loads(open("./data.json", "r").read())


admins = data["admin"]
staffs = data["staff"]
skills = data["skills"]
tasks = data["tasks"]

for admin in admins:
    response = requests.post(f"{USERS_API_URL}/api/users", json=admin)
    if response.status_code == 200:
        print(admin["firstName"], admin["lastName"], " admin account created")
    else:
        pass
        # print(response.json()["message"], "\n")

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

for task in tasks:
    response = requests.post(f"{TASK_API_URL}/task", json=task, headers=token_headers)
    if response.status_code == 201:
        print(task["title"], " task created.")
    else:
        pass
        # print(response.content)
        # print(response.json()["message"], "\n")
