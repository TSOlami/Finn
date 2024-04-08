import os, requests
import logging
from flask import current_app, Request
from typing import Union, Tuple, Dict, Any, Optional
from ...config import ApplicationConfig


# Configure logging
logging.basicConfig(level=logging.INFO)  # Set the log level to INFO


def auth_call(request: Request) -> Tuple[Optional[Dict[str, Any]], Optional[str], Optional[Tuple[str, int]]]:
	try:
		# Get the code from the request
		code: Optional[str] = request.args.get('code')

		if not code:
			return None, None, None, ('No code provided', 400)

		logging.info("Code: %s", code)

		# Get the user agent from the request
		user_agent: str = request.headers.get('user-agent')

		logging.info("User agent: %s", user_agent)
		
		# Make a request to the authentication service using the provided code
		auth_service_url: str = ApplicationConfig.AUTH_SERVICE_URL
		
		auth_response = requests.get(
			f"{auth_service_url}/api/v1/auth/sessions/oauth/google",
			headers={'user-agent': user_agent},
			params={'code': code}
		)
		# Display the response status code and object
		logging.info(f"Auth response: {auth_response.json()}")

		# Check if the request was successful
		if auth_response.status_code != 200:
			return None, None, None, (auth_response.json(), auth_response.status_code)
		
		# Parse the response
		auth_data: Dict[str, Any] = auth_response.json()

		# Extract tokens and other data
		tokens: Optional[Dict[str, Any]] = auth_data.get('tokens')
		redirectTo: Optional[str] = auth_data.get('redirectTo')
		user: Optional[Dict[str, Any]] = auth_data.get('user')

		return user, tokens, redirectTo, None
	except Exception as e:
		current_app.logger.error(f"Authentication error: {str(e)}")
		return None, None, None, ('Internal Server Error', 500)

def validate_user(token: str) -> Tuple[Optional[Dict[str, Any]], Optional[Tuple[str, int]]]:
	try:
		# Make a request to the authentication service using the provided token
		auth_service_url: str = ApplicationConfig.AUTH_SERVICE_URL
		
		auth_response = requests.get(
			f"{auth_service_url}/api/v1/auth/sessions/validate",
			headers={'Authorization': f'Bearer {token}'}
		)
		# Display the response status code and object
		logging.info(f"Auth response: {auth_response.json()}")

		# Check if the request was successful
		if auth_response.status_code != 200:
			return None, (auth_response.json(), auth_response.status_code)
		
		# Parse the response
		auth_data: Dict[str, Any] = auth_response.json()

		# Extract user information from the response
		user_info: Dict[str, Any] = auth_data.get('user', {})

		return user_info, None
	except Exception as e:
		current_app.logger.error(f"Authentication error: {str(e)}")
		return None, ('Internal Server Error', 500)
	