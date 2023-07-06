from dotenv import load_dotenv
import os
load_dotenv()
import requests
import json
from cloud import upload_blob
#import of text to speech api


chat = "Tu t'es déjà demandé quels signes astrologiques sont les plus compatibles en amour ? Eh bien, aujourd'hui, nous allons explorer le fascinant monde de l'astrologie et découvrir les cinq signes les plus harmonieux en matière de relations amoureuses. Attache ta ceinture et prépare-toi à être ébloui par les mystères célestes de l'amour !"
ok = "test"

def narakeet(text, ):
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

    with open('/Users/yannfurrer/Documents/GitHub/Tiktok_video_generator/script/temp/voice/result2.mp3', 'wb') as f:
        f.write(requests.post(url, **options).content)
   
    # with open('../temp/voice/result'+str(count)+'.mp3', 'wb') as f:
    #     f.write(requests.post(url, **options).content)

narakeet(ok)