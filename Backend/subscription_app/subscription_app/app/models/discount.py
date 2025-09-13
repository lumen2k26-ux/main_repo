from datetime import datetime
from app.extensions import db
from app.models.plan import Plan

class Discount(db.Model):
    __tablename__ = "discounts"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False)  # discount code
    name = db.Column(db.String(100), nullable=False)
    percentage = db.Column(db.Float, nullable=False)  # e.g., 10 for 10%
    plan_id = db.Column(db.Integer, db.ForeignKey("plans.id"), nullable=True)  # optional: plan-specific
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    active = db.Column(db.Boolean, default=True)

    # relationship
    plan = db.relationship("Plan", backref="discounts")

    def __repr__(self):
        return f"<Discount {self.code} - {self.percentage}%>"
