/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from "react";

import "../../assets/css/index.css";

// nodejs library that concatenates classes
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";

import SimpleProduct from "../../components/SimpleProduct/SimpleProduct.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ImageZoom from "../../components/ImageZoom/ImageZoom";
import ParallaxIndex from "../../components/ParallaxIndex/ParallaxIndex";
import PopularService from "../../services/PopularService";

class Index extends Component {
	constructor(props){
		super(props);
		this.categoryService = new PopularService("categories");
		this.productService = new PopularService("products");

		this.state = {
			categories: [],
			products: []
		};

		this.getPopularCategories = this.getPopularCategories.bind(this);
		this.getPopularProducts = this.getPopularProducts.bind(this);

		this.getPopularProducts();
		this.getPopularCategories();
	}

	async getPopularCategories(){
		await this.categoryService.getPopular().then((res) => {
			this.setState({
				categories: res
			});
		});
	}

	async getPopularProducts(){
		await this.productService.getPopular().then((res) => {
			this.setState({
				products: res
			});
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
							<h2 className="title text-warning text-center">
                Pricipais Categorias
							</h2>
							<GridContainer>
								{
									this.state.categories.map((category, key) => {
										return <ImageZoom key={key} category={category} props={this.props} />;
									})
								}
							</GridContainer>
							<h2 className="title text-warning text-center">
                Produtos mais vendidos
							</h2>
							<GridContainer>
								{
									this.state.products.map((product, key) => {
										return <SimpleProduct props={this.props} product={product} md={3} key={key} />;
									})
								}
							</GridContainer>
							<h2 className="title text-warning text-center">
								<a href="#" className="text-warning link">
                  Todos os nossos itens
								</a>
							</h2>
							<GridItem>
								<ParallaxIndex />
							</GridItem>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(componentsStyle)(Index);
