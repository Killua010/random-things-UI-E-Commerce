/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";


import FormClient from "../../components/Forms/FormClient";

import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import image from "../../assets/img/bg8.jpeg";
import GeneralService from "../../services/GeneralService";
import "../../assets/css/index.css";

class ClientRegister extends Component {

	constructor(props){
		super(props);

		this.service = new GeneralService("clients");

		this.state = {
			client: {
				firstName: "",
				lastName: "",
				email: "",
				gender: "",
				cpf: "",
				phone: "",
				telephoneType: "",
				birthDate: "",
				password: "",
				confirmPassword: ""
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);

	}

	handleFieldChange(event) {
		this.setState({
			client: {
				...this.state.client,
				[event.target.name]: event.target.value
			}
		});
	}

  
	handleSubmit(e) {
		e.preventDefault();
		this.service.post(this.state.client).then(resp => {
			if(resp !== null){
				this.props.history.push("login");
			}
		});
	}

	render() {
		const { classes } = this.props;
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
						<GridContainer className="p-1">
							<GridItem md={2} />
							<GridItem md={8}>
								<Card>
									<CardHeader color="warning" className="text-center">
										<h5>Novo Usuário</h5>
									</CardHeader>
									<CardBody>
										<form onSubmit={this.handleSubmit}>
											<FormClient client ={this.state.client}
												handleFieldChange={this.handleFieldChange} />
											<Button
												id="saveClient"
												type="submit"
												color="warning"
												className="float-right"
											>
                          Salvar
											</Button>
										</form>
									</CardBody>
								</Card>
							</GridItem>
							<GridItem md={2} />
						</GridContainer>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(loginPageStyle)(ClientRegister);
