import pytest
from datetime import datetime, timedelta
from app.extensions import db
from app.models.user import User
from app.models.plan import Plan
from app.models.subscription import Subscription
from app.services.subscription_service import (
    create_subscription,
    cancel_subscription,
    upgrade_subscription,
    get_user_subscriptions,
    get_active_subscriptions
)

@pytest.fixture
def setup_user_plan():
    user = User(name="Test User", email="testuser@example.com", password_hash="hashed", role="user")
    db.session.add(user)
    db.session.commit()

    plan = Plan(name="Starter Plan", price=100, duration_days=30)
    db.session.add(plan)
    db.session.commit()

    yield user, plan

    Subscription.query.filter_by(user_id=user.id).delete()
    Plan.query.filter_by(id=plan.id).delete()
    User.query.filter_by(id=user.id).delete()
    db.session.commit()

def test_create_subscription(setup_user_plan):
    user, plan = setup_user_plan
    sub = create_subscription(user.id, plan.id)
    assert sub.id is not None
    assert sub.status == "active"
    assert sub.plan_id == plan.id

def test_cancel_subscription(setup_user_plan):
    user, plan = setup_user_plan
    sub = create_subscription(user.id, plan.id)
    cancelled_sub = cancel_subscription(sub.id, cancelled_by=user.id)
    assert cancelled_sub.status == "cancelled"
    assert cancelled_sub.end_date <= datetime.utcnow()

def test_upgrade_subscription(setup_user_plan):
    user, plan = setup_user_plan
    sub = create_subscription(user.id, plan.id)

    new_plan = Plan(name="Pro Plan", price=200, duration_days=60)
    db.session.add(new_plan)
    db.session.commit()

    upgraded_sub = upgrade_subscription(sub.id, new_plan.id, upgraded_by=user.id)
    assert upgraded_sub.plan_id == new_plan.id
    assert upgraded_sub.end_date > sub.end_date

def test_get_user_subscriptions(setup_user_plan):
    user, plan = setup_user_plan
    sub = create_subscription(user.id, plan.id)
    subs = get_user_subscriptions(user.id)
    assert any(s.id == sub.id for s in subs)

def test_get_active_subscriptions(setup_user_plan):
    user, plan = setup_user_plan
    sub = create_subscription(user.id, plan.id)
    active_subs = get_active_subscriptions()
    assert any(s.id == sub.id for s in active_subs)
