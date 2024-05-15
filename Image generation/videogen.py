import ffmpeg
import os
import Imagegen
import requests

from dotenv import load_dotenv, dotenv_values

import requests
from bs4 import BeautifulSoup


def find_company_name(url):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for common HTML elements that often contain the company name
        possible_elements = soup.find_all(['h1', 'h2', 'h3', 'title', 'div', 'span', 'a'])
        
        # Iterate through the elements to find the one that likely contains the company name
        for element in possible_elements:
            text = element.get_text(strip=True)
            # You may customize the conditions based on common patterns in your target websites
            if text and len(text) > 3 and len(text) < 100:  # Assuming company names are typically not too short or too long
                return text
        
        # If no company name is found in common elements, return None
        return None
        
    except Exception as e:
        print("Error:", e)
        return None

def Company_desc(url):
    response = requests.get(url)
    
    if response.status_code == 200 :
        soup = BeautifulSoup(response.content , 'html.parser')
        
        meta_tag = soup.find('meta', attrs={'name': 'description'})
        description = meta_tag['content'] if meta_tag else None
        return description 
    
    else:
        print("ERROR")
        return None 
    
    
url = ''
description = Company_desc(url)
company = find_company_name(url)


company_list = company.split('-')
split_desc = description.split('-') 
address_list = description.split(' in ')

address = address_list[0]
company_name = company_list[0]
Deal_in_list = split_desc[0].split(' in ')
deal_in = Deal_in_list[0]

print(address[0])

if description:
    print("Meta Description:", split_desc[0])
else:
    print("No meta description found.")
    
if company_name:
    print("company Name:", company[0])
else:
    print("No company name found.")
"""
print(company_name)
# print("\n")
print(address)
# print("\n")
print(deal_in)
# print("\n")
"""

newpath = r'clips' 
if not os.path.exists(newpath):
    os.makedirs(newpath)

occasion = "Diwali Greeting cards"

# mprompt = f"a company called {company_name} located in {address} and {deal_in}"
prompt = f"{description} is bussiness make a {occasion}"


# response = requests.post(
#     f"https://api.stability.ai/v2beta/stable-image/generate/core",
#     headers={
#         "authorization": f"Bearer sk-D1h4jkvSSclIO9jLjzB7AwhdjaSaTbXcT9uc0irs0zyHJGCN",
#         "accept": "image/*"
#     },
#     files={"none": ''},
#     data={
#         "prompt": prompt,
#         "output_format": "webp",
#     },
# )

# if response.status_code == 200:
#     with open("./image1.webp", 'wb') as file:
#         file.write(response.content)
# else:
#     raise Exception(str(response.json()))

Imagegen.img_gen(prompt_=prompt, fname=f"img1")
Imagegen.img_gen(prompt_=f"{occasion}", fname="img2")
Imagegen.img_gen(prompt_=f"{company_name} logo", fname="img3")
Imagegen.img_gen(prompt_=f"{prompt}", fname="img4")

"""
(
    ffmpeg
    .input(f'{newpath}\\*.png', pattern_type='glob', framerate=25)
    .output(f'movie.mp4')
    #.run()
)
"""