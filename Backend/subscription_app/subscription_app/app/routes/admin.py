from flask import Blueprint, request, jsonify
from app.services import admin_analytical_service as service

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@admin_bp.route("/top-plans", methods=["GET"])
def top_plans():
    period = request.args.get("period", "month")
    data = service.get_top_plans(period)
    return jsonify(data)

@admin_bp.route("/subscription-trends", methods=["GET"])
def subscription_trends():
    from_date = request.args.get("from")
    to_date = request.args.get("to")
    if not from_date or not to_date:
        return {"error": "from and to query params required"}, 400
    data = service.get_subscription_trends(from_date, to_date)
    return jsonify(data)

@admin_bp.route("/active-vs-cancelled", methods=["GET"])
def active_vs_cancelled():
    data = service.get_active_vs_cancelled()
    return jsonify(data)
