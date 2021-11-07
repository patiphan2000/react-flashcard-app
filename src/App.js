import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
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
import MenuIcon from '@mui/icons-material/Menu';


function App (){

  const [authState, setAuthState] = useState({
    email: '',
    password: '',
    currentUser: null,
    message: '',
    showPassword: false,
  });

  const user = authState.currentUser;

  const logout = (e) => {
    e.preventDefault()
    auth.signOut().then(response => {
      setAuthState({
        currentUser: null
      })
    })
  }

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
              <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                FlashCard
              </Typography>
              {
                user != null?
                <Button color="inherit" onClick={logout}>Logout</Button>
                :
                <Button component={Link} to="/login" color="inherit">Login</Button>
              }
            </Toolbar>
          </AppBar>
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