import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { app } from './firebase'
import { getAuth } from "firebase/auth";

import LoginForm from './containers/Login/LoginForm'
import FlashcardPage from './containers/Flashcard/FlashcardPage';
import CategoryPage from './containers/Category/CategoryPage';
import Navbar from './components/Layout/Navbar'
import ManagePage from './containers/Manage/ManagePage'
import './App.css'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const auth = getAuth(app);

function App () {

  const [useLightTheme, setUseLightTheme] = useState(true);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: useLightTheme? 'light':'dark',
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

        <Navbar authState={authState} setAuthState={setAuthState} setTheme={setUseLightTheme}/>
        
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Routes>
              <Route path="/" element={ 
                // <div>
                //   <h1>Welcome to Flashcard app</h1>
                //   <Button component={Link} to="/category">flashcard</Button>
                //   <Button component={Link} to="/manage">manage</Button>
                // </div> 
                <CategoryPage/>
              }/>
              <Route path="/login" element={
                <LoginForm authState={authState} setAuthState={setAuthState}/>
              } />
              <Route path="/category" element={
                <CategoryPage/>
              } />
              <Route path="/category/:message" element={
                <CategoryPage/>
              } />
              <Route path="/flashcard/:categoryName" element={
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