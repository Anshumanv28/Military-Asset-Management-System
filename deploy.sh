#!/bin/bash

echo "Starting Military Asset Management System Deployment..."

if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

export NODE_ENV=production

echo "Building and deploying with Docker Compose..."
docker-compose -f docker-compose.prod.yml up --build -d

echo "Waiting for services to be ready..."
sleep 30

echo "Checking service health..."
docker-compose -f docker-compose.prod.yml ps

echo "Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=20

echo "Deployment completed successfully!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001"
echo "Health Check: http://localhost:3001/health" 