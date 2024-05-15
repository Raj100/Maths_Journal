import requests

import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values 

def img_gen(prompt_ = "test", fname = "img1"):
    load_dotenv() 

    sdkey = "sk-D1h4jkvSSclIO9jLjzB7AwhdjaSaTbXcT9uc0irs0zyHJGCN"
    
    prompt = prompt_ #"Ram Navami Card Design"
    response = requests.post(
        f"https://api.stability.ai/v2beta/stable-image/generate/core",
        headers={
            "authorization": f"Bearer {sdkey}",
            "accept": "image/*"
        },
        files={"none": ''},
        data={
            "prompt": prompt,
            "output_format": "png",
        },
    )

    if response.status_code == 200:
        with open(f"{fname}.png", 'wb') as file:
            file.write(response.content)
    else:
        raise Exception(str(response.json()))

def img_text_overlay(image_file = "pass", text = "text"):
    pass


if __name__ == "__main__":
    pass