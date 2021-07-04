import React from "react";
import { withAuth0 } from "@auth0/auth0-react";


 class Profile extends Component {
  render() {
      return (
          <div>
              {
                  this.props.auth0.isAuthenticated&&
                  <>
                  <h1>{this.props.auth0.user.name}</h1>
                  <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name}/>
                  </>

              }
              
          </div>
      )
  }
}


export default withAuth0(Profile);
