import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../types'
import * as api from '../services/api'

interface ProductsState {
  items: Product[]
  featured: Product[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    priceRange: [number, number]
    searchTerm: string
  }
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    searchTerm: '',
  },
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.getProducts()
  return response.data
})

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async () => {
  const response = await api.getFeaturedProducts()
  return response.data
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        searchTerm: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload
      })
  },
})

export const { setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer