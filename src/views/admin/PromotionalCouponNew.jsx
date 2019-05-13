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

export default class TableFieldNew extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("promotionalCoupons");

    this.state = {
      coupon: {
        value: '',
        shelfLife: ''
      },
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: false
    };

    this.updateData = this.updateData.bind(this)
    this.putField = this.putField.bind(this)
    this.postField = this.postField.bind(this)
    this.executeEvent = this.executeEvent.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
  }

  async putField(field){
    this.alterBlockUI()
    await this.service.put(field)
    this.props.history.push("listar");
    this.alterBlockUI()
  }

  async postField(field){
    this.alterBlockUI()
    await this.service.post(field)
    this.props.history.push("listar");
    this.alterBlockUI()
  }

  updateData(value){
    this.setState({
      coupon: {
        ...this.state.coupon,
        [value.target.name]: value.target.value
      }
    })
  }

  executeEvent(field){ 
    if(this.state.update === false)
      this.postField(field)
    else  
      this.putField(field)
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  componentDidMount() {
    if(this.props.location.state !== undefined){
      this.setState({
        coupon: this.props.location.state.coupon,
        update: true
      })
    } else {
      this.setState({
        coupon: {},
        update: false
      })
    }
  }

  render() {
    return (
      <div className="content">
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
            <Col xs="12">
            <h4 className="title">Dados do cupom promocional</h4>
            <Card>
            <CustomTabs
                  plainTabs
                  headerColor="warning"
                  tabs={[
                    {
                      tabName: "Dados básicos",
                      tabContent: (
                        <div>
                          <Label for="value">Valor</Label>
                          <Input type="number" id="fildValue" name="value" value={this.state.coupon.value} onChange={this.updateData}></Input>
                          <Label for="shelfLife">Data de expiração</Label>
                          <Input type="date" id="fieldDate" name="shelfLife" value={this.state.coupon.shelfLife} onChange={this.updateData}></Input>
                        </div>
                      )
                    }
                  ]}
                />
                <CardFooter>
                <Button tag="label"
                      className="btn-simple float-right"
                      color="warning"
                      size="md"
                      onClick={() => { this.executeEvent(this.state.coupon) } }>
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

