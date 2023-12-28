from main import create_server

# Create server
if __name__ == '__main__':
	server = create_server()
	server.run(debug=True)