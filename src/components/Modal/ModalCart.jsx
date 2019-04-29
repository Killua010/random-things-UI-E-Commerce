import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Button from "components/CustomButtons/Button.jsx";

import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import withStyles from "@material-ui/core/styles/withStyles";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";

import ModalNewCart from "./ModalNewCart";

import "./modal.css";

class ModalCart extends Component {
  state = {
    openNewCart: false
  };

  newCart = () => {
    this.props.closeCartaoModal();
    this.openNewCartModal();
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
      <div>
        <Dialog
          fullWidth="sm"
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.props.openCartao}
          keepMounted
          onClose={this.props.closeCartaoModal}
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.closeCartaoModal}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <Typography component="h4" variant="h5" className={classes.modalTitle}>Meus cartões</Typography>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
          {
            this.props.cards.map((card, index) => {
              return(
                <Card className="pointer" key={index} onClick={() => {this.props.closeCartaoModal();this.props.alterFavoriteCard(card)}}>
                  <CardBody>
                    <Typography>
                      {card.printedName} <br />
                      {card.number} <br />
                      {card.flag.name}
                    </Typography>
                  </CardBody>
                </Card>
              )
            })
          }
          </DialogContent>
          {/* <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={this.newCart} color="warning">Outro Cartão</Button>
          </DialogActions> */}
        </Dialog>
        {/* <ModalNewCart
          openNewCart={this.state.openNewCart}
          openNewCartModal={this.openNewCartModal}
          closeNewCartModal={this.closeNewCartModal}
        /> */}
      </div>
    );
  }
}

export default withStyles(modalStyle)(ModalCart);
