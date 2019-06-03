/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import swal from "sweetalert";

import BlockUi from "react-block-ui";
import { Loader } from "react-loaders";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";

import {
	Card, 
	Row,
	Col,
	CardHeader,
	CardBody,
	Button,
	Table,
} from "reactstrap";

export default class ProviderList extends Component {

	constructor(props) {
		super(props);
		this.service = new GeneralService("providers");

		this.state = {
			statusModal: false,
			fields: [],
			field: {},
			loaderType: "ball-pulse-sync",
			blocking: true
		};

		this.getAllField = this.getAllField.bind(this);
		this.deleteField = this.deleteField.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
    
		this.getAllField();
	}

	editField(provider){
		this.props.history.push({pathname: "novo", state: { provider: provider }});
	}

	newField() {
		this.props.history.push("novo");
	}

	getAllField(){
		this.service.getAll().then(val => this.setState({
			fields: val
		})).then(() => this.setState({
			blocking: false
		}));
	}

	async deleteField(field){
		this.alterBlockUI();
		await this.service.delete(field);
		await this.getAllField();
		this.alterBlockUI();
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	removeField(field){
		swal({
			title: "Tem certeza que deseja excluir esse campo tecnico?",
			icon: "warning",
			buttons: {
				cancel: "Não, cancelar",
				confirm: {
					text: "Sim, desejo deletar!",
					className: "btn-warning"
				}
			}
		}).then((result) => {
			if(result){
				this.deleteField(field);
			}
		});
	}

	render() {
		return (
			<div className="content">
				<BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
					<Col xs="12">
						<Card className="card-chart">
							<CardHeader>
								<Row>
									<Col sm="6">
										<h4 className="title">Dados Fornecedores</h4>
									</Col>
									<Col sm="6">
										<Button tag="label"
											className="btn-simple float-right"
											color="warning"
											size="md"
											onClick={() => { this.newField(); } }>
                            Novo Fornecedor
										</Button>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Table hover>
									<thead>
										<tr>
											<th className="text-center">Nome</th>
											<th className="text-center">Categoria</th>
											<th className="text-center">Remover</th>
										</tr>
									</thead>
									<tbody>
										{ 
                      
											this.state.fields.map((field, index) => {
												return (
													<tr key={index}>
														<td className="text-center hover-point" onClick={() => this.editField(field) }>{field.name}</td>
														<td className="text-center hover-point" onClick={() => this.editField(field) }>{field.category.name}</td>
														<td className="text-center"><a href="#" className="text-danger" onClick={() => this.removeField(field)}><i className="tim-icons icon-trash-simple"></i></a></td>
													</tr>
												);
											})
										}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</BlockUi>
			</div>
		);
	}
}
