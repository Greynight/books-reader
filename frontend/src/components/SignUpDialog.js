import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';

import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUpDialog extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSaveButtonClick = () => {
    this.props.handleSignUpClick({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.isSignUpDialogShown}
        onClose={this.props.handleSignUpDialogClose}
        aria-labelledby="Sign Up"
      >
        <DialogContent>
          <DialogContentText>
            To sign up, please enter your email address and password.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              onChange={this.handleChange('email')}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleSignUpDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSaveButtonClick} raised color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignUpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpDialog);
