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
		this.service = new GeneralService("providers");
		this.categoryservice = new GeneralService("categories");

		this.state = {
			provider: {
				name: "",
				cnpj: "",
				category: {},
				categoryId: ""
			},
			categories: [],
			update: false,
			loaderType: "ball-pulse-sync",
			blocking: false
		};

		this.updateData = this.updateData.bind(this);
		this.putProvider = this.putProvider.bind(this);
		this.postProvider = this.postProvider.bind(this);
		this.executeEvent = this.executeEvent.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
		this.getAllCategory = this.getAllCategory.bind(this);

		this.getAllCategory();
	}

	getAllCategory(){
		this.categoryservice.getAll().then(val => this.setState({
			categories: val
		})).then(() => this.setState({
			blocking: false
		}));
	}

	async putProvider(provider){
		this.alterBlockUI();
		await this.service.put(provider);
		this.props.history.push("lista");
		this.alterBlockUI();
	}

	async postProvider(provider){
		this.alterBlockUI();
		await this.service.post(provider);
		this.props.history.push("lista");
		this.alterBlockUI();
	}

	updateData(value){
		this.setState({
			provider: {
				...this.state.provider,
				[value.target.name]: value.target.value
			}
		});
	}

	executeEvent(provider){ 
		if(this.state.update === false)
			this.postProvider(provider);
		else  
			this.putProvider(provider);
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount() {
		if(this.props.location.state !== undefined){
      
			this.setState({
				provider: {
					...this.props.location.state.provider,
					categoryId: this.props.location.state.provider.category.id
				},
				update: true
			});
		} else {
			this.setState({
				provider: {},
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
												<Label for="name">Nome</Label>
												<Input type="text" id="name" name="name" value={this.state.provider.name} onChange={this.updateData}></Input>
												<Label for="cnpj">CNPJ</Label>
												<Input type="text" id="cnpj" name="cnpj" value={this.state.provider.cnpj} onChange={this.updateData}></Input>
												<Label for="categoryId">Categoria</Label>
												<Input type="select" name="categoryId" id="exampleSelect1" value={this.state.provider.categoryId} onChange={this.updateData}>
													{
														this.state.categories.map((category, index) => {
															if(this.state.provider.category !== undefined && this.state.provider.category.id === category.id){
																return(
																	<option selected value={category.id} key={index}>{category.name}</option>
																);  
															}
															return(
																<option value={category.id} key={index}>{category.name}</option>
															);
														})
													}
												</Input>
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
									onClick={() => { this.executeEvent(this.state.provider); } }>
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

