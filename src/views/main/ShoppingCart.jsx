import React, { Component } from "react";

import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";

import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import ShoppingCartService from "../../services/ShoppingCartService";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import "../../assets/css/index.css";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as cartActions from "../../actions/shoppingCart";
import ShippingPriceService from "../../services/ShippingPriceService";
class ShoppingCart extends Component {

  constructor(props){
    super(props);

    this.service = new ShoppingCartService("shoppingCarts");

    this.state = {
      cart: {},
      subTotal: 0.0,
      quantity: 0
    }

    this.getById = this.getById.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.renderSubTotal = this.renderSubTotal.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.updateCart = this.updateCart.bind(this)
    
  }

  async updateCart(){
    await this.service.put(this.state.cart).then(res => {
      console.log(res)
      this.props.setShoppingCart(res);
      this.goTo("/pagamento");
    })
  }

  getById() {
    this.service.getById(this.props.cart).then(res => {
      if(res !== null){
        let idItem = [];
        let quantityItem = []
        for(let i = 0; i < res.itens.length; i++){
          idItem.push(res.itens[i].id);
          quantityItem.push(res.itens[i].quantity)
        } 
        this.setState({
          cart: {
            ...res, 
            idItem: idItem,
            quantityItem: quantityItem
          }
        }, () => this.renderSubTotal())
      }
    })
  }

  componentDidMount(){
    if(this.props.client === null || this.props.client === undefined){
      this.props.history.push("/perfil");
    }else if(this.props.cart.id != undefined && this.props.cart.id != null){
      this.getById();
    }
  }

  removeProduct(product){
    this.service.delete(product, this.props.client.id).then(res => {
      this.setState({
        cart: res
      }, () => {this.renderSubTotal(); this.props.setShoppingCart(res);})
    })
  }

  renderSubTotal(){
    let itens = 0;
    let subTotal = 0.0;
    if(this.state.cart.itens === undefined){
      return;
    }
    for(let i = 0; i < this.state.cart.itens.length; i++){
      if(this.state.cart.itens[i].status != false){
        itens = itens + this.state.cart.itens[i].quantity * 1
        subTotal += (this.state.cart.itens[i].quantity * this.state.cart.itens[i].product.price)
      }
    }

    this.setState({
      quantity: itens,
      subTotal: subTotal
    })
  }

  handleFieldChange(event, index) {

    let idItem = [];
    let quantityItem = []
    let itens = [];
    let item = {};
    for(let i = 0; i < this.state.cart.itens.length; i++){
      if (i === index) {
        item = this.state.cart.itens[i];
        item.quantity = event.target.value;
        idItem.push(this.state.cart.itens[i].id);
        quantityItem.push(event.target.value);
        itens.push(item)
        continue;
      }
      idItem.push(this.state.cart.itens[i].id);
      quantityItem.push(this.state.cart.itens[i].quantity)
      itens.push(this.state.cart.itens[i]);
    }

    this.setState({
      cart : {
        ...this.state.cart,
        itens: itens,
        idItem: idItem,
        quantityItem: quantityItem
      }
    })
    this.renderSubTotal();
  }

  goTo = (path) => {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Parallax image={require("assets/img/bg2.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Random Things</h1>
                  <h3 className={classes.subtitle}>
                    Compre diversos tipos de produtos sem sair de casa
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <GridContainer className="p-1">
                <GridItem md="9">
                  <Table className={"mt-5"}>
                    <TableBody>
                      { 
                        (this.state.cart !== null && this.state.cart.itens !== undefined) ?
                        this.state.cart.itens.map((item, index) => {
                          if(item.status == false){
                            return(
                              <TableRow key={index}>
                                <TableCell>
                                  <img
                                    src={item.product.imgSrc[0]}
                                    alt=""
                                    width="100px"
                                  />
                                </TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>Produto Inativado pelo tempo</TableCell>
                                <TableCell>
                                  <GridContainer>
                                    <GridItem xs="3" className="pt-icon-removeProduct">
                                      <IconButton color="secondary">
                                        <DeleteIcon onClick={() => this.removeProduct(item.product)} />
                                      </IconButton>
                                    </GridItem>
                                  </GridContainer>
                                </TableCell>
                              </TableRow>
                            )
                          } else {
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <img
                                    src={item.product.imgSrc[0]}
                                    alt=""
                                    width="100px"
                                  />
                                </TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{`R$${item.product.price}`}</TableCell>
                                <TableCell>
                                  <GridContainer>
                                    <GridItem xs="9">
                                      <TextField
                                        onChange={(e) => {this.handleFieldChange(e, index);}}
                                        label="Quantidade"
                                        value={item.quantity}
                                        inputProps={{max: item.product.stockQuantity+1, min: 0}}
                                        type="number"
                                        margin="normal"
                                      />
                                    </GridItem>
                                    <GridItem xs="3" className="pt-icon-removeProduct">
                                      <IconButton color="secondary">
                                        <DeleteIcon onClick={() => this.removeProduct(item.product)} />
                                      </IconButton>
                                    </GridItem>
                                  </GridContainer>
                                </TableCell>
                              </TableRow>
                            ) 
                          }
                        }) : ""
                      }
                    </TableBody>
                  </Table>
                </GridItem>
                <GridItem md="3">
                  <Card>
                    <CardBody>
                      <Typography variant="h5">SubTotal:</Typography>
                      <Typography variant="subtitle1">
                        ({this.state.quantity} itens) R$ {this.state.subTotal}
                      </Typography>
                      <Button color="warning" size="lg" 
                        href="javascript:void(0)" onClick={this.updateCart}>
                        Comprar
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  cart: state.cart
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(ShoppingCart));
