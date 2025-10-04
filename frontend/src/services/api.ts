import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Products API
export const getProducts = () => api.get('/products')
export const getFeaturedProducts = () => api.get('/products/featured')
export const getProduct = (id: string) => api.get(`/products/${id}`)

// Auth API
export const login = (credentials: { email: string; password: string }) =>
  api.post('/auth/login', credentials)

export const register = (userData: { email: string; password: string; firstName: string; lastName: string }) =>
  api.post('/auth/register', userData)

// Orders API
export const createOrder = (orderData: any) => api.post('/orders', orderData)
export const getOrders = () => api.get('/orders')

// Payment API
export const createPaymentIntent = (amount: number) =>
  api.post('/payments/create-intent', { amount })

export default api