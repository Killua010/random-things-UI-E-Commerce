/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from "react";

import "../../assets/css/index.css";

// nodejs library that concatenates classes
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class FinishOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			order: {
				id: "",
				creationDate: "",
				totalPrice: "",
				itens: []
			}
		};
	}

	componentDidMount(){
		if(this.props.location.state === undefined || this.props.client === null || this.props.client === undefined){
			this.props.history.push("/login");
		}

		this.setState({
			order: this.props.location.state.order
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Parallax image={require("assets/img/bg2.jpg")}>
					<div className={classes.container}>
						<GridContainer>
							<GridItem>
								<div className={classes.brand}>
									<h1 className={classes.title}>Random Things</h1>
									<h3 className={classes.subtitle}>
                    Compre diversos tipos de produtos sem sair de casa
									</h3>
								</div>
							</GridItem>
						</GridContainer>
					</div>
				</Parallax>

				<div className={classNames(classes.main, classes.mainRaised, "pb-5")}>
					<div className={classes.sections}>
						<div className={classes.container}>
							<Typography component="h2" variant="h4" className={"pt-2"}>Obrigado por comprar conosco</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Numero do pedido</TableCell>
										<TableCell>Data</TableCell>
										<TableCell>Total</TableCell>
										<TableCell>Método de pagamento</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{this.state.order.id}</TableCell>
										<TableCell>{this.state.order.creationDate}</TableCell>
										<TableCell>{this.state.order.totalPrice}</TableCell>
										<TableCell>Cartão de credito</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Typography component="h2" variant="h4">Detalhes do pedido</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Produto</TableCell>
										<TableCell>Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										this.state.order.itens.map((item) => {
											return(
												<TableRow>
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
										<TableCell>R$ {this.state.order.shippingPrice}</TableCell>
									</TableRow>
								</TableHead>
								<TableHead>
									<TableRow>
										<TableCell>Total</TableCell>
										<TableCell>R$ {this.state.order.totalPrice}</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});


export default connect(mapStateToProps)(withStyles(componentsStyle)(FinishOrder));
