import React, { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchProducts, setFilters } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { items, loading, error, filters } = useSelector((state: RootState) => state.products)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  // Filter products based on current filters
  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    dispatch(setFilters({ searchTerm: value }))
  }

  const handleCategoryChange = (event: any) => {
    dispatch(setFilters({ category: event.target.value }))
  }

  const categories = [...new Set(items.map(product => product.category))]

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading products: {error}
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: 250 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No products found matching your criteria.
        </Typography>
      )}
    </Box>
  )
}

export default Products