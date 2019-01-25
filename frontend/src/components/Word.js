import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

let styles = {
  word: {
    cursor: 'pointer'
  }
};

const handleWordClick = (word) => {
  console.log(word);
};

const Word = (props) => {
  const { classes, text, color } = props;

  if (color) {
    styles.word.backgroundColor = color;
  }

  return (
    <span
      className={classes.word}
      onClick={() => {handleWordClick(text)}}
    >{text}</span>
  );
};

Word.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
  //activeBook: PropTypes.object.isRequired
};

export default withStyles(styles)(Word);
