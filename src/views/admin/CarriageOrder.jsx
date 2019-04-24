import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import GeneralService from '../../services/GeneralService';
import OrderService from '../../services/OrderService';
import swal from 'sweetalert';

import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import ModalOrderDescription from '../../components/Modal/ModalOrderDescription';
import {
  Card, 
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  Table,
} from "reactstrap";

export default class CarriageOrder extends Component {

  constructor(props) {
    super(props);
    this.orderService = new OrderService("orders");

    this.state = {
      orders: [], 
      order: {
        itens: [],
        shippingPrice: "",
        totalPrice: "",
        address: {
            street: "",
            number: "",
            city:{
                stateCode: ""
            }
        }
    },
      statusModal: false
    };

    this.getAll = this.getAll.bind(this);
    this.nextStep = this.nextStep.bind(this);

    this.getAll();
  }

  async getAll(){
    await this.orderService.getAllByStatus("EMTRANSITO").then(val => {
      this.setState({
        orders: val
      })
    })
  }

  async nextStep(order){
    await this.orderService.nextStep(order);
    await this.getAll();
  }

  openCloseModal = (order) => {
    this.setState({
      order: order,
      statusModal: !this.state.statusModal
    })
  }

  render() {
    return (
      <div className="content">

            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                <Row>
                  <Col sm="6">
                    <h4 className="title dark-color">Pedidos Aprovados</h4>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="text-center">Código do pedido</th>
                        <th className="text-center">Data do pedido</th>
                        <th className="text-center">Valor</th>
                        <th className="text-center">Pedido Entregue ?</th>
                      </tr>
                    </thead>
                    <tbody id="tableList">
                    { 
                      
                        this.state.orders.map((order, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point" onClick={() => this.openCloseModal(order)}>{order.id}</td>
                                <td className="text-center hover-point" onClick={() => this.openCloseModal(order)}>{order.creationDate}</td>
                                <td className="text-center hover-point" onClick={() => this.openCloseModal(order)}>R$ {order.totalPrice}</td>
                                <td className="text-center"><a href="#" className="text-success" onClick={() => this.nextStep(order)}><i className="fas fa-check"></i></a></td>
                              </tr>
                            )
                        })
                    }
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
          <ModalOrderDescription
            order={this.state.order}
            statusModal={this.state.statusModal}
            modal={this.openCloseModal} 
            nextStep={this.nextStep}
            description={"Pedido Entregue"}
          />
      </div>
    )
  }
}
