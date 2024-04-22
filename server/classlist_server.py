from flask import Flask, jsonify
import csv

app = Flask(__name__)

@app.route('/classlist', methods=['GET'])
def get_classlist():
    try:
        # Read data from CSV file
        with open('Student-List2.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            studentdata = list(reader)
        return jsonify(studentdata)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="192.168.0.107", port=5020, debug=True)
