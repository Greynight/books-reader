import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import TopBarContainer from './TopBarContainer';
import SignUpDialogContainer from './SignUpDialogContainer';
import SignInDialogContainer from './SignInDialogContainer';
import UploadBookDialog from './UploadBookDialogContainer';
import Loader from './Loader';

import BooksContainer from './BooksContainer';

import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";

const styles = {
  root: {
    width: '100%'
  }
};

const Main = (props) => {
  return <span>Main text from the DB</span>
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
        <UploadBookDialog />

        <Route path="/" exact component={Main} />
        <Route path="/books" component={BooksContainer}/>
      </div>
    </Router>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(App);
