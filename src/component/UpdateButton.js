import React, { Component } from 'react'
import {Button,Modal} from "react-bootstrap"


class UpdateButton extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }}

    handleModal(){
        this.setState({show:!this.state.show})
    }

    render() {
        return (
            <div>
                <Button variant="warning" onClick={()=>{this.handleModal()}}>Update</Button>
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>{this.props.bookName}</Modal.Header>
                    <Modal.Body>
                        <form className="update-form" onSubmit={(e)=>this.props.updateBook(e,this.props.book_id)}>
                            <label>Name:</label>
                            <input type="text" onChange={(e)=>this.props.addName(e)}></input><br></br>
                            <label>Description:</label>
                            <input type="text" onChange={(e)=>this.props.addDescription(e)}></input><br></br>
                            <label>Status:</label>
                            <input type="text" onChange={(e)=>this.props.addStatus(e)}></input>

                        <form className="update-form" onSubmit={(e)=>this.props.updateBook(e,this.props.index)}>
                            <label>Name:</label>
                            <input type="text" onChange={(e)=>this.props.getName(e)}></input><br></br>
                            <label>Description:</label>
                            <input type="text" onChange={(e)=>this.props.getDescription(e)}></input><br></br>
                            <label>Status:</label>
                            <input type="text" onChange={(e)=>this.props.getStatus(e)}></input>
                            <br></br>
                            <button type="submit" onClick={()=>{this.handleModal()}}>Update Book</button>
                        </form>
                    </Modal.Body>
            </Modal>
            </div>
        )
    }
}

export default UpdateButton