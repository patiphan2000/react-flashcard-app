import React, { useState } from 'react'
import auth from '../firebase'
import { Navigate, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Stack  from '@mui/material/Stack';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginForm ({authState, setAuthState}) {
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    // console.log(name, value);
    var authData = authState
    authData[name] = value
    setAuthState(authData)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const email = authState.email
    const password = authState.password
    
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setAuthState({
          currentUser: response.user
        })
        navigate(-1)
      })
      .catch(error => {
        setAuthState({
          message: error.message
        })
      })
  }

  const logout = (e) => {
    e.preventDefault()
    auth.signOut().then(response => {
      setAuthState({
        currentUser: null
      })
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const { message, currentUser } = authState

  return (
    <div>
    { currentUser != null?
      <Navigate to="/" />
      :
      <section className="section container">
        <p>{authState.email}</p>
        <Box
          component="form"
          sx={{
            flexDirection: 'column',
            '& .MuiAlert-root': { m: 1, width: '25ch' },
            '& .MuiButton-root': { m: 1, width: '10ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="email"
              type='email'
              onChange={onChangeHandler}
              name='email'
              label="Email"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={onChangeHandler}
              name='password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword? <VisibilityOffIcon/> : <VisibilityIcon/>}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {message ? <Alert severity="warning">{message}</Alert> : null}
          <Button variant="contained" onClick={onSubmitHandler}>
            Submit
          </Button>
          </Stack>
        </Box>
      </section>
    }
    </div>
  )
}


export default LoginForm