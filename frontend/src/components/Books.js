import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';
import Close from 'material-ui-icons/Close';

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
        variant="raised"
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
                  <TableCell className={classes.rowCell}>{book.title}</TableCell>
                  <TableCell className={classes.rowCell}>{book.author}</TableCell>
                  <TableCell className={classes.rowCell}>{book.fileName}</TableCell>
                  <TableCell id={book._id}>
                    {props.activeBook === book._id ?
                      <Close
                        onClick={() => handleOpenBook(null)}
                        className={classes.icon}
                      /> :
                      <OpenInBrowser
                        onClick={() => handleOpenBook(book._id)}
                        className={classes.icon}
                      />
                    }
                    <Delete
                      className={classes.icon}
                      onClick={() => handleDeleteClick(book._id)}
                    />
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

Books.propTypes = {
  classes: PropTypes.object.isRequired,
  //books: PropTypes.array.isRequired,
  //activeBook: PropTypes.object.isRequired
};

export default withStyles(styles)(Books);
