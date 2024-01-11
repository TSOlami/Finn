import os
from flask import Flask
from flask_pymongo import PyMongo, GridFS
from .config import ApplicationConfig


def create_server():
				
		# Create Flask server
		server = Flask(__name__)
		
		# Load config
		server.config.from_object(ApplicationConfig)

		# Set up PyMongo instance
		mongo = PyMongo(server)

		# Import routes
		from .routes.service_routes import api_docs
		server.register_blueprint(api_docs, url_prefix='/api/v1/api-docs')
		
		return server, mongo
