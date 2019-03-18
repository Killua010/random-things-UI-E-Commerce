import React, { Component } from 'react'

import {
    Modal, ModalHeader, ModalBody,
    ModalFooter,
    Input,
    Button,
    Label
  } from "reactstrap";

export default class ModalNewDescriptionField extends Component {
    constructor(props){
        super(props);
        let id = (this.props.technicalField !== "") ? this.props.technicalField : 1;
        
        this.state = {
            description: this.props.description,
            idField: id
        }
        this.updateDataDescription = this.updateDataDescription.bind(this);
        this.updateDataField = this.updateDataField.bind(this)
    }

    updateDataDescription(value){
        this.setState({
            description: value.target.value
        })
      }

    updateDataField(value){
        this.setState({
            idField: value.target.value
        })
    }
  render() {
    return (
        <Modal isOpen={this.props.statusModal} toggle={() => {this.props.modal()}}>
            <ModalHeader>Campos Tecnicos</ModalHeader>
            <ModalBody>
                <Label for="productFields">Tipo</Label>
                <Input type="select" name="productFields" id="productFields" value={this.state.idField} onChange={this.updateDataField}>
                {
                    this.props.technicalFields.map((field, index) => {
                        if(this.state.idField !== '' && this.state.idField === field.id){
                            return(
                            <option selected value={field.id} key={index}>{field.name}</option>
                            )  
                        }
                        return(
                        <option value={field.id} key={index}>{field.name}</option>
                        )
                    })
                }
                </Input>
                <Label for="productFieldValor">valor</Label>
                <Input type="text" id="productFieldValor" name="productFieldValor" value={this.state.description} onChange={this.updateDataDescription} />
            </ModalBody>
            <ModalFooter>
                <Button color="second" onClick={() => {this.props.modal()}}>Cancelar</Button>
                <Button color="warning" type="button" onClick={() => {this.props.updateDataFields(this.state.description, this.state.idField); this.props.modal()}}>Adicionar</Button>
            </ModalFooter>
        </Modal>
    )
  }
}
