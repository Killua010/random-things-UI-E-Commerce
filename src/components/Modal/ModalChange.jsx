import React, { Component } from 'react'

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import TextField from "@material-ui/core/TextField";

import TableRow from "@material-ui/core/TableRow";

import {
    Modal, ModalHeader, ModalBody,
    ModalFooter,
    Input,
    Label
  } from "reactstrap";

export default class ModalChange extends Component {
    constructor(props){
        super(props);
        
    }

  render() {
    return (
        <Modal isOpen={this.props.statusModal} className="modal-lg" toggle={() => {this.props.modal(this.props.order)}}>
            <ModalHeader>Solicitação de troca</ModalHeader>
            <ModalBody>
            <Table>
            <TableBody>
            { this.props.change.itens !== undefined ?
                this.props.order.itens.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>
                                    <TextField
                                    onChange={(e) => {this.props.handleFieldChange(e, index);}}
                                    label="Quantidade"
                                    value={this.props.change.itens[index].quantity}
                                    inputProps={{max: item.quantity, min: 0}}
                                    type="number"
                                    margin="normal"
                                    />
                            </TableCell>
                        </TableRow>
                    ) 
                }): ""
            }
            </TableBody>
            </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="second" onClick={() => {this.props.modal()}}>Cancelar</Button>
                <Button color="warning" id="btnSaveField" type="button" onClick={() => {this.props.saveChange(this.props.change, this.props.order);}}>Solicitar troca</Button>
            </ModalFooter>
        </Modal>
    )
  }
}
