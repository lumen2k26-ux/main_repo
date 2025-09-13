from marshmallow import Schema, fields

class SubscriptionSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    plan_id = fields.Int(required=True)
    status = fields.Str(default="active")
    start_date = fields.DateTime()
    end_date = fields.DateTime()
