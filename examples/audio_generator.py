import requests
import os

TOKEN_KEY = os.getenv("HUGGING_FACE_KEY")

API_URL = "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits"
headers = {"Authorization": f"Bearer {TOKEN_KEY}"}


def save_audio(response, filename):
    with open(filename, "wb") as file:
        file.write(response.content)


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response


TEXT = "My Wonderful Family I live in a house near the mountains. I have two brothers and one sister, and I was born last. My father teaches mathematics, and my mother is a nurse at a big hospital. My brothers are very smart and work hard in school. My sister is a nervous girl, but she is very kind. My grandmother also lives with us. She came from Italy when I was two years old. She has grown old, but she is still very strong. She cooks the best food! My family is very important to me. We do lots of things together. My brothers and I like to go on long walks in the mountains. My sister likes to cook with my grandmother. On the weekends we all play board games together. We laugh and always have a good time. I love my family very much."

response = query({
    "inputs": TEXT,
})

if response.status_code == 200:
    save_audio(response, "output.wav")
    print("Audio saved successfully.")
else:
    print("Error occurred:", response.text)
