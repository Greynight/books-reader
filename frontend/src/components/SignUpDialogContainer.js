import SignUpDialog from './SignUpDialog';
import { connect } from 'react-redux';

import {
  hideSignUpDialogAction,
  signUpAction,
  showLoaderAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  isSignUpDialogShown: state.isSignUpDialogShown
});

const mapDispatchToProps = (dispatch) => ({
  handleSignUpClick: (data) => {
    dispatch(showLoaderAction());
    dispatch(signUpAction(data));
    dispatch(hideSignUpDialogAction());
  },
  handleSignUpDialogClose: () => {
    dispatch(hideSignUpDialogAction());
  }
});

const SignUpDialogContainer = connect(mapStateToProps, mapDispatchToProps)(SignUpDialog);

export default SignUpDialogContainer;
