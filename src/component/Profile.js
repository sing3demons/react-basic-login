import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}))

export default function Profile() {
  const classes = useStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const user = JSON.parse(localStorage.getItem('user'))

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    history.goBack()
    // window.location.href = '/'
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={user.avatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar src={user.avatar} className={classes.large} />
          <Typography variant="h5">Welcome {user.name}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
