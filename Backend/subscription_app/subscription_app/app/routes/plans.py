from flask import Blueprint, request, jsonify
from app.services import plan_service as service

bp = Blueprint("plans", __name__)

@bp.route("/plans", methods=["GET"])
def list_plans():
    plans = service.get_all_plans()
    return jsonify(plans)

@bp.route("/plans", methods=["POST"])
def create_plan():
    data = request.get_json() or {}
    plan = service.create_plan(
        name=data.get("name", "Unnamed"),
        price=data.get("price", 0),
        quota=data.get("quota", 0)
    )
    return jsonify(plan), 201
