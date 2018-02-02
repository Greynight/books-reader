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

import User from './../data-sources/user';

export const signInAction = (data) => ({
  type: SIGN_IN,
  payload: User.signIn(data)
});

export const signUpAction = (data) => ({
  type: SIGN_UP,
  payload: User.signUp(data)
});

export const getCurrentUserAction = () => ({
  type: GET_CURRENT_USER,
  payload: User.getCurrentUser()
});

export const showSignInDialogAction = () => ({
  type: SHOW_SIGN_IN_DIALOG
});

export const showSignUpDialogAction = () => ({
  type: SHOW_SIGN_UP_DIALOG
});

export const hideSignInDialogAction = () => ({
  type: HIDE_SIGN_IN_DIALOG
});

export const hideSignUpDialogAction = () => ({
  type: HIDE_SIGN_UP_DIALOG
});

export const showLoaderAction = () => ({
  type: SHOW_LOADER
});

export const hideLoaderAction = () => ({
  type: HIDE_LOADER
});
