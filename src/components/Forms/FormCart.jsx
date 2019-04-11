import React, { Component } from "react";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import {Input,
} from "reactstrap";

import "./form.css";
import GeneralService from "../../services/GeneralService.js";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class FormCart extends Component {

  constructor(props){
    super(props);

    this.flagService = new GeneralService("flags");

    this.state = {
      flags: []
    }

    this.getFlags = this.getFlags.bind(this);

    this.getFlags();
  }

  async getFlags(){
    this.flagService.getAll().then(resp => this.setState({
      flags: resp
    }))
  }

  render() {
    const { classes } = this.props;
    return (
      <form>
        <GridContainer>
          <GridItem md="6">
            <CustomInput
              inputProps={{
                id: "number",
                type: "text",
                name: "number",
                onChange: this.props.handleFieldChange,
                value: this.props.card.number,
                placeholder: "Número do cartão..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <CustomInput
              inputProps={{
                id: "securityCode",
                type: "text",
                name: "securityCode",
                onChange: this.props.handleFieldChange,
                value: this.props.card.securityCode,
                placeholder: "Código de segurança..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <CustomInput
              inputProps={{
                id: "printedName",
                type: "text",
                name: "printedName",
                onChange: this.props.handleFieldChange,
                value: this.props.card.printedName,
                placeholder: "Nome Impresso..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <Input type="select" name="creditCardFlagId" className="text-color-select orange" value={this.props.card.creditCardFlagId} onChange={this.props.handleFieldChange} required>
              <option disabled selected value="">Bandeira</option>
              {
                this.state.flags.map((flag, index) => {
                  return(
                    <option value={flag.id} key={index}>{flag.name}</option>
                  )
                })
              }
            </Input>
          </GridItem>
          <GridItem md="6">
            <Input type="checkbox" name="favorite" id="favorite"
                onChange={this.props.handleFieldChange}
                value={this.props.card.favorite}
                onClick={(e) => e.target.value = e.target.checked
                }/>Favorito
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(styles)(FormCart);
