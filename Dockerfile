FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production --legacy-peer-deps

# Copy backend and frontend source
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend

EXPOSE 5000
CMD ["node", "server.js"]
