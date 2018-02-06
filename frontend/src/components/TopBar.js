import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class TopBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleBooksClick = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const props = this.props;
    const { classes } = props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Books reader
          </Typography>
          {this.props.user ? (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleBooksClick}>
                  <Link to="/books">Books</Link>
                </MenuItem>
              </Menu>
            </div>
          ):(
            <div>
              <Button
                color="inherit"
                onClick={props.handleSignInClick}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                onClick={props.handleSignUpClick}
              >
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.bool.isRequired
};

export default withStyles(styles)(TopBar);
