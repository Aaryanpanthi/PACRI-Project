import sqlite3
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to get a database connection
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Function to initialize the database with the users table
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone_number TEXT NOT NULL UNIQUE,
            age INTEGER,
            relationship TEXT,
            relationship_other TEXT,
            gender TEXT,
            gender_other TEXT,
            hispanic_origin TEXT,
            race TEXT,
            race_other TEXT,
            education TEXT,
            housing TEXT,
            housing_other TEXT,
            household_budget TEXT,
            assistance TEXT,
            assistance_other TEXT,
            marital_status TEXT,
            household_size INTEGER,
            under18 INTEGER,
            occupational_status TEXT,
            occupation_other TEXT,
            chat_logs TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Endpoint to add a new user with demographic data
@app.route('/api/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone_number = data.get('phone_number')
    age = data.get('age')
    relationship = data.get('relationship')
    relationship_other = data.get('relationship_other')
    gender = data.get('gender')
    gender_other = data.get('gender_other')
    hispanic_origin = data.get('hispanic_origin')
    race = data.get('race')
    race_other = data.get('race_other')
    education = data.get('education')
    housing = data.get('housing')
    housing_other = data.get('housing_other')
    household_budget = data.get('household_budget')
    assistance = data.get('assistance')
    assistance_other = data.get('assistance_other')
    marital_status = data.get('marital_status')
    household_size = data.get('household_size')
    under18 = data.get('under18')
    occupational_status = data.get('occupational_status')
    occupation_other = data.get('occupation_other')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO users (
                first_name, last_name, phone_number, age, relationship, relationship_other, 
                gender, gender_other, hispanic_origin, race, race_other, education, housing, 
                housing_other, household_budget, assistance, assistance_other, marital_status, 
                household_size, under18, occupational_status, occupation_other, chat_logs
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            first_name, last_name, phone_number, age, relationship, relationship_other, 
            gender, gender_other, json.dumps(hispanic_origin), json.dumps(race), race_other, education, 
            json.dumps(housing), housing_other, household_budget, json.dumps(assistance), assistance_other, 
            marital_status, household_size, under18, json.dumps(occupational_status), occupation_other, '[]'
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'error': 'User already exists'}), 409
    finally:
        conn.close()
    return jsonify({'message': 'User added successfully'}), 201

# Endpoint to update chat logs
@app.route('/api/update_chat_logs', methods=['POST'])
def update_chat_logs():
    data = request.get_json()
    phone_number = data.get('phone_number')
    chat_history = data.get('chat_history')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE users
        SET chat_logs = ?
        WHERE phone_number = ?
    ''', (json.dumps(chat_history), phone_number))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Chat logs updated successfully'})

# Endpoint to retrieve chat logs
@app.route('/api/get_chat_logs', methods=['GET'])
def get_chat_logs():
    phone_number = request.args.get('phone_number')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT chat_logs FROM users WHERE phone_number = ?', (phone_number,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify({'chat_logs': json.loads(row['chat_logs'])})
    return jsonify({'error': 'No chat logs found'}), 404


# Flask app startup
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
