import React, { useEffect } from 'react'
import {
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Paper,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { fetchFeaturedProducts } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { featured, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchFeaturedProducts() as any)
  }, [dispatch])

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: 'white',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to LykligLivs
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Your happiness, our mission. Discover products that bring joy to your life.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/products"
              sx={{ mt: 3 }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Featured Products */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {featured.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        {featured.length === 0 && !loading && (
          <Typography variant="body1" align="center" color="text.secondary">
            No featured products available at the moment.
          </Typography>
        )}
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              🚚 Free Shipping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Free shipping on orders over $50
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              🔒 Secure Payment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your payment information is safe with us
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              📞 24/7 Support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We're here to help whenever you need us
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home