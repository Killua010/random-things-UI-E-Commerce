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

export default class SubCategoryList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("subcategories");

    this.state = {
      statusModal: false,
      subCategories: [],
      subCategory: {},
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.getAllSubCategory = this.getAllSubCategory.bind(this);
    this.deleteSubCategory = this.deleteSubCategory.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllSubCategory();
  }

  editSubCategory(subCategory){
    this.props.history.push({pathname: "nova-subcategoria", state: { subCategory: subCategory }});
  }

  newSubCategory() {
    this.props.history.push("nova-subcategoria");
  }

  getAllSubCategory(){
    this.service.getAll().then(val => this.setState({
      subCategories: val
    })).then(() => this.setState({
              blocking: false
            }))
  }

  async deleteSubCategory(subCategory){
    this.alterBlockUI()
    await this.service.delete(subCategory)
    await this.getAllSubCategory()
    this.alterBlockUI()
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  removeSubCategory(subCategory){
    swal({
      title: 'Tem certeza que deseja excluir essa subcategoria?',
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
        this.deleteSubCategory(subCategory)
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
                    <h4 className="title">SubCategorias Atuais</h4>
                  </Col>
                  <Col sm="6">
                    <Button tag="label"
                            className="btn-simple float-right"
                            color="warning"
                            size="md"
                            onClick={() => { this.newSubCategory() } }>
                            Nova SubCategoria
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Categoria</th>
                        <th className="text-center">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                    { 
                      
                        this.state.subCategories.map((subCategory, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point" onClick={() => this.editSubCategory(subCategory) }>{subCategory.name}</td>
                                <td className="text-center hover-point" onClick={() => this.editSubCategory(subCategory) }>{subCategory.category.name}</td>
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeSubCategory(subCategory)}><i className="tim-icons icon-trash-simple"></i></a></td>
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
