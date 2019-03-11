import React, { Component } from "react";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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

class FormClient extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form>
        <GridContainer>
          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
                placeholder: "Primeiro Nome..."
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
                placeholder: "Email..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <FormControl className={classes.formControl + " width-100"}>
              <InputLabel htmlFor="age-simple">Gênero</InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
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
                placeholder: "Telefone..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6" className="size-input">
            <FormControl className={classes.formControl + " width-100"}>
              <InputLabel htmlFor="age-simple">Tipo telefone</InputLabel>
              <Select
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem md="6" className="size-input">
            <CustomInput
              id="regular"
              inputProps={{
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
                placeholder: "Confirmação da senha..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(styles)(FormClient);
