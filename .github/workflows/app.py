import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client

app = Flask(__name__)
# Enable CORS to allow your React app to talk to this backend
CORS(app)

# --- SUPABASE CONFIGURATION ---
# These will be set in Render.com Environment Variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    print("Warning: SUPABASE_URL and SUPABASE_KEY not found in environment.")
    supabase = None

@app.route('/')
def index():
    return jsonify({"status": "active", "message": "Backend is running"})

# --- GET METHOD: Fetch all guestbook messages ---
@app.route('/api/guestbook', methods=['GET'])
def get_messages():
    if not supabase:
        return jsonify({"error": "Database configuration missing"}), 500
    
    try:
        # Select all rows from 'messages' table, ordered by created_at
        # Make sure you have a table named 'messages' in Supabase
        response = supabase.table('messages').select("*").order('created_at', desc=True).limit(20).execute()
        return jsonify({"data": response.data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- GET METHOD: Fetch all projects ---
@app.route('/api/projects', methods=['GET'])
def get_projects():
    if not supabase:
        return jsonify({"error": "Database configuration missing"}), 500
    
    try:
        # Assumes you have a 'projects' table in Supabase
        # Columns could be: id, title, description, icon, link
        response = supabase.table('projects').select("*").order('id').execute()
        return jsonify({"data": response.data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- POST METHOD: Add a new guestbook message ---
@app.route('/api/guestbook', methods=['POST'])
def add_message():
    if not supabase:
        return jsonify({"error": "Database configuration missing"}), 500

    data = request.get_json()
    name = data.get('name')
    message = data.get('message')

    if not name or not message:
        return jsonify({"error": "Name and message are required"}), 400

    try:
        # Insert into 'messages' table
        new_entry = {
            "name": name,
            "message": message
        }
        response = supabase.table('messages').insert(new_entry).execute()
        return jsonify({"data": response.data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)