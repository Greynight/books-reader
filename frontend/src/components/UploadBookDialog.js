import React from 'react';

import TopBarContainer from './TopBarContainer';
import SignUpDialogContainer from './SignUpDialogContainer';
import SignInDialogContainer from './SignInDialogContainer';
import Loader from './Loader';



import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import FileUpload from 'material-ui-icons/FileUpload';
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

class SignInDialog extends React.Component {
  state = {
    file: null,
    author: '',
    title: ''
  };

  handleFileSelect = (evt) => {
    this.setState({
      file: evt.target.files[0]
    });
  };

  handleUploadClick = () => {
    this.props.handleUploadClick({
      file: this.state.file,
      title: this.state.title,
      author: this.state.author
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.isUploadDialogShown}
        onClose={this.props.handleDialogClose}
        aria-labelledby="Upload book"
      >
        <DialogContent>
          <DialogContentText>
            Please choose a book in txt format.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              onChange={this.handleChange('title')}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              margin="dense"
              id="author"
              label="author"
              type="text"
              onChange={this.handleChange('author')}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="book">Select a book</InputLabel>
            <Button
              variant="raised"
              component="label"
              color="primary"
            >
              {'Select a book'}
              <FileUpload className={classes.rightIcon} />
              <input
                onChange={this.handleFileSelect}
                style={{ display: 'none' }}
                type="file"
              />
            </Button>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} color="primary">
            Close
          </Button>
          <Button onClick={this.handleUploadClick} variant="raised" color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInDialog);
