from flask import Flask, request, jsonify
from flask_cors import CORS
from face_rec import recognize_faces, save_face
from PIL import Image
import base64
import io
import os



app = Flask(__name__)
CORS(app)


@app.route('/api/face-recognition', methods=['GET','POST'])
def face_recognize_route():
    data = request.get_json()

    #? Receiving the image from the post request
    result = data['face'];
    b = bytes(result, 'utf-8')
    image = b[b.find(b'/9'):]

    #? Saving the received image in the /stranger folder
    im = Image.open(io.BytesIO(base64.b64decode(image)))
    im.save('./stranger/stranger.jpeg')

    #? Recognize known faces and return them
    face_names = recognize_faces() or ["Found nobody"]

    response = jsonify({"faces":face_names})
    return response


@app.route('/api/save-face', methods=['POST'])
def save_face_route():
    data = request.get_json()
    print("SAVE FUNCTION")

    face = data["face"]
    name = data["name"]

    b = bytes(face, 'utf-8')
    base64image = b[b.find(b'/9'):]
    image = io.BytesIO(base64.b64decode(base64image))

    response = save_face(image,name)
    return jsonify(response)


if __name__ == '__main__':
    assert os.path.exists('.env')  # for other environment variables...
    os.environ['env:FLASK_ENV'] = 'development'  # HARD CODE since default is production
    app.run(debug=True)