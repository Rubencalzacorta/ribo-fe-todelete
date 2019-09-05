// auth/Signup.js
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "./AuthService";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
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

class PendingConfirmation extends Component {
  state = {}
  service = new AuthService()

  handleClick = () => {
    this.service.resendVerification()
    .then( resp => {
      if (resp.status === 'success') {
        this.setState({status: 'success'})
      }
    })
    .catch( e => {
      this.setState({status: 'failure'})
    })
  }
  

  render() {

    let { classes, user } = this.props
    let { status } = this.state

    return (
      <div className="access-holder">
        <div className="entry" />
        <div className="access-window">
          <div className="logo-access" />
          <div className="user-credentials">
            <p className="access-window-title">Bienvenido {user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1)}</p>
            <p className="access-window-subtitle">
              Para activar tu cuenta revisa tu buzon de correo electronico y sigue los pasos para la confirmación. 
            </p>
            <p className="access-window-subtitle">
              Si no has recibido el correo de verificación, haz click en el siguiente botón.
            </p>
            <Button
                type="button"
                fullWidth
                onClick={ () => this.handleClick()}
                variant="contained"
                className={classes.submit}
              >
                Reenviar correo de confirmación
              </Button>
              { status === 'success' && <div className="access-notify-success"><p> El correo de confirmación se ha reenviado correctamente </p></div>}
              { status === 'failure' && <div className="access-notify-failure"><p> El correo de confirmación no se ha enviado correctament, intente nuevamente </p></div> }
              <p className="access-window-note">*Recuerda de revisar en tu buzón de correo no deseado</p>
          </div>
        </div>
      </div>
    );
  }
}

PendingConfirmation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PendingConfirmation));
