from flask import Blueprint, request, jsonify
from models import db, User
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
load_dotenv()



auth_bp = Blueprint('auth', __name__)
mail = Mail()

@auth_bp.route('/register', methods=['POST'])
def register_owner():
    if User.query.first():
        return jsonify({'error': 'Owner already registered'}), 400

    data = request.json

    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    secret_answer = data.get('secret_answer')
    if not all([email, username, password, secret_answer]):
        return jsonify({'error': 'Missing data'}), 400

    try:
        user = User(email=email, username=username, secret_answer=secret_answer)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({'message': 'Login successful!'})
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/request_reset', methods=['POST'])
def request_reset():
    data = request.json
    email = data.get('email')
    secret_answer = data.get('secret_answer')
    user = User.query.filter_by(email=email).first()

    if user and user.secret_answer == secret_answer:
        serializer = URLSafeTimedSerializer(os.environ.get('SECRET_KEY'))
        token = serializer.dumps(email, salt=os.environ.get('SECURITY_PASSWORD_SALT'))

        reset_url = f'http://localhost:3000/reset_password/{token}'
        msg = Message("Password Reset Request", sender=os.environ.get('MAIL_USERNAME'), recipients=[email])
        msg.body = f"To reset your password, visit the following link: {reset_url}"
        mail.send(msg)

        return jsonify({"message": "Password reset email sent"}), 200

    return jsonify({"error": "Email or secret answer is incorrect"}), 404

@auth_bp.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    try:
        serializer = URLSafeTimedSerializer(os.environ.get('SECRET_KEY'))
        email = serializer.loads(token, salt=os.environ.get('SECURITY_PASSWORD_SALT'), max_age=3600)
    except Exception as e:
        print(f"Error deserializing token: {e}")  
        return jsonify({"error": "The reset link is invalid or has expired"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Invalid user"}), 404

    data = request.json
    new_password = data.get('password')
    if not new_password:
        return jsonify({"error": "New password not provided"}), 400

    user.set_password(new_password)
    db.session.commit()

    return jsonify({"message": "Password has been updated"}), 200

