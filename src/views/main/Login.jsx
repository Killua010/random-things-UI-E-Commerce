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

import "../../assets/css/index.css";

import image from "../../assets/img/bg8.jpeg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
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
                  <form className={classes.form}>
                    <CardHeader color="warning" className={classes.cardHeader}>
                      <h4 className="no-margin">Login</h4>
                    </CardHeader>
                    <CardBody>
                      <GridItem xs="12" className="login-input">
                        <CustomInput
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "Email...",
                            type: "email",
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
                      <Button color="warning" size="lg" href="/perfil">
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

export default withStyles(loginPageStyle)(Login);
