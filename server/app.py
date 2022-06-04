from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from face_rec import recognize_faces
from PIL import Image
import base64
import io
import os
# import pymongo


app = Flask(__name__)
CORS(app)

@app.route('/api/save-face', methods=['POST'])
def save():
    data = request.get_json()
    face = data["face"]
    name = data["name"]
    b = bytes(face, 'utf-8')

    image = b[b.find(b'/9'):]
    im = Image.open(io.BytesIO(base64.b64decode(image)))
    im.save(f'./known-people/{name}.jpeg')
    res = jsonify({"response":"Success"})
    return res

@app.route('/api/face-recognition', methods=['POST','GET'])
def api():
    data = request.get_json()
    print("API REQUESTED")

    face_names = []

    if not data: return [],400

    result = data['data'];
    print(result[:30])

    b = bytes(result, 'utf-8')
    print(b[:30])

    image = b[b.find(b'/9'):]
    print(image[:30])

    im = Image.open(io.BytesIO(base64.b64decode(image)))

    im.save('./stranger/stranger.jpeg')

    face_names = recognize_faces() or ["No body"]

    print("Found",face_names)

    response = jsonify({"faces":face_names})

    return response


# @app.route('/api/save-face', methods=['POST'])
# def store():
#     data = request.get_json()['data']

#     face = data["image"]
#     name = data["name"]

#     print(face,name)

#     return "FACE UPLOADED"



if __name__ == '__main__':
    assert os.path.exists('.env')  # for other environment variables...
    os.environ['FLASK_ENV'] = 'development'  # HARD CODE since default is production
    app.run(debug=True)