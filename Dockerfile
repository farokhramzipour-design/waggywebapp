# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for the web
# Note: You might need to adjust this command based on your project setup.
# This assumes you have a "web-build" script in your package.json
# that builds for web, e.g., using "react-native-web".
# If you are using Expo, the command might be "npx expo export:web"
RUN npm run web-build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

# Copy the build output from the builder stage
COPY --from=builder /app/web-build /usr/share/nginx/html

# Copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
