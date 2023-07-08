import os
import openai
from dotenv import load_dotenv
import json
from sheet import get_prompt
import json


#create json
aList = [{}]
jsonString = json.dumps(aList)
jsonFile = open("./temp/subtitle/data.json", "w")
jsonFile.write(jsonString)
jsonFile.close()





load_dotenv()
# Load your API key from an environment variable or secret management service
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
#dynamic path
load = open(os.getcwd()+"/temp/subtitle/data.json")
data = json.load(load)
temp_json = {}

# put to split brent text into paragraph for narakeet
def split_prompt(gpt_text):
    temp_array = []
    splitted_date = gpt_text.split("\n")
    for i in range(len(splitted_date)):
        if splitted_date[i] != '':
            temp_array.append(splitted_date[i])
            #print("\n")
           # print(splitted_date[i])
    return temp_array


def chatgpt(prefixe_for_text, prompt):
    openai.api_key = os.getenv("OPENAI_API_KEY")

  
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages= [
        { "role": 'system', "content": 'Vous etes un utilisateur' },
            { "role": 'system', "content": prefixe_for_text+" "+prompt },
        
        ], 
      #  temperature=0.2, max_tokens=700)
    temperature=0.2, max_tokens=1300)
    #print(response.choices[0]["message"]["content"])
    return response.choices[0]["message"]["content"]

#chatgpt(get_prompt())
prefixe_text = ["écris moi un texte	pour une voix off sur le thème suivant", "Réécris ce texte en délimitnant chaque partie par le signe suivant <-> "]

chatgpt_result = chatgpt(prefixe_text[0], get_prompt())

temp_json = [{
    "text" : chatgpt_result,
    "splitted_text": split_prompt(chatgpt_result),
    "intro_sentence" : split_prompt(chatgpt_result)[0],
    "outro_sentence" : split_prompt(chatgpt_result)[-1],
}]

json.dump(temp_json, open(os.getcwd()+"/temp/subtitle/data.json", 'w'), ensure_ascii=False)

print("sheet.py -->"+get_prompt())
print("chatgpt.py running successfully !🎉 ")
