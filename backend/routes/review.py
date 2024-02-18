from flask import Blueprint, request, jsonify
from models import db, Review

review_bp = Blueprint('review', __name__)

@review_bp.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@review_bp.route('/reviews', methods=['POST'])
def submit_review():
    data = request.get_json()
    email = data.get('email')
    content = data.get('content')
    if not email or not content:
        return jsonify({"error": "Email and review content are required."}), 400
    
    review = Review(email=email, content=content)
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review submitted successfully."}), 201

@review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully."}), 200