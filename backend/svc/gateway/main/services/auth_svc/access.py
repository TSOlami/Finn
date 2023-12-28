import os, requests
from flask import current_app, Request
from typing import Union, Tuple, Dict, Any, Optional
from ...config import ApplicationConfig

def auth_call(request: Request) -> Tuple[Optional[Dict[str, Any]], Optional[str], Optional[Tuple[str, int]]]:
	try:
		# Get the code from the request
		code: Optional[str] = request.json.get('code')

		if not code:
			return None, None, None, ('No code provided', 400)
		
		# Make a request to the authentication service using the provided code
		auth_service_url: str = ApplicationConfig.AUTH_SERVICE_URL
		auth_response = requests.post(
            f"{auth_service_url}/sessions/oauth/google",
            json={'code': code, 'user_agent': request.headers.get('user-agent')}
        )

		# Check if the request was successful
		auth_response.raise_for_status()

		# Parse the response
		auth_data: Dict[str, Any] = auth_response.json()

		# Extract tokens and other data
		tokens: Optional[Dict[str, Any]] = auth_data.get('tokens')
		redirectTo: Optional[str] = auth_data.get('redirectTo')

		return tokens, redirectTo, None
	except Exception as e:
		current_app.logger.error(f"Authentication error: {str(e)}")
		return None, None, None, ('Internal Server Error', 500)