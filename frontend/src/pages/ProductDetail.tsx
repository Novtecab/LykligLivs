import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addToCart } from '../store/cartSlice'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.items)
  
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <Typography variant="h6" align="center">
        Product not found
      </Typography>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <Box
            component="img"
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Typography variant="h4" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Availability: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
            {product.stock > 0 && (
              <Typography variant="body2" color="text.secondary">
                {product.stock} items available
              </Typography>
            )}
          </Box>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductDetail