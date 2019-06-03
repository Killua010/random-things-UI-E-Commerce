/* eslint-disable no-unused-vars */
import React from "react";
import { CardBody, Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.jsx";
import swal from "sweetalert";

import { connect } from "react-redux";

import OrderService from "../../services/OrderService";

import "../../assets/css/index.css";
import ModalChange from "../../components/Modal/ModalChange";
import SimpleService from "../../services/SimpleService";

class PurchaseOrders extends React.Component {

	constructor(props){
		super(props);
		this.changeService = new SimpleService("changes");
		this.orderService = new OrderService("orders");

		this.state = {
			client:{},
			orders: [],
			statusModal: false,
			order:{
				itens:[]
			},
			orderAux:{},
			change:{
				itens:[]
			}
		};

		this.getOrders = this.getOrders.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.saveChange = this.saveChange.bind(this);
		this.modal = this.modal.bind(this);

	}

	saveChange(change, order){
		let newChange = {
			orderId: order.id,
			clientId: this.props.client.id
		};

		let idItem = [];
		let quantityItem = [];
		for(let i = 0; i < change.itens.length; i++){
			if(change.itens[i].quantity === 0){
				continue;
			}
			idItem.push(change.itens[i].id);
			quantityItem.push(change.itens[i].quantity);
		}
		newChange ={
			...newChange,
			idItem,
			quantityItem
		};
		this.changeService.post(newChange);
		swal({
			title: "Envie os seus itens para Rua das Flores 123, São Paulo - SP - 01234-567",
			icon: "success",
		});
		this.modal(order);
	}

	getOrders(){
		if(this.props.client !== undefined){
      
			this.orderService.getAllByClientId(this.props.client.id).then(res => {
				this.setState({
					orders: res
				});
			});
		}
	}

	handleFieldChange(event, index) {

		let itens = [];
		let item = {};
		for(let i = 0; i < this.state.change.itens.length; i++){
			if (i === index) {
				item = this.state.change.itens[i];
				item.quantity = event.target.value;
				itens.push(item);
				continue;
			}
			itens.push(this.state.change.itens[i]);
		}

		this.setState({
			change : {
				...this.state.change,
				itens: itens,
			},
			// orderAux : {
			//   ...this.state.orderAux,
			//   itens: itens,
			// }
		});
	}

	componentDidMount(){
		if(this.props.client === null){
			this.props.history.push("/login");
		} else {
			this.setState({
				client: this.props.client
			});
			this.getOrders();
		}
	}

	modal(order) {
		let itens = [];
		for(let i = 0; i < order.itens.length; i++){
			itens.push({
				id: order.itens[i].id,
				product: order.itens[i].product,
				quantity: order.itens[i].quantity
			});
		}
		this.setState({ 
			statusModal: !this.state.statusModal,
			order: order,
			change:{
				...this.state.change,
				itens: itens
			}
		});
	}

	render() {
		return (
			<div className="content">
				<Row>
					<Col md={12}>
						<Card className="demo-icons">
							<CardHeader>
								<CardTitle>Meus Pedidos</CardTitle>
							</CardHeader>
							<CardBody>
								{
									this.state.orders.map((ord, index) => {
										return(
											<Card key={index}>
												<CardHeader>
													<CardTitle>Pedido Nº {ord.id}</CardTitle>
													{
														(ord.statusOrder == "Entregue") ? 
                             
															<Button
																type="button"
																color="warning"
																className="float-right"
																onClick={() =>this.modal(ord)}
															>
                                  Solicitar troca
															</Button>
															: ""
													}
												</CardHeader>
												<CardBody>
													<Table>
														<TableBody>
															{
																ord.itens.map((item, key) => {
																	return(
																		<TableRow key={key}>
																			<TableCell>{item.product.name} × {item.quantity}</TableCell>
																			<TableCell>R$ {item.subTotal}</TableCell>
																		</TableRow>
																	);
																})
															}
														</TableBody>
														<TableHead>
															<TableRow>
																<TableCell>Frete</TableCell>
																<TableCell>R$ {ord.shippingPrice}</TableCell>
															</TableRow>
														</TableHead>
														<TableHead>
															<TableRow>
																<TableCell>Total</TableCell>
																<TableCell>R$ {ord.totalPrice}</TableCell>
															</TableRow>
														</TableHead>
														<TableHead>
															<TableRow>
																<TableCell>Status</TableCell>
																<TableCell>{ord.statusOrder}</TableCell>
															</TableRow>
														</TableHead>
													</Table>
												</CardBody>
											</Card>
										);
									})
								}
							</CardBody>
						</Card>
					</Col>
				</Row>
				<ModalChange 
					order={this.state.order}
					statusModal={this.state.statusModal}
					handleFieldChange={this.handleFieldChange}
					modal={this.modal}
					change={this.state.change}
					saveChange={this.saveChange}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});

export default connect(mapStateToProps)(PurchaseOrders);
