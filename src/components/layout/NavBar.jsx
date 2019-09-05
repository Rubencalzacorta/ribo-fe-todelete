import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { clientUrls, adminUrls } from '../../urls'


const drawerWidth = 240;

const styles = theme => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        backgroundColor: '#00446B',
        width: drawerWidth,
        flexShrink: 0,
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#00446B',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    navLogo: {
      height: 55,
      paddingLeft: 30,
      paddingTop: 5,
    },
    items: {
      width: 240,
      height: 40,
      paddingLeft: 30,
      padding: 10,
    },
    links: {
      color: '#ffff',
      fontSize: '1.1em',
      fontWeight: 600,
      marginLeft: 10
    },
    titles: {
      color: '#ffff',
      fontSize: '1.1em',
      fontWeight: 600,
    }
});


class NavBar extends Component {
 

    render() {
    let { classes, theme, handleDrawerToggle, mobileOpen, handleBarTitle, user } = this.props
    const drawer = (
        <div >
          <div className={classes.toolbar}>
          <img className={classes.navLogo} src='https://res.cloudinary.com/ribo/image/upload/v1554797031/Logo_RIBO-02.png' alt=''/>
          </div>
          <List>
            { user.borrower
              ? clientUrls.map((url, index) => (

              <Link className="link" key={index}  to={`/client/${url.url}`} >
              <ListItem className={classes.items } button key={index} onClick={ () => handleBarTitle(url.text)}>
                <p className={classes.links }>{url.text}</p>
              </ListItem>
              </Link>
            ))
              : user.admin
              ? adminUrls.map((e, index) => (
                (e.link && e.super) ? ( user.superAdmin ?
                  <Link className="link" key={index} to={`/admin/${e.url}`} >
                  <ListItem className={classes.items } button key={index} onClick={ () => handleBarTitle(e.text)}>
                    <p className={classes.links }>{e.text}</p>
                  </ListItem>
                  </Link> : "" )
                :
                (e.link) ?
                <Link className="link" key={index} to={`/admin/${e.url}`} >
                <ListItem className={classes.items } button key={index} onClick={ () => handleBarTitle(e.text)}>
                  <p className={classes.links }>{e.text}</p>
                </ListItem>
                </Link> 
                :
                <ListItem className={classes.items } button key={index}>
                  <p className={classes.titles }>{e.text}</p>
                </ListItem>
        
              )) 
                : "" }
          </List>
        </div>
      );
    
    return(
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
            <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={() => handleDrawerToggle()}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>

        )   
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true})(NavBar);