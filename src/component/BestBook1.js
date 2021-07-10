import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import FormBook from './FormBook';
import axios from 'axios';
// import Book from './Book';
// import ListGroup from "react-bootstrap/ListGroup";


class MyFavoriteBooksList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userEmail: '',
      booksData: [],
      name:'',
      description: '',
      status: '',

    }
  }
  componentDidMount = async () => {

    this.getBooks();
}

getBooks = async () => {
    const user = this.props.auth0;
    const urlBooks = 'http://localhost:8000/books?email=bardaweel95.rawan@gmail.com';
    const reqBook = await axios.get(urlBooks);
    this.setState({
        booksData: reqBook.data.books
    })
    console.log(this.state.booksData);
}


  render() {
    return (
      <>
        <Jumbotron>
          <h1 style={{ fontFamily: 'cursive' }}>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <FormBook />
        </Jumbotron>
        {/* <div>
        {this.state.booksData.map(book => {
           return <ListGroup.Item>
              <h3> {book.name}</h3>
              <h3> {book.description}</h3>
              <h3> {book.status}</h3>
             </ListGroup.Item>
         })
          }

        </div> */}
        {/* <FormBook/> */}
      </>
    
    )
  }
}

export default withAuth0(MyFavoriteBooksList);