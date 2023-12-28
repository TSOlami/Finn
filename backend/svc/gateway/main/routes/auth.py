import os
from flask import Blueprint, request, redirect, jsonify, current_app

auth = Blueprint('auth', __name__)


@auth.route('/api/v1/auth/health', methods=['GET'])
def health():
	return jsonify({'status': 'ok'})

@auth.route('/api/v1/auth', methods=['POST'])
def auth():
	pass