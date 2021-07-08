import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron , Card} from 'react-bootstrap/';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react'
import ListGroup from "react-bootstrap/ListGroup";
import AddBookBtn from './component/AddBookBtn';
import DeleteBookBtn from './component/DeleteBookBtn';
import UpdateButton from './component/UpdateButton';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // userEmail: '',
      booksData: [],
      // addNewBook: false,
      name: '',
      description: '',
      status: '',
    }
  }

  
  componentDidMount(){
    this.getBooks();
  }
  
  // ===========================================================

  getBooks=async ()=>{

  const {user}=this.props.auth0;
  const urlBooks =`${process.env.REACT_APP_BACKEND_URL}/books?email=${user.email}`;
  const reqBook= await axios.get(urlBooks);

  this.setState({
    booksData:reqBook.data.books
  })
}

getName=(e)=>{
  e.preventDefault();
  this.setState({
    name:e.target.value
  })
}

// ===========================================================

getDescription = (e) => {
  console.log(e.target.value);
  e.preventDefault();
  this.setState({
    description: e.target.value
  })
}
// ===========================================================
getStatus = (e) => {
  e.preventDefault();
  this.setState({
    status: e.target.value
  })
}
// ===========================================================
 //add books
 addBook = async (e) => {
  e.preventDefault();
  const { user } = this.props.auth0;
  const bookData = {
    name: this.state.name,
    description: this.state.description,
    status: this.state.status,
    email: user.email
  }
  
  const addBookURL = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_book`, bookData);
  

  this.setState({
    booksData: addBookURL.data
  })
}

 // ===========================================================
  //delete books
  deleteBook = async (book_idx) => {
    let { user } = this.props.auth0;

    let queryEmail = {
      userEmail: user.email
    }
    let deleteBookURL = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_books/${Number(book_idx)}`, { params: queryEmail });

    this.setState({
      booksData: deleteBookURL.data
    })
  }

  // ===========================================================
  updateBook = async (e, index) => {
    e.preventDefault();

    const { user } = this.props.auth0;
    const bookData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: user.email
    }

    const updateBookURL = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update_book/${index}`, bookData);

    this.setState({
      booksData: updateBookURL.data
    })
  }
 
  

  render() {
    return (
      <>
       

        <Jumbotron>
          <h1>My Favorite Books</h1>
          {/* <form >
            <input type="text" placeholder="Email" onChange={(e) => { this.inputEmail(e) }} />
            <button onClick={(e) => { this.onClickSearch(e) }} > Search </button> <br></br>
          </form>
          <br /> */}

          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
     

          
          <AddBookBtn
            getName={this.getName}
            getDescription={this.getDescription}
            getStatus={this.getStatus}
            addBook={this.addBook}
          />
        

          {this.state.booksData.map((book, index) => {
            
            <Card className='cardBook' key={index} id={index}>
            <Card.Body >
              <Card.Title>Book name: {book.name}</Card.Title>
              <Card.Text>Description: {book.description}</Card.Text>
              <Card.Text>Status: {book.status}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <DeleteBookBtn 
                deleteBook={this.deleteBook}
                index={index}
              />
              <div className="space"></div>
              <UpdateButton key={index} id={index}
                getName={this.getName}
                getDescription={this.getDescription}
                getStatus={this.getStatus}
                updateBook={this.updateBook}
                index={index}
                bookName= {book.name}
              />
            </Card.Footer>
            </Card>

          })
          }



     
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);

// ===========================================================


  // submitBooks = (e) => {
  //   e.preventDefault();
  //   // console.log(e.target)

  //   this.setState({
  //     newBookName: e.target.book.value
  //   })
  //   console.log(this.state.newBookName)
  //   let reqBody = {
  //     userEmail: this.state.userEmail,
  //     name: this.state.newBookName,
  //     bookDesc: this.state.newBookDesc,
  //     bookStatus: this.state.newBookStatus
  //   }
  //   { console.log(this.state.newBookName) }

  //   axios.post(`http://localhost:8000/books`, reqBody).then(response => {
  //     console.log(response.data)
  //     this.setState({
  //       booksData: response.data.books
  //     })
  //   }).catch(error => alert(error.message))

  // }
 
  // inputEmail = (e) => {
  //   this.setState({
  //     userEmail: e.target.value
  //   })
  // }

  // //================================================

  // onClickSearch = (e) => {
  //   e.preventDefault();
  //   axios.get(`http://localhost:8000/books?email=${this.state.email}`).then(response => {
  //     this.setState({
  //       booksData: response.data.books

  //     })
  //   })
  // }