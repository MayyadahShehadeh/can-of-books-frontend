import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Book from './component/Book';

const serverUrl = process.env.REACT_APP_SERVER_URL;


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
        userEmail: this.props.auth0.user.email,
        booksData: []
    }
}

componentDidMount = async () => {
  await axios.get(`${serverUrl}/books?email=${this.state.userEmail}`).then(response => {
           this.setState({
          booksData: response.data[response.data.length-1].books,
      })
  }).catch(error => alert(error))
}

  render() {
    return(
      <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      <div>
                {
                    this.state.booksData.length > 0 &&
                    <Book
                        booksData={this.state.booksData}
                    />
                }
            </div>
 
      </>
    )
  }
}

export default MyFavoriteBooks;
