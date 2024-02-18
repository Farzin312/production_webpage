from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from models import db
import os
from routes.scraping import scraping_bp, start_scheduler
from routes.pictures import pictures_bp 
from routes.owner_auth import auth_bp
from routes.review import review_bp
from routes.goods import goods_bp
from config import DevelopmentConfig
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

CORS(app)

mail = Mail(app)

db.init_app(app)

mail.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(scraping_bp, url_prefix='/')
app.register_blueprint(auth_bp, url_prefix='/')
app.register_blueprint(pictures_bp, url_prefix= os.environ.get('url'))
app.register_blueprint(review_bp, url_prefix= os.environ.get('url'))
app.register_blueprint(goods_bp, url_prefix=os.environ.get('url'))


if __name__ == '__main__':
    start_scheduler(app)
    app.run(debug=True)

