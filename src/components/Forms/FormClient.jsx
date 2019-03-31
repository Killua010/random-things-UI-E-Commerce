import React, { Component } from "react";

import GeneralService from '../../services/GeneralService';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

import "./form.css";

import {Input,
} from "reactstrap";

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

class FormClient extends Component {
  constructor(props){
    super(props);

    this.genderService = new GeneralService("genders");
    this.telephoneTypeService = new GeneralService("telephonesTypes");

    this.state = {
      genders: [],
      telephoneType: []
    }

    this.getFields = this.getFields.bind(this);
    this.getAllGender = this.getAllGender.bind(this);
    this.getAllTelephoneTypes = this.getAllTelephoneTypes.bind(this);

    this.getFields();
  }

  async getAllGender(){
    await this.genderService.getAll().then(val => this.setState({
      genders: val
    }))
  }
  
  async getAllTelephoneTypes(){
    await this.telephoneTypeService.getAll().then(val => this.setState({
      telephoneType: val
    }))
  }

  async getFields(){
    await this.getAllGender();
    await this.getAllTelephoneTypes();
  }

  componentDidMount(){
    if(this.props.location !== undefined){
      this.setState({
        client: this.props.location.state.client
      })
    }
  }

  
  render() {
    const { classes } = this.props;
    return (
        <GridContainer>
          <GridItem md="6" className="size-input">
            <CustomInput
              inputProps={{
                name: "firstName",
                onChange: this.props.handleFieldChange,
                value: this.props.client.firstName,
                placeholder: "Primeiro Nome...",
                
                type: "text"
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "lastName",
                onChange: this.props.handleFieldChange,
                value: this.props.client.lastName,
                type: "text",
                
                placeholder: "Sobrenome..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "email",
                onChange: this.props.handleFieldChange,
                value: this.props.client.email,
                type: "email",
                
                placeholder: "Email..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
          <Input type="select" name="gender" className="text-color-select orange" value={this.props.client.gender} onChange={this.props.handleFieldChange} required>
          <option disabled selected value="">Gênero</option>
          {
            this.state.genders.map((gender, index) => {
              return(
                <option value={gender} key={index}>{gender}</option>
              )
            })
          }
          </Input>
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "cpf",
                onChange: this.props.handleFieldChange,
                value: this.props.client.cpf,
                
                type: "text",
                placeholder: "CPF..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "birthDate",
                onChange: this.props.handleFieldChange,
                value: this.props.client.birthDate,
                type: "date",
                placeholder: "Data de nascimento..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "phone",
                onChange: this.props.handleFieldChange,
                value: this.props.client.phone,
                
                type: "tel",
                placeholder: "Telefone..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
          <Input type="select" required name="telephoneType" className="text-color-select orange" value={this.props.client.telephoneType} onChange={this.props.handleFieldChange}>
            <option disabled selected value="">Tipo de Telefone</option>
          {
            this.state.telephoneType.map((telephone, index) => {
              return(
                <option value={telephone} key={index}>{telephone}</option>
              )
            })
          }
          </Input>
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "password",
                onChange: this.props.handleFieldChange,
                value: this.props.client.password,
                
                type: "password",
                placeholder: "Senha..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                name: "confirmPassword",
                onChange: this.props.handleFieldChange,
                value: this.props.client.confirmPassword,
                
                type: "password",
                placeholder: "Confirmação da senha..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
    );
  }
}

export default withStyles(styles)(FormClient);
