import requests

url = "https://dev.29kreativ.com/recruitment/levels/"

code = "8fc95a69adbc08a22bb90e19e66b389d"

data = {
    "name": "Tushar",
    "code": code
}

headers = {
    "Authorization": f"Bearer {code}"
}

response = requests.post(url, data=data, headers=headers)

print("Response code:", response.status_code)
print("Response body:", response.text)
