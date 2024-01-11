from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    # Server secret key
    SECRET_KEY = os.environ["SECRET_KEY"]
    AUTH_SERVICE_URL = os.environ["AUTH_SERVICE_URL"]
    SERVER_ENV = os.environ["SERVER_ENV"]
    # Databases
    VIDEOS_MONGO_URI = os.environ["VIDEOS_MONGO_URI"]