import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import withStyles from "@material-ui/core/styles/withStyles";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import FormCart from "../Forms/FormCart.jsx";

import "./modal.css";

class ModalSubCategoria extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullWidth="lg"
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.props.openSubCategoria}
        keepMounted
        onClose={this.props.closeSubCategoriaModal}
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.closeSubCategoriaModal}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Nova sub categoria</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <form>
            <GridContainer>
              <GridItem md="12">
                <FormControl className={classes.formControl + " width-100"}>
                  <InputLabel htmlFor="age-simple">Categoria</InputLabel>
                  <Select
                    inputProps={{
                      name: "age",
                      id: "age-simple"
                    }}
                  >
                    <MenuItem value={10}>Roupa</MenuItem>
                    <MenuItem value={20}>Eletronico</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem md="12">
                <CustomInput
                  id="regular"
                  inputProps={{
                    placeholder: "Sub Categoria..."
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
          </form>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button color="warning" onClick={this.props.closeSubCategoriaModal}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(modalStyle)(ModalSubCategoria);
