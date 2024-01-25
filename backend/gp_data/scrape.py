import time
import requests
import threading
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def gas_prices(): 
   #Bypassing 403 code
    headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
 } 
    url = 'https://gasprices.aaa.com/?state=GA'
    r = requests.get(url, headers=headers)

    bs = BeautifulSoup(r.text, "html.parser")

    table = bs.find('table', class_='table-mob')

    rows = table.find_all('tr')
    if len(rows) > 1:  
        second_row = rows[1]
        oils = [td.get_text().strip() for td in second_row.find_all('td')]
        prices = {
            'Regular' : oils[1],
            'Premium' : oils[3],
            'Diesel' : oils[4]
        }
        return prices

def scrape_task():
    while True:
        gas_prices()
        time.sleep(86400)  # 24 hours

@app.route('/gasprices')
def get_gas_prices():
    prices = gas_prices()
    return jsonify(prices)

if __name__ == '__main__':
    threading.Thread(target=scrape_task, daemon=True).start()
    app.run(debug=True)








