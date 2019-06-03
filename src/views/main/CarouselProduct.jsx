/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import Carousel from "react-slick";

import "../../assets/css/carouselProduct.css";

export default class CarouselProduct extends Component {
  
	constructor(props){
		super(props);
		this.state = {
			images: []
		};
	}

	componentDidMount() {
		this.setState({
			images: this.props.img
		});
	}

	render() {
		const settings = {
			customPaging: i => (
				<div
					style={{
						height: "60px",
						width: "60px"
					}}
				>
					<a
						style={{
							backgroundColor: "aqua"
						}}
					>
						<img src={this.state.images[i]} />
					</a>
				</div>
			),
			dots: true,
			infinite: true,
			dotsClass: "slick-dots slick-thumb",
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false
		};
		return (
			<Carousel {...settings}>
				{
					this.state.images.map((image, index) => {
						return(
							<div key={index} >
								<img src={image} alt="First slide" className="slick-image"  />
							</div>
						);
					})
				}
			</Carousel>
		);
	}
}
