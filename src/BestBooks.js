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

  // componentDidMount = async () => {
  //   await axios.get(`${serverUrl}/books?email=${this.state.userEmail}`).then(response => {
  //            this.setState({
  //           booksData: response.data[response.data.length-1].books,
  //       })
  //   }).catch(error => alert(error))
  // }

  inputEmail = (e) => {
    this.setState({
      userEmail: e.target.value
    })


  }
  onClickSearch = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8000/books?email=${this.state.email}`).then(response => {
      this.setState({
        booksData: response.data.books

      })

      // console.log(response.data)
    })

  }

  addBook = (e) => {
    // console.log(e.target.value)
    this.setState({
      addNewBook: e.target.value

    })

  }

  submitBooks = (e) => {
    e.preventDefault();
    // console.log(e.target)

    this.setState({
      newBookName:e.target.book.value
    })
    console.log(this.state.newBookName)
    const reqBody = {
      userEmail: this.state.userEmail,
      name: this.state.newBookName
      // bookDesc:this.state.newBookDesc,
      // bookStatus:this.state.newBookstatus
    }
    { console.log(this.state.newBookName) }

    axios.post(`http://localhost:8000/books`, reqBody).then(response => {
      console.log(response.data)
      this.setState({
        booksData: response.data.books
      })
    }).catch(error => alert(error.message))

  }
  render() {
    return (
      <>
        {/* {console.log(this.state.addNewBook)} */}

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <form >
            <input type="text" placeholder="Email" onChange={(e) => { this.inputEmail(e) }} />
            <button onClick={(e) => { this.onClickSearch(e) }} > Search </button> <br></br>

          </form>

          <form onSubmit={(e) => { this.submitBooks(e) }} >
            <input name='book' type="text" placeholder="Book Name" onChange={(e) => { this.addBook(e) }} />
            <button> Add Book </button>

          </form>

          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <div>
          {/* {console.log('hiii',booksData)} */}

          {this.state.booksData.map(book => {
            return <ListGroup.Item>
              <h2> {book.name}</h2>

              {/* <p>{'book description :'+ book.description} </p> */}
              {/* <h5>{'status :'+ book.status}</h5> */}
            </ListGroup.Item>
          })
          }

        </div>
      </>
    )
  }
}

export default MyFavoriteBooks;
