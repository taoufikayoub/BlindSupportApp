import face_recognition
import numpy as np
import os
import io
import base64
from PIL import Image

unknown_images_path_file="./stranger/stranger.jpeg"
known_images_path_file="./known-people/"
# image = io.BytesIO(base64.b64decode("base64string"))

print("Loading Known Faces...")

known_faces = [face_recognition.load_image_file(known_images_path_file+face) for face in os.listdir(known_images_path_file)]
known_face_encodings = [face_recognition.face_encodings(known_face)[0] for known_face in known_faces]

known_face_names = [known_name[:-5] for known_name in os.listdir(known_images_path_file)]

print("Known Faces Loaded!")

def recognize_faces():
    print("Known Faces", known_face_names)

    unknown_image = face_recognition.load_image_file(unknown_images_path_file)
    
    face_locations = face_recognition.face_locations(unknown_image)
    face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

    face_names = []

    for face_encoding in face_encodings:
    
        name = "Unknown"
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            name = known_face_names[best_match_index]
        
        face_names.append(name)

    return face_names

def save_face(image,name):
    
    loaded_image = face_recognition.load_image_file(image)
    faces = face_recognition.face_locations(loaded_image)
    number_of_faces = len(faces)

    #? Handling bad inputs
    if number_of_faces == 0:
        return {"errors":"No face was detected in the photo"}
    if number_of_faces != 1:
        return {"errors":"There should be only 1 face in the photo"}
    
    face_encoding = face_recognition.face_encodings(loaded_image)[0]
    known_face_encodings.append(face_encoding)
    known_face_names.append(name)

    im = Image.open(image)
    im.save(f'./known-people/{name}.jpeg')

    return {"response":f"{name} was added to known faces"}
