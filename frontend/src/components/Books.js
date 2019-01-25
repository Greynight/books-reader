import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import OpenInBrowser from '@material-ui/icons/Unarchive';
import Close from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

import { connect } from 'react-redux';

import {
  loadBooksAction,
  //uploadBookAction,
  deleteBookAction,
  showUploadDialogAction,
  showLoaderAction,
  openBookAction
  //hideUploadDialogAction
} from './../redux/actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    cursor: 'pointer'
  },
  activeRow: {
    color: 'green'
  },
  rowCell: {
    color: 'inherit'
  }
});

const Books = (props) => {
  const { classes } = props;

  // TODO check, always must be an array
  const books = props.books || [];

  const handleDeleteClick = (id) => {
    if (props.activeBook === id) {
      // TODO check if works
      props.handleChangeActiveBook(null);
    }

    props.handleDeleteBook(id);
  };

  const handleOpenBook = (id) => {
    props.handleChangeActiveBook(id);
  };

  return (
    <Paper className={classes.root}>
      <Button
        variant="contained"
        component="label"
        color="primary"
        onClick={props.handleShowDialogClick}
      >Upload</Button>
      { books.length ?
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>File name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => {
              return (
                <TableRow
                  key={book._id}
                  className={props.activeBook === book._id ? classes.activeRow : ''}
                >
                  <TableCell className={classes.rowCell}>
                    {props.activeBook === book._id ? <Link to="/book">{book.title}</Link> : book.title}
                  </TableCell>
                  <TableCell className={classes.rowCell}>{book.author}</TableCell>
                  <TableCell className={classes.rowCell}>{book.fileName}</TableCell>
                  <TableCell id={book._id}>
                    {props.activeBook === book._id ?
                      <Tooltip title="Set inactive">
                        <Close
                          onClick={() => handleOpenBook(null)}
                          className={classes.icon}
                        />
                      </Tooltip>
                    :
                      <Tooltip title="Set active">
                        <OpenInBrowser
                          onClick={() => handleOpenBook(book._id)}
                          className={classes.icon}
                        />
                      </Tooltip>
                    }
                    <Tooltip title="Remove">
                      <Delete
                        className={classes.icon}
                        onClick={() => handleDeleteClick(book._id)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> :
        <Paper className={classes.root}>
          <span>No books</span>
        </Paper>
      }
    </Paper>
  );
};

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
  // loadBooks: () => {
  //   dispatch(loadBooksAction());
  // },
  handleDeleteBook: (id) => {
    dispatch(showLoaderAction());
    dispatch(deleteBookAction(id));
  },
  handleChangeActiveBook: (id) => {
    dispatch(openBookAction(id));
  }
  // handleHideDialogClick: () => {
  //   dispatch(hideUploadDialogAction());
  // }
});

const StyledBooks = withStyles(styles)(Books);

export default connect(mapStateToProps, mapDispatchToProps)(StyledBooks);
