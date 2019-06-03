/* eslint-disable no-unused-vars */
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
import ModalNewAddress from "components/Modal/ModalNewAddress";

import { bindActionCreators } from "redux";

import * as clientActions from "../../actions/client";

import { connect } from "react-redux";

import "../../assets/css/index.css";
import DeliveryAddressService from "../../services/DeliveryAddressService";
import ClientService from "../../services/ClientService";

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

class MyAddress extends Component {
	constructor(props){
		super(props);
		this.clientService = new ClientService("clients");
		this.service = new DeliveryAddressService("deliveryAddress");

		this.state = {
			addresses: [],
			address: {
				city: {}
			},
			openNewAddress: false,
			update: false,
			blocking: false
		};

		this.postAddress = this.postAddress.bind(this);
		this.putAddress = this.putAddress.bind(this);
		this.deleteAddress = this.deleteAddress.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
		this.openNewAddressModal = this.openNewAddressModal.bind(this);
		this.closeNewAddressModal = this.closeNewAddressModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	async deleteAddress(address){
		this.service.delete(address).then(() => {
			this.clientService.getById(this.props.client.id).then((resp) => {
				this.props.setClient(resp);
				this.setState({
					addresses: [
						...this.props.client.deliveryAddress
					]
				});
			});
		});
	}

	async putAddress(){
		this.alterBlockUI();
    
		await this.service.put(this.props.client.id, this.state.address).then(
			(resp) => {
				if(resp === true){
					this.clientService.getById(this.props.client.id).then((resp) => {
						this.props.setClient(resp);
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
			addresses: [
				...this.props.client.deliveryAddress
			]
		});
      
		this.alterBlockUI();
	}

	async postAddress(){
		this.alterBlockUI();
		await this.service.post(this.props.client.id, this.state.address).then(
			(resp) => {
				if(resp === true){
					this.clientService.getById(this.props.client.id).then((resp) => {
						this.props.setClient(resp);
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
			addresses: [
				...this.props.client.deliveryAddress
			]
		});
		this.alterBlockUI();
	}
  
	componentDidMount() {
		if(this.props.client === null){
			this.props.history.push("/login");
		} else {
			this.setState({
				addresses: [
					...this.props.client.deliveryAddress
				]
			});
		}
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	openNewAddressModal(address) {
		if(address.city.cityId === undefined){
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
		} else {
			this.setState({
				update: true,
				openNewAddress: true,
				address: address
			});  
		}
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
		if(this.state.update === true){
			this.putAddress();
		} else {
			this.postAddress();
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="content">
				<GridContainer className="p-1">
					{
						this.state.addresses.map((address, index) => {
							return (
								<GridItem sm="6" key={index}>
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
												{address.street} - {address.number}
												<br />
												{address.neighborhood} - {address.city.cityName} - {address.city.stateCode}
												<br />
												{address.zipCode}
											</p>
										</CardBody>
										<CardFooter>
											<Button type="button" color="danger" onClick={() => this.deleteAddress(address)}>
                        Excluir
											</Button>
											<Button
												type="button"
												color="warning"
												className="ml-4"
												onClick={() => this.openNewAddressModal(address)}
											>
                        Editar
											</Button>
										</CardFooter>
									</Card>
								</GridItem>
							);
						})
					}
					<GridItem sm="6">
						<Card>
							<CardBody>
								<Typography
									variant="h4"
									color="textSecondary"
									className="pointer my-1"
									onClick={() => this.openNewAddressModal({city: {}})}
								>
									<Icon className={classNames(classes.icon, "fas fa-plus")} />
                  Novo Endereço
								</Typography>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MyAddress));
