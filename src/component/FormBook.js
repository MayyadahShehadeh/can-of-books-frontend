import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import './BestBooks.css';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import UpdateButton from './UpdateButton';
// import ListGroup from "react-bootstrap/ListGroup";

class MyFavoriteBooks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: '',
            booksData: [],
            name: '',
            description: '',
            status: '',
            newBookName: '',
            newBookDesc: '',
            newBookstatus: '',
        }
    }

    //================================================

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

    //================================================

    addName = (e) => {
        (e).preventDefault();
        this.setState({
            newBookName: e.target.value,

        })

    }

    //================================================

    addDescription = (e) => {
        (e).preventDefault();
        this.setState({
            newBookDesc: e.target.value,
        })

    }

    //================================================

    addStatus = (e) => {
        (e).preventDefault();
        this.setState({
            newBookstatus: e.target.value,
        })

    }

    //================================================

    addBook = (e) => {
        e.preventDefault()
        try {

            const reqBody = {
                name: this.state.newNameBook,
                description: this.state.newBookDesc,
                status: this.state.newBookstatus,
                userEmail: this.props.auth0.user.email
            }
            const url = `http://localhost:8000/books`
            axios.post(url, reqBody).then(response => {
                console.log('new data', response.data);
                this.setState({
                    booksData: response.data.books
                })
            })
        } catch {
            console.log('error');
        }
    }
    //================================================

    deleteBook = (book_id) => {
        axios.delete(`http://localhost:8000/books/book_id/?email=${this.props.auth0.user.email}`).then(res => {
            this.setState({
                listBook: res.data.books
            })
        })
    }

    //================================================

    updateBook = async (e, book_idx) => {
        e.preventDefault();
        const reqBody = {
            name: this.state.newNameBook,
            description: this.state.newBookDesc,
            status: this.state.newBookstatus,
            userEmail: this.props.auth0.user.email
        }
        const updateBookURL = await axios.put(`http://localhost:8000/update-books/${book_idx}`, reqBody);
        console.log(updateBookURL.data);
        this.setState({
            booksData: updateBookURL.data.books
        })
    }

    //================================================

    render() {
        return (
            <>

                <form>
                    <input type='text' placeholder='add book' onChange={(e) => { this.addName(e) }} />
                    <input type='text' placeholder='add description' onChange={(e) => { this.addDescription(e) }} />
                    <input type='text' placeholder='add status' onChange={(e) => { this.addStatus(e) }} />
                    <br />
                    <br />
                    <button onClick={(e) => { this.addBook(e) }}>Add Book</button>
                    <br />
                    <br />

                </form>
                <ol>
                    {
                        this.state.booksData.map((book, idx) => {
                            return <>

                                <Card bg='info'>
                                    <Card.Header as="h5">Book Name:{book.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Description:{book.description}</Card.Title>
                                        <Card.Text>
                                            Status:{book.status}
                                        </Card.Text>

                                        <Button variant="danger" onClick={() => this.deleteBook(idx)}>Delete Book</Button>
                                        <UpdateButton key={idx} id={idx} addName={this.addName} addDescription={this.addDescription} addStatus={this.addStatus}
                                            updateBook={this.updateBook} book_id={idx} newNameBook={book.name}
                                            newBookDesc={book.description} newBookstatus={book.status} />


                                    </Card.Body>
                                </Card>
                                <br />

                            </>
                        })
                    }
                </ol>
            </>
        )
    }
}

export default withAuth0(MyFavoriteBooks);