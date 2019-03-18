import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import GeneralService from '../../services/GeneralService';
import SimpleService from '../../services/SimpleService';
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

export default class ProductList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("products");
    this.inactiveStatusService = new GeneralService("statusInactivation");
    this.inativationService = new SimpleService("inactivations");

    this.state = {
      statusInactive: [],
      statusModal: false,
      description: '',
      inactiveStatu: {},
      products: [],
      product: {},
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.getAllProduct = this.getAllProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    this.getAllStatusType = this.getAllStatusType.bind(this)
    this.updateDataInactive = this.updateDataInactive.bind(this)
    this.getFields = this.getFields.bind(this)

    this.getFields().then(() => this.setState({
      blocking: false
    }))
    
    
  }

  async getFields(){
    await this.getAllProduct();
    await this.getAllStatusType();
  }

  updateDataInactive(description, statu){
    if(statu === undefined){
      statu = this.state.statusInactive[0].name
    }
    let inactive = {
      description: description,
      statusInactivation: statu,
      productId: this.state.product.id
    }
    this.deleteProduct(inactive)
  }

  editProduct(product){
    this.props.history.push({pathname: "novo-produto", state: { product: product }});
  }

  newProduct() {
    this.props.history.push("novo-produto");
  }

  async getAllStatusType(){
    await this.inactiveStatusService.getAll().then(val => this.setState({
      statusInactive: val
    }))
    console.log(this.state.statusInactive)
  }

  async getAllProduct(){
    await this.service.getAll().then(val => this.setState({
      products: val
    }))
  }

  async deleteProduct(inactivation){
    this.alterBlockUI()
    await this.inativationService.post(inactivation)
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

  statusModal = (product) => {
    this.setState({
      statusModal: !this.state.statusModal,
      product: product
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
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.statusModal(product)}><i className="tim-icons icon-trash-simple"></i></a></td>
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
        <ModalInactiveProduct statusModal={this.state.statusModal}
         statusInactive={this.state.statusInactive}
         modal={this.statusModal} 
         description={this.state.description}
         technicalField={this.state.technicalField}
         updateDataInactive={this.updateDataInactive}></ModalInactiveProduct>
      </div>
    )
  }
}
