import cv2
from deepface import DeepFace
from datetime import datetime
from flask import Flask, jsonify, request
import os
import face_recognition
import pandas as pd
import requests
from io import BytesIO
import numpy as np
import traceback

app = Flask(__name__)

# Load images for face recognition
images = []
classNames = []
mylist = os.listdir('C:/Users/Likith K/Documents/Projectattend/server/Student-Images')
for cl in mylist:
    curImg = cv2.imread(f'C:/Users/Likith K/Documents/Projectattend/server/Student-Images/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])

# Function to mark attendance
def markAttendance(name):
    with open('C:/Users/Likith K/Documents/Projectattend/server/Attendance.csv', 'a') as f:
        now = datetime.now()
        time = now.strftime('%I:%M:%S:%p')
        date = now.strftime('%d-%B-%Y')

        # Split the name into two parts
        name_part1 = name[:11].upper()  # First 13 letters
        name_part2 = name[11:].capitalize()  # Rest of the name

        # Write to the CSV file
        f.write(f'\n{name_part1}, {name_part2}, {time}, {date}')

# Function to draw bounding box around face and display name
def draw_bounding_box(img, face_location, name):
    top, right, bottom, left = face_location
    cv2.rectangle(img, (left, top), (right, bottom), (0, 255, 0), 2)

    # Display name as label below the bounding box
    font = cv2.FONT_HERSHEY_DUPLEX
    label_position = (left, bottom + 20)  # Adjust the label position as needed
    cv2.putText(img, name, label_position, font, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

@app.route('/process-url', methods=['POST'])
def process_url():
    data = request.json
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({'error': 'Image URL is required'})

    try:
        # Download the image from the URL
        response = requests.get(image_url)
        img = cv2.imdecode(np.fromstring(response.content, np.uint8), cv2.IMREAD_COLOR)

        # Save the downloaded image to the "classroom" folder
        classroom_folder = 'C:/Users/Likith K/Documents/Projectattend/server/classroom'  # Adjust the path as needed
        if not os.path.exists(classroom_folder):
            os.makedirs(classroom_folder)
        image_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S.jpg')
        image_path = os.path.join(classroom_folder, image_name)
        cv2.imwrite(image_path, img)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Error processing image. Check the server logs for details.'})

    # Detect face locations in the image
    imgS = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(imgS)

    if not face_locations:
        return jsonify({'error': 'No faces detected in the image'})

    for face_location in face_locations:
        top, right, bottom, left = face_location
        face_img = img[top:bottom, left:right]

        # Verify each face individually using VGG-Face
        for className, known_img in zip(classNames, images):
            try:
                result = DeepFace.verify(face_img, known_img, model_name="Facenet", enforce_detection=False)
            except ValueError as e:
                traceback.print_exc()
                return jsonify({'error': str(e)})

            # DeepFace.verify() returns a dictionary with a boolean 'verified' field
            if result["verified"]:
                name = className.upper().lower()
                markAttendance(name)

                # Draw a bounding box for each recognized face
                draw_bounding_box(img, face_location, name)

    # Save the modified image (with bounding boxes and labels)
    cv2.imwrite('output.jpg', img)

    return jsonify({'message': 'Image processed successfully'})

if __name__ == '__main__':
    app.run(host="192.168.0.107", port=5005, debug=True, use_reloader=True)
