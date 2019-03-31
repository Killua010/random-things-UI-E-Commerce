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

import FormClient from "../Forms/FormClient.jsx";

import "./modal.css";

class ModalNewClient extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullWidth="lg"
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.props.openNewClient}
        keepMounted
        onClose={this.props.closeNewClientModal}
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
            onClick={this.props.closeNewClientModal}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Editar dados</h4>
        </DialogTitle>
        <form onSubmit={this.props.handleSubmit}>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <FormClient client ={this.props.client}
              handleFieldChange={this.props.handleFieldChange}/>
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

export default withStyles(modalStyle)(ModalNewClient);
