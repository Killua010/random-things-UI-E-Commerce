import React, { Component } from "react";

import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

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

class Payment extends Component {
  state = {
    openCartao: false,
    openAddress: false
  };

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
                        Rua Doutor Raul Abbott Escobar 549
                        <br />
                        Parque Califórnia Campos dos Goytacazes RJ
                        <br />
                        28015-312
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
                        Edson Benjamin da Paz <br />
                        1234.1234.1234.1234 <br />
                        Visa
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
                        (4 itens) R$ 12,00
                      </Typography>
                      <Typography variant="subtitle1">
                        Frete: R$ 15,00
                      </Typography>
                      <Typography variant="subtitle1">Peso: 1.5 Kg</Typography>
                      <Typography variant="h5">Total: R$ 27,00</Typography>
                      <Button
                        color="warning"
                        size="lg"
                        href="/pedidoFinalizado"
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
        />
        <ModalAddress
          openAddress={this.state.openAddress}
          openAddressModal={this.openAddressModal}
          closeAddressModal={this.closeAddressModal}
        />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Payment);
