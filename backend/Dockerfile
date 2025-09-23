# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 5000

# Start server (fixed from server → server.js)
CMD ["node", "server.js"]
