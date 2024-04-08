from flask import Blueprint, jsonify
import requests

from ..config import ApplicationConfig

main = Blueprint('main', __name__)


@main.route('/health', methods=['GET'])
def health():
		print("Recieved a health check request...")
		return jsonify({'status': 'ok'})


@main.route('/auth-health', methods=['GET'])
def auth_health():
	"""This is a health check for the auth service. It is used to check if the auth service is up and running."""
	# Get the auth service url from the environment variable
	auth_service_url = ApplicationConfig.AUTH_SERVICE_URL

	print("Recieved a auth-health check request...")

	# Make a request to the auth service
	response = requests.get(f"{auth_service_url}/api/v1/auth/health")	
	
	# Return the response from the auth service
	return jsonify(response.json())