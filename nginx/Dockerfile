# Build Vue SPA (admin panel + guest QR app)
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# Final nginx image
FROM nginx:1.25-alpine

# Copy built Vue SPA
COPY --from=frontend-builder /app/dist /var/www/frontend

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
