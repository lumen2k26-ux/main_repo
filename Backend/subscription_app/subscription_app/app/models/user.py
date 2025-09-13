from app.extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(20), default="user")  # user/admin

    # relationships
    subscriptions = db.relationship(
        "Subscription", back_populates="user", cascade="all, delete-orphan"
    )
    usage = db.relationship(
        "Usage", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.id} - {self.name}>"
