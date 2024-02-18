import unittest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app
from models import db, Goods
from config import TestConfig

class GoodsRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()
        self.prefix = app.config['TEST_URL_PREFIX']
        with app.app_context():
            db.create_all()
        self.created_goods = []  

    def tearDown(self):
        with app.app_context():
            for good in self.created_goods:
                db.session.delete(good)
            db.session.commit()
            self.created_goods.clear()  

    def test_add_goods(self):
        response = self.app.post(f'{self.prefix}/goods', json={'name': 'Test Good', 'price': 10.99})
        self.assertEqual(response.status_code, 201)
        with app.app_context():
            good = Goods.query.filter_by(name='Test Good').first()
            self.assertIsNotNone(good)
            self.created_goods.append(good)

    def test_update_good(self):
        self.test_add_goods()  
        with app.app_context():
            good = self.created_goods[-1] 

        response = self.app.put(f'{self.prefix}/goods/{good.id}', json={'name': 'Updated Good', 'price': 12.99})
        self.assertEqual(response.status_code, 200)

    def test_delete_good(self):
        self.test_add_goods()  
        with app.app_context():
            good = self.created_goods[-1] 

        response = self.app.delete(f'{self.prefix}/goods/{good.id}')
        self.assertEqual(response.status_code, 200)

    def test_get_goods(self):
        self.test_add_goods()  
        response = self.app.post(f'{self.prefix}/goods', json={'name': 'Another Test Good', 'price': 5.49})  # Second good
        self.assertEqual(response.status_code, 201)
        with app.app_context():
            another_good = Goods.query.filter_by(name='Another Test Good').first()
            self.assertIsNotNone(another_good)
            self.created_goods.append(another_good)

        response = self.app.get(f'{self.prefix}/goods')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json) >= 2)  

if __name__ == '__main__':
    unittest.main()
