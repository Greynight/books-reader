import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import TopBarContainer from './TopBarContainer';
import SignUpDialogContainer from './SignUpDialogContainer';
import SignInDialogContainer from './SignInDialogContainer';
import Loader from './Loader';

import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";

const styles = {
  root: {
    width: '100%'
  }
};


const App = (props) => {
  const { classes } = props;

  return (
    <Router>
      <div className={classes.root}>
        {props.isLoading ? <Loader/> : ''}
        <TopBarContainer />
        <SignUpDialogContainer />
        <SignInDialogContainer />

        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>
        <form action="/register" method="post">
          <div>
            <label>email:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Sign up"/>
          </div>
        </form>

      </div>
    </Router>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(App);
