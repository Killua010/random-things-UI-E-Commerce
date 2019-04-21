import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import PassWord from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import { bindActionCreators } from "redux";

import * as clientActions from "../../actions/client";

import * as cartActions from "../../actions/shoppingCart";

import { connect } from "react-redux";

import "../../assets/css/index.css";

import image from "../../assets/img/bg8.jpeg";
import ClientService from "../../services/ClientService.js";
import ShoppingCartService from "../../services/ShoppingCartService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ClientService("clients");
    this.shoppingCartService = new ShoppingCartService("shoppingCarts");
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.getShoppingCart = this.getShoppingCart.bind(this);
  }

  async getShoppingCart(id){
    await this.shoppingCartService.getByIdClient(id).then(resp => {
      if(resp !== null){
        this.props.setShoppingCart(resp)
      }
      
    })
  }

  async login(){
    let email = this.state.email;
    let password = this.state.password;
    await this.service.login({"email": email, "password": password}).then(resp => {
      if(resp !== null){
        this.props.setClient(resp);
        this.getShoppingCart(resp.id).then(() => 
          this.props.history.push("/perfil"))

      }
    })
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    if(this.props.client !== null && this.props.client !== undefined){
      this.props.history.push("/perfil");
    } 
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.login()
    // this.service.post(this.state.client).then(resp => {
    //   if(resp === true){
    //     this.props.history.push("login");
    //   }
    // })
  }

  render() {
    const { classes, ...rest } = this.props;
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader color="warning" className={classes.cardHeader}>
                      <h4 className="no-margin">Login</h4>
                    </CardHeader>
                    <CardBody>
                      <GridItem xs="12" className="login-input">
                        <CustomInput
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            id: "email",
                            name: "email",
                            onChange: this.handleFieldChange,
                            value: this.state.email,
                            type: "email",
                            placeholder: "Email...",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs="12" className="login-input">
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            id: "password",
                            name: "password",
                            onChange: this.handleFieldChange,
                            value: this.state.password,
                            placeholder: "Senha...",
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <PassWord className={classes.inputIconsColor} />
                              </InputAdornment>
                              // <InputAdornment position="end">
                              //   <Icon className={classes.inputIconsColor}>
                              //     lock_outline
                              //   </Icon>
                              // </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="warning" size="lg" type="submit" id="entrar">
                        Entrar
                      </Button>
                    </CardFooter>
                    <CardFooter className={classes.cardFooter}>
                      <div>
                        <Typography className={classes.divider + " no-margin"}>
                          Ainda não é cadastrado ?
                        </Typography>
                        <Button simple color="warning" size="lg" href="/cadastro">
                          Novo cadastro
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => 
      bindActionCreators({...clientActions, ...cartActions}, dispatch);
  const mapStateToProps = state => ({
    client: state.client,
    cart: state.cart
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(Login));
