import React, { Component } from "react";

import "./ParallaxIndex.css";

export default class ParallaxIndex extends Component {
  render() {
    return (
      <div className="follow-us-parallax">
        <div className="follow-us-content">
          <h5 className="h2 follow-us-padding">Siga-nos nas redes socias</h5>
          <div className="social-line social-left">
            <a
              href="javascript:void(0)"
              className="btn btn-warning btn-facebook"
            >
              <i className="fab fa-facebook-square" />
            </a>
            <a
              href="javascript:void(0)"
              className="btn btn-warning btn-twitter"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="javascript:void(0)"
              className="btn btn-warning btn-google"
            >
              <i className="fab fa-google-plus" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
