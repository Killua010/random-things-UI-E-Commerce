import React, { Component } from "react";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

import classNames from "classnames";

import FormClient from "../../components/Forms/FormClient";

import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import image from "../../assets/img/bg8.jpeg";

import "../../assets/css/index.css";

class ClientRegister extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
              <GridContainer className="p-1">
                <GridItem md="2" />
                <GridItem md="8">
                  <Card>
                    <CardHeader color="warning" className="text-center">
                      <h5>Novo Usuário</h5>
                    </CardHeader>
                    <CardBody>
                      <FormClient />
                      <Button
                        color="warning"
                        className="float-right"
                        href="/perfil"
                      >
                        Salvar
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem md="2" />
              </GridContainer>
            </div>
            </div>
            </div>
    );
  }
}

export default withStyles(loginPageStyle)(ClientRegister);
