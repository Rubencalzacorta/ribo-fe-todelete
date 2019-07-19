// navbar/Navbar.js

import React, { Component } from 'react';

import AuthService from '../auth/AuthService';
import AdminNav from './AdminNav';
import WelcomeNav from './WelcomeNav';
import ClientNav from './ClientNav';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null};
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    let { loggedInUser } = this.state

    if (loggedInUser) {
      return (  (loggedInUser.admin) 
              ? <AdminNav handleLogout={this.handleLogout}/> 
              : <ClientNav handleLogout={this.handleLogout}/>
            ) 
    } else {
      return ( <WelcomeNav/> )
    }
  }
}

export default Navbar;