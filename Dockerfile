# Next.js Dockerfile

# Base image
FROM node:20.12.2

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy project
COPY . .

# Build Next.js app
RUN yarn build

# Expose the port
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
