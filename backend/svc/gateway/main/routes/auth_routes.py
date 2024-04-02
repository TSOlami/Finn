import os
import logging
from flask import Blueprint, request, redirect, jsonify, current_app
from typing import Union, Tuple, Dict, Any
from ..config import ApplicationConfig
from ..controllers.auth_svc import access

auth = Blueprint('auth', __name__)


logging.basicConfig(level=logging.INFO)  # Set the log level to INFO

@auth.route('/health', methods=['GET'])
def health() -> jsonify:
    logging.info("Recieved a health check request...")
    return jsonify({'status': 'ok'})


@auth.route('/', methods=['GET'])
def authenticate() -> Union[jsonify, Tuple[jsonify, int]]:
    logging.info("Recieved an authentication request...")
    try:
        # Get the code from the query string
        code: str = request.args.get('code')

        # Ensure the code is provided
        if not code:
            return jsonify({'error': 'No code provided'}), 400
        
        # Make a request to the authentication service using the provided code
        tokens: Dict[str, Any]
        redirectTo: str
        err: Tuple[str, int]
        tokens, redirectTo, err = access.auth_call(request)

        # Check if the request was successful and there were no errors
        if err:
            return redirect(ApplicationConfig.FRONTEND_ORIGIN_URL_ERROR_PAGE)
        
        # Check if tokens and redirectTo are present
        if tokens and redirectTo:
            # Create cookie options
            accessTokenCookieOptions: Dict[str, Union[int, str, bool]] = {
                'max_age': 900000,  # 15 minutes
                'httponly': True,
                'domain': "localhost",
                'path': "/",
                'samesite': "lax",
                'secure': False if ApplicationConfig.SERVER_ENV == 'development' else True,
            }

            refreshTokenCookieOptions: Dict[str, Union[int, str, bool]] = {
                **accessTokenCookieOptions,
                'max_age': 30 * 24 * 60 * 60 * 1000,  # 30 days
            }

            # Set cookies
            response: jsonify = jsonify({'status': 'success', 'message': 'Authentication successful'})
            response.set_cookie("access_token", tokens['accessToken'], **accessTokenCookieOptions)
            response.set_cookie("refresh_token", tokens['refreshToken'], **refreshTokenCookieOptions)

            # Redirect the user to the specified URL
            return redirect(redirectTo)
        
        # Unable to authenticate, return error message
        return jsonify({'error': 'Unable to authenticate'}), 401
    except Exception as e:
        current_app.logger.error(f"Authentication error: {str(e)}")
        # Redirect to error page
        return redirect(ApplicationConfig.FRONTEND_ORIGIN_URL_ERROR_PAGE)


@auth.route('/user', methods=['GET'])
def user() -> Union[jsonify, Tuple[jsonify, int]]:
    logging.info("Recieved a user request...")
    try:
        # Get the access token from the request
        accessToken: str = request.cookies.get('access_token')

        # Ensure the access token is provided
        if not accessToken:
            return jsonify({'error': 'No access token provided'}), 400
        
        # Make a request to the authentication service using the provided access token
        userDetails: Dict[str, Any]
        err: Tuple[str, int]
        userDetails, err = access.validate_user(accessToken)

        # Check if the request was successful and there were no errors
        if err:
            return redirect(ApplicationConfig.FRONTEND_ORIGIN_URL_ERROR_PAGE)
        
        # Check if userDetails is present
        if userDetails:
            return jsonify(userDetails)

    except Exception as e:
        current_app.logger.error(f"User details error: {str(e)}")
        # Redirect to error page
        return redirect(ApplicationConfig.FRONTEND_ORIGIN_URL_ERROR_PAGE)
