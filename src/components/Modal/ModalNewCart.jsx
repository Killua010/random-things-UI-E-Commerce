import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "components/CustomButtons/Button.jsx";

import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import withStyles from "@material-ui/core/styles/withStyles";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";

import FormCart from "../../components/Forms/FormCart.jsx";

import "./modal.css";

class ModalNewCart extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullWidth="lg"
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.props.openNewCart}
        keepMounted
        onClose={this.props.closeNewCartModal}
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
            onClick={this.props.closeNewCartModal}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Novo Cartão</h4>
        </DialogTitle>
        <form onSubmit={this.props.handleSubmit}>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <FormCart card ={this.props.card}
                handleFieldChange={this.props.handleFieldChange} 
                update={this.props.update}/>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button color="warning" type="submit">Salvar</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(modalStyle)(ModalNewCart);
