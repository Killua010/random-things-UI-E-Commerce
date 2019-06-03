/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import MainFooter from "components/Footer/MainFooter.jsx";
import MainHeader from "components/Header/MainHeader.jsx";
import NotFound from "../NotFound";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import { mainRoutes } from "../../routes.js";
import Badge from "components/Badge/Badge.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import "assets/scss/material-kit-react.scss?v=1.4.0";
import "../../assets/css/index.css";

import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

import { connect } from "react-redux";
import ProductService from "../../services/ProductService.js";

import { bindActionCreators } from "redux";

import * as searchAction from "../../actions/search";


class MainLayout extends Component {

	constructor(props){
		super(props);
		this.productServie = new ProductService("products");
		this.state = {
			search: ""
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.getRoutes = this.getRoutes.bind(this);
		this.goTo = this.goTo.bind(this);
		this.filterProduct = this.filterProduct.bind(this);

	}

	handleFieldChange(event) {
		this.setState({
			[event.target.name]: event.target.value 
		});
	}

	getRoutes(routes){
		return routes.map((prop, key) => {
			return (
				<Route path={prop.path} exact component={prop.component} key={key} />
			);
		});
	}

	goTo(path) {
		this.props.history.push(path);
	}

	async filterProduct() {
		this.props.setSearch(this.state.search);
		this.props.history.push({pathname: "catalogo"});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<MainHeader
					props={this.props}
					brand="Random Things"
					path="/"
					fixed
					color="transparent"
					changeColorOnScroll={{
						height: 200,
						color: "orange"
					}}
					leftLinks={
						<List className={classes.list}>
							<ListItem className={classes.listItem + " mr-2"}>
								<Button
									href="javascript:void(0)" onClick={() => this.goTo("/catalogo")}
									className={classes.navLink}
									color="transparent"
								>
  	                				Catalogo
								</Button>
							</ListItem>
							<ListItem className={classes.listItem}>
								<div id="nav-catalogo" className="color-white">
									<CustomInput
										inputProps={{
											id: "search",
											type: "text",
											name: "search",
											onChange: this.handleFieldChange,
											value: this.state.search,
											placeholder: "Pesquisar",
											endAdornment: (
												<InputAdornment position="end">
													<a href="javascript:void(0)" onClick={this.filterProduct}>
														<i className="fas fa-search color-white" />
													</a>
												</InputAdornment>
											)
										}}
										formControlProps={{
											fullWidth: true
										}}
									/>
								</div>
							</ListItem>
						</List>
					}
					rightLinks={
						(this.props.client === null || this.props.client === undefined) ?
							<List className={classes.list}>
								<ListItem className={classes.listItem}>
									<CustomDropdown
										props={this.props}
										buttonText="Embarque Conosco"
										buttonProps={{
											className: classes.navLink,
											color: "transparent"
										}}
										dropdownList={[
											{ name: "Novo Usuario", path: "/cadastro" },
											{ name: "Entrar", path: "/login" }
										]}
									/>
								</ListItem> 
							</List>
							:
							<List className={classes.list}>
								<ListItem className={classes.listItem}>
									<Button
										href="javascript:void(0)" onClick={() => this.goTo("/favorito")}
										className={classes.navLink}
										color="transparent"
									>
										<i className="fas fa-heart" />
									</Button>
								</ListItem>
								<ListItem className={classes.listItem}>
									<Button
										href="javascript:void(0)" onClick={() => this.goTo("/carrinho")}
										className={classes.navLink}
										color="transparent"
									>
										<i className="fas fa-shopping-cart" />
										<Badge color="info">{this.props.cart.quantityProduct}</Badge>
									</Button>
								</ListItem>
								<ListItem className={classes.listItem}>
									<CustomDropdown
										props={this.props}
										buttonText={`Olá ${this.props.client.firstName}`}
										buttonProps={{
											className: classes.navLink,
											color: "transparent"
										}}
										dropdownList={[
											{ name: "Meu Perfil", path: "/perfil/inicio" },
											// { name: "Sair", path: "/login" }
										]}
									/>
								</ListItem>
							</List>
					}
				/>
				<Switch>
					{this.getRoutes(mainRoutes)}
					<Route component={NotFound} />
				</Switch>
				<MainFooter />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client,
	cart: state.cart,
	search: state.search
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(searchAction, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(navbarsStyle)(MainLayout));
