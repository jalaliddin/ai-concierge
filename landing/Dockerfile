# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Cache npm install layer
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .

# Build args become env vars at build time for Nuxt
ARG NUXT_PUBLIC_API_BASE=/api
ARG NUXT_PUBLIC_SITE_URL=https://khivatourguide.com
ARG NUXT_PUBLIC_WHATSAPP=+998935001234
ARG NUXT_PUBLIC_TELEGRAM=@khivatourguide

ENV NUXT_PUBLIC_API_BASE=$NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_WHATSAPP=$NUXT_PUBLIC_WHATSAPP
ENV NUXT_PUBLIC_TELEGRAM=$NUXT_PUBLIC_TELEGRAM

RUN npm run build

# Production stage - minimal Node image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
