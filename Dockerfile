FROM node:18

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy remaining application files
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
