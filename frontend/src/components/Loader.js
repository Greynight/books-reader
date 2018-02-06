import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = {
  backdrop: {
    backgroundColor: 'LightGrey',
    position: 'absolute',
    opacity: 0.6,
    width: '100%',
    height: '100%',
    zIndex: 10000,
    minHeight: 0
  }
};

const Loader = (props) => {
  const { classes } = props;

  return (
    <div className={classes.backdrop} align="center" justify="center">
      <CircularProgress
        variant="indeterminate"
        size={80}
        thickness={5}
      />
    </div>
  );
};

export default withStyles(styles)(Loader);
