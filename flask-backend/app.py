from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["*"])  # Allow all origins for development; restrict in production

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ─── Health Check ────────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Anthony's Portfolio API is running 🔥"}), 200


# ─── GET /api/guestbook ───────────────────────────────────────────────────────
# Returns all guestbook messages from Supabase, ordered by newest first
@app.route("/api/guestbook", methods=["GET"])
@app.route("/messages", methods=["GET"])
def get_messages():
    try:
        response = supabase.table("messages").select("*").order("created_at", desc=True).execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "count": len(response.data)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ─── GET /api/projects ────────────────────────────────────────────────────────
# Returns all projects from Supabase
@app.route("/api/projects", methods=["GET"])
@app.route("/projects", methods=["GET"])
def get_projects():
    try:
        response = supabase.table("projects").select("*").order("order", desc=False).execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "count": len(response.data)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ─── POST /api/guestbook ──────────────────────────────────────────────────────
# Inserts a new guestbook message into Supabase
@app.route("/api/guestbook", methods=["POST"])
@app.route("/messages", methods=["POST"])
def post_message():
    try:
        body = request.get_json()

        # Validate required fields
        if not body:
            return jsonify({"success": False, "error": "Request body is required"}), 400

        name = body.get("name", "").strip()
        # Accept both 'message' (from frontend) and 'comment' field names
        comment = body.get("message", body.get("comment", "")).strip()
        is_public = body.get("public", False)

        if not name:
            return jsonify({"success": False, "error": "Name is required"}), 400
        if not comment:
            return jsonify({"success": False, "error": "Comment is required"}), 400

        # Insert into Supabase
        response = supabase.table("messages").insert({
            "name": name,
            "comment": comment,
            "public": is_public
        }).execute()

        return jsonify({
            "success": True,
            "message": "Message sent successfully!",
            "data": response.data[0] if response.data else {}
        }), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
