import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';
import store from '../redux/store';

import TopBarContainer from './TopBarContainer';
import SignUpDialogContainer from './SignUpDialogContainer';
import SignInDialogContainer from './SignInDialogContainer';
import UploadBookDialog from './UploadBookDialogContainer';
import Loader from './Loader';

import Books from './Books';
import Book from './Book';

import { withStyles } from '@material-ui/core/styles';

import {
  getCurrentUserAction, showLoaderAction, loadBooksAction
} from './../redux/actions';

const styles = {
  root: {
    width: '100%'
  }
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(getCurrentUserAction()).then(({payload: isUnAuthenticated}) => {
      if (!isUnAuthenticated) {
        store.dispatch(showLoaderAction());
        store.dispatch(loadBooksAction());
      }
    });
  }

  render() {
    const { classes, isLoading, user } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          {isLoading ? <Loader/> : null}
          <TopBarContainer />
          <SignUpDialogContainer />
          <SignInDialogContainer />
          <UploadBookDialog />

          {user ?
            <React.Fragment>
              <Route path="/" exact component={Books} />
              <Route path="/books" component={Books}/>
              <Route path="/book" component={Book}/>
            </React.Fragment> : <h1>Sign In or Sign Up please.</h1>
          }

        </div>
      </Router>
    );
  }

}

const mapStateToProps = (state) => ({
  user: state.user,
  isLoading: state.isLoading
});

const StyledApp = withStyles(styles)(App);

export default connect(mapStateToProps, null)(StyledApp);

