import os, requests

def token(request):
	code = request.json.get('code')
	if not code:
		return None, ('No code provided', 400)
	
	response = requests.post(
		f"{os.environ['AUTH_SERVICE_URL']}/api/v1/auth/sessions/validation",
		json={'code': code, 'user_agent': request.headers.get('user-agent')}
	)

	if response.status_code == 200:
		return response.json(), None
	else:
		return None, (response.json(), response.status_code)
