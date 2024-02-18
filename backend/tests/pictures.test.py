import os
import unittest
import tempfile
from werkzeug.datastructures import FileStorage
from io import BytesIO
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app
from models import db, Picture
from config import TestConfig

class PicturesRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestConfig)
        app.config['UPLOAD_FOLDER'] = tempfile.mkdtemp()       
        self.app = app.test_client()
        self.prefix = app.config['TEST_URL_PREFIX']
        self.created_pictures = []

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            for picture_id in self.created_pictures:
                picture = Picture.query.get(picture_id)
                if picture:
                    db.session.delete(picture)
                    if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], picture.url)):
                        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], picture.url))
            db.session.commit()  
        
        if os.path.exists(app.config['UPLOAD_FOLDER']) and not os.listdir(app.config['UPLOAD_FOLDER']):
            os.rmdir(app.config['UPLOAD_FOLDER'])

    def test_get_pictures_empty(self):
        response = self.app.get(f'{self.prefix}/pictures')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

    def test_add_picture(self):
        with open("test.jpg", "wb") as f:  
            f.write(b"my file contents")
        with open("test.jpg", "rb") as f:
            data = {
                'file': (f, 'test.jpg')
            }
            response = self.app.post(f'{self.prefix}/pictures', data=data, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 201)
        self.assertIn('url', response.json)
        with app.app_context():
            picture = Picture.query.filter_by(url=response.json['url']).first()
            if picture:
                self.created_pictures.append(picture.id)
        os.remove("test.jpg")

    def test_add_picture_no_file_part(self):
        response = self.app.post(f'{self.prefix}/pictures')
        self.assertEqual(response.status_code, 400)

    def test_add_picture_existing_name(self):
        self.test_add_picture()  

        with open("test.jpg", "wb") as f: 
            f.write(b"my file contents")
        with open("test.jpg", "rb") as f:
            data = {
                'file': (f, 'test.jpg')
            }
            response = self.app.post(f'{self.prefix}/pictures', data=data, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 409) 
        os.remove("test.jpg")

    def test_delete_picture(self):
        self.test_add_picture()  

        picture_id = self.created_pictures[-1]
        response = self.app.delete(f'{self.prefix}/pictures/{picture_id}')
        self.assertEqual(response.status_code, 200)
        self.created_pictures.remove(picture_id)

if __name__ == '__main__':
    unittest.main()

