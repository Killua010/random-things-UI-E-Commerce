/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import GridItem from "../Grid/GridItem.jsx";

import "./ImageZoom.css";

import { connect } from "react-redux";
import ProductService from "../../services/ProductService.js";

import { bindActionCreators } from "redux";

import * as searchAction from "../../actions/search";

class ImageZoom extends Component {

	constructor(props){
		super(props);
		this.filterProduct = this.filterProduct.bind(this);
	}

	async filterProduct(param) {
		this.props.setSearch(param);
		this.props.props.history.push({pathname: "catalogo"});
	}

	render() {
		return (
			<GridItem md={6}>
				<a href="javascript:void(0)" onClick={() => this.filterProduct(this.props.category.name)}>
					<div className="zoom mt-2 text-center">
						<img
							src={this.props.category.imgSrc}
							alt=""
							height="450"
						/>
						<div className="carousel-caption">
							<h5 className="h2 pb-5 pb-response">{this.props.category.name}</h5>
						</div>
					</div>
				</a>
			</GridItem>
		);
	}
}

const mapStateToProps = state => ({
	search: state.search
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(searchAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageZoom);
