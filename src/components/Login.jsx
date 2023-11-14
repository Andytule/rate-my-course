import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LoginImage from '../assets/login-image.jpg'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar';


const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: '', password: '', school: '' })
  const [viewState, setViewState] = useState(true)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const loginHandler = () => {
    if (details.email && details.password) {
      axios.post('http://localhost:80/api/login.php', details)
        .then((res) => {
          if (res.data.status) {
            sessionStorage.setItem("id", res.data?.user?.id)
            sessionStorage.setItem("role_id", res.data?.user?.role_id)
            sessionStorage.setItem('email', res.data?.user?.email);
            navigate('/RateACourse')
          } else {
            setMessage('Invalid Login Credentials')
            setOpen(true)
          }
        })
    } else {
      setMessage('Invalid Login Credentials')
      setOpen(true);
    }
  }

  const createHandler = () => {
    if (details.email && details.password) {
      axios.post('http://localhost:80/api/userExists.php', details)
        .then((res) => {
          if (res.data.status !== 1) {
            axios.post('http://localhost:80/api/create.php', details)
              .then((res) => {
                console.log(res)
                setMessage('User Created')
                setOpen(true);
              })
          }
          else {
            setMessage('User already exists')
            setOpen(true);
          }
        })
    } else {
      setMessage('Invalid Login Credentials')
    }
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const submitHandler = e => {
    e.preventDefault()

    viewState ? loginHandler() : createHandler()
  }


  return (
    <div>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <img alt='Login Background' src={LoginImage} style={{ height: '100%', objectFit: 'cover', width: '100%' }} />
        </Grid>
        <Grid
          alignItems='center'
          container
          item
          justifyContent='space-between'
          sm={6}
          style={{ padding: 10 }}
          xs={12}>
          <div></div>
          <form onSubmit={submitHandler}>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
              <Grid container justifyContent='center'>
                {viewState
                  ? <AccountCircleIcon fontSize='large' />
                  : <PersonAddIcon fontSize='large' />
                }

              </Grid>
              <TextField label='Email' margin='normal' variant='standard' onChange={e => setDetails({ ...details, email: e.target.value })} />
              <TextField label='Password' margin='normal' type='password' variant='standard' onChange={e => setDetails({ ...details, password: e.target.value })} />
              <div style={{ height: 20 }} />
              <Button color='primary' variant='contained' type='submit'>
                {viewState
                  ? 'Log In'
                  : 'Create Account'
                }
              </Button>
              <div style={{ height: 20 }} />
              <Button onClick={() => setViewState(current => !current)}>
                {viewState
                  ? 'Sign up now'
                  : 'Have an account? Login.'
                }
              </Button>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={message}
            />
          </form>
          <div></div>
        </Grid>
      </Grid>
    </div >
  )
}

export default Login