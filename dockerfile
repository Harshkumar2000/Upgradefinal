# Stage 1: Build
FROM node:16 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Stage 2: Runtime
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist  # If you have a build step
COPY --from=builder /app/src ./src    # If you don't have a build step

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
