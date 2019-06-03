/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BlockUi from "react-block-ui";
import { Loader } from "react-loaders";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";
import Dropzone from "react-dropzone";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
	Card, 
	Col,
	CardFooter,
	Button,
	Label,
	Input,
} from "reactstrap";
import ModalNewDescriptionField from "../../components/Modal/ModalNewDescriptionField";
import ProductService from "../../services/ProductService";

export default class ProductNew extends Component {

	constructor(props) {
		super(props);
		this.service = new ProductService("products");
		this.pricingGroupservice = new GeneralService("pricinggroup");
		this.subCategoryservice = new GeneralService("subcategories");
		this.technicalFieldService = new GeneralService("technicalfields");
    
		this.state = {
			statusModal: false,
			product: {
				name: "",
				pricingGroupId: "",
				descriptionField: [],
				technicalFieldId: [],
				barCode: "",
				imgSrc: [],
				images: []
			},
			imgSrc: [],
			images: [],
			pricingGroup: [],
			subCategories: [],
			technicalFields: [],
      
			description: "",
			technicalField: "",
			update: false,
			loaderType: "ball-pulse-sync",
			blocking: true
		};

		this.updateDataName = this.updateDataName.bind(this);
		this.updateDataDescription = this.updateDataDescription.bind(this);
		this.updateDataBarCode = this.updateDataBarCode.bind(this);
		this.updateDataPricingGroup = this.updateDataPricingGroup.bind(this);
		this.updateDataSubCategory = this.updateDataSubCategory.bind(this);
		this.putProduct = this.putProduct.bind(this);
		this.postProduct = this.postProduct.bind(this);
		this.executeEvent = this.executeEvent.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
		this.getAllPricing = this.getAllPricing.bind(this);
		this.getAllSubCategories = this.getAllSubCategories.bind(this);
		this.getAllTechnicalFields = this.getAllTechnicalFields.bind(this);
		this.getFields = this.getFields.bind(this);
		this.updateDataFields = this.updateDataFields.bind(this);
		this.removeRowField = this.removeRowField.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.modal = this.modal.bind(this);
		this.onDrop = this.onDrop.bind(this);

		this.getFields().then(() => this.setState({
			blocking: false
		}));
	}

	async getFields(){
		await this.getAllPricing();
		await this.getAllSubCategories();
		await this.getAllTechnicalFields();
	}

	async getAllPricing(){
		await this.pricingGroupservice.getAll().then(val => this.setState({
			pricingGroup: val
		}));
	}

	async getAllTechnicalFields(){
		await this.technicalFieldService.getAll().then(val => this.setState({
			technicalFields: val
		}));
	}

	async getAllSubCategories(){
		await this.subCategoryservice.getAll().then(val => this.setState({
			subCategories: val
		}));
	}

	async putProduct(product){
		this.alterBlockUI();
		await this.service.put(product);
		this.props.history.push("listar-produtos");
		this.alterBlockUI();
	}

	async postProduct(product){
		this.alterBlockUI();
		await this.service.post(product);
		this.props.history.push("listar-produtos");
		this.alterBlockUI();
	}

	removeRowField(index){
		let descriptions = this.state.product.descriptionField;
		let ids= this.state.product.technicalFieldId;
		descriptions.splice(index,1);
		ids.splice(index,1);
		this.setState({
			descriptionField: descriptions,
			technicalFieldId: ids,
		});
	}

	executeEvent(product){ 
		product = {
			...product,
			imgSrc: [...this.state.imgSrc],
			images: [...this.state.images]
		};
		if(this.state.update === false)
			this.postProduct(product);
		else  
			this.putProduct(product);
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount() {
		if(this.props.location.state !== undefined){
			let idsSubCategories = [];
			let descriptions = [];
			let idsField = [];
			let imgs = [];
			for(let i = 0; i < this.props.location.state.product.subCategories.length; i++){
				idsSubCategories.push(this.props.location.state.product.subCategories[i].id);
			}
			for(let i = 0; i < this.props.location.state.product.technicalRow.length; i++){
				descriptions.push(this.props.location.state.product.technicalRow[i].description);
				idsField.push(this.props.location.state.product.technicalRow[i].technicalField.id);
			}
			
			if(this.props.location.state.product.imgSrc != null){
				for(let i = 0; i < this.props.location.state.product.imgSrc.length; i++){
					imgs.push(this.props.location.state.product.imgSrc[i]);
				}
			}
			this.setState({
				product: { ...this.props.location.state.product,
					subCategoryId: idsSubCategories,
					descriptionField: descriptions,
					technicalFieldId: idsField,
					pricingGroupId: this.props.location.state.product.pricingGroup.id
				},
				imgSrc: [...imgs],
				update: true
			});
		} else {
			this.setState({
				product: {
					pricingGroupId: 1
				},
				update: false
			});
		}
	}

	updateDataName(value){
		this.setState({
			product: {
				...this.state.product,
				name: value.target.value
			}
		});
	}

	updateDataDescription(value){
		this.setState({
			product: {
				...this.state.product,
				description: value.target.value
			}
		});
	}

	updateDataBarCode(value){
		this.setState({
			product: {
				...this.state.product,
				barCode: value.target.value
			}
		});
    
	}

	updateDataPricingGroup(value){
		this.setState({
			product: {
				...this.state.product,
				pricingGroupId: value.target.value
			}
		});
	}

	updateDataFields(description, idField){
		let ids = [];
		let descriptions = [];
		if(this.state.product.descriptionField !== undefined){
			for(let i = 0; i < this.state.product.descriptionField.length; i++){
				ids.push(this.state.product.technicalFieldId[i]);
				descriptions.push(this.state.product.descriptionField[i]);
			}
		}
		ids.push(Number(idField));
		descriptions.push(description);
		this.setState({
			product: {
				...this.state.product,
				descriptionField: descriptions,
				technicalFieldId: ids
			}
		});
		this.forceUpdate();
		// this.renderTable()
	}

	updateDataSubCategory(value){
		let ids = [];
		for(let i = 0; i < value.target.length; i++){
			if(value.target[i].selected){
				ids.push(value.target[i].value);
			}
		}
    
		this.setState({
			product: {
				...this.state.product,
				subCategoryId:  ids
			}
		});

	}

	renderTable() {
		let table = [];
		if(this.state.product.technicalFieldId !== undefined){
			for(let i = 0; i < this.state.product.technicalFieldId.length; i++){
				let technicalField;
				for(let f of this.state.technicalFields){
					if(f.id === this.state.product.technicalFieldId[i]){
						technicalField = f;
						break;
					}
				}
        
				if(technicalField !== undefined)
					table.push(
						<TableRow key={i}>
							<TableCell align="center" component="th" scope="row">
								{technicalField.name}
							</TableCell>
							<TableCell align="center">{this.state.product.descriptionField[i]}</TableCell>
							<TableCell align="center"><a href="#" className="text-danger" onClick={() => this.removeRowField(i)}><i className="tim-icons icon-trash-simple"></i></a></TableCell>
						</TableRow>
					);
			}
		}
    
		return table;
	}

	modal() {
		this.setState({
			statusModal: !this.state.statusModal
		});
	}

	onDrop (files, reject) {
		// POST to a test endpoint for demo purposes
    
		if(reject && reject.length > 0){
			alert("error");
			return;
		}

		for(let i = 0; i < files.length; i++){
			const fileItemReader = new FileReader();
			fileItemReader.addEventListener("load", () => {
				this.setState({
					imgSrc: [
						...this.state.imgSrc,
						fileItemReader.result
					],
					images: [
						...this.state.images,
						files[i]
					]
				});
			});
			fileItemReader.readAsDataURL(files[i]);
		}
    
	}

	render() {
		const { imgSrc } = this.state;
		return (
			<div className="content">
				<BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
					<Col xs="12">
						<h4 className="title">Dados do Produto</h4>
						<Card>
							<CustomTabs
								plainTabs
								headerColor="warning"
								tabs={[
									{
										tabName: "Dados básicos",
										tabContent: (
											<div>
												<Label for="productName">Nome do produto</Label>
												<Input type="text" id="productName" name="productName" value={this.state.product.name} onChange={this.updateDataName}></Input>
												<Label for="productDescription">Descrição do produto</Label>
												<Input type="textarea" rows="4" name="productDescription" id="productDescription" value={this.state.product.description} onChange={this.updateDataDescription} />
												<Label for="productBarCode">Código de barras</Label>
												<Input type="text" id="productBarCode" name="productBarCode" value={this.state.product.barCode} onChange={this.updateDataBarCode}></Input>
												<Label for="productPricingGroup">Grupo de precificação</Label>
												<Input type="select" name="productPricingGroup" id="productPricingGroup" value={this.state.product.pricingGroupId} onChange={this.updateDataPricingGroup}>
													{
														this.state.pricingGroup.map((pricing, index) => {
															if(this.state.product.pricingGroupId !== undefined && this.state.product.pricingGroupId.id === pricing.id){
																return(
																	<option selected value={pricing.id} key={index}>{pricing.name}</option>
																);  
															}
															return(
																<option value={pricing.id} key={index}>{pricing.name}</option>
															);
														})
													}
												</Input>
												<Label for="productsubCategory">SubCategorias</Label>
												<Input type="select" name="productsubCategory" id="productsubCategory" multiple value={this.state.product.subCategoryId} onChange={this.updateDataSubCategory}>
													{
														this.state.subCategories.map((subCat, index) => {
															if(this.state.product.subCategories !== undefined){
																let categories = this.state.product.subCategories;
																for(let i = 0; i < categories.length; i++) {
																	if(categories[i].id === subCat.id) {
																		return(
																			<option selected value={subCat.id} key={index}>{subCat.name} - {subCat.category.name}</option>
																		); 
																	}
																}
                                 
															}
															return(
																<option value={subCat.id} key={index}>{subCat.name} - {subCat.category.name}</option>
															);
														})
													}
												</Input>
											</div>
										)
									},
									{
										tabName: "Descrição tecnica",
										tabId: "tabDescricao",
										tabContent: (
											<div>
												<Button tag="label"
													className="btn-simple float-right"
													color="warning"
													size="md"
													id="btnNewDescription"
													onClick={() => { this.modal(); } }>
                                Nova Descrição tecnica
												</Button>
												<Table className={"mt-5"}>
													<TableHead>
														<TableRow>
															<TableCell align="center">Descrição</TableCell>
															<TableCell align="center">Valor</TableCell>
															<TableCell align="center">Remover</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{this.renderTable()}
													</TableBody>
												</Table>
											</div>
										)
									},
									{
										tabName: "Fotos",
										tabContent: (
											<div>
												<Dropzone onDrop={this.onDrop} multiple={true} accept="image/*">
													{imgSrc !== undefined ? 
														imgSrc.map((img, index) => {
															return(
																<img key={index} src={img} />
															);
														}): ""}
												</Dropzone>
                          Imagem dos produtos
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
									id="btnSaveProduct"
									onClick={() => { this.executeEvent(this.state.product); } }>
                      Salvar
								</Button>
							</CardFooter>
						</Card>
					</Col>
				</BlockUi>
				<ModalNewDescriptionField statusModal={this.state.statusModal}
					technicalFields={this.state.technicalFields}
					modal={this.modal} 
					description={this.state.description}
					technicalField={this.state.technicalField}
					updateDataFields={this.updateDataFields}></ModalNewDescriptionField>
			</div>
		);
	}
}

