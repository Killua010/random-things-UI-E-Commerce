import React, { Component } from "react";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

import Button from "../../components/CustomButtons/Button.jsx";
import SimpleProduct from "../../components/SimpleProduct/SimpleProduct";
import classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Typography from "@material-ui/core/Typography";

import CarouselProduct from "./CarouselProduct";

import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import "../../assets/css/index.css";
import ProductService from "../../services/ProductService";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as cartActions from "../../actions/shoppingCart";

import shoppingCartService from "../../services/ShoppingCartService";

class ProductDescription extends Component {
  
  constructor(props){
    super(props);

    this.service = new ProductService("products");

    this.shoppingCartService = new shoppingCartService("shoppingCarts");

    this.state = {
      product: {}
    }

    this.postShoppingCart = this.postShoppingCart.bind(this);
    this.addShoppingCart = this.addShoppingCart.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getById(product) {
    await this.service.getById(product).then((res) => {
      this.setState({
        product: res[0]
      })
    })
  }

  async postShoppingCart() {
    await this.shoppingCartService.post(this.state.product, this.props.client.id).then(res => {
      if(res !== false) {
        this.props.setShoppingCart(res);
      }
    })
  }

  addShoppingCart() {
    if(this.props.client === null || this.props.client === undefined){
      this.props.history.push("/login");
    } else {
      this.postShoppingCart();
    }

  }
  
  componentDidMount(){
    if(this.props.location.state === undefined){
      this.props.history.push("/");
    }
    this.getById(this.props.location.state.product);
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
            <div className={classes.container + " pt-5 pb-5"}>
              <GridContainer className="p-1">
                <GridItem md="4">
                  {
                    this.state.product.imgSrc !== undefined ? 
                    <CarouselProduct img={this.state.product.imgSrc} /> : ""
                  }                  
                  <Table className={"mt-7"}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Descrição</TableCell>
                        <TableCell align="right">Valor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { this.state.product.technicalRow !== undefined ?
                        this.state.product.technicalRow.map((row, index) => {
                          return(
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {row.technicalField.name}
                              </TableCell>
                              <TableCell align="right">{row.description}</TableCell>
                            </TableRow>      
                          )
                        }) : ""
                      }
                    </TableBody>
                  </Table>
                </GridItem>
                <GridItem md="8">
                <Typography variant="h5"  className="text-center dark-color">{this.state.product.name}</Typography>
                <Typography>
                  {this.state.product.description}
                  </Typography>
                  <Button type="button" color="success">
                    Adicionar aos faoritos
                  </Button>
                  <Button type="button" color="warning" className="float-right" onClick={this.addShoppingCart}>
                    Adicionar ao carrinho
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <h2 className="title text-warning text-center">talvez você goste</h2>
          <GridContainer>
            {/* <SimpleProduct />
            <SimpleProduct />
            <SimpleProduct />
            <SimpleProduct /> */}
          </GridContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle)(ProductDescription));
