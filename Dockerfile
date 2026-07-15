# Production Dockerfile for Pin Media Downloader
# Multi-stage build to minimize production image size

# Stage 1: Build phase
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source and configurations
COPY . .

# Build application static assets and bundle Express backend
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary production artifacts from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production dependencies only to reduce surface area & image size
RUN npm ci --only=production

# Expose routing port
EXPOSE 3000

# Start server
CMD ["node", "dist/server.cjs"]
