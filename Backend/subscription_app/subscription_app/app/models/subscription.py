from flask import Blueprint, request, jsonify
from app.services import subscription_service as service

bp = Blueprint("subscriptions", __name__)

@bp.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json() or {}
    sub = service.create_subscription(data["user_id"], data["plan_id"])
    if sub:
        return jsonify(sub), 201
    return {"error": "user or plan not found"}, 404

@bp.route("/cancel/<int:sub_id>", methods=["POST"])
def cancel(sub_id):
    cancelled_by = request.json.get("cancelled_by")
    sub = service.cancel_subscription(sub_id, cancelled_by)
    if sub:
        return jsonify(sub)
    return {"error": "subscription not found or inactive"}, 404

@bp.route("/upgrade/<int:sub_id>", methods=["POST"])
def upgrade(sub_id):
    data = request.get_json() or {}
    sub = service.upgrade_subscription(sub_id, data["new_plan_id"], data["upgraded_by"])
    if sub:
        return jsonify(sub)
    return {"error": "subscription or plan not found"}, 404

@bp.route("/subscriptions/<int:user_id>", methods=["GET"])
def user_subscriptions(user_id):
    subs = service.get_user_subscriptions(user_id)
    return jsonify(subs)

@bp.route("/subscriptions/active", methods=["GET"])
def active_subscriptions():
    subs = service.get_active_subscriptions()
    return jsonify(subs)
