from main import create_server

# Create server
if __name__ == '__main__':
	server = create_server()
	server.run(debug=True, host='0.0.0.0', port=3005)