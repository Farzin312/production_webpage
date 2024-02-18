from flask import Blueprint, request, jsonify, current_app, send_from_directory, url_for
from werkzeug.utils import secure_filename
import os
from models import db, Picture
from urllib.parse import urlparse, unquote


pictures_bp = Blueprint('pictures', __name__)

def allowed_file(filename):
    allowed_extensions = current_app.config['ALLOWED_EXTENSIONS']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@pictures_bp.route('/pictures', methods=['GET'])
def get_pictures():
    pictures = Picture.query.all()
    return jsonify([picture.to_dict() for picture in pictures])

@pictures_bp.route('/pictures', methods=['POST'])
def add_picture():
    total_pictures = Picture.query.count()
    if total_pictures >= 6:
        return jsonify({"error": "Maximum number of pictures (6) already uploaded"}), 403

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    filename = secure_filename(file.filename)
    upload_folder = current_app.config['UPLOAD_FOLDER']
    filepath = os.path.join(upload_folder, filename)
    
    existing_pictures = Picture.query.all()
    for existing_picture in existing_pictures:
        parsed_url = urlparse(existing_picture.url)
        existing_filename = unquote(os.path.basename(parsed_url.path))
        if existing_filename == filename:
            return jsonify({"error": "A picture with the same name already exists"}), 409
    
    file.save(filepath)
    file_url = url_for('pictures.uploaded_file', filename=filename, _external=True)

    new_picture = Picture(url=file_url)
    db.session.add(new_picture)
    db.session.commit()

    return jsonify(new_picture.to_dict()), 201

@pictures_bp.route('/pictures/<int:picture_id>', methods=['DELETE'])
def delete_picture(picture_id):
    picture = Picture.query.get_or_404(picture_id)

    parsed_url = urlparse(picture.url)
    filename = os.path.basename(parsed_url.path)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        
    else:
        print(f"File {file_path} not found, but proceeding with database deletion.")
    db.session.delete(picture)
    db.session.commit()
    return jsonify({"message": "Picture and file deleted successfully"}), 200

@pictures_bp.route('/pictures/<filename>')
def uploaded_file(filename):
    upload_folder = current_app.config['UPLOAD_FOLDER']
    return send_from_directory(upload_folder, filename)


