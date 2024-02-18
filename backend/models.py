from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class GasPrice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    regular = db.Column(db.Float, nullable=False)
    premium = db.Column(db.Float, nullable=False)
    diesel = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'Regular': self.regular,
            'Premium': self.premium,
            'Diesel': self.diesel,
            'Date': self.date
        }

class Picture(db.Model):
    __bind_key__ = 'pictures'  
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False) 

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
        }

class User(db.Model):
    __bind_key__ = 'auth'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    secret_answer = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
class Review(db.Model):
    __bind_key__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "content": self.content
        }

class Goods(db.Model):
    __bind_key__= 'goods'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price
        }