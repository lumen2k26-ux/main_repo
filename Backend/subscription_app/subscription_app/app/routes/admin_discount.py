from flask import Blueprint, request, jsonify
from app.services import admin_discount_service as service

discount_bp = Blueprint("discounts", __name__, url_prefix="/api/admin/discounts")

@discount_bp.route("/", methods=["POST"])
def create_discount():
    data = request.json
    try:
        discount = service.create_discount(
            name=data["name"],
            code=data["code"],
            percentage=data["percentage"],
            plan_id=data.get("plan_id"),
            start_date=data.get("start_date"),
            end_date=data.get("end_date")
        )
        return jsonify({"message": "Discount created", "discount": discount.code})
    except Exception as e:
        return {"error": str(e)}, 400

@discount_bp.route("/", methods=["GET"])
def get_active_discounts():
    discounts = service.get_active_discounts()
    result = [
        {"name": d.name, "code": d.code, "percentage": d.percentage, "plan_id": d.plan_id}
        for d in discounts
    ]
    return jsonify(result)
