import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { app } from './firebase'
import { getAuth } from "firebase/auth";

import LoginForm from './components/LoginForm'
import FlashcardPage from './components/FlashcardPage';
import CategoryPage from './components/CategoryPage';
import Navbar from './components/Navbar'
import ManagePage from './components/ManagePage'
import './App.css'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const auth = getAuth(app);

function App () {

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    [],
  );

  const [authState, setAuthState] = useState({
    email: '',
    password: '',
    currentUser: null,
    message: '',
    showPassword: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        setAuthState({
          currentUser: auth.currentUser
        })
      } else {
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>

        <Navbar authState={authState} setAuthState={setAuthState}/>
        
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Routes>
              <Route path="/" element={ <div>
                <h1>Welcome to Flashcard app</h1>
                <Button component={Link} to="/category">flashcard</Button>
                <Button component={Link} to="/manage">manage</Button>
              </div> }/>
              <Route path="/login" element={
                <LoginForm authState={authState} setAuthState={setAuthState}/>
              } />
              <Route path="/category" element={
                <CategoryPage/>
              } />
              <Route path="/category/:categoryName" element={
                <FlashcardPage authState={authState}/>
              } />
              <Route path="/manage" element={
                <ManagePage/>
              } />
            </Routes>
          </Grid> 
        </Container>
      </Router>
      </ThemeProvider>
    </div>
  )

}

export default App