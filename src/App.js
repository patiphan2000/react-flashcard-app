import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { app } from './firebase'
import { getAuth } from "firebase/auth";

import LoginForm from './containers/Login/LoginForm'
import FlashcardPage from './containers/Flashcard/FlashcardPage';
import CategoryPage from './containers/Category/CategoryPage';
import Navbar from './components/Layout/Navbar'
import ManagePage from './containers/Manage/ManagePage'
import Footer from './components/Layout/Footer';
import './App.css'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const auth = getAuth(app);

function App () {

  const [useLightTheme, setUseLightTheme] = useState(false);

  const [authState, setAuthState] = useState({
    email: '',
    password: '',
    currentUser: null,
    message: '',
    showPassword: false,
  });

  const lightTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    [],
  );
  
  const darkTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    [],
  );

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
      <ThemeProvider theme={useLightTheme? lightTheme:darkTheme}>
      <CssBaseline />
      <Router>

        <Grid sx={{ height: '10vh' }}>
          <Navbar authState={authState} setAuthState={setAuthState} currentTheme={useLightTheme} setTheme={setUseLightTheme}/>
        </Grid>

        <Container sx={{ minHeight: "100vh" }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
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
        <Footer/>
      </Router>
      </ThemeProvider>
    </div>
  )

}

export default App