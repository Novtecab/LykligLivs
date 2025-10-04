# LykligLivs Development Guide

## Architecture Overview

LykligLivs is built as a modern full-stack e-commerce application with the following architecture:

- **Frontend**: React 18 with TypeScript, Material-UI, Redux Toolkit
- **Backend**: Node.js with Express, MongoDB with Mongoose
- **Authentication**: JWT-based authentication
- **Payments**: Stripe integration
- **Security**: Helmet, CORS, rate limiting

## Development Workflow

### Adding New Features

1. **Backend First**: Create API endpoints
2. **Frontend Integration**: Connect UI to API
3. **Testing**: Test both frontend and backend
4. **Documentation**: Update API docs

### Code Structure

#### Frontend Components
```typescript
// Component structure
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Component logic
  return <div>JSX</div>
}

export default Component
```

#### Backend Routes
```javascript
// Route structure
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // Route logic
    res.json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
```

### State Management

Redux Toolkit is used for state management with the following slices:
- `cartSlice`: Shopping cart state
- `productsSlice`: Product catalog state
- `userSlice`: User authentication state

### API Integration

All API calls go through the `services/api.ts` file which provides:
- Centralized axios configuration
- Request/response interceptors
- Error handling

## Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (customer/admin),
  addresses: [AddressSchema],
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: Number,
  featured: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  shippingAddress: AddressSchema,
  paymentInfo: PaymentSchema,
  orderStatus: String,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  orderNumber: String,
  createdAt: Date
}
```

## Security Considerations

1. **Authentication**: JWT tokens with secure secrets
2. **Password Hashing**: bcryptjs with salt rounds
3. **Input Validation**: Mongoose schema validation
4. **Rate Limiting**: Express rate limit middleware
5. **CORS**: Configured for frontend domain only
6. **Headers**: Helmet for security headers

## Performance Optimization

1. **Database**: Indexed fields for common queries
2. **Frontend**: Code splitting with React.lazy
3. **Images**: Optimized image loading
4. **Caching**: API response caching where appropriate

## Testing Strategy

### Backend Testing
- Unit tests for models and utilities
- Integration tests for API endpoints
- Load testing for performance

### Frontend Testing
- Component unit tests with React Testing Library
- Integration tests for user flows
- E2E tests with Cypress

## Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection
- [ ] Stripe production keys
- [ ] SSL certificates
- [ ] Domain configuration
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring
- [ ] Backup strategy

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas
- **CDN**: Cloudflare for static assets