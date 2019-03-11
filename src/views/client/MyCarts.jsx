import React, { Component } from "react";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import ModalNewCart from "components/Modal/ModalNewCart";

import "../../assets/css/index.css";

const style = {
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right",
    justifyContent: "right !important"
  },
  size: {
    fontSize: "25px",
    paddingRight: "30px",
    paddingLeft: "8px",
    paddingTop: "2px"
  }
};

class MyCarts extends Component {
  state = {
    openNewCart: false
  };

  openNewCartModal = () => {
    this.setState({ openNewCart: true });
  };

  closeNewCartModal = () => {
    this.setState({ openNewCart: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="content">
        <GridContainer className="p-1">
          <GridItem md="4">
            <Card>
              <CardBody>
                <Typography className={classes.textRight} color="textSecondary">
                  <Icon
                    className={classNames(
                      classes.icon,
                      "fas fa-heart",
                      classes.size
                    )}
                  />
                </Typography>
                <p>
                  Edson Benjamin da Paz <br />
                  1234.1234.1234.1234 <br />
                  Visa
                </p>
              </CardBody>
              <CardFooter>
                <Button type="button" color="danger">
                  Excluir
                </Button>
                <Button
                  type="button"
                  color="warning"
                  className="ml-4"
                  onClick={this.openNewCartModal}
                >
                  Editar
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem md="4">
            <Card>
              <CardBody>
                <Typography className={classes.textRight} color="textSecondary">
                  <Icon
                    className={classNames(
                      classes.icon,
                      "fas fa-heart",
                      classes.size
                    )}
                  />
                </Typography>
                <p>
                  Edson Benjamin da Paz <br />
                  1234.1234.1234.1234 <br />
                  Visa
                </p>
              </CardBody>
              <CardFooter>
                <Button type="button" color="danger">
                  Excluir
                </Button>
                <Button
                  type="button"
                  color="warning"
                  className="ml-4"
                  onClick={this.openNewCartModal}
                >
                  Editar
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem md="4">
            <Card>
              <CardBody>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className="pointer my-1"
                  onClick={this.openNewCartModal}
                >
                  <Icon className={classNames(classes.icon, "fas fa-plus")} />
                  Novo Cartão
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <ModalNewCart
          openNewCart={this.state.openNewCart}
          openNewCartModal={this.openNewCartModal}
          closeNewCartModal={this.closeNewCartModal}
        />
      </div>
    );
  }
}

export default withStyles(style)(MyCarts);
