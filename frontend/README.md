# LykligLivs Frontend

React TypeScript frontend for the LykligLivs online store.

## Features

- Modern React with TypeScript
- Material-UI for beautiful components
- Redux Toolkit for state management
- React Router for navigation
- Responsive design
- Shopping cart functionality
- User authentication
- Product catalog with search and filtering
- Checkout with payment processing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # Redux store and slices
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main app component
└── main.tsx       # App entry point
```