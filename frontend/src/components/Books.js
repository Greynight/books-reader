import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';

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
  }
});


const Books = (props) => {
console.log(props.books);
  // if (props.user && !props.books.length) {
  //   props.loadBooks();
  // }

  const { classes } = props;
  const books = props.books || [];

  const handleDeleteClick = (evt) => {
    props.handleDeleteBook(evt.currentTarget.id);
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
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.fileName}</TableCell>
                  <TableCell>
                    <Delete
                      className={classes.icon}
                      onClick={handleDeleteClick}
                      id={book._id}
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
