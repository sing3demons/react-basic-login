import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './component/Signin'
import Profile from './component/Profile'

function App() {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Signin />
  }

  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
