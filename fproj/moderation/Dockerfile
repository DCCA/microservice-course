# Base file
FROM node:alpine

# Workdir
WORKDIR /app

# Dependencies
COPY package.json ./
RUN npm install
COPY ./ ./

# Command
CMD ["npm","start"]