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

export default class SubCategoryNew extends Component {

	constructor(props) {
		super(props);
		this.service = new GeneralService("subcategories");
		this.categoryservice = new GeneralService("categories");

		this.state = {
			categories: [],
			subCategory: {},
			update: false,
			loaderType: "ball-pulse-sync",
			blocking: false
		};

		this.updateCategory = this.updateCategory.bind(this);
		this.updateData = this.updateData.bind(this);
		this.putSubCategory = this.putSubCategory.bind(this);
		this.postSubCategory = this.postSubCategory.bind(this);
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

	async putSubCategory(subCategory){
		this.alterBlockUI();
		await this.service.put(subCategory);
		this.props.history.push("listar-subcategorias");
		this.alterBlockUI();
	}

	async postSubCategory(subCategory){
		this.alterBlockUI();
		await this.service.post(subCategory);
		this.props.history.push("listar-subcategorias");
		this.alterBlockUI();
	}

	updateData(value){
		this.setState({
			subCategory: {
				...this.state.subCategory,
				name: value.target.value
			}
		});
	}

	updateCategory(value){
		this.setState({
			subCategory: {
				...this.state.subCategory,
				categoryId: value.target.value
			}
		});
	}

	executeEvent(subCategory){ 
		if(this.state.update === false)
			this.postSubCategory(subCategory);
		else  
			this.putSubCategory(subCategory);
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount() {
		if(this.props.location.state !== undefined){
			this.setState({
				subCategory: { 
					...this.props.location.state.subCategory,
					categoryId: this.props.location.state.subCategory.category.id
				},
				update: true
			});
		} else {
			this.setState({
				subCategory: {
					categoryId: "1"
				},
				update: false
			});
		}
	}

	render() {
		return (
			<div className="content">
				<BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
					<Col xs="12">
						<h4 className="title">Dados da subcategoria</h4>
						<Card>
							<CustomTabs
								plainTabs
								headerColor="warning"
								tabs={[
									{
										tabName: "Dados básicos",
										tabContent: (
											<div>
												<Label for="subCategoryName">Nome da subcategoria</Label>
												<Input type="text" id="subCcategoryName" name="subCategoryName" value={this.state.subCategory.name} onChange={this.updateData}></Input>
												<Label for="category">Categoria</Label>
												<Input type="select" name="category" id="exampleSelect1" value={this.state.subCategory.categoryId} onChange={this.updateCategory}>
													{
														this.state.categories.map((category, index) => {
															if(this.state.subCategory.category !== undefined && this.state.subCategory.category.id === category.id){
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
									onClick={() => { this.executeEvent(this.state.subCategory); } }>
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

