import React, { Component } from "react";

import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
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
import CouponPromotionalService from "../../services/CouponPromotionalService";
import CouponChangeService from "../../services/CouponChangeService";
class Payment extends Component {

  constructor(props){
    super(props);
    this.shoppingCartService = new ShoppingCartService("shoppingCarts");
    this.shippingService = new ShippingPriceService("shipping")
    this.orderService = new OrderService("orders");
    this.promotionalCouponService = new CouponPromotionalService("promotionalCoupons")
    this.changeCouponService = new CouponChangeService("coupons");

    this.state = {
      openCartao: false,
      openAddress: false, 
      coupon:"",
      changeCoupon: {
        name: ''
      },
      total: 0.0,
      quantity: 0,
      frete: 0.0,
      promotionalCoupon: {
        name: ''
      },
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

  alterFavoriteCard = (card) => {
    this.setState({
      favoriteCard: card
    })
  }

  alterFavoriteAdderss = (address) =>{
    this.setState({
      favoriteAddress: address
    })
  }

  finishOrder(){
    this.orderService.post({
      clientId: this.props.client.id,
      addressId: this.state.favoriteAddress.id,
      cardId: this.state.favoriteCard.id,
      orderValue: this.state.subTotal,
      shippingValue: this.state.frete,
      changeCoupon: this.state.changeCoupon.name,
      promotionalCoupon: this.state.promotionalCoupon.name,
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
    if(this.state.promotionalCoupon.value !== undefined){
      if(this.state.promotionalCoupon.value > subTotal){
        subTotal = 0;
      } else {
        subTotal -= this.state.promotionalCoupon.value;
      }
    }

    if(this.state.changeCoupon.value !== undefined){
      if(this.state.changeCoupon.value > subTotal){
        subTotal = 0;
      } else {
        subTotal -= this.state.changeCoupon.value;
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

  findPromotionalCoupon = () => {
    this.promotionalCouponService.getByName(this.state.promotionalCoupon.name)
    .then(res => {
      if(res != null){
        document.getElementById("btnPromotionalCoupon").style.pointerEvents = "none";
        document.getElementById("btnPromotionalCoupon").parentElement.style.cursor = "not-allowed";
        document.getElementById("btnPromotionalCoupon").style.backgroundColor = "#5a5a5a";
        document.getElementById("txtPromotionalCoupon").disabled = true;
        document.getElementById("txtPromotionalCoupon").style.cursor = "not-allowed";
       
        var divNova = document.createElement("div"); 
        var conteudoNovo = document.createTextNode(`valor cupom: R$ ${res.value}`); 
        divNova.appendChild(conteudoNovo); 

        document.getElementById("divPromotionalCoupon").appendChild(divNova);

        this.setState({
          promotionalCoupon: res
        },() => this.renderSubTotal())
      }
    })
  }

  findChangeCoupon = () => {
    this.changeCouponService.getByIdClientAndName(this.props.client.id, this.state.changeCoupon.name)
    .then(res => {
      if(res != null){
        document.getElementById("btnChangeCoupon").style.pointerEvents = "none";
        document.getElementById("btnChangeCoupon").parentElement.style.cursor = "not-allowed";
        document.getElementById("btnChangeCoupon").style.backgroundColor = "#5a5a5a";
        document.getElementById("txtChangeCoupon").disabled = true;
        document.getElementById("txtChangeCoupon").style.cursor = "not-allowed";
       
        var divNova = document.createElement("div"); 
        var conteudoNovo = document.createTextNode(`valor cupom: R$ ${res.value}`); 
        divNova.appendChild(conteudoNovo); 

        document.getElementById("divChangeCoupon").appendChild(divNova);

        this.setState({
          changeCoupon: res
        },() => this.renderSubTotal())
      }
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: {
        ...[e.target.name],
         name: e.target.value
        }
    })
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
                      <div className="row" id="divPromotionalCoupon">
                        <div className="col-xs-9 mr-3">
                          <CustomInput
                            inputProps={{
                              id: "txtPromotionalCoupon",
                              name: "promotionalCoupon",
                              onChange: this.handleInput,
                              value: this.state.promotionalCoupon.name,
                              
                              type: "text",
                              placeholder: "Cupom promocional"
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </div>
                        <div className="col-xs-3">
                        <Button
                          id="btnPromotionalCoupon"
                          color="success"
                          size="sm"
                          href="javascript:void(0)" onClick={this.findPromotionalCoupon}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="row" id="divChangeCoupon">
                        <div className="col-xs-9 mr-3">
                          <CustomInput
                            inputProps={{
                              id: "txtChangeCoupon",
                              name: "changeCoupon",
                              onChange: this.handleInput,
                              value: this.state.changeCoupon.name,
                              
                              type: "text",
                              placeholder: "Cupom troca"
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </div>
                        <div className="col-xs-3">
                        <Button
                          id="btnChangeCoupon"
                          color="success"
                          size="sm"
                          href="javascript:void(0)" onClick={this.findChangeCoupon
                            // () => this.goTo("/pedidoFinalizado")
                          }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button
                        color="warning"
                        size="lg"
                        href="javascript:void(0)" onClick={this.finishOrder}
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
        <ModalCard
          openCartao={this.state.openCartao}
          openCartaoModal={this.openCartaoModal}
          closeCartaoModal={this.closeCartaoModal}
          cards={this.props.client.cards}
          alterFavoriteCard={this.alterFavoriteCard}
        />
       
        <ModalAddress
          openAddress={this.state.openAddress}
          openAddressModal={this.openAddressModal}
          closeAddressModal={this.closeAddressModal}
          address={this.props.client.deliveryAddress}
          alterFavoriteAdderss={this.alterFavoriteAdderss}
        /> 
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
