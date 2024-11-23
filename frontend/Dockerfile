# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
