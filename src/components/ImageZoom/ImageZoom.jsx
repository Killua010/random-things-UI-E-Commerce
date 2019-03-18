import React, { Component } from "react";

import GridItem from "../Grid/GridItem.jsx";

import "./ImageZoom.css";

export default class ImageZoom extends Component {
  render() {
    return (
      <GridItem md={6}>
        <a href="./catalogo.html#roupas">
          <div className="zoom mt-2">
            <img
              src="https://images.pexels.com/photos/1210484/pexels-photo-1210484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt=""
            />
            <div className="carousel-caption">
              <h5 className="h2 pb-5 pb-response">Roupas</h5>
            </div>
          </div>
        </a>
      </GridItem>
    );
  }
}
