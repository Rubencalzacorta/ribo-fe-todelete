import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom'
import { clientUrls, adminUrls } from '../../urls'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './layout.scss'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      backgroundColor: '#00446B',
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  expansionPanel: {
    backgroundColor: '#00446B',
    boxShadow: 'none',
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  },
  expansionPanelSummary: {
    borderBottomColor: 'rgba(0, 0, 0, 0)',
    borderTopColor: 'rgba(0, 0, 0, 0)',
  },
  expansionPanelDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '0px',
    paddingTop: '0px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#ffff',
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
    width: '100%',
    padding: '0px 16px'
    // height: 40,
    // padding: 10,
  },
  links: {
    color: '#ffff',
    fontSize: '1.0em',
    fontWeight: 400,
    // marginLeft: 10
  },
  titles: {
    color: '#ffff',
    fontSize: '1.0em',
    fontWeight: 600,
  }
}));


export default function NavBar(props) {
  const classes = useStyles()
  let { theme, handleDrawerToggle, mobileOpen, handleBarTitle, user, container } = props

  const drawer = (
    <div >
      <div className={classes.toolbar}>
        <img className={classes.navLogo} src='https://res.cloudinary.com/ribo/image/upload/v1554797031/Logo_RIBO-02.png' alt='' />
      </div>
      <List>
        {user.borrower
          ? clientUrls.map((url, index) => (

            <Link className="link" key={index} to={`/client/${url.url}`} >
              <ListItem className={classes.items} button key={index} onClick={() => handleBarTitle(url.text)}>
                <p className={classes.links}>{url.text}</p>
              </ListItem>
            </Link>
          ))
          : user.admin
            ? adminUrls.map((e, index) => (
              <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary
                  className={classes.expansionPanelSummary}
                  expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{e.text}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  {e.links.map((j, k) => {
                    return (
                      <Link className="link" key={k} to={`/admin/${j.url}`} >
                        <ListItem className={classes.items} button key={k} onClick={() => handleBarTitle(j.text)}>
                          <p className={classes.links}>{j.text}</p>
                        </ListItem>
                      </Link>
                    )
                  })}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
            : ""}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
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


// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   container: PropTypes.object,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(NavBar);