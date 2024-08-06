# Specify a base image
FROM node:22-alpine

# Set a working directory to place your application inside the container
WORKDIR /usr/app

# Install Deps
COPY ./*.json ./
RUN npm install
# This validates that whenever there are any changes to index.js
# COPY of .json files happens through the caching mechanism and does not invalidate their caching since it met no change
COPY ./ ./

# Default command
CMD ["npm", "start"]