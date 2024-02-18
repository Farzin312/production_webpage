import unittest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app
from models import db, Review
from config import TestConfig

class ReviewRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()
        self.prefix = app.config['TEST_URL_PREFIX']
        self.created_reviews = [] 

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            for review_id in self.created_reviews:
                review = Review.query.get(review_id)
                if review:
                    db.session.delete(review)
            db.session.commit()
            self.created_reviews.clear()
    
    def test_get_reviews_empty(self):
        with app.app_context():
            Review.query.delete()
            db.session.commit()
        response = self.app.get(f'{self.prefix}/reviews')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

    def test_submit_review_success(self):
        response = self.app.post(f'{self.prefix}/reviews', json={'email': 'test@example.com', 'content': 'Great service!'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('message', response.json)
        self.assertEqual(response.json['message'], 'Review submitted successfully.')
    
        with app.app_context():
            review = Review.query.filter_by(email='test@example.com', content='Great service!').first()
            if review:
                self.created_reviews.append(review.id)


    def test_submit_review_missing_fields(self):
        response = self.app.post(f'{self.prefix}/reviews', json={})
        self.assertEqual(response.status_code, 400)

        response = self.app.post(f'{self.prefix}/reviews', json={'email': 'test@example.com'})
        self.assertEqual(response.status_code, 400)

    def test_delete_review(self):
        if not self.created_reviews:
            self.test_submit_review_success()

        review_id = self.created_reviews[-1]

        response = self.app.delete(f'{self.prefix}/reviews/{review_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('message', response.json)
        self.assertEqual(response.json['message'], 'Review deleted successfully.')
    
        fetch_response = self.app.get(f'{self.prefix}/reviews/{review_id}')
        self.assertNotEqual(fetch_response.status_code, 200, "Review should not exist after deletion")


if __name__ == '__main__':
    unittest.main()
