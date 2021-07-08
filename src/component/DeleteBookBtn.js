import React, { Component } from 'react'
import {Button} from "react-bootstrap"


class DeleteBookBtn extends Component {
    render() {
        return (
            <div>
                <Button variant="danger" onClick={(e)=>this.props.deleteBook(this.props.index)}>Delete</Button>
            </div>
        )
    }
}

export default DeleteBookBtn