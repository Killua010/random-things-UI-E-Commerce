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
import ModalNewAddress from "components/Modal/ModalNewAddress";

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

class MyAddress extends Component {
  state = {
    openNewAddress: false
  };

  componentDidMount() {
    console.log("endereço " + this.props.location.state)
  }

  openNewAddressModal = () => {
    this.setState({ openNewAddress: true });
  };

  closeNewAddressModal = () => {
    this.setState({ openNewAddress: false });
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
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
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
                  onClick={this.openNewAddressModal}
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
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
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
                  onClick={this.openNewAddressModal}
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
                  onClick={this.openNewAddressModal}
                >
                  <Icon className={classNames(classes.icon, "fas fa-plus")} />
                  Novo Endereço
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <ModalNewAddress
          openNewAddress={this.state.openNewAddress}
          openNewAddressModal={this.openNewAddressModal}
          closeNewAddressModal={this.closeNewAddressModal}
        />
      </div>
    );
  }
}

export default withStyles(style)(MyAddress);
