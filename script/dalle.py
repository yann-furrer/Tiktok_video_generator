import os
import openai
from dotenv import load_dotenv
import json
load_dotenv()
# Load your API key from an environment variable or secret management service
#OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")



prompt = " dessine une maison"
def dalle(prompt):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.Image.create( prompt=prompt,
        n=1,
        size="256x256",)
    print(response["data"][0])