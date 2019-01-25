import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import RootRef from '@material-ui/core/RootRef';

import prepareBook from './../utils/prepareBook';

import { connect } from 'react-redux';

import {
  loadBookAction,
  updateOffsetAction
} from './../redux/actions';
import store from "../redux/store";

// import Word from './Word';

// TODO on change book

const styles = theme => ({
  container: {
    height: '100%',
    width: '100%'
  },
  root: {
    //width: '80%',
    //height: '100%',
    position: 'absolute',
    top: '60px',
    left: '100px',
    right: '100px',
    bottom: '50px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px'
    // borderStyle: 'solid',
    // borderWidth: '1px',
    // borderColor: '1px'
  },
  invisibleText: {
    visibility: 'hidden'
  },
  keyboardArrowLeft: {
    width: '96px',
    height: '96px',
    position: 'absolute',
    top: '50%',
    left: '0px',
    cursor: 'pointer'
  },
  keyboardArrowRight: {
    width: '96px',
    height: '96px',
    position: 'absolute',
    top: '50%',
    right: '0px',
    cursor: 'pointer'
  }
  // text: {
  //   whiteSpace: 'pre-wrap'
  // }
});

class Book extends React.Component {
  constructor(props) {
    super(props);

    // this.bookContent = ''/*prepareBook(props)*/;
    // this.offsetDirection = ''/*props.offsetDirection*/;

    this.isBookLoading = false;

    this.state = {
      bookContent: '',
      classes: props.classes
    };

    this.bookContainer = React.createRef();
    this.bookPage = React.createRef();
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  componentDidMount() {
    console.log('componentDidMount');

    const { activeBook, bookOffset } = this.props;

    if (!!activeBook) {
      this.isBookLoading = true;

      store.dispatch(loadBookAction({
        forward: true,
        id: activeBook,
        bookOffset
      }));
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');

    const { activeBook, bookContent, offsetDirection, bookOffset, updateOffset } = this.props;

    if (activeBook && !bookContent && !this.isBookLoading) {
      store.dispatch(loadBookAction({
        forward: true,
        id: activeBook,
        bookOffset
      }));
    }

    if (activeBook && bookContent && !this.state.bookContent) {
      this.isBookLoading = false;

      this.setState({
        bookContent: prepareBook({
          activeBook,
          bookContent,
          offsetDirection,
          bookOffset,
          updateOffset,
          bookContainer: this.bookContainer.current,
          bookPage: this.bookPage.current
        })
      });
    }
  }

  // TODO ability to start from the beginning
  moveBackward = () => {
    const { activeBook, loadBook, bookOffset } = this.props;

    loadBook({
      forward: true,
      id: activeBook,
      bookOffset
    });
  };

  moveForward = () => {
    const { activeBook, loadBook, bookOffset } = this.props;

    loadBook({
      forward: false,
      id: activeBook,
      bookOffset
    });
  };

  render() {
    const classes = this.state.classes;

    return (
      !!this.props.bookContent ?
        <div className={classes.container}>
          <KeyboardArrowLeft className={classes.keyboardArrowLeft} onClick={this.moveForward}/>
          <KeyboardArrowRight className={classes.keyboardArrowRight} onClick={this.moveBackward}/>
          <RootRef rootRef={this.bookContainer}>
            <Paper className={classes.root}>
              <div className={classes.text}>{this.state.bookContent}</div>
              <div className={classes.invisibleText} ref={this.bookPage}>hidden text</div>
            </Paper>
          </RootRef>
        </div> : <h1>Please select a book</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  activeBook: state.activeBook,
  bookContent: state.bookContent,
  user: state.user,
  offsetDirection: state.offsetDirection,
  bookOffset: state.bookOffset
});

const mapDispatchToProps = (dispatch) => ({
  loadBook: (params) => {
    dispatch(loadBookAction(params));
  },
  updateOffset: (offset) => {
    dispatch(updateOffsetAction(offset));
  }
});

const StyledBook = withStyles(styles)(Book);


export default connect(mapStateToProps, mapDispatchToProps)(StyledBook);
