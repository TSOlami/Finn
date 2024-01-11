import os
import git
from flask import Blueprint, request, jsonify, current_app, send_file
from pymongo import MongoClient
from gridfs import GridFS
from flask_restful_swagger_3 import swagger, Resource
from ..config import ApplicationConfig
from ..utils.code_analysis import analyze_codebase
from ..utils.openapi_generator import generate_openapi_spec

api_docs  = Blueprint('api_docs ', __name__)


@api_docs.route('/health', methods=['GET'])
def health():
     """Health check endpoint"""
     return jsonify({'status': 'ok'})

@api_docs.route('/generate-docs', methods=['POST'])
def generate_docs():
    """Generate API documentation from GitHub repo"""
    try:
        # Get GitHub repo link from the request
        data = request.json
        github_repo = data.get('github_repo')

        if not github_repo:
            """Ensure GitHub repo link is provided"""
            return jsonify({'error': 'GitHub repo link not provided'}), 400

        # Clone GitHub repository to a temporary directory
        temp_dir = f'/tmp/{os.path.basename(github_repo)}'
        git.Repo.clone_from(github_repo, temp_dir)

        # Define supported file types for analysis
        supported_file_types = ['.py', '.js', '.ts']

		# Analyze codebase and extract API information
        api_info = analyze_codebase(temp_dir, supported_file_types)

       # Generate OpenAPI specification and get file ID
        file_id = generate_openapi_spec(api_info)

        # Return success message with file ID
        return jsonify({'status': 'success', 'message': 'Documentation generation initiated', 'file_id': file_id}), 200

    except Exception as e:
        current_app.logger.error(f"Documentation generation error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


@api_docs.route('/get-docs/<string:file_id>', methods=['GET'])
def get_docs(file_id):
    try:
        # Connect to MongoDB
        client = MongoClient(current_app.config['MONGO_URI'])
        db = client[current_app.config['MONGO_DB']]
        fs = GridFS(db)

        # Find the file in GridFS using the provided file ID
        file_data = fs.find_one({'_id': file_id})

        # If the file is not found, return an error
        if not file_data:
            client.close()
            return jsonify({'error': 'File not found'}), 404

        # Serve the file to the user
        response = send_file(file_data, attachment_filename='openapi_spec.json', as_attachment=True)

        # Close the MongoDB connection
        client.close()

        return response

    except Exception as e:
        current_app.logger.error(f"Error retrieving OpenAPI specification: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
    