import {
  SIGN_IN,
  SIGN_UP,
  GET_CURRENT_USER,
  SHOW_SIGN_IN_DIALOG,
  SHOW_SIGN_UP_DIALOG,
  HIDE_SIGN_IN_DIALOG,
  HIDE_SIGN_UP_DIALOG,
  SHOW_LOADER,
  HIDE_LOADER,
  LOAD_BOOKS,
  UPLOAD_BOOK,
  DELETE_BOOK,
  SHOW_UPLOAD_DIALOG,
  HIDE_UPLOAD_DIALOG,
  OPEN_BOOK,
  LOAD_BOOK,
  UPDATE_OFFSET
} from './types';

const initState = {
  user: false,
  isSignInDialogShown: false,
  isSignUpDialogShown: false,
  isUploadDialogShown: false,
  isLoading: false,
  books: [],
  activeBook: localStorage.activeBook || null,
  bookContent: '',
  bookOffset: 0,
  offsetDirection: true
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

    case LOAD_BOOKS:
      return {...state, books: action.payload, isLoading: false};

    case UPLOAD_BOOK:
      let books = [...state.books];
      books.push(action.payload.data.book);

      return {...state, books, isLoading: false};

    case DELETE_BOOK:
      const oldBooks = [...state.books];
      const id = action.payload.id;
      const newBooks = oldBooks.filter(book => book._id !== id);

      return {...state, books: newBooks, isLoading: false};

    case SHOW_UPLOAD_DIALOG:
      return {...state, isUploadDialogShown: true};

    case HIDE_UPLOAD_DIALOG:
      return {...state, isUploadDialogShown: false};

    case OPEN_BOOK:
      localStorage.activeBook = action.payload;

      return {...state, activeBook: action.payload};

    case LOAD_BOOK:
      let payload = action.payload || {};

      return {
        ...state,
        bookContent: payload.text || '',
        offsetDirection: payload.direction,
        bookOffset: payload.current
      };

    case UPDATE_OFFSET:
      return {...state, bookOffset: action.payload};

    default:
      return state;
  }
}
