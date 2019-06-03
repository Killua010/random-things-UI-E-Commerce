/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import { MDBDataTable } from "mdbreact";

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
} from "reactstrap";

export default class StockList extends Component {

	constructor(props) {
		super(props);
		this.service = new GeneralService("products");

		this.state = {
			statusModal: false,
			products: [],
			data: {
				columns: [{
					label: "Produto",
					field: "product",
					sort: "asc"
				},{
					label: "Quantidade",
					field: "quantity",
					sort: "asc"
				},
				{
					label: "Preço",
					field: "priece",
					sort: "asc"
				}]    
			},
			loaderType: "ball-pulse-sync",
			blocking: true
		};

		this.getAllProduct = this.getAllProduct.bind(this);
		this.getAllProduct();
	}
	async getAllProduct(){
		await this.service.getAll().then(val => this.setState({
			products: val
		})).then(() => {
      
			let data = [];
			this.state.products.map((product) => {
				data.push({
					product: product.name,
					quantity: product.stockQuantity,
					priece: product.price
				});
			});

			this.setState({
				data: {
					...this.state.data,
					rows: data
				}
			}, this.alterBlockUI());
		});
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
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
										<h4 className="title">Entradas do estoque</h4>
									</Col>
									<Col sm="6">
										<Button tag="label"
											className="btn-simple float-right"
											color="warning"
											size="md"
											onClick={() => { this.newStockInput(); } }>
                            Nova entrada no estoque
										</Button>
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
			</div>
		);
	}
}
