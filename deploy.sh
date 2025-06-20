#!/bin/bash

# Military Asset Management System - Production Deployment Script
echo "🚀 Starting Military Asset Management System Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Build and deploy with Docker Compose
echo "📦 Building and deploying with Docker Compose..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo "📋 Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=20

echo "✅ Deployment completed successfully!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔗 Backend API: http://localhost:3001"
echo "📊 Health Check: http://localhost:3001/health" 