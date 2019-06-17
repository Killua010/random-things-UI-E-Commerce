import React, { Component } from 'react'

import {
    Modal, ModalHeader, ModalBody,
    ModalFooter,
    Input,
    Button,
    Label
  } from "reactstrap";

export default class ModalActiveProduct extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            description: "",
            statu: undefined
        }
        
        this.updateDataDescription = this.updateDataDescription.bind(this);
        this.updateDataStatu = this.updateDataStatu.bind(this)
    }

    updateDataDescription(value){
        this.setState({
            description: value.target.value
        })
      }

    updateDataStatu(value){
        this.setState({
            statu: value.target.value
        })
    }
    updateStatus = (name) => {
        this.setState({
            statu: name
        })
    }
  render() {
    return (
        <Modal isOpen={this.props.statusModal} toggle={() => {this.props.modal()}}>
            <ModalHeader>Ativar Produto</ModalHeader>
            <ModalBody>
                <Label for="statusActivation">Tipo</Label>
                <Input type="select" name="statusActivation" id="statusActivation" value={this.state.statu} onChange={this.updateDataStatu}>
                {
                    this.props.statusActivation.map((statu, index) => {
                        return(
                            <option value={statu.name} key={index}>{statu.description}</option>
                        )
                    })
                }
                </Input>
                <Label for="statuDescription">Motivo</Label>
                <Input type="text" id="statuDescription" name="statuDescription" value={this.state.description} onChange={this.updateDataDescription} />
            </ModalBody>
            <ModalFooter>
                <Button color="second" onClick={() => {this.props.modal()}}>Cancelar</Button>
                <Button color="warning" type="button" id="btnInactiveProduct" onClick={() => {this.props.updateDataInactive(this.state.description, this.state.statu); this.props.modal()}}>Adicionar</Button>
            </ModalFooter>
        </Modal>
    )
  }
}
