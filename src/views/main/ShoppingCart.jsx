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

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
import "../../assets/css/index.css";
class ShoppingCart extends Component {
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
                      <TableRow>
                        <TableCell>
                          <img
                            src="https://images.pexels.com/photos/1073772/pexels-photo-1073772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            width="100px"
                          />
                        </TableCell>
                        <TableCell align="right">Nome Produto</TableCell>
                        <TableCell align="right">R$ 3,00</TableCell>
                        <TableCell align="right">
                          <GridContainer>
                            <GridItem xs="9">
                              <TextField
                                label="Number"
                                value={1}
                                type="number"
                                margin="normal"
                              />
                            </GridItem>
                            <GridItem xs="3" className="pt-icon-removeProduct">
                              <IconButton color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </GridItem>
                          </GridContainer>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <img
                            src="https://images.pexels.com/photos/1073772/pexels-photo-1073772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            width="100px"
                          />
                        </TableCell>
                        <TableCell align="right">Nome Produto</TableCell>
                        <TableCell align="right">R$ 3,00</TableCell>
                        <TableCell align="right">
                          <GridContainer>
                            <GridItem xs="9">
                              <TextField
                                label="Number"
                                value={1}
                                type="number"
                                margin="normal"
                              />
                            </GridItem>
                            <GridItem xs="3" className="pt-icon-removeProduct">
                              <IconButton color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </GridItem>
                          </GridContainer>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <img
                            src="https://images.pexels.com/photos/1073772/pexels-photo-1073772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            width="100px"
                          />
                        </TableCell>
                        <TableCell align="right">Nome Produto</TableCell>
                        <TableCell align="right">R$ 3,00</TableCell>
                        <TableCell align="right">
                          <GridContainer>
                            <GridItem xs="9">
                              <TextField
                                label="Number"
                                value={1}
                                type="number"
                                margin="normal"
                              />
                            </GridItem>
                            <GridItem xs="3" className="pt-icon-removeProduct">
                              <IconButton color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </GridItem>
                          </GridContainer>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <img
                            src="https://images.pexels.com/photos/1073772/pexels-photo-1073772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            width="100px"
                          />
                        </TableCell>
                        <TableCell align="right">Nome Produto</TableCell>
                        <TableCell align="right">R$ 3,00</TableCell>
                        <TableCell align="right">
                          <GridContainer>
                            <GridItem xs="9">
                              <TextField
                                label="Number"
                                value={1}
                                type="number"
                                margin="normal"
                              />
                            </GridItem>
                            <GridItem xs="3" className="pt-icon-removeProduct">
                              <IconButton color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </GridItem>
                          </GridContainer>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </GridItem>
                <GridItem md="3">
                  <Card>
                    <CardBody>
                      <Typography variant="h5">SubTotal:</Typography>
                      <Typography variant="subtitle1">
                        (4 itens) R$ 12,00
                      </Typography>
                      <Button color="warning" size="lg" href="/pagamento">
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

export default withStyles(componentsStyle)(ShoppingCart);
