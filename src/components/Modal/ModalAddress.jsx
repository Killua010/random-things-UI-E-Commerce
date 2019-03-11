import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Button from "components/CustomButtons/Button.jsx";

import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import withStyles from "@material-ui/core/styles/withStyles";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";

import ModalNewAddress from "./ModalNewAddress";

import "./modal.css";

class ModalAddress extends Component {
  state = {
    openNewAddress: false
  };

  newAddress = () => {
    this.props.closeAddressModal();
    this.openNewAddressModal();
  };

  openNewAddressModal = () => {
    this.setState({ openNewAddress: true });
  };

  closeNewAddressModal = () => {
    this.setState({ openNewAddress: false });
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
          open={this.props.openAddress}
          keepMounted
          onClose={this.props.closeAddressModal}
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
              onClick={this.props.closeAddressModal}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Meus Endereços</h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <Card className="pointer" onClick={this.props.closeAddressModal}>
              <CardBody>
                <p>
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
                </p>
              </CardBody>
            </Card>
            <Card className="pointer" onClick={this.props.closeAddressModal}>
              <CardBody>
                <p>
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
                </p>
              </CardBody>
            </Card>
            <Card className="pointer" onClick={this.props.closeAddressModal}>
              <CardBody>
                <p>
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
                </p>
              </CardBody>
            </Card>
            <Card className="pointer" onClick={this.props.closeAddressModal}>
              <CardBody>
                <p>
                  Rua Doutor Raul Abbott Escobar 549
                  <br />
                  Parque Califórnia Campos dos Goytacazes RJ
                  <br />
                  28015-312
                </p>
              </CardBody>
            </Card>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={this.newAddress} color="warning">Outro Endereço</Button>
          </DialogActions>
        </Dialog>
        <ModalNewAddress
          openNewAddress={this.state.openNewAddress}
          openNewAddressModal={this.openNewAddressModal}
          closeNewAddressModal={this.closeNewAddressModal}
        />
      </div>
    );
  }
}

export default withStyles(modalStyle)(ModalAddress);
