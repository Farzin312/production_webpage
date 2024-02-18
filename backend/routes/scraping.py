from flask import Blueprint, jsonify, current_app
from models import db, GasPrice
import requests
from bs4 import BeautifulSoup
import threading
import schedule
import time

scraping_bp = Blueprint('scraping', __name__)

def gas_prices(app): 
    with app.app_context():  
        try:
            headers = { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
            url = 'https://gasprices.aaa.com/?state=GA'
            response = requests.get(url, headers=headers)
            
            bs = BeautifulSoup(response.text, "html.parser")
            table = bs.find('table', class_='table-mob')
            rows = table.find_all('tr')

            if len(rows) > 1:  
                second_row = rows[1]
                oils = [td.get_text().strip() for td in second_row.find_all('td')]
                price_entry = GasPrice(
                    regular=float(oils[1].replace('$', '')),  
                    premium=float(oils[3].replace('$', '')),
                    diesel=float(oils[4].replace('$', ''))
                )
                db.session.add(price_entry)
                db.session.commit()
        except Exception as e:
            app.logger.error(f"Error in gas_prices function: {e}")

@scraping_bp.route('/gasprices', methods=['GET'])
def get_gas_prices():
    try:
        latest_prices = GasPrice.query.order_by(GasPrice.date.desc()).first()
        if latest_prices:
            prices = {
                'Regular': latest_prices.regular,
                'Premium': latest_prices.premium,
                'Diesel': latest_prices.diesel
            }
            return jsonify(prices)
        return jsonify({})
    except Exception as e:
        current_app.logger.error(f"Error in get_gas_prices: {e}")
        return jsonify({'error': str(e)}), 500

@scraping_bp.route('/all_gas_prices', methods=['GET'])
def get_all_gas_prices():
    try:
        all_prices = GasPrice.query.order_by(GasPrice.date.desc()).all()
        return jsonify([p.to_dict() for p in all_prices])
    except Exception as e:
        current_app.logger.error(f"Error in get_all_gas_prices: {e}")
        return jsonify({'error': str(e)}), 500

def run_schedule(app):
    schedule.every().day.at("10:00").do(lambda: gas_prices(app))
    while True:
        schedule.run_pending()
        time.sleep(60)

def start_scheduler(app):
    threading.Thread(target=lambda: run_schedule(app), daemon=True).start()



