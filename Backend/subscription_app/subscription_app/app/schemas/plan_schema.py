from marshmallow import Schema, fields

class PlanSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    price = fields.Float(required=True)
    duration_days = fields.Int(required=True, default=30)
