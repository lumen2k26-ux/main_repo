from flask import Blueprint, request, jsonify
from app.services import subscription_service as service

bp = Blueprint("subscriptions", __name__)

@bp.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json() or {}
    try:
        sub = service.create_subscription(data["user_id"], data["plan_id"])
        return jsonify(sub), 201
    except Exception as e:
        return {"error": str(e)}, 400

@bp.route("/cancel/<int:sub_id>", methods=["POST"])
def cancel(sub_id):
    try:
        sub = service.cancel_subscription(sub_id)
        return jsonify(sub)
    except Exception as e:
        return {"error": str(e)}, 404
