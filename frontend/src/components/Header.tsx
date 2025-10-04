import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material'
import { ShoppingCart, AccountCircle } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { toggleCart } from '../store/cartSlice'
import { logout } from '../store/userSlice'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const { isAuthenticated, currentUser } = useSelector((state: RootState) => state.user)
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          LykligLivs
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout ({currentUser?.firstName})
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
          
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header