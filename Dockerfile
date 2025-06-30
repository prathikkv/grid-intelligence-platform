# Dockerfile - Enterprise Pharmaceutical Intelligence Platform
# Multi-stage build for optimized production image

# ==============================
# Build Stage
# ==============================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for building
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./
COPY .npmrc* ./

# Install dependencies with production optimizations
RUN npm ci --only=production --silent && npm cache clean --force

# Copy source code
COPY . .

# Set build-time environment variables
ARG NODE_ENV=production
ARG VITE_APP_VERSION=2.0.0
ARG VITE_BUILD_DATE
ARG VITE_API_BASE_URL

ENV NODE_ENV=$NODE_ENV
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_BUILD_DATE=$VITE_BUILD_DATE
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application
RUN npm run build

# ==============================
# Production Stage
# ==============================
FROM node:18-alpine AS production

# Add metadata labels
LABEL maintainer="Enterprise Pharmaceutical Intelligence Team"
LABEL version="2.0.0"
LABEL description="Enterprise-grade pharmaceutical intelligence platform"
LABEL org.opencontainers.image.title="Enterprise Pharmaceutical Intelligence"
LABEL org.opencontainers.image.description="Advanced pharmaceutical data analytics platform"
LABEL org.opencontainers.image.version="2.0.0"
LABEL org.opencontainers.image.vendor="Enterprise Pharmaceutical Intelligence"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/your-org/enterprise-pharma-intelligence"

# Install production system dependencies
RUN apk add --no-cache \
    curl \
    wget \
    ca-certificates \
    tzdata \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S pharma && \
    adduser -S pharma -u 1001 -G pharma

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --silent && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/proxy.js ./
COPY --from=builder /app/public ./public

# Copy additional configuration files
COPY --chown=pharma:pharma vercel.json ./
COPY --chown=pharma:pharma .env.example ./

# Set proper ownership
RUN chown -R pharma:pharma /app

# Switch to non-root user
USER pharma

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "proxy.js"]

# ==============================
# Development Stage (for local development)
# ==============================
FROM node:18-alpine AS development

# Install development system dependencies
RUN apk add --no-cache \
    git \
    curl \
    wget \
    ca-certificates \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Set development environment
ENV NODE_ENV=development
ENV VITE_DEV_SERVER_PORT=5173
ENV PORT=3001

# Expose development ports
EXPOSE 5173 3001

# Start development server
CMD ["npm", "run", "dev"]

# ==============================
# Testing Stage
# ==============================
FROM development AS test

# Install additional testing dependencies
RUN npm install --save-dev \
    @testing-library/react \
    @testing-library/jest-dom \
    @testing-library/user-event \
    jest \
    vitest

# Copy test configuration
COPY jest.config.js ./
COPY vitest.config.js ./
COPY cypress.config.js ./

# Run tests
CMD ["npm", "test"]

# ==============================
# Security Scanning Stage
# ==============================
FROM production AS security-scan

# Switch back to root for security scanning
USER root

# Install security scanning tools
RUN npm install -g audit-ci retire

# Run security scans
RUN npm audit --audit-level=high
RUN retire --path /app

# Switch back to non-root user
USER pharma

# ==============================
# Build Arguments and Metadata
# ==============================

# Build arguments for customization
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=2.0.0

# Set metadata labels with build information
LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.revision=$VCS_REF
LABEL org.opencontainers.image.version=$VERSION

# Environment variables for runtime configuration
ENV APP_NAME="Enterprise Pharmaceutical Intelligence"
ENV APP_VERSION=$VERSION
ENV BUILD_DATE=$BUILD_DATE
ENV VCS_REF=$VCS_REF

# ==============================
# Performance Optimizations
# ==============================

# Optimize Node.js for container environment
ENV NODE_OPTIONS="--max-old-space-size=2048 --enable-source-maps=false"

# Enable production optimizations
ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true

# Set timezone
ENV TZ=UTC

# ==============================
# Security Hardening
# ==============================

# Remove unnecessary files and reduce attack surface
RUN rm -rf \
    /usr/share/man/* \
    /usr/share/doc/* \
    /var/cache/apk/* \
    /root/.npm \
    /usr/lib/node_modules/npm/man \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html \
    /usr/lib/node_modules/npm/scripts

# Set secure file permissions
RUN chmod -R 755 /app && \
    chmod 644 /app/package*.json

# Ensure proper signal handling for graceful shutdowns
STOPSIGNAL SIGTERM

# ==============================
# Enterprise Features
# ==============================

# Volume for persistent data (logs, uploads, etc.)
VOLUME ["/app/data", "/app/logs"]

# Environment variables for enterprise configuration
ENV ENTERPRISE_MODE=true
ENV LOG_LEVEL=info
ENV MAX_REQUEST_SIZE=10mb
ENV RATE_LIMIT_WINDOW=900000
ENV RATE_LIMIT_MAX=1000

# Security headers and CORS configuration
ENV SECURITY_HEADERS=true
ENV CORS_ENABLED=true
ENV HELMET_ENABLED=true

# Monitoring and observability
ENV ENABLE_METRICS=true
ENV ENABLE_TRACING=true
ENV HEALTH_CHECK_ENDPOINT=/api/health

# ==============================
# Documentation
# ==============================

# Document exposed ports and volumes
# Port 3000: Main application server
# Volume /app/data: Persistent application data
# Volume /app/logs: Application logs
# 
# Environment Variables:
# - NODE_ENV: Runtime environment (production/development)
# - PORT: Application port (default: 3000)
# - HOST: Bind address (default: 0.0.0.0)
# - LOG_LEVEL: Logging level (error/warn/info/debug)
# - API_BASE_URL: Base URL for API endpoints
# 
# Health Check:
# - Endpoint: /api/health
# - Interval: 30 seconds
# - Timeout: 10 seconds
# - Retries: 3
#
# Security:
# - Runs as non-root user 'pharma' (UID 1001)
# - Minimal Alpine Linux base image
# - Security scanning in build process
# - Proper signal handling with dumb-init
#
# Usage:
# docker build -t enterprise-pharma-intelligence .
# docker run -p 3000:3000 enterprise-pharma-intelligence