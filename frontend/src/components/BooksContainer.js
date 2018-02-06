import Books from './Books';

import { connect } from 'react-redux';
import store from '../redux/store';

import {
  loadBooksAction,
  //uploadBookAction,
  deleteBookAction,
  showUploadDialogAction,
  //hideUploadDialogAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  activeBook: state.activeBook,
  books: state.books,
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
  // handleHideDialogClick: () => {
  //   dispatch(hideUploadDialogAction());
  // }
});

store.dispatch(loadBooksAction());

const BooksContainer = connect(mapStateToProps, mapDispatchToProps)(Books);

export default BooksContainer;
