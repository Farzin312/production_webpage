import time
import requests
import threading
from datetime import datetime
from bs4 import BeautifulSoup
from flask import Flask, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from graph import create_plot
from models import db, GasPrice

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gas_prices.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

def gas_prices(): 
    try:
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
            price_entry = GasPrice(
                regular=float(oils[1].replace('$', '')),  
                premium=float(oils[3].replace('$', '')),
                diesel=float(oils[4].replace('$', ''))
            )
            db.session.add(price_entry)
            db.session.commit()
    except Exception as e:
        print("Error in gas_prices function:", e)

def scrape_task():
    with app.app_context():
        while True:
            gas_prices()
            create_plot()
            time.sleep(86400)  # 24 hours

@app.route('/gasprices')
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
        print("Error in get_gas_prices:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/gasprices/plot')
def gas_prices_plot():
    plot_path = '/Users/farzinshifat/webpage/backend/gp_data/static/gas_prices_plot.png'
    try:
        return send_file(plot_path, mimetype='image/png')
    except Exception as e:
        print("Error serving plot:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/all_gas_prices')
def get_all_gas_prices():
    try:
        all_prices = GasPrice.query.all()
        return jsonify([{'Regular': p.regular, 'Premium': p.premium, 'Diesel': p.diesel, 'Date': p.date} for p in all_prices])
    except Exception as e:
        print("Error in get_all_gas_prices:", e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    threading.Thread(target=scrape_task, daemon=True).start()
    app.run(debug=True)