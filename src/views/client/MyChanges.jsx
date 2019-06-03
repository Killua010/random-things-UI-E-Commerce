/* eslint-disable no-unused-vars */
import React from "react";
import { CardBody, Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { connect } from "react-redux";

import OrderService from "../../services/OrderService";

import "../../assets/css/index.css";

class MyChanges extends React.Component {

	constructor(props){
		super(props);
		this.changeService = new OrderService("changes");

		this.state = {
			client:{},
			changes: [],
		};

		this.getChanges = this.getChanges.bind(this);
	}


	getChanges(){
		if(this.props.client !== undefined){
      
			this.changeService.getAllByClientId(this.props.client.id).then(res => {
				this.setState({
					changes: res
				});
			});
		}
	}


	componentDidMount(){
		if(this.props.client === null){
			this.props.history.push("/login");
		} else {
			this.setState({
				client: this.props.client
			});
			this.getChanges();
		}
	}


	render() {
		return (
			<div className="content">
				<Row>
					<Col md={12}>
						<Card className="demo-icons">
							<CardHeader>
								<CardTitle>Minhas Trocas</CardTitle>
							</CardHeader>
							<CardBody>
								{
									this.state.changes.map((change, index) => {
										return(
											<Card key={index}>
												<CardHeader>
													<CardTitle>Pedido Nº {change.id}</CardTitle>
												</CardHeader>
												<CardBody>
													<Table>
														<TableBody>
															{
																change.itens.map((item, key) => {
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
																<TableCell>Status</TableCell>
																<TableCell>{change.statusOrder}</TableCell>
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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});

export default connect(mapStateToProps)(MyChanges);
