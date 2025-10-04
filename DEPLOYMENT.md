# LykligLivs Deployment Guide

## Quick Deploy with Docker

### Prerequisites
- Docker and Docker Compose installed
- MongoDB instance (local or cloud)
- Stripe account for payment processing

### Environment Setup

1. Copy environment files:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

2. Update the environment variables in both files with your production values.

### Backend Deployment

#### Option 1: Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

#### Option 2: Manual Backend Deployment
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend Deployment

#### Current Issue
There's a build configuration issue with Vite that needs to be resolved. 

#### Temporary Workaround
1. Use the existing built files in `frontend/dist/` if available
2. Or serve the development version temporarily:
```bash
cd frontend
npm install
npm run dev
```

#### Fix for Vite Issue
The frontend build is failing due to Vite binary not being found. This can be resolved by:
1. Updating Node.js version compatibility
2. Reinstalling dependencies with correct package manager
3. Or switching to a different build tool like Webpack

### Production Checklist

- [ ] Update JWT_SECRET to a strong, unique value
- [ ] Configure production MongoDB URI
- [ ] Add production Stripe keys
- [ ] Set up SSL certificates
- [ ] Configure domain DNS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test payment processing in production

### Hosting Recommendations

**Backend:**
- Heroku, Railway, or DigitalOcean App Platform
- AWS EC2 with PM2 for process management
- Docker containers on any cloud provider

**Frontend:**
- Netlify or Vercel (once build issue is fixed)
- AWS S3 + CloudFront
- GitHub Pages (for static deployment)

**Database:**
- MongoDB Atlas (recommended)
- Self-hosted MongoDB on cloud VPS

### Quick Commands

```bash
# Start development environment
npm run dev:frontend &
npm run dev:backend

# Build for production (backend only, until frontend is fixed)
cd backend && npm run start

# Check application health
curl http://localhost:5000/api/health
```