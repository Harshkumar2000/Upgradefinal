# Stage 1: Build the application
FROM node:22.14.0-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:22.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy only the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Install a lightweight HTTP server (if needed)
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3000"]