import React, { Component } from 'react';

import GeneralService from '../../../services/GeneralService';
import CategoryModal from './CategoryModal';
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

export default class RestaurantProductCategory extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("categories");

    this.state = {
      statusModal: false,
      categories: [],
      category: {},
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.modal = this.modal.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.updateData = this.updateData.bind(this)
    this.putCategory = this.putCategory.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.executeEvent = this.executeEvent.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllCategory();
  }

  getAllCategory(){
    this.service.getAll().then(val => this.setState({
      categories: val
    })).then(() => this.setState({
              blocking: false
            }))
  }

  async putCategory(category){
    this.modal()
    this.alterBlockUI()
    await this.service.put(category)
    await this.getAllCategory()
    this.alterBlockUI()
  }

  async postCategory(category){
    this.modal()
    this.alterBlockUI()
    await this.service.post(category)
    await this.getAllCategory()
    this.alterBlockUI()
  }

  async deleteCategory(category){
    this.alterBlockUI()
    await this.service.delete(category)
    await this.getAllCategory()
    this.alterBlockUI()
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  saveCategory(){
    this.setState({
      update: false
    })
  }

  updateCategory(){
    this.setState({
      update: true
    })
  }

  updateData(value){
    this.setState({
      category: {
        ...this.state.category,
        name: value.target.value
      }
    })
  }

  executeEvent(category){ 
    if(this.state.update === false)
      this.postCategory(category)
    else  
      this.putCategory(category)
  }

  modal(category){
    if(category == null)
      this.setState({
        statusModal: !this.state.statusModal,
        category: {
          name: ''
        },
        update: false
      })
    else
    this.setState({
      statusModal: !this.state.statusModal,
      category: category
    })
  }

  removeCategory(category){
    swal({
      title: 'Tem certeza que deseja excluir essa categoria?',
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
        this.deleteCategory(category)
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
                    <h4 className="title">Categorias Atuais</h4>
                  </Col>
                  <Col sm="6">
                    <Button tag="label"
                            className="btn-simple float-right"
                            color="warning"
                            size="md"
                            onClick={() => { this.modal(); this.saveCategory() } }>
                            Nova Categoria
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                    { 
                      
                        this.state.categories.map((category, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point" onClick={() => { this.modal(category); this.updateCategory()} }>{category.name}</td>
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeCategory(category)}><i className="tim-icons icon-trash-simple"></i></a></td>
                              </tr>
                            )
                        })
                    }
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
          <CategoryModal statusModal={this.state.statusModal} 
                      modal={this.modal} 
                      category={this.state.category}
                      event={this.executeEvent}
                      updateData={this.updateData}
                      update={this.state.update}></CategoryModal>
                      </BlockUi>
      </div>
    )
  }
}
