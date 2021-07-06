import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './component/Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from "@auth0/auth0-react"
import Login from './Login';




class App extends Component {

  render() {
    console.log('app', this.props.auth0);
    return (
      
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

                {this.props.auth0.isAuthenticated? <BestBooks/> : <Login />}

              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

             <Route exact path="/profile">{
                this.props.auth0.isAuthenticated ?
                  <Profile/> : ''}
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