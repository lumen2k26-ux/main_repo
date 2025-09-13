from flask import Blueprint, request, jsonify
bp = Blueprint("auth", __name__)
users = []

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("password"):
        return {"error": "email and password required"}, 400
    if any(u["email"] == data["email"] for u in users):
        return {"error": "email already exists"}, 400
    users.append({"email": data["email"], "password": data["password"]})
    return {"message": "registered", "user": data["email"]}, 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    for u in users:
        if u["email"] == data.get("email") and u["password"] == data.get("password"):
            return {"message": "login ok"}
    return {"error": "invalid credentials"}, 401
