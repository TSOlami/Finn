from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    # Server secret key
    SECRET_KEY = os.environ["SECRET_KEY"]