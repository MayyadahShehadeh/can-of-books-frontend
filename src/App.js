import React from 'react';
import Header from './Header';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
// import BestBooks from './BestBooks';
import BestBook1 from './component/BestBook1';
import Login from './Login'
// import Profile from './Profile';
import Profile from './component/Profile';
import Footer from './Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
    componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization":`Bearer ${ jwt }`
        },
        method: 'get',
        baseURL: 'http://localhost:8000',
        url: '/authorize'
      }
       axios(config)
        .then(axiosResults => console.log(axiosResults.data))
        .catch(err => console.error(err));
     }).catch(err => console.error(err));
   }
   
}
  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                  this.props.isAuthenticated ?<BestBook1/>:<Login/>

                }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route path="/profile">
                {this.props.auth0.isAuthenticated && <Profile/> }
              </Route>
            </Switch>
            <Footer />

        </Router>
      </>
import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from './component/Profile';
import BestBooks from './BestBooks';
import Login from './Login';
import Footer from './Footer';
import axios from 'axios';


  
class App extends React.Component {
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        const jwt = res.__raw;
        const config = {
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          method: 'get',
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/authorize'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      }).catch(err => console.error(err));
    }

  }
  render() {

    return (

      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login />}

            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

            <Route exact path="/profile">{
              this.props.auth0.isAuthenticated ?
                <Profile /> : ''}
            </Route>


          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>


    );
  }
}

export default withAuth0(App);