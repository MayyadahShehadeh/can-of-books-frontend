import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Book from './component/Book';

// const serverUrl = process.env.PORT;


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userEmail: '',
      booksData: []
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

    axios.get('http://localhost:8000/books?email=bardaweel95.rawan@gmail.com').then(response => {
      this.setState({
        booksData: response.data
        
      })
      
      console.log(response.data)
    })

  }

  render() {
    return (
      <>
      {console.log('100')}
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <form >
            <input type="text" placeholder="Email" onChange={(e) => { this.inputEmail(e) }} />
            <button onClick={(e) => { this.onClickSearch(e) }} > Search </button>

          </form>
          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <div>
          {/* {console.log('hiii',booksData)} */}
          
          {this.state.booksData.map(book => {
            return <li><Book bookName={book.name} /></li>
          })
          }

        </div>
      </>
    )
  }
}

export default MyFavoriteBooks;
