from flask import Blueprint, jsonify

main = Blueprint('main', __name__)


@main.route('/api/v1/health', methods=['GET'])
def health():
		print("Recieved a health check request...")
		return jsonify({'status': 'ok'})
