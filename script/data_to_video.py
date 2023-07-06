from google.cloud import storage
import os
import json 
client = storage.Client()
import re
from pathlib import Path
BUCKET_NAME = 'tiktok-bucket'
bucket = client.get_bucket(BUCKET_NAME)

blobs = bucket.list_blobs()


file_data = [{
    "image": [],
    "voice": [],
    "subtitle": []
}]

def sorted_alphanumeric(data):
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ] 
    return sorted(data, key=alphanum_key)
#print('getcwd:      ', os.getcwd())
#print('__file__:    ', __file__)


for blob in blobs:
    try:
        num = blob.name.count('/')
        string = blob.name.split('/')[num]
       
        if string != "":
            #print(blob.public_url)
            file_data[0][blob.name.split('/')[0]].append(blob.public_url)
    except:
        print("An exception occurred")

print( os.getcwd()+"/video/my_video/public/bucket.json")
#with open(os.getcwd()+"/video/my_video/public/bucket.json", "w") as outfile:



file_data[0]["image"] = sorted_alphanumeric(file_data[0]["image"])
file_data[0]["voice"] = sorted_alphanumeric(file_data[0]["voice"])  
file_data[0]["subtitle"] = sorted_alphanumeric(file_data[0]["subtitle"])

print(file_data)
with open(str(Path(__file__).parents[1])+"/video/my-video/public/bucket.json", "w") as outfile:
    json.dump(file_data, outfile)
ok =os.getcwd()+'/video/my-video/public/bucket.json'
