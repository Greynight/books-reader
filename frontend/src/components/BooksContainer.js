import Books from './Books';

import { connect } from 'react-redux';
import store from '../redux/store';

import {
  loadBooksAction,
  //uploadBookAction,
  deleteBookAction,
  showUploadDialogAction,
  showLoaderAction
  //hideUploadDialogAction
} from './../redux/actions';
import {getCurrentUserAction} from "../redux/actions";

const mapStateToProps = (state) => ({
  activeBook: state.activeBook,
  books: state.books,
  user: state.user,
  isUploadDialogShown: state.isUploadDialogShown
});

const mapDispatchToProps = (dispatch) => ({
  // handleUpload: (data) => {
  //   dispatch(uploadBookAction(data));
  // },
  handleShowDialogClick: () => {
    dispatch(showUploadDialogAction());
  },
  loadBooks: () => {
    dispatch(loadBooksAction());
  },
  handleDeleteBook: (id) => {
    dispatch(showLoaderAction());
    dispatch(deleteBookAction(id));
  }
  // handleHideDialogClick: () => {
  //   dispatch(hideUploadDialogAction());
  // }
});

store.dispatch(showLoaderAction());
store.dispatch(loadBooksAction());

const BooksContainer = connect(mapStateToProps, mapDispatchToProps)(Books);

export default BooksContainer;