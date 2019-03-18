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

export default class PricingGroupList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("pricinggroup");

    this.state = {
      statusModal: false,
      groups: [],
      group: {},
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.getAllGroup = this.getAllGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllGroup();
  }
  
  editGroup(group){
    this.props.history.push({pathname: "novo-grupo-precificacao", state: { group: group }});
  }

  newGroup() {
    this.props.history.push("novo-grupo-precificacao");
  }

  getAllGroup(){
    this.service.getAll().then(val => this.setState({
      groups: val
    })).then(() => this.setState({
      blocking: false
    }))
  }

  async deleteGroup(group){
    this.alterBlockUI()
    await this.service.delete(group)
    await this.getAllGroup()
    this.alterBlockUI()
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  removeGroup(group){
    swal({
      title: 'Tem certeza que deseja excluir esse grupo?',
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
        this.deleteGroup(group)
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
                    <h4 className="title">Grupos de precificações Atuais</h4>
                  </Col>
                  <Col sm="6">
                    <Button tag="label"
                            className="btn-simple float-right"
                            color="warning"
                            size="md"
                            onClick={() => { this.newGroup() } }>
                            Novo Grupo
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Percentual</th>
                        <th className="text-center">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                    { 
                      
                        this.state.groups.map((group, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center hover-point" onClick={() => this.editGroup(group) }>{group.name}</td>
                                <td className="text-center hover-point" onClick={() => this.editGroup(group) }>{group.profitPercentage} %</td>
                                <td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeGroup(group)}><i className="tim-icons icon-trash-simple"></i></a></td>
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
