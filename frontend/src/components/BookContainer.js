import Book from './Book';

import { connect } from 'react-redux';
import store from '../redux/store';

import {
  loadBookAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  activeBook: state.activeBook,
  bookContent: state.bookContent,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  loadBook: () => {
    dispatch(loadBookAction());
  }});

const BookContainer = connect(mapStateToProps, mapDispatchToProps)(Book);

export default BookContainer;
