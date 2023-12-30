import os
from flask import Flask
from flask_pymongo import PyMongo
from .config import ApplicationConfig


def create_server():
				
		# Create Flask server
		server = Flask(__name__)
		
		# Load config
		server.config.from_object(ApplicationConfig)

		# Set up PyMongo instance
		mongo = PyMongo(server)

		# Import routes
		from .routes import service_routes
		server.register_blueprint(service_routes, url_prefix='/api/v1/api-docs')
		
		return server, mongo