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
import ProviderService from '../../services/ProviderService';
import ProductService from '../../services/ProductService';

export default class StockInputNew extends Component {

  constructor(props) {
    super(props);
    this.service = new GeneralService("stockInputs");
    this.categoryservice = new GeneralService("categories");
    this.providerService = new ProviderService("providers");
    this.productService = new ProductService("products");

    this.state = {
      stockInput: {
        quantity: 0,
        value: 0.0,
        providerId: null,
        productId: null,
        categoryId: null
      },
      loaderType: 'ball-pulse-sync',
      categories: [],
      providers: [],
      products: []
    };

    this.updateData = this.updateData.bind(this)
    this.postStock = this.postStock.bind(this)
    this.getAllCategory = this.getAllCategory.bind(this);

    this.getAllCategory();
  }


  async postStock(){
    await this.service.post(this.state.stockInput)
    this.props.history.push("lista");
  }

  updateData(value){
    this.setState({
      stockInput: {
        ...this.state.stockInput,
        [value.target.name]: value.target.value
      }
    })
  }

  updateCategory = (value) => {
    this.setState({
      stockInput: {
        ...this.state.stockInput,
        categoryId: value.target.value
      }
    }, () => {this.renderProvider(); this.getProducts()})
  }

  async getAllCategory(){
    await this.categoryservice.getAll().then(val => this.setState({
      categories: val
    })).then(() => {this.setState({
        blocking: false,
        stockInput: {
          ...this.state.stockInput,
          categoryId: this.state.categories[0].id
        }
      })
      this.renderProvider();
      this.getProducts();
    }
    )
  }

  renderProvider = async () => {
    if(this.state.stockInput.categoryId !== null){
      await this.providerService.getByIdCategory(this.state.stockInput.categoryId).then((res) => {
        if(res !== null){
          this.setState({
            providers: res,
            stockInput: {
              ...this.state.stockInput,
              providerId: res[0].id
            }
          })
        }
      })
    }
  }

  showProviders = () => {
    let data = [];
      this.state.providers.map((provider, index) => {
        if(this.state.stockInput.providerId !== null && this.state.stockInput.providerId === provider.id){
          data.push(<option selected value={provider.id} key={index}>{provider.name}</option>);
          
        } else {
          data.push(<option value={provider.id} key={index}>{provider.name}</option>)
        }
      })
      

    return data;
    
  }

  getProducts = async () => {
    await this.productService.findByCategory(this.state.stockInput.categoryId).then((res) => {
      if(res != null){
        this.setState({
          products: res,
          stockInput: {
            ...this.state.stockInput,
            productId: res[0].id
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="content">
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
            <Col xs="12">
            <h4 className="title">Nova entrada no estoque</h4>
            <Card>
            <CustomTabs
                  plainTabs
                  headerColor="warning"
                  tabs={[
                    {
                      tabName: "Dados básicos",
                      tabContent: (
                        <div>
                          <Label for="categoryId">Categoria</Label>
                          <Input type="select" name="categoryId" id="exampleSelect1" value={this.state.stockInput.categoryId} onChange={this.updateCategory}>
                          {
                            this.state.categories.map((category, index) => {
                              if(this.state.stockInput.category !== undefined && this.state.stockInput.category.id === category.id){
                                return(
                                  <option selected value={category.id} key={index}>{category.name}</option>
                                )  
                              }
                              return(
                                <option value={category.id} key={index}>{category.name}</option>
                              )
                            })
                          }
                          </Input>
                          <Label for="providerId">Fornecedor</Label>
                          <Input type="select" name="providerId" value={this.state.stockInput.providerId} onChange={this.updateData}>
                          {
                            this.showProviders()
                          }
                          </Input>
                          <Label for="productId">Produto</Label>
                          <Input type="select" name="productId" value={this.state.stockInput.productId} onChange={this.updateData}>
                          {
                            this.state.products.map((product, index) => {
                              if(this.state.stockInput.productId !== undefined && this.state.stockInput.productId === product.id){
                                return(
                                  <option selected value={product.id} key={index}>{product.name}</option>
                                )  
                              }
                              return(
                                <option value={product.id} key={index}>{product.name}</option>
                              )
                            })
                          }
                          </Input>
                          <Label for="quantity">Quantidade</Label>
                          <Input type="number" id="quantity" name="quantity" value={this.state.stockInput.quantity} onChange={this.updateData}></Input>
                          <Label for="value">Valor</Label>
                          <Input type="number" step="0.01" id="value" name="value" value={this.state.stockInput.value} onChange={this.updateData}></Input>
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
                      onClick={ this.postStock }>
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

