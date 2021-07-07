import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
// import Book from './component/Book';
import ListGroup from "react-bootstrap/ListGroup";


// const serverUrl = process.env.PORT;


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userEmail: '',
      booksData: [],
      addNewBook: '',
      newBookName: '',
      newBookDesc: '',
      newBookstatus: '',
    }
  }

  //================================================

  inputEmail = (e) => {
    this.setState({
      userEmail: e.target.value
    })
  }

  //================================================

  onClickSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/books?email=${this.state.email}`).then(response => {
      this.setState({
        booksData: response.data.books

      })
    })
  }
  //================================================

  // deleteBook = async (index) => {
  //   console.log(index);

  //   const newArrayOfBooks = this.state.books.filter((book, i) => {
  //     return i !== index;
  //   });
  //   console.log(newArrayOfBooks);
  //   this.setState({
  //     books: newArrayOfBooks
  //   });
  //   const { user } = this.props.auth0;
  //   const query = {
  //     email: user.email
  //   }
  //   console.log('app', query);
  //   await axios.delete(`http://localhost:8000/book/${index}`, { params: query })

  // }

  //================================================

  addBook = async(e) => {
      this.setState({
      addNewBook: e.target.value
    })
  }

  //================================================

  submitBooks = (e) => {
    e.preventDefault();
    this.setState({
      newBookName: e.target.book.value
    })
    console.log(this.state.newBookName)
    const reqBody = {
      userEmail: this.state.userEmail,
      name: this.state.newBookName
    }
    { console.log(this.state.newBookName) }

    axios.post(`http://localhost:8000/create_book`, reqBody).then(response => {
      console.log(response.data)
      this.setState({
        booksData: response.data.books
      })
    }).catch(error => alert(error.message))

  }
  //================================================

  

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <form >
            <input type="text" placeholder="Email" onChange={(e) => { this.inputEmail(e) }} />
            <button onClick={(e) => { this.onClickSearch(e) }} > Search </button> <br></br>

          </form>

          <form onSubmit={(e) => { this.submitBooks(e) }} >
            <input name='book' type="text" placeholder="Book Name" onChange={(e) => { this.addBook(e) }} />
            <button> Add Book </button>
            <button onClick={(e) => { this.deleteBook(e) }}> Delete </button>
          </form>

          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <div>
          {this.state.booksData.map(book => {
            return <ListGroup.Item>
              <h2> {book.name}</h2>
            </ListGroup.Item>
          })
          }

        </div>
      </>
    )
  }
}

export default MyFavoriteBooks;
