/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BlockUi from "react-block-ui";
import { Loader } from "react-loaders";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";

import {
	Card, 
	Col,
	CardFooter,
	Button,
	Label,
	Input,
} from "reactstrap";

export default class TableFieldNew extends Component {

	constructor(props) {
		super(props);
		this.service = new GeneralService("technicalfields");

		this.state = {
			field: {},
			update: false,
			loaderType: "ball-pulse-sync",
			blocking: false
		};

		this.updateData = this.updateData.bind(this);
		this.putField = this.putField.bind(this);
		this.postField = this.postField.bind(this);
		this.executeEvent = this.executeEvent.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
	}

	async putField(field){
		this.alterBlockUI();
		await this.service.put(field);
		this.props.history.push("listar-campo-tecnico");
		this.alterBlockUI();
	}

	async postField(field){
		this.alterBlockUI();
		await this.service.post(field);
		this.props.history.push("listar-campo-tecnico");
		this.alterBlockUI();
	}

	updateData(value){
		this.setState({
			field: {
				...this.state.field,
				name: value.target.value
			}
		});
	}

	executeEvent(field){ 
		if(this.state.update === false)
			this.postField(field);
		else  
			this.putField(field);
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount() {
		if(this.props.location.state !== undefined){
			this.setState({
				field: this.props.location.state.field,
				update: true
			});
		} else {
			this.setState({
				field: {},
				update: false
			});
		}
	}

	render() {
		return (
			<div className="content">
				<BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
					<Col xs="12">
						<h4 className="title">Dados do Campo Tecnico</h4>
						<Card>
							<CustomTabs
								plainTabs
								headerColor="warning"
								tabs={[
									{
										tabName: "Dados básicos",
										tabContent: (
											<div>
												<Label for="fieldName">Nome do campo tecnico</Label>
												<Input type="text" id="fieldName" name="fieldName" value={this.state.field.name} onChange={this.updateData}></Input>
											</div>
										)
									}
								]}
							/>
							<CardFooter>
								<Button tag="label"
									className="btn-simple float-right"
									color="warning"
									size="md"
									onClick={() => { this.executeEvent(this.state.field); } }>
                      Salvar
								</Button>
							</CardFooter>
						</Card>
					</Col>
				</BlockUi>
			</div>
		);
	}
}

