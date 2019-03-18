import React, { Component } from "react";

import GridItem from "../Grid/GridItem.jsx";

import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShopIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { cardTitle } from "assets/jss/material-kit-react.jsx";

import "../../assets/css/index.css";

import image from "../../assets/img/product.jpeg";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right",
    justifyContent: "right !important"
  },
  size: {
    fontSize: "15px",
    paddingRight: "30px",
    paddingLeft: "8px",
    paddingTop: "2px"
  }
};

class SimpleProduct extends Component {
  render() {
    const { classes, md } = this.props;
    let mdValue;
    if(md=== undefined)
      mdValue = 3;
    else
      mdValue = md;
    return (
      <GridItem md={mdValue} sm={6}>
        <Card className={classes.textCenter}>
          <CardHeader>
            <a href="/produto">
              <img
                src={image}
                alt=""
              />
            </a>
          </CardHeader>
          <CardBody>
            <Typography className={classes.textRight} color="textSecondary">
              <span>255</span>
              <Icon
                className={classNames(classes.icon, "fas fa-eye", classes.size)}
              />
            </Typography>

            <Typography variant="h5" component="h2">
              Special title treatment
            </Typography>
            <Typography component="p">
              With supporting text below as a natural lead-in to additional
              content.
            </Typography>
          </CardBody>
          <CardActions className={classes.actions} disableActionSpacing>
            <GridItem xs={5}>
              <Typography color="textSecondary">R$ 300,00</Typography>
            </GridItem>
            <GridItem xs={7}>
              <IconButton aria-label="Share">
                <ShopIcon />
              </IconButton>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
            </GridItem>
          </CardActions>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(style)(SimpleProduct);
