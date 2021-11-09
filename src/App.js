import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import {app, db} from './firebase'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute';
import FlashcardPage from './components/FlashcardPage';
import './App.css'

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const auth = getAuth(app);

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

  const logout = async (e) => {
    e.preventDefault()
    await signOut(auth).then(response => {
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

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       setAuthState({
  //         currentUser: user
  //       })
  //     }
  //   })
  // }, []);

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
              variant="h3" 
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
        
        <Container maxWidth="sm">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Routes>
              <Route exact path="/" element={ <div>
                <h1>Welcome to Flashcard app</h1>
                <Button component={Link} to="/flashcard">flashcard</Button>
              </div> }/>
              <Route exact path="/login" element={
                  <LoginForm authState={authState} setAuthState={setAuthState}/>
              } />
              <Route exact path="/flashcard" element={
                <PrivateRoute>
                  <FlashcardPage authState={authState}/>
                </PrivateRoute>
              } />
            </Routes>
          </Grid> 
        </Container>
      </Router>
    </div>
  )

}

export default App