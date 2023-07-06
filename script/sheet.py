from dotenv import load_dotenv
import json
import os
from datetime import date, datetime
import dateparser
import requests
from cloud import check_bucket_exist, create_bucket, delete_bucket_content, delete_bucket, bucket_name
load_dotenv()


print("___sheet.py is running___")

#check if google bucket exist


if check_bucket_exist(bucket_name) == False:
    #create bucket
    create_bucket(bucket_name)

else:
    #delete bucket content and bucket himself
    delete_bucket_content(bucket_name)
    #delete_bucket(bucket_name)
    #regenerate bucket
    create_bucket(bucket_name)




# Data to be written
dictionary = [{
   
}]
 
# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open("/Users/yannfurrer/Desktop/video/script/temp/subtitle/data.json", "w") as outfile:
    outfile.write(json_object)



url = "https://sheets.googleapis.com/v4/spreadsheets/"+os.getenv("SHEET_ID")+"/values/A1:B30?key="+os.getenv("SHEET_API_KEY")

#request tos sheet api
response = requests.get(url).json()
# get data
prompt = response["values"][0][0]
dates = response["values"][0][1]
# get today date to check if it's the same as the sheet date
today = datetime.now()
today = today.replace(hour=0, minute=0, second=0, microsecond=0)

#convert sheet date to datetime object
def transfrom_date(date):
    splitted = date.split("/")
    day = splitted[0]
    month = splitted[1]
    year =  splitted[2]
    converted_date = year+"/"+month+"/"+day
    return dateparser.parse(converted_date)



# get prompt from sheet
def get_prompt():
    for i in range(len(response["values"])):
            
        if (transfrom_date(response["values"][i][1]) == today):
            print("same")
            print(response["values"][i][0])
            prompt = response["values"][i][0]
            return prompt
        else:
            print("not same")
            continue
    

print("sheet.py running successfully !🎉 ")