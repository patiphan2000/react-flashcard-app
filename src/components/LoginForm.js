import React from 'react'
import auth from '../firebase'

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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      currentUser: null,
      message: '',
      showPassword: false,
    }
  }

  onChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  logout = (e) => {
    e.preventDefault()
    auth.signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  render() {

    const { message, currentUser } = this.state

    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    }

    return (
      <section className="section container">
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
              onChange={this.onChange}
              name='email'
              label="Email"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.onChange}
              name='password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {this.state.showPassword? <VisibilityOffIcon/> : <VisibilityIcon/>}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {message ? <Alert severity="warning">{message}</Alert> : null}
          <Button variant="contained" onClick={this.onSubmit}>
            Submit
          </Button>
          </Stack>
        </Box>
      </section>
    )
  }
}

export default LoginForm