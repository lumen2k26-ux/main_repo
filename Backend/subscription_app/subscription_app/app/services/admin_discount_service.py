from datetime import datetime
from app.models.discount import Discount
from app.extensions import db

# create a new discount
def create_discount(name, code, percentage, plan_id=None, start_date=None, end_date=None):
    discount = Discount(
        name=name,
        code=code,
        percentage=percentage,
        plan_id=plan_id,
        start_date=start_date or datetime.utcnow(),
        end_date=end_date
    )
    db.session.add(discount)
    db.session.commit()
    return discount

# get all active discounts
def get_active_discounts():
    now = datetime.utcnow()
    discounts = Discount.query.filter(
        Discount.active == True,
        (Discount.start_date <= now),
        ((Discount.end_date == None) | (Discount.end_date >= now))
    ).all()
    return discounts

# apply discount for a plan (return discounted price)
def apply_discount(plan_price, discount_code):
    discount = Discount.query.filter_by(code=discount_code, active=True).first()
    if not discount:
        return plan_price  # no discount applied
    discounted_price = plan_price * (1 - discount.percentage / 100)
    return round(discounted_price, 2)
