/* eslint-disable react/jsx-key */
import React, { Component } from "react";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import classNames from "classnames";
import SimpleProduct from "../../components/SimpleProduct/SimpleProduct";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import "../../assets/css/index.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Favorite extends Component {
  createProduct = () => {
    let product = [];
    for (let i = 0; i < 3; i++) {
      product.push(<SimpleProduct />);
    }
    return product;
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
              <GridItem md={12}>
              <Typography variant="h5" className="text-center">Itens favoritos</Typography>
              </GridItem>
                {this.createProduct()}
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(componentsStyle, styles)(Favorite);
