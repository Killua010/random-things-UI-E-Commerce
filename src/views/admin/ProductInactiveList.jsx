/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import SimpleService from "../../services/SimpleService";
import swal from "sweetalert";
import { MDBDataTable } from "mdbreact";

import BlockUi from "react-block-ui";
import { Loader } from "react-loaders";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";
import ModalInactiveProduct from "../../components/Modal/ModalInactiveProduct";
import {
	Card, 
	Row,
	Col,
	CardHeader,
	CardBody,
	Button,
} from "reactstrap";
import ProductService from "../../services/ProductService";
import ModalActiveProduct from "../../components/Modal/ModalActiveProduct";

export default class ProductInactiveList extends Component {

	constructor(props) {
		super(props);
		this.service = new ProductService("products");
		this.inactiveStatusService = new GeneralService("statusActivation");
		this.inativationService = new SimpleService("activations");

		this.state = {
			statusInactive: [],
			statusModal: false,
			description: "",
			inactiveStatu: {},
			products: [],
			product: {},
			loaderType: "ball-pulse-sync",
			blocking: true,
			data: {
				columns: [{
					label: "Nome",
					field: "name",
					sort: "asc"
				},
				{
					label: "Ativar",
					field: "active",
					width: 15
				}]    
			}
		};

		this.getAllProduct = this.getAllProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
		this.getAllStatusType = this.getAllStatusType.bind(this);
		this.updateDataInactive = this.updateDataInactive.bind(this);
		this.getFields = this.getFields.bind(this);
		this.statusModal = this.statusModal.bind(this);

		this.getFields().then(() => this.setState({
			blocking: false
		}));
    
    
	}

	async getFields(){
		await this.getAllProduct();
		await this.getAllStatusType();
	}

	updateDataInactive(description, statu){
		if(statu === undefined){
			statu = this.state.statusInactive[0].name;
		}
		let inactive = {
			description: description,
			statusActivation: statu,
			productId: this.state.product.id
		};
		this.deleteProduct(inactive);
	}

	editProduct(product){
		this.props.history.push({pathname: "novo-produto", state: { product: product }});
	}

	newProduct() {
		this.props.history.push("novo-produto");
	}

	async getAllStatusType(){
		await this.inactiveStatusService.getAll().then(val => this.setState({
			statusInactive: val
		}));
	}

	async getAllProduct(){
		await this.service.getAllInactive().then(val => this.setState({
			products: val
		})).then(() => {
      
			let data = [];
			this.state.products.map((product) => {
				data.push({
					name: product.name,
					active: <a href="#" className="text-warning" onClick={() => this.statusModal(product)}><i className="tim-icons icon-check-2"></i></a>
				});
			});

			this.setState({
				data: {
					...this.state.data,
					rows: data
				}
			});
		});
	}

	async deleteProduct(inactivation){
		this.alterBlockUI();
		await this.inativationService.post(inactivation);
		await this.getAllProduct();
		this.alterBlockUI();
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	removeProduct(product){
		this.deleteProduct(product);
	}

	statusModal(product) {
		this.setState({
			statusModal: !this.state.statusModal,
			product: product
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
										<h4 className="title">Produtos Inativos</h4>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<MDBDataTable
									className="mb-4 text-center"
									striped
									hover
									data={this.state.data}
									searchLabel = "Buscar..."
									entriesLabel = "Quantidade de elementos"
									infoLabel = {["Mostrando", "de", "de", "elementos"]}
									paginationLabel= {["Anterior", "Próximo"]}
								/>
							</CardBody>
						</Card>
					</Col>
				</BlockUi>
				<ModalActiveProduct statusModal={this.state.statusModal}
					statusActivation={this.state.statusInactive}
					modal={this.statusModal} 
					description={this.state.description}
					technicalField={this.state.technicalField}
					updateDataInactive={this.updateDataInactive}></ModalActiveProduct>
			</div>
		);
	}
}
