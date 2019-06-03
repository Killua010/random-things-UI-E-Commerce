/* eslint-disable no-unused-vars */
import React, { Component } from "react";
// react plugin used to create charts
import { Polar, Bar } from "react-chartjs-2";

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Col} from "reactstrap";

// core components
import {
	orderByMounth,
	MainCategoryes,
	MainProducts
} from "variables/orderVariables.jsx";
import ReportOrderService from "../../services/ReportOrderService";

export default class ReportGeneralOrder extends Component {
	constructor(props) {
		super(props);

		this.service = new ReportOrderService("reports");
		this.state = {
			ordersByMounth: [],
			ordersByCategory: [],
			ordersByProduct: []
		};

		this.getAllOrders = this.getAllOrders.bind(this);

		this.getAllOrders();
	}

	async getAllOrders(){
		await this.service.getAllOrders().then((res) => {
			this.setState({
				ordersByMounth: res
			});
		});
    
		await this.service.getAllOrdersByCategories(0).then((res) => {
			this.setState({
				ordersByCategory: res
			});
		});

		await this.service.getAllOrdersByProduct(0).then((res) => {
			this.setState({
				ordersByProduct: res
			});
		});
	}
  
	render() {
		return (
			<div className="content">
				<Row>
					<Col xs="12">
						<Card className="card-chart">
							<CardHeader>
								<Row>
									<Col className="text-left" sm="6">
										<CardTitle tag="h2">Vendas por mês</CardTitle>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<div className="chart-area">
									<Bar
										data={(e) => orderByMounth.data(e, this.state.ordersByMounth)}
										options={orderByMounth.options}
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col lg="6">
						<Card className="card-chart">
							<CardHeader>
								<Row>
									<Col className="text-center">
										<CardTitle tag="h2">Top 4 categorias mais vendidas</CardTitle>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Polar
									data={() => MainCategoryes(this.state.ordersByCategory)}
								/>
							</CardBody>
						</Card>
					</Col>
					<Col lg="6">
						<Card className="card-chart">
							<CardHeader>
								<Row>
									<Col className="text-center">
										<CardTitle tag="h2">Top 5 produtos mais vendidas</CardTitle>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Polar
									data={() => MainProducts(this.state.ordersByProduct)}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
