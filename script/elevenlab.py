import requests
import os
import json
from dotenv import load_dotenv
load_dotenv()



load = open(os.getcwd()+"/temp/subtitle/data.json")
voice = json.load(load)


def generate_voice(text, count):
  CHUNK_SIZE = 1024
  # le dernier paramètre de l'url est l'id de la voix
  url = "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB"

  headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": os.getenv("ELEVEN_LAB")
  }

  data = {
    "text": text,
    "model_id": "eleven_multilingual_v1",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.5
    }
  }

  response = requests.post(url, json=data, headers=headers)
  with open(os.getcwd()+'/output'+str(count)+'.mp3', 'wb') as f:
      for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
          if chunk:
              f.write(chunk)


  
#narakeet("je suis un test")

for i in range(len(voice[0]["splitted_text"])):
    print(voice[0]["splitted_text"][i])
    generate_voice(voice[0]["splitted_text"][i], i)