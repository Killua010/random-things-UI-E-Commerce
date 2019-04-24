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

export default class ModalOrderDercription extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
        }
        
    }

  render() {
    return (
        <Modal isOpen={this.props.statusModal} toggle={() => {this.props.modal(this.props.order)}}>
            <ModalHeader>Dados do pedido</ModalHeader>
            <ModalBody>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.props.order.itens.map((item, index) => {
                      return(
                        <TableRow key={index}>
                          <TableCell>{item.product.name} × {item.quantity}</TableCell>
                          <TableCell>R$ {item.subTotal}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell>Frete</TableCell>
                    <TableCell>R$ {this.props.order.shippingPrice}</TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>R$ {this.props.order.totalPrice}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Endereço</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{this.props.order.address.street} - {this.props.order.address.number}</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>{this.props.order.address.neighborhood} - {this.props.order.address.city.cityName} - {this.props.order.address.city.stateCode}</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>{this.props.order.address.zipCode}</TableCell>
                </TableRow>
              </TableHead>
              </Table>  
            </ModalBody>
            <ModalFooter>
                <Button color="second" onClick={() => {this.props.modal(this.props.order)}}>Cancelar</Button>
                {
                  this.props.description !== undefined ?
                    <Button color="warning" type="button" id="btnInactiveProduct" onClick={() => {this.props.nextStep(this.props.order); this.props.modal(this.props.order)}}>{this.props.description}</Button>
                  : ""
                }
                
            </ModalFooter>
        </Modal>
    )
  }
}
