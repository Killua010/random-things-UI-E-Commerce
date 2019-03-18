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

class ProductDescription extends Component {
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
                <GridItem md="5">
                  <CarouselProduct />
                  <Table className={"mt-5"}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Descrição</TableCell>
                        <TableCell align="right">Valor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          dsddsf
                        </TableCell>
                        <TableCell align="right">dsddsf</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          dsddsf
                        </TableCell>
                        <TableCell align="right">dsddsf</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          dsddsf
                        </TableCell>
                        <TableCell align="right">dsddsf</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </GridItem>
                <GridItem md="7">
                <Typography variant="h5"  className="text-center">Produto X</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nulla metus, congue ac velit id, bibendum lobortis arcu.
                    Proin id libero non mi fermentum volutpat nec ut nibh.
                    Mauris consectetur ex a vehicula lobortis. Praesent vehicula
                    urna scelerisque tortor interdum, gravida euismod justo
                    varius. Pellentesque maximus nisi eget sapien ullamcorper
                    vulputate. Sed vulputate vitae sem vitae ornare. In
                    consectetur facilisis elit, et euismod tortor aliquet non.
                    Curabitur rhoncus consequat ex, at aliquet erat maximus
                    quis. Mauris eget sagittis tortor, accumsan pharetra est.
                    Etiam ipsum neque, eleifend ut sapien ac, congue vehicula
                    elit. Phasellus eu nunc sodales, tincidunt est vitae,
                    fringilla mi. Etiam nibh quam, efficitur non arcu id, mattis
                    accumsan felis. Mauris posuere sapien ut ipsum molestie, at
                    pharetra lorem gravida. Duis in tortor vitae justo mollis
                    semper quis id lacus. Suspendisse consectetur dignissim
                    arcu. Nunc pulvinar in nulla eu aliquam. Duis malesuada
                    varius tortor fringilla luctus. Cras ultricies neque odio,
                    ut hendrerit est efficitur vitae. Nullam eget semper est.
                  </Typography>
                  <Button type="button" color="success">
                    Adicionar aos faoritos
                  </Button>
                  <Button type="button" color="warning" className="float-right">
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
            <SimpleProduct />
            <SimpleProduct />
            <SimpleProduct />
            <SimpleProduct />
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(ProductDescription);
