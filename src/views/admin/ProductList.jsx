import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import GeneralService from '../../services/GeneralService';
import swal from 'sweetalert';

import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

import {
  Card, 
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  Table,
} from "reactstrap";

export default class ProductList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("products");

    this.state = {
      statusModal: false,
      products: [],
      product: {},
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.getAllProduct = this.getAllProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllProduct();
  }

  editProduct(product){
    this.props.history.push({pathname: "novo-produto", state: { product: product }});
  }

  newProduct() {
    this.props.history.push("novo-produto");
  }

  getAllProduct(){
    this.service.getAll().then(val => this.setState({
      products: val
    })).then(() => this.setState({
              blocking: false
            }))
  }

  async deleteProduct(product){
    this.alterBlockUI()
    await this.service.delete(product)
    await this.getAllProduct()
    this.alterBlockUI()
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  removeProduct(product){
    swal({
      title: 'Tem certeza que deseja excluir esse produto?',
      icon: 'warning',
      buttons: {
        cancel: 'Não, cancelar',
        confirm: {
          text: 'Sim, desejo deletar!',
          className: "btn-warning"
          }
      }
    }).then((result) => {
      if(result){
        this.deleteProduct(product)
      }
    })
  }

  render() {
    return (
      <div className="content">
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                <Row>
                  <Col sm="6">
                    <h4 className="title">Produtos Atuais</h4>
                  </Col>
                  <Col sm="6">
                    <Button tag="label"
                            className="btn-simple float-right"
                            color="warning"
                            size="md"
                            id="btnNewProduct"
                            onClick={() => { this.newProduct() } }>
                            Novo Produto
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Grupo precificação</th>
                        <th className="text-center">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                    { 
                      
                        this.state.products.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point" onClick={() => this.editProduct(product) }>{product.name}</td>
                                <td className="text-center hover-point" onClick={() => this.editProduct(product) }>{product.pricingGroup.name}</td>
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeProduct(product)}><i className="tim-icons icon-trash-simple"></i></a></td>
                              </tr>
                            )
                        })
                    }
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
        </BlockUi>
      </div>
    )
  }
}
