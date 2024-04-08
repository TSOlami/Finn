from flask import Blueprint, jsonify, request
import json

from .. import create_server
from ..utils.auth import validate
from ..storage import util

vid_to_mp3 = Blueprint('vid_to_mp3', __name__)


@vid_to_mp3.route('/health', methods=['GET'])
def health():
		return jsonify({'status': 'ok'})


@vid_to_mp3.route('/upload', methods=['POST'])
def upload():

	access, err = validate.token(request)

	# Check if the request was successful and there were no errors
	if err:
		return jsonify({'error': err[0]}), err[1]
	
	# Load the access variables
	access = json.loads(access)

	# Check if the user has an email
	if not access.get('email'):
		return jsonify({'error': 'No email provided'}), 400
	
	if len(request.files) > 1 or len(request.files) < 1:
		return jsonify({'error': 'Exactly one file must be provided'}), 400
	
	for _, f in request.files.items():
		# Get the fs and channel
		_, _, fs_videos, channel = create_server()

		# Attempt to upload the file
		err = util.upload(f, fs_videos, channel, access)

		# Check if there was an error
		if err:
			return jsonify({'error': err[0]}), err[1]
		
		# Return success message
		return jsonify({'status': 'success', 'message': 'File uploaded successfully'}), 200
	
@vid_to_mp3.route('/download', methods=['GET'])
def download():

	access, err = validate.token(request)

	# Check if the request was successful and there were no errors
	if err:
		return jsonify({'error': err[0]}), err[1]
	
	# Load the access variables
	access = json.loads(access)

	# Check if the user has an email
	if not access.get('email'):
		return jsonify({'error': 'No email provided'}), 400
	
	# Check if the user has a file id
	if not access.get('file_id'):
		return jsonify({'error': 'No file id provided'}), 400
	
	# Attempt to download the file
	# file, err = utils.download(fs, access)

	# # Check if there was an error
	# if err:
	# 	return jsonify({'error': err[0]}), err[1]
	
	# Return success message
	return jsonify({'status': 'success', 'message': 'File downloaded successfully'}), 200