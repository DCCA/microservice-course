# Base images
FROM node:alpine

# Definr a workdir folder in the container
WORKDIR /usr/app

# Dependencies
# Define the path to the copy file and then the path where to copy the file
COPY ./package.json ./
RUN npm install

# Copy all the files
COPY ./ ./

# Start command
CMD ["npm","start"]