from ..extensions import db
from ..models.plan import Plan
from ..services.audit_event_service import log_audit, emit_event
from datetime import datetime

# Create a new plan
def create_plan(name, price, duration_days=30, created_by=None):
    plan = Plan(
        name=name,
        price=price,
        duration_days=duration_days
    )
    db.session.add(plan)
    db.session.commit()  # commit so plan.id is available

    # Audit log
    if created_by:
        log_audit(
            actor_id=created_by,
            actor_role='admin',
            action_type='create',
            object_type='plan',
            object_id=plan.id
        )
        db.session.commit()
    return plan

# Get all plans
def get_all_plans():
    plans = Plan.query.all()
    return [serialize_plan(p) for p in plans]

# Get plan by ID
def get_plan_by_id(plan_id):
    plan = Plan.query.get(plan_id)
    return serialize_plan(plan) if plan else None

# Update plan
def update_plan(plan_id, name=None, price=None, duration_days=None, updated_by=None):
    plan = Plan.query.get(plan_id)
    if not plan:
        return None
    if name:
        plan.name = name
    if price is not None:
        plan.price = price
    if duration_days:
        plan.duration_days = duration_days
    db.session.commit()

    if updated_by:
        log_audit(
            actor_id=updated_by,
            actor_role='admin',
            action_type='update',
            object_type='plan',
            object_id=plan.id
        )
        db.session.commit()
    return serialize_plan(plan)

# Delete plan
def delete_plan(plan_id, deleted_by=None):
    plan = Plan.query.get(plan_id)
    if not plan:
        return False
    db.session.delete(plan)
    db.session.commit()

    if deleted_by:
        log_audit(
            actor_id=deleted_by,
            actor_role='admin',
            action_type='delete',
            object_type='plan',
            object_id=plan_id
        )
        db.session.commit()
    return True

# Serialize plan for JSON response
def serialize_plan(plan):
    return {
        "id": plan.id,
        "name": plan.name,
        "price": plan.price,
        "duration_days": getattr(plan, "duration_days", 30)
    }
