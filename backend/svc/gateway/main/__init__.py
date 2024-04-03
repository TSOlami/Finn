import os
import gridfs
import pika
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from .config import ApplicationConfig


def create_server():
        # Create Flask server
        server = Flask(__name__)
        
        # Enable CORS
        CORS(server)

        # Load config
        server.config.from_object(ApplicationConfig)

        # Set up MongoDB
        server.config['VIDEOS_MONGO_URI'] = os.environ['VIDEOS_MONGO_URI']

        # Set up PyMongo instance
        mongo_video = PyMongo(server, uri="mongodb://host.minikube.internal:27017/videos")
        
        mongo_mp3 = PyMongo(server, uri="mongodb://host.minikube.internal:27017/mp3s")

        # Set up GridFS
        fs_videos = gridfs.GridFS(mongo_video.db)
        fs_mp3s = gridfs.GridFS(mongo_mp3.db)


        # Configure the rabbitmq connection
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        channel = connection.channel()
        # channel.queue_declare(queue='task_queue', durable=True)

        # Import routes
        from .routes import main
        from .routes.auth_routes import auth
        from .routes.vid_to_mp3_routes import vid_to_mp3
        server.register_blueprint(main, url_prefix='/api/v1')
        server.register_blueprint(auth, url_prefix='/api/v1/auth')
        server.register_blueprint(vid_to_mp3, url_prefix='/api/v1/vid_to_mp3')
        
        return server, fs_videos, fs_mp3s, channel
