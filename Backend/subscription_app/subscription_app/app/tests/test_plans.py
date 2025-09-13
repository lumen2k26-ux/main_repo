import pytest
from app.extensions import db
from app.models.plan import Plan
from app.services.plan_service import create_plan, get_all_plans, update_plan, delete_plan

@pytest.fixture
def test_plan():
    plan = create_plan(name="Test Plan", price=100, duration_days=30, created_by=1)
    yield plan
    delete_plan(plan.id, deleted_by=1)

def test_create_plan(test_plan):
    assert test_plan.id is not None
    assert test_plan.name == "Test Plan"
    assert test_plan.price == 100
    assert test_plan.duration_days == 30

def test_get_all_plans(test_plan):
    plans = get_all_plans()
    assert any(p.id == test_plan.id for p in plans)

def test_update_plan(test_plan):
    updated_plan = update_plan(test_plan.id, name="Updated Plan", price=150, updated_by=1)
    assert updated_plan.name == "Updated Plan"
    assert updated_plan.price == 150

def test_delete_plan():
    plan = create_plan(name="Temp Plan", price=50, duration_days=10, created_by=1)
    result = delete_plan(plan.id, deleted_by=1)
    assert result is True
    assert Plan.query.get(plan.id) is None
