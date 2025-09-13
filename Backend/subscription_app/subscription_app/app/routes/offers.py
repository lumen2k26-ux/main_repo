from flask import Blueprint, request, jsonify

bp = Blueprint("offers", __name__)
offers = []

@bp.route("/offers", methods=["GET"])
def list_offers():
    return jsonify(offers)

@bp.route("/offers", methods=["POST"])
def create_offer():
    data = request.get_json() or {}
    if not data.get("title"):
        return {"error": "title is required"}, 400
    offer = {
        "id": len(offers) + 1,
        "title": data["title"],
        "description": data.get("description", ""),
        "valid_until": data.get("valid_until")
    }
    offers.append(offer)
    return offer, 201
