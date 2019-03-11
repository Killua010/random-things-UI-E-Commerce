import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";


import ModalNewClient from "../../components/Modal/ModalNewClient";

import "../../assets/css/index.css";

class Profile extends React.Component {
  state = {
    openNewClient: false
  };

  openNewClientModal = () => {
    this.setState({ openNewClient: true });
  };

  closeNewClientModal = () => {
    this.setState({ openNewClient: false });
  };

  render() {
    return (
      <div className="content">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="content">
            <Row>
              <Col md={12}>
                <Card className="demo-icons">
                  <CardHeader>
                    <CardTitle>
                      Meus dados{" "}
                      <Button
                        type="button"
                        color="warning"
                        className="float-right"
                        onClick={this.openNewClientModal}
                      >
                        Editar
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <List component="nav">
                      <ListItemText secondary="Dados da conta" />
                      <ListItemText primary="Email: abc@efg.com" />
                      <ListItemText primary="Senha: abcefg" />
                    </List>
                    <List component="nav">
                      <ListItemText secondary="Dados Pessoais" />
                      <ListItemText primary="Nome: abc da silva efg" />
                      <ListItemText primary="Genero: MASCULINO" />
                      <ListItemText primary="CPF: 01234567890" />
                      <ListItemText primary="Data de nascimento" />
                    </List>
                    <List component="nav">
                      <ListItemText secondary="Contato" />
                      <ListItemText primary="Telefone: (12) 91234-5678" />
                      <ListItemText primary="Tipo: MOVEL" />
                      <ListItemText primary="Email: abc@efg.com" />
                    </List>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalNewClient
              openNewClient={this.state.openNewClient}
              openNewClientModal={this.openNewClientModal}
              closeNewClientModal={this.closeNewClientModal}
            />
          </div>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

export default Profile;
