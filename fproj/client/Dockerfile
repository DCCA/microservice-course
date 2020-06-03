# Base file
FROM node:alpine

# Fix
ENV CI=true

# Workdir
WORKDIR /app

# Dependencies
COPY package.json ./
RUN npm install
COPY ./ ./

# Command
CMD ["npm","start"]