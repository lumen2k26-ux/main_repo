from datetime import datetime, timedelta
from ..extensions import db
from ..models.subscription import Subscription
from ..models.user import User
from ..models.plan import Plan
from ..services.audit_event_service import log_audit, emit_event

# Create a new subscription
def create_subscription(user_id, plan_id):
    user = User.query.get(user_id)
    plan = Plan.query.get(plan_id)
    if not user or not plan:
        return None

    sub = Subscription(
        user_id=user_id,
        plan_id=plan_id,
        start_date=datetime.utcnow(),
        end_date=datetime.utcnow() + timedelta(days=plan.duration_days),
        status='active'
    )
    db.session.add(sub)
    db.session.commit()

    # Audit & Event
    log_audit(
        actor_id=user_id,
        actor_role='user',
        action_type='create',
        object_type='subscription',
        object_id=sub.id
    )
    emit_event(
        user_id=user_id,
        subscription_id=sub.id,
        event_type='subscription_created'
    )
    db.session.commit()
    return serialize_subscription(sub)

# Cancel subscription
def cancel_subscription(subscription_id, cancelled_by):
    sub = Subscription.query.get(subscription_id)
    if not sub or sub.status != 'active':
        return None
    sub.status = 'cancelled'
    sub.end_date = datetime.utcnow()
    db.session.commit()

    # Audit & Event
    log_audit(
        actor_id=cancelled_by,
        actor_role='user',
        action_type='cancel',
        object_type='subscription',
        object_id=sub.id
    )
    emit_event(
        user_id=sub.user_id,
        subscription_id=sub.id,
        event_type='subscription_cancelled'
    )
    db.session.commit()
    return serialize_subscription(sub)

# Upgrade subscription
def upgrade_subscription(subscription_id, new_plan_id, upgraded_by):
    sub = Subscription.query.get(subscription_id)
    new_plan = Plan.query.get(new_plan_id)
    if not sub or not new_plan:
        return None

    sub.plan_id = new_plan_id
    sub.end_date = datetime.utcnow() + timedelta(days=new_plan.duration_days)
    db.session.commit()

    # Audit & Event
    log_audit(
        actor_id=upgraded_by,
        actor_role='user',
        action_type='upgrade',
        object_type='subscription',
        object_id=sub.id
    )
    emit_event(
        user_id=sub.user_id,
        subscription_id=sub.id,
        event_type='subscription_upgraded'
    )
    db.session.commit()
    return serialize_subscription(sub)

# Get all subscriptions for a user
def get_user_subscriptions(user_id):
    subs = Subscription.query.filter_by(user_id=user_id).all()
    return [serialize_subscription(s) for s in subs]

# Get all active subscriptions
def get_active_subscriptions():
    subs = Subscription.query.filter_by(status='active').all()
    return [serialize_subscription(s) for s in subs]

# Serialize subscription for JSON
def serialize_subscription(sub):
    return {
        "id": sub.id,
        "user_id": sub.user_id,
        "plan_id": sub.plan_id,
        "status": sub.status,
        "start_date": sub.start_date.isoformat() if sub.start_date else None,
        "end_date": sub.end_date.isoformat() if sub.end_date else None
    }
