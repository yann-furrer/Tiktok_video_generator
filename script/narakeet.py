from dotenv import load_dotenv
import os
load_dotenv()
import requests
import json
from cloud import upload_blob
#import of text to speech api
load = open(os.getcwd()+"/temp/subtitle/data.json")
voice = json.load(load)


def narakeet(text, count):
    voice = 'Marion'
    voice_text = text
    url = f'https://api.narakeet.com/text-to-speech/m4a?voice={voice}'


    options = {
        'headers': {
            'Accept': 'application/octet-stream',
            'Content-Type': 'text/plain',
            'x-api-key': os.getenv("NARAKEET_API"),
        },
        'data': voice_text.encode('utf8')
    }

    with open('./temp/voice/result'+str(count)+'.mp3', 'wb') as f:
        f.write(requests.post(url, **options).content)
    
#narakeet("je suis un test")

for i in range(len(voice[0]["splitted_text"])):
    print(voice[0]["splitted_text"][i])
    narakeet(voice[0]["splitted_text"][i], i)
  
