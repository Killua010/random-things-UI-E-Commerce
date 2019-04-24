import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import GeneralService from '../../services/GeneralService';
import OrderService from '../../services/OrderService';
import swal from 'sweetalert';

import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import ModalInactiveProduct from '../../components/Modal/ModalInactiveProduct';
import {
  Card, 
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  Table,
} from "reactstrap";

export default class ChangeOrder extends Component {

  constructor(props) {
    super(props);
    this.orderService = new OrderService("orders");

    this.state = {
      orders: []
    };

    this.getAll = this.getAll.bind(this);
    this.getAll();
  }

  async getAll(){
    await this.orderService.getAllByStatus("EMTROCA").then(val => {
      this.setState({
        orders: val
      })
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
                        <th className="text-center">Pedido Enviado ?</th>
                      </tr>
                    </thead>
                    <tbody id="tableList">
                    { 
                      
                        this.state.orders.map((order, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point">{order.id}</td>
                                <td className="text-center hover-point">{order.creationDate}</td>
                                <td className="text-center hover-point">R$ {order.totalPrice}</td>
                                <td className="text-center"><a href="#" className="text-success"><i className="fas fa-check"></i></a></td>
                              </tr>
                            )
                        })
                    }
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
      </div>
    )
  }
}
