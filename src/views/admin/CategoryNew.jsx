import React, { Component } from 'react';
import GeneralService from '../../services/GeneralService';
import swal from 'sweetalert';
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
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
  CardFooter,
  Button,
  Label,
  Input,
} from "reactstrap";

export default class CategoryNew extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("categories");

    this.state = {
      category: {},
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: false
    };

    this.updateData = this.updateData.bind(this)
    this.putCategory = this.putCategory.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.executeEvent = this.executeEvent.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
  }

  async putCategory(category){
    this.alterBlockUI()
    await this.service.put(category)
    this.props.history.push("listar-categorias");
    this.alterBlockUI()
  }

  async postCategory(category){
    this.alterBlockUI()
    await this.service.post(category)
    this.props.history.push("listar-categorias");
    this.alterBlockUI()
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

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  componentDidMount() {
    console.log(this.props.location.state)
    if(this.props.location.state !== undefined){
      this.setState({
        category: this.props.location.state.category,
        update: true
      })
    } else {
      this.setState({
        category: {},
        update: false
      })
    }
  }

  render() {
    return (
      <div className="content">
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
            <Col xs="12">
            <h4 className="title">Dados da categoria</h4>
            <Card>
            <CustomTabs
                  plainTabs
                  headerColor="warning"
                  tabs={[
                    {
                      tabName: "Dados básicos",
                      tabContent: (
                        <div>
                          <Label for="categoryName">Nome da categoria</Label>
                          <Input type="text" id="categoryName" name="categoryName" value={this.state.category.name} onChange={this.updateData}></Input>
                        </div>
                      )
                    },
                    {
                      tabName: "Fotos",
                      tabContent: (
                        <h1>Em desenvolvimento</h1>
                      )
                    }
                  ]}
                />
                <CardFooter>
                <Button tag="label"
                      className="btn-simple float-right"
                      color="warning"
                      size="md"
                      onClick={() => { this.executeEvent(this.state.category) } }>
                      Salvar
                </Button>
                </CardFooter>
                </Card>
          </Col>
        </BlockUi>
      </div>
    )
  }
}

