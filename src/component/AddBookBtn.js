import React, { Component } from 'react'

class AddBookBtn extends Component {
    render() {
        return (
            <div>
                <form className="add-form" onSubmit={(e)=>this.props.addBook(e)}>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>this.props.getName(e)}></input>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>this.props.getDescription(e)}></input>
                    <label>Status:</label>
                    <input type="text" onChange={(e)=>this.props.getStatus(e)}></input>
                    <br></br>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        )
    }
}

export default AddBookBtn