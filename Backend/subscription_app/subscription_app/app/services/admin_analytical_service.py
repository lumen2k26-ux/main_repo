from app.models.usage import Usage
from app.models.subscription import Subscription
from app.models.plan import Plan

def get_user_recommendation(user_id):
    """
    Recommend a higher plan if the user’s usage is near their quota.
    """
    # Get latest usage record
    usage = (
        Usage.query.filter_by(user_id=user_id)
        .order_by(Usage.timestamp.desc())
        .first()
    )
    # Get active subscription
    sub = Subscription.query.filter_by(user_id=user_id, status="active").first()

    if not usage or not sub:
        return {"error": "No usage or active subscription found"}, 404

    plan = Plan.query.get(sub.plan_id)

    # Recommend next higher plan if usage >= 80% of quota
    if usage.data_used >= 0.8 * plan.quota:
        higher_plan = Plan.query.filter(Plan.price > plan.price).order_by(Plan.price.asc()).first()
        if higher_plan:
            return {
                "user": sub.user.name,
                "current_plan": plan.name,
                "recommended_plan": higher_plan.name
            }

    # Otherwise, recommend staying on current plan
    return {
        "user": sub.user.name,
        "current_plan": plan.name,
        "recommended_plan": "Stay on current plan"
    }
