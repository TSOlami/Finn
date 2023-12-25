# Use a Node.js base image with a specified version
FROM node:14

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --no-cache

# Copy the rest of the files
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]