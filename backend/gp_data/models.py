from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GasPrice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    regular = db.Column(db.Float, nullable=False)
    premium = db.Column(db.Float, nullable=False)
    diesel = db.Column(db.Float, nullable=False)
