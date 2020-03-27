import React, { Component } from "react";
import PropTypes from "prop-types";
import Bar from "./Bar.jsx";
import NavBar from "./NavBar.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import './layout.scss'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: '#F2F5F7',
    flexGrow: 1,
  }
});

class Layout extends Component {
  state = {
    mobileOpen: false,
    name: "Actividad"
  };

  handleBarTitle = (name) => {
    this.setState({ name })
  }
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, children, userInSession, logout } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Bar BarTitle={this.state.name} user={userInSession} logout={logout} firstName={userInSession.firstName} id={(userInSession._id.substring(userInSession._id.length - 7, userInSession._id.length)).toUpperCase()} lastName={userInSession.lastName} handleDrawerToggle={this.handleDrawerToggle} />
        <NavBar
          user={userInSession}
          handleDrawerToggle={this.handleDrawerToggle}
          handleBarTitle={this.handleBarTitle}
          mobileOpen={this.state.mobileOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {(userInSession.status !== 'VERIFIED' && !userInSession.admin && <div className="account-status-notify"><p>Completa tu perfil para disfrutar de nuestro servicios</p></div>)}
          {children}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
