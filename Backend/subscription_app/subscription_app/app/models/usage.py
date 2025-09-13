from flask import Blueprint, request, jsonify
from app.services import usage_service as service

bp = Blueprint("usage", __name__)

@bp.route("/usage", methods=["POST"])
def create_usage():
    data = request.get_json() or {}
    usage = service.create_usage(
        user_id=data["user_id"],
        data_used=data["data_used"]
    )
    return jsonify(usage), 201

@bp.route("/usage/<int:user_id>", methods=["GET"])
def get_usage(user_id):
    return jsonify(service.get_usage_for_user(user_id))
