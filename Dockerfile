# Use an official Node.js image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies with npm, including specific packages
# This installs dependencies listed in package.json and also adds the required packages
RUN npm install --force @faker-js/faker @reduxjs/toolkit

# Copy the rest of the application files
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
