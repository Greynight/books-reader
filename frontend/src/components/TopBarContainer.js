import TopBar from './TopBar';
import { connect } from 'react-redux';

import {
  showSignInDialogAction,
  showSignUpDialogAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  user: state.user,
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

const TopBarContainer = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBarContainer;
