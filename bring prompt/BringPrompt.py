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
    
    
url = 'https://www.eduwol.com/about/'
# url = 'https://www.kingarthurbaking.com/'
description = Company_desc(url)
company = find_company_name(url)


company_list = company.split('-')
split_desc = description.split('-') 
address_list = description.split(' in ')

address = address_list[0]
company_name = company_list[0]
Deal_in_list = split_desc[0].split(' in ')
deal_in = Deal_in_list[0]

# print(address[1])

# if description:
#     print("Meta Description:", split_desc[1])
# else:
#     print("No meta description found.")
    
# if company_name:
#     print("company Name:", company[0])
# else:
#     print("No company name found.")

print(company_name)
# print("\n")
print(address)
# print("\n")
print(deal_in)
# print("\n")
    

