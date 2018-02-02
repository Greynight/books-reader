import {
  SIGN_IN,
  SIGN_UP,
  GET_CURRENT_USER,
  SHOW_SIGN_IN_DIALOG,
  SHOW_SIGN_UP_DIALOG,
  HIDE_SIGN_IN_DIALOG,
  HIDE_SIGN_UP_DIALOG,
  SHOW_LOADER,
  HIDE_LOADER
} from './types';

const initState = {
  user: false,
  isSignInDialogShown: false,
  isSignUpDialogShown: false,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN:
      // TODO maybe show different messages and use smth like toasts
      return {...state, user: !action.payload, isLoading: false};

    case SIGN_UP:
      return {...state, user: !action.payload, isLoading: false};

    case GET_CURRENT_USER:
      return {...state, user: !action.payload};

    case SHOW_SIGN_IN_DIALOG:
      return {...state, isSignInDialogShown: true};

    case SHOW_SIGN_UP_DIALOG:
      return {...state, isSignUpDialogShown: true};

    case HIDE_SIGN_UP_DIALOG:
      return {...state, isSignUpDialogShown: false};

    case HIDE_SIGN_IN_DIALOG:
      return {...state, isSignInDialogShown: false};

    case SHOW_LOADER:
      return {...state, isLoading: true};

    case HIDE_LOADER:
      return {...state, isLoading: false};

    default:
      return state;
  }
}
