from flask import Blueprint, jsonify

main = Blueprint('main', __name__)


@main.route('/health', methods=['GET'])
def health():
		print("Recieved a health check request...")
		return jsonify({'status': 'ok'})
