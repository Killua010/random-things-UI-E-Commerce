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

export default class StockInputList extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("stockInputs");

    this.state = {
      statusModal: false,
      stocksInput: [],
      stockInput: {},
      data: {
        columns: [{
          label: 'Produto',
          field: 'product',
          sort: 'asc'
        },{
          label: 'Fornecedor',
          field: 'provider',
          sort: 'asc'
        },
        {
          label: 'Quantidade',
          field: 'quantity',
          sort: 'asc'
        },
        {
          label: 'Preço de compra',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Data da entrada',
          field: 'date'
        }]    
      },
      loaderType: 'ball-pulse-sync',
      blocking: true
    };

    this.getAllStock = this.getAllStock.bind(this);
    this.alterBlockUI = this.alterBlockUI.bind(this)
    
    this.getAllStock();
  }

  newStockInput() {
    this.props.history.push("novo");
  }

  getAllStock(){
    this.service.getAll().then(val => this.setState({
      stocks: val
    })).then(() => {  
      if(this.state.stocks.length == 0){
        this.setState({
          data: {
            ...this.state.data,
            rows: {
                product: "nenhum",
                provider: "nenhum",
                quantity: "nenhum",
                date: "nenhum",
                price: "nenhum"
              }
          },
          blocking: false
        })
        return;
      }
      
      let data = []
      this.state.stocks.map((stock, index) => {
        
        data.push({
          product: stock.product.name,
          provider: stock.provider.name,
          quantity: stock.quantity,
          price: stock.value,
          date: stock.creationDate
        });
        
      })
      this.setState({
        data: {
          ...this.state.data,
          rows: data
        },
        blocking: false
      })
    })
  }


  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
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
                    <h4 className="title">Entradas do estoque</h4>
                  </Col>
                  <Col sm="6">
                    <Button tag="label"
                            className="btn-simple float-right"
                            color="warning"
                            size="md"
                            onClick={() => { this.newStockInput() } }>
                            Nova entrada no estoque
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
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
