# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
# We should also copy the lock file if it exists for reproducible builds
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for the web
RUN npm run web-build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

# Copy the build output from the builder stage
# react-scripts builds to a 'build' directory by default
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
