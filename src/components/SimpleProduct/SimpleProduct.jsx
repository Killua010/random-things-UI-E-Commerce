import React, { Component } from "react";

import GridItem from "../Grid/GridItem.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import { browserHistory } from 'history'
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShopIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { cardTitle } from "assets/jss/material-kit-react.jsx";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as cartActions from "../../actions/shoppingCart";

import "../../assets/css/index.css";

import shoppingCartService from "../../services/ShoppingCartService";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right",
    justifyContent: "right !important"
  },
  size: {
    fontSize: "15px",
    paddingRight: "30px",
    paddingLeft: "8px",
    paddingTop: "2px"
  }
};

class SimpleProduct extends Component {

  constructor(props){
    super(props);

    this.shoppingCartService = new shoppingCartService("shoppingCarts");

    this.goTo = this.goTo.bind(this);
    this.addShoppingCart = this.addShoppingCart.bind(this);
    this.postShoppingCart = this.postShoppingCart.bind(this);
  }

  descriptionFormat = () => {
    if(this.props.product.description.length > 40) {
      return this.props.product.description.substring(0,40) + "...";
    } else {
      return this.props.product.description;
    }
  }

  addShoppingCart() {
    if(this.props.client === null || this.props.client === undefined){
      this.props.props.history.push("/login");
    } else {
      this.postShoppingCart();
    }

  }

  async postShoppingCart() {
    await this.shoppingCartService.post(this.props.product, this.props.client.id).then(res => {
      if(res !== false) {
        this.props.setShoppingCart(res);
      }
    })
  }

  goTo() {
    this.props.props.history.push({pathname: "produto", state: { product: this.props.product }});    
  }

  render() {
    const { classes, md } = this.props;
    let mdValue;
    if(md=== undefined)
      mdValue = 3;
    else
      mdValue = md;
    return (
      <GridItem md={mdValue} sm={6}>
        <Card className={classes.textCenter}>
          <CardHeader>
            <a href="javascript:void(0)" onClick={this.goTo}>
              <img
                src={this.props.product.imgSrc[0]}
                alt=""
              />
            </a>
          </CardHeader>
          <CardBody>
            <Typography className={classes.textRight} color="textSecondary">
              <span>0</span>
              <Icon
                className={classNames(classes.icon, "fas fa-eye", classes.size)}
              />
            </Typography>

            <Typography variant="h5" component="h2">
              {this.props.product.name}
            </Typography>
            <Typography component="p">
              {this.descriptionFormat()}
            </Typography>
          </CardBody>
          <CardActions className={classes.actions} disableActionSpacing>
            <GridItem xs={5}>
              <Typography color="textSecondary">R$ {this.props.product.price}</Typography>
            </GridItem>
            <GridItem xs={7}>
              <IconButton aria-label="Share" onClick={this.addShoppingCart}>
                <ShopIcon />
              </IconButton>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
            </GridItem>
          </CardActions>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  cart: state.cart
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(SimpleProduct));
