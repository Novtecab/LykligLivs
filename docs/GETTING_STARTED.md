# Getting Started with LykligLivs

This guide will help you set up and run the LykligLivs e-commerce platform locally.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas connection)
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd LykligLivs
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Stripe keys

# Start the backend server
npm run dev
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Ensure VITE_API_URL points to your backend

# Start the development server
npm run dev
```

The frontend will run on http://localhost:3000

### 4. Seed Sample Data (Optional)

```bash
cd backend
node seed.js
```

This will populate your database with sample products.

## Project Structure

```
LykligLivs/
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Node.js Express API
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── middleware/       # Express middleware
│   ├── controllers/      # Route controllers
│   ├── config/           # Configuration files
│   └── package.json
├── docs/                 # Documentation
└── README.md
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lykliglivs
JWT_SECRET=your-secure-jwt-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- Verify firewall settings allow connections

### Port Conflicts
- Change ports in .env files if 3000 or 5000 are already in use

### Module Not Found Errors
- Delete node_modules and package-lock.json, then run `npm install`

## Next Steps

1. Configure Stripe with your test keys for payment processing
2. Set up MongoDB Atlas for production database
3. Deploy to your preferred hosting platform
4. Add more products through the API or admin interface
5. Customize the design and branding

## Support

For issues or questions, check the documentation in the `docs/` folder or create an issue in the repository.