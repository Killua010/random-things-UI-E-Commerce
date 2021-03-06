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
	Label,
	Input,
	Row,
	Col} from "reactstrap";

// core components
import {
	orderCategoryByMounth,
	MainCategoryes} from "variables/orderCategoryVariables.jsx";
import ReportOrderService from "../../services/ReportOrderService";

export default class ReportGeneralOrder extends Component {
	constructor(props) {
		super(props);

		this.service = new ReportOrderService("reports");
		this.state = {
			mounth: 0,
			date1: "2019-01-01",
			date2: "2019-12-31",
			ordersCategoryByMounth: [],
			ordersByCategory: [],
			ordersCategoryMale: [],
			ordersCategoryFemale: [],
			ordersCategoryNotBinary: [],
			ordersCategoryMaleYoung: [],
			ordersCategoryFemaleYoung: [],
			ordersCategoryNotBinaryYoung: [],
			ordersCategoryMaleAdult: [],
			ordersCategoryFemaleAdult: [],
			ordersCategoryNotBinaryAdult: [],
			ordersCategoryMaleOld: [],
			ordersCategoryFemaleOld: [],
			ordersCategoryNotBinaryOld: []
		};

		this.getAllOrders = this.getAllOrders.bind(this);
		this.updateFilter = this.updateFilter.bind(this);

		this.getAllOrders();
	}

	async updateFilter(value) {
		await this.setState({
			[value.target.name]: value.target.value
		});
		this.getAllOrders();
	}

	async getAllOrders(){
		if(!isNaN(new Date(this.state.date1)) && !isNaN(new Date(this.state.date2))){
			await this.service.getAllOrdersCategoryByDate(this.state.date1, this.state.date2).then((res) => {
				this.setState({
					ordersCategoryByMounth: res
				});
			});
		}

		await this.service.getAllOrdersCategoryGender("MASCULINO", this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryMale: res
			});
		});

		await this.service.getAllOrdersCategoryGender("FEMININO", this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryFemale: res
			});
		});

		await this.service.getAllOrdersCategoryGender("NAOBINARIO", this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryNotBinary: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("MASCULINO", 18, 40, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryMaleYoung: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("FEMININO", 18, 40, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryFemaleYoung: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("NAOBINARIO", 18, 40, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryNotBinaryYoung: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("MASCULINO", 41, 65, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryMaleAdult: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("FEMININO", 41, 65, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryFemaleAdult: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("NAOBINARIO", 41, 65, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryNotBinaryAdult: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("MASCULINO", 66, 100, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryMaleOld: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("FEMININO", 66, 100, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryFemaleOld: res
			});
		});

		await this.service.getAllOrdersCategoryGenderAge("NAOBINARIO", 66, 100, this.state.mounth).then((res) => {
			this.setState({
				ordersCategoryNotBinaryOld: res
			});
		});

	}
  
	render() {
		return (
			<div className="content">
				<Card className="card-chart">
					<CardHeader>
						<Row>
							<Col className="text-center">
								<CardTitle tag="h1">Relatórios de venda por categoria</CardTitle>
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<Row>
							<Col md="2" />
							<Col md="4">
								<Label for="date1">De:</Label>
								<Input type="date" name="date1" id="date1" value={this.state.date1} onChange={this.updateFilter} />
							</Col>
							<Col md="4">
								<Label for="date2">Até:</Label>
								<Input type="date" name="date2" id="date2" value={this.state.date2} onChange={this.updateFilter} />
							</Col>					
						</Row>
						<Row>
							<Col md="12">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h2">Top 3 categorias mais vendidas por periodo</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Bar
											data={(e) => orderCategoryByMounth.data(e, this.state.ordersCategoryByMounth)}
											options={orderCategoryByMounth.options}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col className="text-center ml-5" lg="2">
								<Label for="mounth">Filtrar por mês:</Label>
								<Input type="select" name="mounth" id="mounth" value={this.state.mounth} onChange={this.updateFilter}>
									<option value="0" >Nenhum</option>
									<option value="1" >Janeiro</option>
									<option value="2" >Fevereiro</option>
									<option value="3" >Março</option>
									<option value="4" >Abril</option>
									<option value="5" >Maio</option>
									<option value="6" >Junho</option>
									<option value="7" >Julho</option>
									<option value="8" >Agosto</option>
									<option value="9" >Setembro</option>
									<option value="10" >Outubro</option>
									<option value="11" >Novembro</option>
									<option value="12" >Dezembro</option>
								</Input>
							</Col>
						</Row>
						<Row>
							<Col className="text-center">
								<CardTitle tag="h2">Top 4 Categorias por gênero</CardTitle>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Masculino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryMale)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Feminino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryFemale)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Não Binário</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryNotBinary)}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col className="text-center">
								<CardTitle tag="h2">Top 4 Categorias por gênero e idade entre 18 a 40 anos</CardTitle>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Masculino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryMaleYoung)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Feminino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryFemaleYoung)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Não Binário</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryNotBinaryYoung)}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col className="text-center">
								<CardTitle tag="h2">Top 4 Categorias por gênero e idade entre 41 a 65 anos</CardTitle>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Masculino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryMaleAdult)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Feminino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryFemaleAdult)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Não Binário</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryNotBinaryAdult)}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col className="text-center">
								<CardTitle tag="h2">Top 4 Categorias por gênero e idade a partir de 66 anos</CardTitle>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Masculino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryMaleOld)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Feminino</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryFemaleOld)}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-center">
												<CardTitle tag="h3">Gênero Não Binário</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<Polar
											data={() => MainCategoryes(this.state.ordersCategoryNotBinaryOld)}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</div>
		);
	}
}
