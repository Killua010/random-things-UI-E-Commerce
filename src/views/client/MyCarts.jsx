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

import { bindActionCreators } from "redux";

import * as clientActions from "../../actions/client";

import { connect } from "react-redux";

import "../../assets/css/index.css";
import ClientService from "../../services/ClientService";
import CreditCardService from "../../services/CreditCardService";

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
  constructor(props){
    super(props);

    this.clientService = new ClientService("clients");
    this.service = new CreditCardService("creditCards");

    this.state = {
      openNewCart: false,
      cards: [],
      update: false,
      blocking: false,
      card: {}
    }


    this.deleteCard = this.deleteCard.bind(this);
    this.putCard = this.putCard.bind(this);
    this.postCard = this.postCard.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.alterBlockUI = this.alterBlockUI.bind(this);
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  async deleteCard(card){
    this.service.delete(card).then(() => {
      this.clientService.getById(this.props.client.id).then((resp) => {
        this.props.setClient(resp);
        this.setState({
          cards: [
            ...this.props.client.cards
          ]
        })
      })
    })
  }

  async putCard(){
    this.alterBlockUI()
    await this.service.put(this.props.client.id, this.state.card).then(
      (resp) => {
        if(resp === true){
          this.clientService.getById(this.props.client.id).then((resp) => {
            this.props.setClient(resp);
            this.setState({
              cards: [
                ...this.props.client.cards
              ]
            })
          })
          
        }
      })

      this.setState({
        openNewCart: false,
        cards: [
          ...this.props.client.cards
        ]
      })
      
    this.alterBlockUI()
  }

  async postCard(){
    this.alterBlockUI()
    await this.service.post(this.props.client.id, this.state.card).then(
      (resp) => {
        if(resp === true){
          this.clientService.getById(this.props.client.id).then((resp) => {
            this.props.setClient(resp);
            this.setState({
              cards: [
                ...this.props.client.cards
              ]
            })
          })
          
        }
      })

      this.setState({
        openNewCart: false,
        cards: [
          ...this.props.client.cards
        ]
      })
    this.alterBlockUI()
  }

  handleFieldChange(event) {
    this.setState({
      card: {
        ...this.state.card,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.state.update === true){
      this.putCard();
    } else {
      this.postCard();
    }
  }

  openNewCartModal = (card) => {
    if(card.id === undefined){
      this.setState({
        update: false,
        openNewCart: true,
        card: {
          number: "",
          printedName: "",
          securityCode: "",
          neighborhood: "",
          favorite: false,
          creditCardFlagId: ""
        }
       })  
    } else {
      this.setState({
        update: true,
        openNewCart: true,
        card: card
       })  
    }
  };

  closeNewCartModal = () => {
    this.setState({ openNewCart: false });
  };

  componentDidMount() {
    console.log(this.props.client)
    if(this.props.client === null){
      this.props.history.push("/login");
    } else {
      this.setState({
        cards: [
          ...this.props.client.cards
        ]
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="content">
        <GridContainer className="p-1">
            {
              this.state.cards.map((card, index) => {
                return (
                  <GridItem md="4" key={index}>
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
                          {card.printedName} <br />
                          {card.number} <br />
                          {card.flag.name}
                        </p>
                      </CardBody>
                      <CardFooter>
                        <Button type="button" color="danger" onClick={() => {this.deleteCard(card)}}>
                          Excluir
                        </Button>
                        <Button
                          type="button"
                          color="warning"
                          className="ml-4"
                          onClick={() => {this.openNewCartModal(card)}}
                        >
                          Editar
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                )
              })
            }
          <GridItem md="4">
            <Card>
              <CardBody>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className="pointer my-1"
                  onClick={() => {this.openNewCartModal({})}}
                >
                  <Icon className={classNames(classes.icon, "fas fa-plus")} />
                  Novo Cartão
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <ModalNewCart
          card ={this.state.card}
          handleSubmit={this.handleSubmit}
          handleFieldChange={this.handleFieldChange}
          openNewCart={this.state.openNewCart}
          openNewCartModal={this.openNewCartModal}
          closeNewCartModal={this.closeNewCartModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(clientActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MyCarts));
