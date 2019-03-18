import React, { Component } from "react";

import Carousel from "react-slick";

import image1 from "../../assets/img/bg.jpg";
import image2 from "../../assets/img/bg2.jpg";
import image3 from "../../assets/img/bg3.jpg";

import "../../assets/css/carouselProduct.css";

export default class CarouselProduct extends Component {
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
            <img src={image1} />
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
        <div>
          <img src={image1} alt="First slide" className="slick-image" />
        </div>
        <div>
          <img src={image2} alt="Second slide" className="slick-image" />
        </div>
        <div>
          <img src={image3} alt="Third slide" className="slick-image" />
        </div>
        <div>
          <img src={image3} alt="Third slide" className="slick-image" />
        </div>
      </Carousel>
    );
  }
}
