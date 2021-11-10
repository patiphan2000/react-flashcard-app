import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { app } from './firebase'
import { getAuth, signOut } from "firebase/auth";

import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute';
import FlashcardPage from './components/FlashcardPage';
import CategoryPage from './components/CategoryPage';
import Navbar from './components/Navbar'
import ManageRouter from './components/ManageRouter';
import './App.css'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const auth = getAuth(app);

function App (){

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
      <Router>

        <Navbar authState={authState} setAuthState={setAuthState}/>
        
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
                <Button component={Link} to="/category">flashcard</Button>
                <Button component={Link} to="/manage/French">manage</Button>
              </div> }/>
              <Route exact path="/login" element={
                  <LoginForm authState={authState} setAuthState={setAuthState}/>
              } />
              <Route exact path="/category" element={
                <PrivateRoute>
                  <CategoryPage/>
                </PrivateRoute>
              } />
              <Route exact path="/category/:categoryName" element={
                <PrivateRoute>
                  <FlashcardPage authState={authState}/>
                </PrivateRoute>
              } />
              <Route exact path="/manage/:categoryName/:add" element={
                <PrivateRoute>
                  <ManageRouter/>
                </PrivateRoute>
              } />
              <Route exact path="/manage/:categoryName" element={
                <PrivateRoute>
                  <ManageRouter/>
                </PrivateRoute>
              } />
              <Route exact path="/manage" element={
                <PrivateRoute>
                  <ManageRouter/>
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