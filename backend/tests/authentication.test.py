import unittest
import json
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app
from config import TestConfig
from models import User, db
from itsdangerous import URLSafeTimedSerializer


class AuthRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()
        with app.app_context():
            db.create_all()
        self.serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def register_user(self, email, username, password, secret_answer):
        return self.app.post('/register', data=json.dumps({
            'email': email,
            'username': username,
            'password': password,
            'secret_answer': secret_answer
        }), content_type='application/json')

    def login_user(self, username, password):
        return self.app.post('/login', data=json.dumps({
            'username': username,
            'password': password
        }), content_type='application/json')

    def request_password_reset(self, email, secret_answer):
        return self.app.post('/request_reset', data=json.dumps({
            'email': email,
            'secret_answer': secret_answer
        }), content_type='application/json')

    def reset_password(self, token, new_password):
        return self.app.post(f'/reset_password/{token}', data=json.dumps({
            'password': new_password
        }), content_type='application/json')

    def test_register_user(self):
        response = self.register_user('test@example.com', 'testuser', 'testpassword', 'testanswer')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Registration successful', response.get_data(as_text=True))

    def test_duplicate_registration(self):
        self.register_user('duplicate@example.com', 'duplicateuser', 'duplicatepassword', 'duplicateanswer')
        response = self.register_user('duplicate@example.com', 'duplicateuser2', 'duplicatepassword2', 'duplicateanswer2')
        self.assertNotEqual(response.status_code, 200)

    def test_login_successful(self):
        self.register_user('login@example.com', 'loginuser', 'loginpassword', 'loginanswer')
        response = self.login_user('loginuser', 'loginpassword')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful!', response.get_data(as_text=True))

    def test_login_failure(self):
        response = self.login_user('nonexistentuser', 'wrongpassword')
        self.assertNotEqual(response.status_code, 200)

    def test_request_reset(self):
        self.register_user('reset@example.com', 'resetuser', 'resetpassword', 'resetanswer')
        response = self.request_password_reset('reset@example.com', 'resetanswer')
        self.assertEqual(response.status_code, 200)

    def test_reset_password(self):
        self.register_user('passwordreset@example.com', 'passwordresetuser', 'oldpassword', 'passwordresetanswer')
        user = User.query.filter_by(email='passwordreset@example.com').first()
        token = self.serializer.dumps(user.email, salt=app.config['SECURITY_PASSWORD_SALT'])
        response = self.reset_password(token, 'newpassword')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
