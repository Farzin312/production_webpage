import os
from dotenv import load_dotenv
load_dotenv()


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.environ.get('SECURITY_PASSWORD_SALT')
    MAIL_SERVER = os.environ.get('MAIL_SERVER') 
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))  
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', '1', 't']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')  
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') 
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') 
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'HEIC'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024 


class TestConfig(Config):
    TESTING = True
    TEST_URL_PREFIX = os.environ.get('TEST_URL_PREFIX', '/test')
    SECRET_KEY = 'your-test-secret-key'
    SECURITY_PASSWORD_SALT = 'your-test-salt'

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///gas_prices.db'
    SQLALCHEMY_BINDS = {
        'pictures': 'sqlite:///pictures.db',
        'auth': 'sqlite:///auth.db',
        'review': 'sqlite:///review.db',
        'goods': 'sqlite:///goods.db'
    }
    
class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///gas_prices.db'
    SQLALCHEMY_BINDS = {
        'pictures': 'sqlite:///pictures.db',
        'auth': 'sqlite:///auth.db',
        'review': 'sqlite:///review.db',
        'goods': 'sqlite:///goods.db'
    }

    
