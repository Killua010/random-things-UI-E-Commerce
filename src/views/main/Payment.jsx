import React, { Component } from "react";

import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

import ModalCard from "../../components/Modal/ModalCart.jsx";
import ModalAddress from "../../components/Modal/ModalAddress.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Typography from "@material-ui/core/Typography";

import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import { connect } from "react-redux";
import ShippingPriceService from "../../services/ShippingPriceService";
import OrderService from "../../services/OrderService";
import ShoppingCartService from "../../services/ShoppingCartService";
import { bindActionCreators } from "redux";
import * as cartActions from "../../actions/shoppingCart";
class Payment extends Component {

  constructor(props){
    super(props);
    this.shoppingCartService = new ShoppingCartService("shoppingCarts");
    this.shippingService = new ShippingPriceService("shipping")
    this.orderService = new OrderService("orders");

    this.state = {
      openCartao: false,
      openAddress: false, 
      cart: {},
      total: 0.0,
      quantity: 0,
      frete: 0.0,
      favoriteCard: {
        printedName: "",
        number: "",
        flag: {
          name: "name"
        }
      }, 
      favoriteAddress: {
        street: "",
        number: "",
        neighborhood: "",
        city: {
          cityName: "",
          stateCode: ""
        },
        zipCode: ""
        
      }
    };

    this.renderSubTotal = this.renderSubTotal.bind(this);
    this.calculateShipping = this.calculateShipping.bind(this)
    this.finishOrder = this.finishOrder.bind(this);
  }

  finishOrder(){
    this.orderService.post({
      clientId: this.props.client.id,
      addressId: this.state.favoriteAddress.id,
      cardId: this.state.favoriteCard.id,
      orderValue: this.state.subTotal,
      shippingValue: this.state.frete,
      cart: this.state.cart
    }).then(res => {
      if(res !== false) {
        this.shoppingCartService.getByIdClient(this.props.client.id).then(res => {
          if(res !== false) {
            this.props.setShoppingCart(res);
          }
        })
        this.props.history.push({ pathname: "/pedidoFinalizado", state: { order: res.data } });
      }
    })
  }

  async calculateShipping(){
    await this.shippingService.getByIdClient(this.props.client.id, this.state.favoriteAddress)
      .then(res => {
        this.setState({
          frete: res
        })
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

  componentDidMount(){
    if(this.props.client === null || this.props.client === undefined){
      this.props.history.push("/login");
    } else {
      this.setState({
        cart: this.props.cart
      }, () => this.renderSubTotal())
      let address = null;
      let card = null;
      if(this.props.client.deliveryAddress.length !== 0) {
        for(let i = 0; i < this.props.client.deliveryAddress.length; i++){
          if(this.props.client.deliveryAddress[i].favorite == true){
            address = this.props.client.deliveryAddress[i];
          }
        }

        if(address === null){
          address = this.props.client.deliveryAddress[0];
        }

        this.setState({
          favoriteAddress: address
        }, () => this.calculateShipping())
      }

      if(this.props.client.cards.length !== 0) {
        for(let i = 0; i < this.props.client.cards.length; i++){
          if(this.props.client.cards[i].favorite == true){
            card = this.props.client.cards[i];
          }
        }

        if(card === null){
          card = this.props.client.cards[0];
        }

        this.setState({
          favoriteCard: card
        })
      }
    }
  }

  openCartaoModal = () => {
    this.setState({ openCartao: true });
  };

  closeCartaoModal = () => {
    this.setState({ openCartao: false });
  };

  openAddressModal = () => {
    this.setState({ openAddress: true });
  };

  closeAddressModal = () => {
    this.setState({ openAddress: false });
  };

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
                <GridItem md="4">
                  <Card>
                    <CardBody>
                    
                    <Typography component="h4" variant="h5" className={classes.cardTitle}>Endereço favorito</Typography>
                      <Typography>
                      <p>
                        {this.state.favoriteAddress.street} - {this.state.favoriteAddress.number}
                        <br />
                        {this.state.favoriteAddress.neighborhood} - {this.state.favoriteAddress.city.cityName} - {this.state.favoriteAddress.city.stateCode}
                        <br />
                        {this.state.favoriteAddress.zipCode}
                      </p>
                      </Typography>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="button"
                        color="warning"
                        onClick={this.openAddressModal}
                      >
                        Outro endereço
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md="4">
                  <Card>
                    <CardBody>
                    <Typography component="h4" variant="h5" className={classes.cardTitle}>Cartão favorito</Typography>
                      <Typography>
                        <p>
                          {this.state.favoriteCard.printedName} <br />
                          {this.state.favoriteCard.number} <br />
                          {this.state.favoriteCard.flag.name}
                        </p>
                      </Typography>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="button"
                        color="warning"
                        onClick={this.openCartaoModal}
                      >
                        Outro cartão
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md="4">
                  <Card>
                    <CardBody>
                      <Typography variant="h5">Detalhes:</Typography>
                      <Typography variant="subtitle1">
                      ({this.state.quantity} itens) R$ {this.state.subTotal}
                      </Typography>
                      <Typography variant="subtitle1">
                        Frete: R$ {this.state.frete}
                      </Typography>
                      <Typography variant="h5">Total: R$ {this.state.subTotal + this.state.frete}</Typography>
                      <Button
                        color="warning"
                        size="lg"
                        href="javascript:void(0)" onClick={this.finishOrder
                          // () => this.goTo("/pedidoFinalizado")
                        }
                      >
                        Finalizar Comprar
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        {/* <ModalCard
          openCartao={this.state.openCartao}
          openCartaoModal={this.openCartaoModal}
          closeCartaoModal={this.closeCartaoModal}
        />
        <ModalAddress
          openAddress={this.state.openAddress}
          openAddressModal={this.openAddressModal}
          closeAddressModal={this.closeAddressModal}
        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(Payment));
