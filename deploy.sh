#!/bin/bash

# LykligLivs Deployment Script

set -e

echo "🚀 Starting LykligLivs deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Creating backend .env file from example...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}Please update backend/.env with your production values${NC}"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo -e "${YELLOW}Creating frontend .env file from example...${NC}"
    cp frontend/.env.example frontend/.env.local
    echo -e "${YELLOW}Please update frontend/.env.local with your production values${NC}"
fi

# Install backend dependencies
echo -e "${GREEN}Installing backend dependencies...${NC}"
cd backend
npm ci --production
cd ..

# Install frontend dependencies (skip build for now due to Vite issue)
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm ci || echo -e "${RED}Frontend dependencies installation failed - proceeding anyway${NC}"
cd ..

# Test backend
echo -e "${GREEN}Testing backend...${NC}"
cd backend
timeout 10s npm start &
BACKEND_PID=$!
sleep 3

# Check if backend is responding
if curl -s http://localhost:5000 > /dev/null; then
    echo -e "${GREEN}✅ Backend is working!${NC}"
else
    echo -e "${RED}❌ Backend test failed${NC}"
fi

# Kill backend test process
kill $BACKEND_PID 2>/dev/null || true
cd ..

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update environment variables in backend/.env"
echo "2. Fix frontend build issue (see DEPLOYMENT.md)"
echo "3. Deploy using docker-compose up -d"
echo ""
echo -e "${GREEN}To start the backend:${NC}"
echo "cd backend && npm start"