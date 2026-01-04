# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Declare the build argument
ARG REACT_APP_API_URL

# Set it as an environment variable for the build process
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package.json ./
RUN npm install
COPY . .

# The REACT_APP_API_URL will be automatically available during this step
RUN npm run web-build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
