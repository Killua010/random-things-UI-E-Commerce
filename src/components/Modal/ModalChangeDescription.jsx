import React, { Component } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
    Modal, ModalHeader, ModalBody,
    ModalFooter,
    Input,
    Button,
    Label
  } from "reactstrap";

export default class ModalChangeDercription extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
        }
        
    }

  render() {
    return (
        <Modal isOpen={this.props.statusModal} toggle={() => {this.props.modal(this.props.change)}}>
            <ModalHeader>Dados da troca</ModalHeader>
            <ModalBody>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.props.change.itens.map((item, index) => {
                      return(
                        <TableRow key={index}>
                          <TableCell>{item.product.name} × {item.quantity}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="second" onClick={() => {this.props.modal(this.props.change)}}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
  }
}
