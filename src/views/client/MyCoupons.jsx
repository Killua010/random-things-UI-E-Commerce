/* eslint-disable no-unused-vars */
import React from "react";
import { CardBody, Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


import { connect } from "react-redux";

import OrderService from "../../services/OrderService";

import "../../assets/css/index.css";

class MyCoupons extends React.Component {

	constructor(props){
		super(props);
		this.couponService = new OrderService("coupons");

		this.state = {
			client:{},
			coupons: [],
		};

		this.getCoupons = this.getCoupons.bind(this);
	}


	getCoupons(){
		if(this.props.client !== undefined){
      
			this.couponService.getAllByClientId(this.props.client.id).then(res => {
				this.setState({
					coupons: res
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
			this.getCoupons();
		}
	}


	render() {
		return (
			<div className="content">
				<Row>
					<Col md={12}>
						<Card className="demo-icons">
							<CardHeader>
								<CardTitle>Meus Cupons</CardTitle>
							</CardHeader>
							<CardBody>
								{
									this.state.coupons.map((coupon, index) => {
										return(
											<Card key={index}>
												<CardBody>
													<Table>
														<TableBody>
															<TableRow>
																<TableCell>Cupom: {coupon.name}</TableCell>
																<TableCell>Valor: R$ {coupon.value}</TableCell>
																<TableCell>Status: {(coupon.status === true)?"Ativo":"Inativo"}</TableCell>
															</TableRow>
														</TableBody>
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

export default connect(mapStateToProps)(MyCoupons);
