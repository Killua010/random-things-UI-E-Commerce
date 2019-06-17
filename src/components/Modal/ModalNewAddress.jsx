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

import FormAddress from "../Forms/FormAddress.jsx";

import "./modal.css";

class ModalNewAddress extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Dialog
				fullWidth="lg"
				classes={{
					root: classes.center,
					paper: classes.modal
				}}
				open={this.props.openNewAddress}
				keepMounted
				onClose={this.props.closeNewAddressModal}
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
						onClick={this.props.closeNewAddressModal}
					>
						<Close className={classes.modalClose} />
					</IconButton>
					<h4 className={classes.modalTitle}>Endereço</h4>
				</DialogTitle>
				<form onSubmit={this.props.handleSubmit}>
					<DialogContent
						id="modal-slide-description"
						className={classes.modalBody}
					>
						<FormAddress address ={this.props.address}
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

export default withStyles(modalStyle)(ModalNewAddress);
