from flask import Flask, render_template, jsonify
import psycopg2
from flask_cors import CORS
from psycopg2 import sql

app = Flask(__name__)
CORS(app)

# Define a route for the stats page
@app.route('/stats')
def stats():

    # Replace these credentials with your PostgreSQL database details
    DB_NAME = 'denttamuhack2024db'
    DB_USER = 'postgres'
    DB_PASSWORD = ''
    DB_HOST = 'localhost'
    DB_PORT = ''
    
    # Establish a connection to the PostgreSQL database

    conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
    )

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()
    # Fetch user stats from the database
    cursor.execute('SELECT * FROM users WHERE username=\'tommyztx\';')  # Replace with the appropriate query
    user_stats = cursor.fetchone()

    # Convert the user stats to a dictionary
    user_stats_dict = {
        'challengesCompleted': user_stats[3],
        'streak': user_stats[1],
        'hoursPlayed': user_stats[2]
    }

    cursor.close()
    conn.close()

    # Render the stats page with the user stats in JSON format
    return jsonify(user_stats_dict)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)