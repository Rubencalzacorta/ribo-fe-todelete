import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {ButtonBase, Popover } from '@material-ui/core';
import { withRouter} from 'react-router'
import ProfilePop from './ProfilePop'
import Avatar from '@material-ui/core/Avatar';



const drawerWidth = 240;

const styles = theme => ({
  
  navList: {
    margin: 0,
    padding: 0,
    width: 1000,
    display: 'flex',
    listStyle: 'none',
    alignItems: 'center',
    color: '#2D4369',
    justifyContent: 'space-between'
  },
  userList: {
    fontWeight: 400,
    fontSize: 14,
    display: 'flex',
    listStyle: 'none',
    alignItems: 'center',
    disableRipple: true,
    disableTouchRipple: true
  },
  userListElement: {
    marginLeft: 5
  },
  orangeAvatar: {
    width: 35,
    height: 35,
    color: '#2D4369',
    backgroundColor: '#F2F5F7',
  },
  appBar: {
    backgroundColor: '#ffff',
    color: '#2D4369',
    marginLeft: drawerWidth,
    boxShadow: 'none',
    borderBottom: '1px solid rgb(235, 235, 235)',

    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  titleAppBar: {
    fontSize: '1.5em',
    fontWeight: 600,
    padding: 0,
    margin: 0,
    marginTop: 0,
  }
});

class Bar extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render(){
  let { classes, handleDrawerToggle, BarTitle, firstName, lastName, id,logout } = this.props

  const { anchorEl } = this.state;
  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.main}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => handleDrawerToggle()}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
            <ul className={classes.navList} role="Navigation">
              <div>
                <li className={classes.titleAppBar} >{BarTitle}</li>
              </div>
              <div>
                <ButtonBase className={classes.userList} aria-haspopup="true" variant="contained" onClick={this.handleClick}>
                  <li className={classes.userListElement}><Avatar className={classes.orangeAvatar}>{firstName.slice(0,1)}</Avatar></li>
                  <li className={classes.userListElement}>{firstName+" "+lastName}</li>
                  <li className={classes.userListElement}><i className="material-icons bar-dropdown">keyboard_arrow_down</i></li>
                </ButtonBase>
              </div>
              <Popover
                  id="simple-popper"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <ProfilePop name={firstName+" "+lastName} membership={id} logout={logout}/>
                </Popover>  
            </ul>
        </Toolbar> 
        </div>
      </AppBar>
    )
  }
} 

Bar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withRouter(withStyles(styles)(Bar));
