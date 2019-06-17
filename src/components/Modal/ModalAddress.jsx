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
import DeliveryAddressService from "../../services/DeliveryAddressService";
import ClientService from "../../services/ClientService";

import { bindActionCreators } from "redux";

import * as clientActions from "../../actions/client";

import { connect } from "react-redux";

import ModalNewAddress from "./ModalNewAddress";

import "./modal.css";

class ModalAddress extends Component {
  constructor(props){
    super(props);
    this.clientService = new ClientService("clients");
    this.service = new DeliveryAddressService("deliveryAddress");
  this.state = {
    openNewAddress: false,
    address: {
      city: {},
      favorite: false
    }
  };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.openNewAddressModal = this.openNewAddressModal.bind(this);
    this.closeNewAddressModal = this.closeNewAddressModal.bind(this);
    this.postAddress = this.postAddress.bind(this);
};

openNewAddressModal() {
    this.setState({
      update: false,
      openNewAddress: true,
      address: {
        fullName: "",
        street: "",
        number: "",
        neighborhood: "",
        zipCode: "",
        observation: "",
        favorite: false,
        cityId: "",
        stateId: "",
        residenceTypeId: ""
      }
    });  
}

closeNewAddressModal() {
  this.setState({ openNewAddress: false });
}

  handleFieldChange(event) {
		this.setState({
			address: {
				...this.state.address,
				[event.target.name]: event.target.value
			}
		});
	}  

  async handleSubmit(e) {
		e.preventDefault();
    this.postAddress();
	}

  newAddress = () => {
    this.props.closeAddressModal();
    this.openNewAddressModal();
  };

  async postAddress(){
		await this.service.post(this.props.client.id, this.state.address).then(
			(resp) => {
				if(resp !== null){
					this.clientService.getById(this.props.client).then((resp) => {
						this.props.setClient(resp[0]);
						this.setState({
							addresses: [
								...this.props.client.deliveryAddress
							]
						});
					});
          
				}
			});

		this.setState({
      openNewAddress: false,
      address: {
        fullName: "",
        street: "",
        number: "",
        neighborhood: "",
        zipCode: "",
        observation: "",
        favorite: false,
        cityId: "",
        stateId: "",
        residenceTypeId: ""
      }
    });
    
	}

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
            <Typography component="h4" variant="h5" className={classes.modalTitle}>Meus Endereços</Typography>
          </DialogTitle>
          <DialogContent
            id="modal-address-order"
            className={classes.modalBody}
          >
            
              {this.props.address.map((add, index) => {
                return(
                  <Card className="pointer" key={index} onClick={() => {this.props.closeAddressModal();this.props.alterFavoriteAdderss(add)}}>
                    <CardBody>
                      <Typography>
                        {add.street} - {add.number}
                        <br />
                        {add.neighborhood} - {add.city.cityName} - {add.city.stateCode}
                        <br />
                        {add.zipCode}
                      </Typography>
                    </CardBody>
                  </Card>
                )
              })}
             
          </DialogContent>
          {<DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={this.newAddress} color="warning">Novo Endereço</Button>
          </DialogActions> }
        </Dialog>
        <ModalNewAddress
					address ={this.state.address}
					handleSubmit={this.handleSubmit}
					handleFieldChange={this.handleFieldChange}
					openNewAddress={this.state.openNewAddress}
					openNewAddressModal={this.openNewAddressModal}
					closeNewAddressModal={this.closeNewAddressModal}
					update={this.state.update}
				/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	client: state.client
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(clientActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalStyle)(ModalAddress));
