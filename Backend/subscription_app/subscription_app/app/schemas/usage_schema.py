from marshmallow import Schema, fields

class UsageSchema(Schema):
    user_id = fields.Int(required=True)
    data_used = fields.Float(required=True)
    timestamp = fields.DateTime()
