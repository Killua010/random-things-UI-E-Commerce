/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from "react";
import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import classNames from "classnames";
import SimpleProduct from "../../components/SimpleProduct/SimpleProduct.jsx";
import Button from "@material-ui/core/Button";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Apps } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Paginations from "components/Pagination/Pagination.jsx";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import "../../assets/css/index.css";
import ProductService from "../../services/ProductService.js";
import GeneralService from "../../services/GeneralService.js";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as searchAction from "../../actions/search";



const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	input: {
		display: "none"
	}
});

class Catalog extends Component {

	constructor(props){
		super(props);
		this.productServie = new ProductService("products");
		this.categoryService = new GeneralService("categories");

		this.state = {
			page: 0, 
			products: [],
			categories: []
		};

		this.getPageabled = this.getPageabled.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.getPageabledByCategory = this.getPageabledByCategory.bind(this);
		this.getFields = this.getFields.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.nextPage = this.nextPage.bind(this);

		this.getFields();
	}

	async getFields() {
		await this.getCategories();
		if(this.props.search === undefined || this.props.search === ""){
			await this.getPageabled(0);
		} else {
			this.props.setSearch("");
		}
	}

	async getCategories(){
		await this.categoryService.getAll().then(val => {
			this.setState({
				categories: val
			});
		});
	}

	async getPageabled(page){
		await this.productServie.getPageabled(page).then(val => {
			if(val.length === 0){
				return;
			}
			this.setState({
				products: val
			});
		});

	}

	async getPageabledByCategory(page, category){
		await this.productServie.getPageabledByCategory(page, category).then(val => {      
			this.setState({
				products: val
			});
		});

	}

	componentDidUpdate(){
		if(this.props.search !== undefined && this.props.search !== ""){
			this.productServie.findBy(this.props.search).then(val => {
				this.setState({
					products: val
				});
			}).then(() => {
				this.props.setSearch("");
			});
		}
	}

	componentDidMount(){
    
		if(this.props.search !== undefined && this.props.search !== ""){
			this.productServie.findBy(this.props.search).then(val => {
				this.setState({
					products: val
				});
			});
		}
    
		this.setState({
			page:0
		});
	}

	renderCategories(category) {
		let array = [];
		for(let subCategory of category.subCategories) {
			array.push({
				name: <Button onClick={() => {this.getPageabledByCategory(0, subCategory);}}>{subCategory.name}</Button>, noLink: true
			});
		}
		return array; 
	}

	prevPage() {
		if(this.state.page === 0)
			return;
		this.getPageabled(this.state.page-1);
		this.setState({
			page: this.state.page -1
		});
	}

	nextPage() {
		if((this.state.page + 1) === this.state.products[0].totalPage)
			return;
		this.getPageabled(this.state.page+1);
		this.setState({
			page:this.state.page+1
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

				<div className={classNames(classes.main, classes.mainRaised)}>
					<div className={classes.sections}>
						<div className={classes.container}>
							<GridContainer className="p-1">
								<GridItem md={3} xs={12} className="no-hover">
									<Card>
										<CardBody>
                  
											<Typography variant="h5" className="mt-2 ml-4">Categorias</Typography>
											{
												this.state.categories.map((category, index) => {
													return(
														<CustomDropdown key={index}
															hoverColor="black"
															noLiPadding
															buttonText={category.name}
															buttonProps={{
																className: classes.navLink,
																color: "transparent"
															}}
															buttonIcon={Apps}
															dropdownList={
																this.renderCategories(category)
															}
														/>
													);
												})
                     
											}
                  
										</CardBody>
									</Card>
								</GridItem>
								<GridItem md={9} xs={12} className="no-hover">
									<GridContainer>
										{
											this.state.products.map((product, key) => {
												return(
													<SimpleProduct props={this.props} product={product} md={4} key={key} />
												);
											})
										}
									</GridContainer>
									<div className="text-center">
										<Paginations
											pages={[
												{ text: "Anterior", onClick: this.prevPage },
												{ text: this.state.page+1 },
												{ text: "Próximo", onClick: this.nextPage },
											]}
										/>
									</div>
								</GridItem>
							</GridContainer>
              
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	search: state.search
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(searchAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(componentsStyle, styles)(Catalog));
