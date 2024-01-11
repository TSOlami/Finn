from flask import Blueprint, jsonify

vid_to_mp3 = Blueprint('vid_to_mp3', __name__)


@vid_to_mp3.route('/health', methods=['GET'])
def health():
		return jsonify({'status': 'ok'})
