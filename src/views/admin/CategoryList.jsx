import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import GeneralService from '../../services/GeneralService';
import swal from 'sweetalert';
import { MDBDataTable } from 'mdbreact';

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

export default class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("categories");

    this.state = {
      statusModal: false,
      categories: [],
      category: {},
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: true,
      data: {
          columns: [{
            label: 'Nome',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Editar',
            field: 'edit',
            width: 15
          },
          {
            label: 'Remover',
            field: 'remove',
            width: 15
          }]    
        }
      
    };

    this.getAllCategory = this.getAllCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllCategory();
  }

  editCategory(category){
    this.props.history.push({pathname: "nova-categoria", state: { category: category }});
  }

  newCategory() {
    this.props.history.push("nova-categoria");
  }

  getAllCategory(){
    this.service.getAll().then(val => this.setState({
      categories: val
    })).then(() =>{ 
      let data = []
      this.state.categories.map((category, index) => {
        data.push({
          name: category.name,
          edit: <a href="javascript:void(0)" className="text-warning"  onClick={() => this.editCategory(category) }><i className="tim-icons icon-pencil"></i></a>,
          remove: <a href="#" className="text-danger" onClick={() => this.removeCategory(category)}><i className="tim-icons icon-trash-simple"></i></a>
        });
      })

      this.setState({
        data: {
          ...this.state.data,
          rows: data
        },
        blocking: false
      })
  });
   



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
                            onClick={() => { this.newCategory() } }>
                            Nova Categoria
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* <Table hover>
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
                                <td className="text-center hover-point" onClick={() => this.editCategory(category) }>{category.name}</td>
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeCategory(category)}><i className="tim-icons icon-trash-simple"></i></a></td>
                              </tr>
                            )
                        })
                    }
                    </tbody>
                  </Table> */}
                  <MDBDataTable
                    className="mb-4 text-center"
                    striped
                    hover
                    data={this.state.data}
                    searchLabel = "Buscar..."
                    entriesLabel = "Quantidade de elementos"
                    infoLabel = {["Mostrando", "de", "de", "elementos"]}
                    paginationLabel= {["Anterior", "Próximo"]}
                  />
                </CardBody>
            </Card>
          </Col>
        </BlockUi>
      </div>
    )
  }
}
