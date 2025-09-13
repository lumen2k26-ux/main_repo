from marshmallow import Schema, fields

class DiscountSchema(Schema):
    id = fields.Int(dump_only=True)
    code = fields.Str(required=True)
    name = fields.Str(required=True)
    percentage = fields.Float(required=True)
    plan_id = fields.Int()
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    active = fields.Bool(default=True)
