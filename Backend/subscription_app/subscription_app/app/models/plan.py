from flask import Blueprint, request, jsonify
from app.services import plan_service as service

bp = Blueprint("plans", __name__)

@bp.route("/plans", methods=["GET"])
def list_plans():
    return jsonify(service.get_all_plans())

@bp.route("/plans", methods=["POST"])
def create_plan():
    data = request.get_json() or {}
    plan = service.create_plan(
        name=data.get("name", "Unnamed"),
        price=data.get("price", 0),
        duration_days=data.get("duration_days", 30),
        created_by=data.get("created_by")
    )
    return jsonify(plan), 201

@bp.route("/plans/<int:plan_id>", methods=["PUT"])
def update_plan(plan_id):
    data = request.get_json() or {}
    plan = service.update_plan(
        plan_id,
        name=data.get("name"),
        price=data.get("price"),
        duration_days=data.get("duration_days"),
        updated_by=data.get("updated_by")
    )
    if plan:
        return jsonify(plan)
    return {"error": "plan not found"}, 404

@bp.route("/plans/<int:plan_id>", methods=["DELETE"])
def delete_plan(plan_id):
    deleted = service.delete_plan(plan_id, deleted_by=request.args.get("deleted_by"))
    if deleted:
        return {"message": "plan deleted"}
    return {"error": "plan not found"}, 404
