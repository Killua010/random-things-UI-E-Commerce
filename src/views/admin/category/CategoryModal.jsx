import React, { Component } from 'react'

import {
    Modal, ModalHeader, ModalBody,
    ModalFooter,
    Input,
    Button
} from "reactstrap";

export default class CategoryModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            message: ''
        }

        this.categoryValidation = this.categoryValidation.bind(this)
        this.noError = this.noError.bind(this);

    }

    noError(){
        this.setState({
            error: false
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.statusModal} toggle={() => {this.props.modal(); this.noError()}}>
                <form onSubmit={this.categoryValidation}>
                    <ModalHeader>{(this.props.update === true)? "Atualizar Mesa" : "Nova Mesa"}</ModalHeader>
                    <ModalBody>
                        <Input type="text" id="categoryName" value={this.props.category.name} onChange={this.props.updateData}></Input>
                        {   
                           (this.state.error === true) ? <span className="text-danger">{this.state.message}</span> : <></>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="second" onClick={() => {this.props.modal(); this.noError()}}>Cancelar</Button>
                        <Button color="warning" type="submit">Salvar</Button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }

    categoryValidation(e){
        e.preventDefault()
        let name = document.getElementById("categoryName").value
        if(name.trim() === ""){
            this.setState({
                error: true,
                message: "O nome da categoria é obrigatório"
            })
        } else {
            this.noError()
            this.props.event(this.props.category)
        }
    }
}
