import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import auth from './firebase'

import LoginForm from './components/LoginForm'
import './App.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';


function App (){

  const [anchorEl, setAnchorEl] = useState(null);
  const [authState, setAuthState] = useState({
    email: '',
    password: '',
    currentUser: null,
    message: '',
    showPassword: false,
  });

  const isMenuOpen = Boolean(anchorEl);

  const user = authState.currentUser;

  const logout = (e) => {
    e.preventDefault()
    auth.signOut().then(response => {
      setAuthState({
        currentUser: null
      })
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
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className="App">
      <Router>

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
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 2 }}>
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
        
        <Routes>
          <Route exact path="/" element={ <p>main page</p> }/>
          <Route exact path="/login" element={
              <LoginForm authState={authState} setAuthState={setAuthState}/>
          } />
        </Routes>
      </Router>
    </div>
  )

}

export default App