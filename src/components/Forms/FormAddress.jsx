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
  render() {
    const { classes } = this.props;
    return (
      <form>
        <GridContainer>
          <GridItem md="6">
            <CustomInput
              id="regular"
              inputProps={{
                placeholder: "Cep..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <CustomInput
              id="regular"
              inputProps={{
                placeholder: "Logradouro..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <FormControl className={classes.formControl + " width-100"}>
              <InputLabel htmlFor="age-simple">Estado</InputLabel>
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
          <GridItem md="6">
            <FormControl className={classes.formControl + " width-100"}>
              <InputLabel htmlFor="age-simple">Cidade</InputLabel>
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
          <GridItem md="6">
            <CustomInput
              id="regular"
              inputProps={{
                placeholder: "Bairro..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <CustomInput
              id="regular"
              type="number"
              inputProps={{
                placeholder: "Numero..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <CustomInput
              id="regular"
              type="number"
              inputProps={{
                placeholder: "Complemento..."
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem md="6">
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{ checked: classes.checked }}
                />
              }
              classes={{ label: classes.label }}
              label="Favorido"
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(styles)(FormAddress);
