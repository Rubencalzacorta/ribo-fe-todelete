// auth/Signup.js
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import AuthService from "./AuthService";
import PropTypes from "prop-types";
import "./auth.scss";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    border: "1px solid red",
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    height: "500px",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: "#0F1433",
    color: "#F2F5F7",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#011D66",
      color: "#F2F5F7"
    }
  }
});

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: true,
      confirmed: false,
    }
    this.service = new AuthService();
  }


  componentDidMount = () => {
    const { confirmationCode } = this.props
    let cc = { confirmationCode: confirmationCode }
    this.service.confirm(cc)
      .then(response => {
        if (response.confirmed === true) {
          this.setState({ confirmed: true, confirming: false })
        } else {
          this.setState({ confirmed: false, confirming: false })
        }
      })
      .catch(e => {
        this.setState({ confirmed: false, confirming: false })
      }
      )
  }

  render() {

    return (
      <div className="access-holder">
        <div className="entry" />
        <div className="access-window">
          <div className="logo-access" />
          <div className="user-credentials">
            <p className="access-window-title">Verificación</p>
            {this.state.confirming ?
              <p>Verificando cuenta...</p>
              : this.state.confirmed ?
                <p>Cuenta verificada, puedes ingresar a su cuenta haciendo click en <Link to='/login' >ingresar!</Link></p>
                :
                <p>La cuenta no pudo ser verificada, ingrese a su cuenta nuevamente y solicite un codigo nuevo<Link to='/login' > aqui!</Link> </p>}
          </div>
        </div>
      </div>
    );
  }
}

EmailConfirmation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(EmailConfirmation));
