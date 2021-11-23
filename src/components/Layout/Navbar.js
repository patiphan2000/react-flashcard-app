import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { app } from '../../firebase'
import { getAuth, signOut } from "firebase/auth";

import UseSwitchesCustom from '../UseSwitchCustom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'


const auth = getAuth(app)

function Navbar({ authState, setAuthState }) {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const user = authState.currentUser

  const isMenuOpen = Boolean(anchorEl);

  const logout = async (e) => {
      e.preventDefault()
      await signOut(auth).then(response => {
        setAuthState({
          currentUser: null
        })
        setAnchorEl(false)
        navigate('/login')
      })
  }

  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
      };
  
      const handleMenuClose = () => {
      setAnchorEl(null);
      };

  const menuId = 'primary-search-account-menu';
  
  const renderMenu = (
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
        <MenuItem>
          <UseSwitchesCustom/>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
            align="left"
            variant="h4" 
            component="div"
            onClick={()=>{ navigate("/") }}
            sx={{ flexGrow: 1, cursor: 'pointer' }}>
              FlashCard
            </Typography>
            {
              user != null?
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              :
              <Button component={Link} to="/login" color="inherit">Login</Button>
            }
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
  )
}

export default Navbar
