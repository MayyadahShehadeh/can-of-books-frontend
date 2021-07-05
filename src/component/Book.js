import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'


export class Book extends Component {
    render() {
        return (
            <div>
                <>
                    {this.props.booksData.length &&
                        this.props.booksData.map((book, idx) => (
                            <>
                                <Card  key={idx}>
                                    <Card.Body>
                                        <Card.Title><h2>{book.name}</h2></Card.Title>
                                        <Card.Text>
                                            {book.description}
                                        </Card.Text>
                                        <Card.Text>
                                            {book.status}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        ))}
                </>
            </div>
        )
    }
}

export default Book