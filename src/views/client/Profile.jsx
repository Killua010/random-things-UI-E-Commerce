/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GeneralService from "../../services/GeneralService";

import ModalNewClient from "../../components/Modal/ModalNewClient";

import { bindActionCreators } from "redux";

import * as clientActions from "../../actions/client";

import { connect } from "react-redux";

import "../../assets/css/index.css";
import ClientService from "../../services/ClientService";

class Profile extends React.Component {

	constructor(props){
		super(props);

		this.service = new GeneralService("clients");
		this.clientService = new ClientService("clients");

		this.state = {
			openNewClient: false,
			client: {},
			blocking: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.openNewClientModal = this.openNewClientModal.bind(this);
		this.closeNewClientModal = this.closeNewClientModal.bind(this);

	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount(){
		if(this.props.client === null){
			this.props.history.push("/login");
		} else {
			this.setState({
				client: {
					...this.props.client,
					confirmPassword: this.props.client.password
				}
			});
		}
	}

	handleFieldChange(event) {
		this.setState({
			client: {
				...this.state.client,
				[event.target.name]: event.target.value
			}
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.alterBlockUI();
		await this.service.put(this.state.client).then(
			(resp) => {
				if(resp === null){
					this.setState({
						client: {
							...this.props.client,
							confirmPassword: this.props.client.password
						}
					});
				} else {
					this.clientService.getById(this.state.client).then(
						(resp) => {
							this.props.setClient(resp[0]);
							this.setState({
								openNewClient: false,
								client: {
									...this.props.client,
									confirmPassword: this.props.client.password
								}
							});
						}
					);
				}
				this.setState({
					openNewClient: false,
					client: this.props.client
				});
			}
		);
		this.alterBlockUI();
	}

	openNewClientModal() {
		this.setState({ openNewClient: true });
	}

	closeNewClientModal() {
		this.setState({ openNewClient: false });
	}

	render() {
		return (
			<div className="content">
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<div className="content">
							<Row>
								<Col md={12}>
									<Card className="demo-icons">
										<CardHeader>
											<CardTitle>
                      Meus dados{" "}
												<Button
													type="button"
													color="warning"
													className="float-right"
													id="editar-dados-basicos"
													onClick={this.openNewClientModal}
												>
                        Editar
												</Button>
											</CardTitle>
										</CardHeader>
										<CardBody>
											<List component="nav">
												<ListItemText secondary={"Dados da conta"} />
												<ListItemText primary={`Email: ${this.state.client.email}`} />
												<ListItemText primary={`Senha: ${this.state.client.password}`} />
											</List>
											<List component="nav">
												<ListItemText secondary="Dados Pessoais" />
												<ListItemText primary={`Nome: ${this.state.client.firstName} ${this.state.client.lastName}`} />
												<ListItemText primary={`Genero: ${this.state.client.gender}`} />
												<ListItemText primary={`CPF: ${this.state.client.cpf}`} />
												<ListItemText primary={`Data de nascimento: ${this.state.client.birthDate}`} />
											</List>
											<List component="nav">
												<ListItemText secondary="Contato" />
												<ListItemText primary={`Telefone: ${this.state.client.phone}`} />
												<ListItemText primary={`Tipo: ${this.state.client.telephoneType}`} />
												<ListItemText primary={`Email: ${this.state.client.email}`} />
											</List>
										</CardBody>
									</Card>
								</Col>
							</Row>
							<ModalNewClient
								client ={this.state.client}
								handleSubmit={this.handleSubmit}
								handleFieldChange={this.handleFieldChange}
								openNewClient={this.state.openNewClient}
								openNewClientModal={this.openNewClientModal}
								closeNewClientModal={this.closeNewClientModal}
							/>
						</div>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(clientActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
