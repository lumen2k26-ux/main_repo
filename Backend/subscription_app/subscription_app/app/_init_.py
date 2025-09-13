from flask import Flask
from .config import Config
from .extensions import db, migrate, ma

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # ------------------------
    # Load configuration
    # ------------------------
    try:
        app.config.from_object(Config)          # default config
        app.config.from_pyfile("config.py")     # instance-specific override
    except FileNotFoundError:
        pass  # fallback to default if instance config not found

    # ------------------------
    # Initialize extensions
    # ------------------------
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    # ------------------------
    # Register blueprints / routes
    # ------------------------
    from app.routes import auth, plans, subscriptions, usage, billing, ml
    from app.routes.admin import admin_bp
    from app.routes.admin_discount import discount_bp

    app.register_blueprint(auth.bp)
    app.register_blueprint(plans.bp)
    app.register_blueprint(subscriptions.bp)
    app.register_blueprint(usage.bp)
    app.register_blueprint(billing.bp)
    app.register_blueprint(ml.bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(discount_bp)

    # ------------------------
    # Simple home route
    # ------------------------
    @app.route("/")
    def home():
        return "Subscription API is running!"

    # ------------------------
    # Quick DB create (for hackathon/demo)
    # ------------------------
    with app.app_context():
        db.create_all()

    return app


# Optional: run standalone for quick testing
if __name__ == "__main__":
    create_app().run(debug=True)
