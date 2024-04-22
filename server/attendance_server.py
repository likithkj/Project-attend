from flask import Flask, jsonify
import csv

app = Flask(__name__)

@app.route('/attendance', methods=['GET'])
def get_attendance():
    try:
        # Read data from CSV file
        with open('Attendance.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            attendance_data = list(reader)
        return jsonify(attendance_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="192.168.0.107", port=5010, debug=True)
