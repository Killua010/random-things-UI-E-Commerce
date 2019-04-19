import React, { Component } from "react";

import "../../assets/css/index.css";

// nodejs library that concatenates classes
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ImageZoom from "../../components/ImageZoom/ImageZoom";
import SimpleProduct from "../../components/SimpleProduct/SimpleProduct.jsx";
import ParallaxIndex from "../../components/ParallaxIndex/ParallaxIndex";

class Index extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  render() {
    const { classes, ...rest } = this.props;
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

        <div className={classNames(classes.main, classes.mainRaised, "pb-5")}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <h2 className="title text-warning text-center">
                Pricipais Categorias
              </h2>
              <GridContainer>
                <ImageZoom />
                <ImageZoom />
              </GridContainer>
              <h2 className="title text-warning text-center">
                Produtos mais vistos
              </h2>
              <GridContainer>
                {/* <SimpleProduct />
                <SimpleProduct />
                <SimpleProduct />
                <SimpleProduct /> */}
              </GridContainer>
              <h2 className="title text-warning text-center">
                <a href="#" className="text-warning link">
                  Todos os nossos itens
                </a>
              </h2>
              <GridItem>
                <ParallaxIndex />
              </GridItem>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Index);
