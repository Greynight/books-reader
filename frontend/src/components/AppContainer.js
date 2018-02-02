import App from './App';

import { connect } from 'react-redux';
import store from '../redux/store';

import {
  signInAction,
  signUpAction,
  getCurrentUserAction,
  showSignInDialogAction,
  showSignUpDialogAction,
  //hideSignInDialogAction,
  //hideSignUpDialogAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  user: state.user,
  isLoading: state.isLoading,
  isSignInDialogShown: state.isSignInDialogShown,
  isSignUpDialogShown: state.isSignUpDialogShown
});

const mapDispatchToProps = (dispatch) => ({
  handleSignInClick: () => {
    dispatch(showSignInDialogAction());
  },
  handleSignUpClick: () => {
    dispatch(showSignUpDialogAction());
  }
});

store.dispatch(getCurrentUserAction());

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
