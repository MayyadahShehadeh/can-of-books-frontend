import React, { Component } from 'react'
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginButton from './component/LoginButton'
import Profile from './component/Profile';
import BestBooks from './BestBooks';
import {withAuth0} from "@auth0/auth0-react"



class App extends Component {

  render() {
    console.log('app', this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

                {this.props.auth0.isAuthenticated === true ? <BestBooks/> : <LoginButton />}

              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

              <Route exact path="./profile">
                <Profile />
              </Route>


            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0( App);