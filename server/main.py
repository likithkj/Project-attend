from flask import Flask, request
from PIL import Image
import csv
import requests

from io import BytesIO

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

def save(student_id, student_name, uri):
    try:
        # Download the image from the URI
        response = requests.get(uri)
        if response.status_code == 200:
            # Open the downloaded image using PIL
            img = Image.open(BytesIO(response.content))
            
            # Save the image file
            img.save(f"C:/Users/Likith K/Documents/Projectattend/server/Student-Images/{student_id}{student_name}.jpg")
            
            # Append the data to the CSV file
            csv_file_path = "C:/Users/Likith K/Documents/Projectattend/server/Student-List2.csv"
            with open(csv_file_path, 'a', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow([student_id, student_name, f"{student_id}{student_name}.jpg"])
        
    except Exception as e:
        print(f"An error occurred: {e}")

@app.route('/post_example', methods=['POST'])
def post_example():
    if request.method == 'POST':
        data = request.get_json()
        print("Received data:", data)
        save(data["studentId"], data["studentName"], data["uri"])
        return f"Received data: {data}", 200
    else:
        return "Method not allowed", 405

if __name__ == '__main__':
    app.run(host="192.168.0.107", port=5000, debug=True, use_reloader=True)
