import React from 'react'
import {
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Button,
  Divider,
} from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { updateQuantity, removeFromCart } from '../store/cartSlice'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state: RootState) => state.cart)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }))
  }

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId))
  }

  if (items.length === 0) {
    return (
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Paper key={item.product.id} sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Box
                    component="img"
                    src={item.product.imageUrl || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    sx={{
                      width: '100%',
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.product.price.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box textAlign="right">
                    <Typography variant="h6">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemoveItem(item.product.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${total.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              component={Link}
              to="/checkout"
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Cart