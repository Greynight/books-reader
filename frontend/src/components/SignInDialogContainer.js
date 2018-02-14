import SignInDialog from './SignInDialog';
import { connect } from 'react-redux';

import {
  hideSignInDialogAction,
  signInAction,
  showLoaderAction,
  loadBooksAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  isSignInDialogShown: state.isSignInDialogShown
});

const mapDispatchToProps = (dispatch) => ({
  handleSignInClick: (data) => {
    dispatch(showLoaderAction());
    dispatch(signInAction(data)).then(() => {
      dispatch(showLoaderAction());
      dispatch(loadBooksAction());
    });
    dispatch(hideSignInDialogAction());
  },
  handleSignInDialogClose: () => {
    dispatch(hideSignInDialogAction());
  }
});

const SignInDialogContainer = connect(mapStateToProps, mapDispatchToProps)(SignInDialog);

export default SignInDialogContainer;
