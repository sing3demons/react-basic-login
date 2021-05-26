import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import swal from 'sweetalert'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Signin = () => {
  const classes = useStyles()
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const loginUser = async (credentials) => {
    const { data } = await axios.post('/auth/login', credentials)
    return data
  }

  const getProfile = async (token) => {
    const { data } = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    localStorage.setItem('user', JSON.stringify(data['user']))
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await loginUser({
      email: username,
      password,
    })
    // console.log(data)

    if (data.code === 200) {
      await swal('Success', 'success', 'success', {
        buttons: false,
        timer: 2000,
      })

      localStorage.setItem('accessToken', data['token'])

      await getProfile(localStorage.getItem('accessToken'))

      window.location.href = '/profile'
      // await history.push('/profile')
    } else {
      swal('Failed', data.message, 'error')
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Signin
