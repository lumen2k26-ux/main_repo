from flask import Blueprint, jsonify
from app.services import billing_service as service

bp = Blueprint("billing", __name__)

@bp.route("/billing/invoices/<int:user_id>", methods=["GET"])
def invoices(user_id):
    invoices = service.get_invoices(user_id)
    return jsonify(invoices)
