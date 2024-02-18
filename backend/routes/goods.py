from flask import Blueprint, request, jsonify
from models import db, Goods 

goods_bp = Blueprint('goods', __name__)

@goods_bp.route('/goods', methods=['POST'])
def add_goods():
    data = request.json
    name = data.get('name')
    price = data.get('price')  

    if not name:
        return jsonify({'error': 'Name is required.'}), 400
    
    if price is None:
        new_good = Goods(name=name)  
        response_message = "Good added successfully, price not updated."
    else:
        new_good = Goods(name=name, price=price)
        response_message = "Good added successfully."

    db.session.add(new_good)
    try:
        db.session.commit()
        return jsonify({'message': response_message, 'good': new_good.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@goods_bp.route('/goods/<int:good_id>', methods=['PUT'])
def update_good(good_id):
    data = request.json
    good = Goods.query.get_or_404(good_id)
    good.name = data.get('name', good.name)
    good.price = data.get('price', good.price)
    db.session.commit()
    return jsonify(good.to_dict()), 200

@goods_bp.route('/goods/<int:good_id>', methods=['DELETE'])
def delete_good(good_id):
    good = Goods.query.get(good_id)
    if good is None:
        return jsonify({'error': 'Good not found'}), 404

    db.session.delete(good)
    try:
        db.session.commit()
        return jsonify({'message': 'Good deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@goods_bp.route('/goods', methods=['GET'])
def get_goods():
    goods = Goods.query.order_by(Goods.name).all()  
    goods_data = [good.to_dict() for good in goods]
    return jsonify(goods_data), 200