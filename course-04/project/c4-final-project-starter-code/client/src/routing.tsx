import React, { Component } from 'react'
import Auth from './auth/Auth'
import { Router, Route, Routes } from 'react-router-dom'
import Callback from './components/Callback'
// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory, History } from 'history'
const history = createBrowserHistory()

const auth = new Auth(history)

// const handleAuthentication = (props: any) => {
//   const location = props.location
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication()
//   }
// }

export const makeAuthRouting = () => {
  return (
    <Routes>
      <Router location={''} navigator={history}>
        <div>
          <Route
            path="/callback"
            element={<Callback />}
            // element={(props) => {
            //   handleAuthentication(props)
            //   return <Callback />
            // }}

            // element={  <Callback />}
          />
        </div>
      </Router>
    </Routes>
  )
}
