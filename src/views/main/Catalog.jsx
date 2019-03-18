/* eslint-disable react/jsx-key */
import React, { Component } from "react";
import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import classNames from "classnames";
import SimpleProduct from "../../components/SimpleProduct/SimpleProduct.jsx";
import Button from "@material-ui/core/Button";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Apps } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

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

class Catalog extends Component {
  createProduct = () => {
    let product = [];
    for (let i = 0; i < 9; i++) {
      product.push(<SimpleProduct md={4} />);
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
                <GridItem md={3} xs={12} className="no-hover">
                  <Card>
                    <CardBody>
                  
                  <Typography variant="h5" className="mt-2 ml-4">Categorias</Typography>
                  <CustomDropdown
                    hoverColor="black"
                    noLiPadding
                    buttonText="Categoria X"
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                      { name: <Button>Categoria X</Button>, noLink: true },
                      { name: <Button>Categoria X</Button>, noLink: true }
                    ]}
                  />
                  <CustomDropdown
                    hoverColor="black"
                    noLiPadding
                    buttonText="Categoria Y"
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                      { name: <Button>Categoria X</Button>, noLink: true },
                      { name: <Button>Categoria X</Button>, noLink: true }
                    ]}
                  />

                  </CardBody>
                  </Card>
                </GridItem>
                <GridItem md={9} xs={12} className="no-hover">
                  <GridContainer>{this.createProduct()}</GridContainer>
                </GridItem>
              </GridContainer>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(componentsStyle, styles)(Catalog);
