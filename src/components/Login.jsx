import React from 'react'
import LoginImage from '../assets/login-image.jpg'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'


const Login = () => {
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
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}>
            <Grid container justifyContent='center'>
              <AccountCircleIcon fontSize='large' />
            </Grid>
            <TextField label='Email' margin='normal' variant='standard' />
            <TextField label='Password' margin='normal' type='password' variant='standard' />
            <div style={{ height: 20 }} />
            <Button color='primary' variant='contained'>
              Log in
            </Button>
            <div style={{ height: 20 }} />
            <Button>Sign up now</Button>
          </div>
          <div></div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login