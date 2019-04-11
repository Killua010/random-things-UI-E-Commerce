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
import GeneralService from '../../services/GeneralService';

import {Input,
} from "reactstrap";

import "./form.css";

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

class FormAddress extends Component {

  constructor(props){
    super(props);
    
    this.stateService = new GeneralService("states");
    this.residenceTypeService = new GeneralService("residenceTypes");

    this.state = {
      states: [],
      cities: null,
      residenceTypes: [],
      update: false
    }

    this.getFields = this.getFields.bind(this);
    this.getStates = this.getStates.bind(this);
    this.getResidenceTypes = this.getResidenceTypes.bind(this);
    this.renderCities = this.renderCities.bind(this);
    this.setCities = this.setCities.bind(this);

    this.getFields();

  }

  async getFields() {
    await this.getStates();
    await this.getResidenceTypes();
  }

  async getResidenceTypes(){
    await this.residenceTypeService.getAll().then(resp => this.setState({
      residenceTypes: resp
    }))
  }

  async getStates() {
    await this.stateService.getAll().then(resp => this.setState({
      states: resp
    }))
  }

  renderCities(){
    let cities = []
    if(this.state.cities !== null){
      this.state.cities.map((city, index) => {
        cities.push(
          <option value={city.id} key={index}>{city.name}</option>
        )
      })
    } 
    return cities;
  }

  setCities(e){
    let cities = this.state.states[e.target.value - 1].cities.sort(function(a,b) {
      let a2 = a.name.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      let b2 = b.name.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      return a2 < b2 ? -1 : a2 > b2 ? 1 : 0;
    })
    
    this.setState({
      cities: cities
    })
    
    this.renderCities();
    
  }

  render() {
    const { classes } = this.props;
    return (
      <form>
        <GridContainer>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "fullName",
                type: "text",
                name: "fullName",
                onChange: this.props.handleFieldChange,
                value: this.props.address.fullName,
                placeholder: "Nome Composto..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "zipCode",
                type: "text",
                name: "zipCode",
                onChange: this.props.handleFieldChange,
                value: this.props.address.zipCode,
                placeholder: "Cep..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "street",
                type: "text",
                name: "street",
                onChange: this.props.handleFieldChange,
                value: this.props.address.street,
                placeholder: "Logradouro..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input mb-4">
            <Input type="select" name="stateId" className="text-color-select orange" value={this.props.address.stateId} onChange={(e) => {this.setCities(e); this.props.handleFieldChange(e);}} required>
              <option disabled selected value="">Estado</option>
              {
                this.state.states.map((state, index) => {
                  return(
                    <option value={state.id} key={index}>{state.name}</option>
                  )
                })
              }
            </Input>
          </GridItem>
          <GridItem md="6" className="size-input mb-2">
            <Input type="select" name="cityId" className="text-color-select orange" value={this.props.address.cityId} onChange={this.props.handleFieldChange} required>
              <option disabled selected value="">Cidade</option>
              {
               this.renderCities()
              }
            </Input>
          </GridItem>
          <GridItem md="6" className="size-input mb-2">
            <Input type="select" name="residenceTypeId" className="text-color-select orange" value={this.props.address.residenceTypeId} onChange={this.props.handleFieldChange} required>
              <option disabled selected value="">Tipo de residencia</option>
              {
                this.state.residenceTypes.map((type, index) => {
                  return(
                    <option value={type.id} key={index}>{type.name}</option>
                  )
                })
              }
            </Input>
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "neighborhood",
                type: "text",
                name: "neighborhood",
                onChange: this.props.handleFieldChange,
                value: this.props.address.neighborhood,
                placeholder: "Bairro..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "number",
                type: "number",
                name: "number",
                onChange: this.props.handleFieldChange,
                value: this.props.address.number,
                placeholder: "Numero..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                id: "observation",
                type: "text",
                name: "observation",
                onChange: this.props.handleFieldChange,
                value: this.props.address.observation,
                placeholder: "Complemento..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <Input id="favorite" type="checkbox" name="favorite"
                onChange={this.props.handleFieldChange}
                value={this.props.address.favorite}
                onClick={(e) => e.target.value = e.target.checked
                }/>Favorito
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(styles)(FormAddress);
