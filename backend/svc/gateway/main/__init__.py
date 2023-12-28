import os
from .routes import auth_routes
import gridfs
import pika
from flask import Flask
from flask_pymongo import PyMongo
from .config import ApplicationConfig


def create_server():
				
		# Create Flask server
		server = Flask(__name__)
		
		# Load config
		server.config.from_object(ApplicationConfig)

		# Set up MongoDB
		server.config['VIDEOS_MONGO_URI'] = os.environ['VIDEOS_MONGO_URI']

		# Set up PyMongo instance
		mongo = PyMongo(server)

		# Set up GridFS
		fs = gridfs.GridFS(mongo.db)

		# Configure the rabbitmq connection
		connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
		channel = connection.channel()
		# channel.queue_declare(queue='task_queue', durable=True)

		# Import routes
		from .routes import main
		server.register_blueprint(main, url_prefix='/api/v1')
		server.register_blueprint(auth_routes, url_prefix='/api/v1/auth')
		
		return server, mongo, fs, channel