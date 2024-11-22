import json
import requests
import os

# URL to which you want to post the JSON data
url = 'http://localhost:3500/api'  # Replace with your actual URL

script_path = os.path.abspath(__file__)
script_dir = os.path.dirname(script_path)


# Function to post data
def post_data(filename, url):
    file = os.path.join(script_dir, filename)

    # Read the JSON file
    with open(file, 'r') as file:
        json_array = json.load(file)

    for item in json_array:
        try:
            response = requests.post(url, json=item)
            print(f"{filename} -> {response}")
        except requests.exceptions.RequestException as e:
            print(f"{filename} -> Error posting data: {e}")


# Call the function to post data
post_data(filename="equipos.json", url=f"{url}/equipos")
post_data(filename="jugadores.json", url=f"{url}/jugadores")
