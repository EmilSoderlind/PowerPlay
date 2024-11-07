# Use a lightweight Node.js image as the base
FROM node:20.18.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Expose the port the app will run on
EXPOSE 4200

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0"]