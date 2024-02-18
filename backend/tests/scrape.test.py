import unittest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app
from models import db, GasPrice
from config import TestConfig

class RoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()
        
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.query(GasPrice).delete()
            db.session.commit()
            db.session.remove()

    def test_get_gas_prices(self):
        with app.app_context():
            price = GasPrice(regular=2.99, premium=3.49, diesel=3.09)
            db.session.add(price)
            db.session.commit()
        
        response = self.app.get('/gasprices')
        self.assertEqual(response.status_code, 200)

    def test_get_all_gas_prices(self):
        with app.app_context():
            db.session.add(GasPrice(regular=2.99, premium=3.49, diesel=3.09))
            db.session.add(GasPrice(regular=3.09, premium=3.59, diesel=3.19))
            db.session.commit()
        
        response = self.app.get('/all_gas_prices')
        self.assertEqual(response.status_code, 200)
  


if __name__ == "__main__":
    unittest.main()
