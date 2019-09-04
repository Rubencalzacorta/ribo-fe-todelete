// auth/Signup.js
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import AuthService from "./AuthService";
import PropTypes from "prop-types";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });
        this.props.getUser(response);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="access-holder">
        <div className="entry" />
        <div className="access-window">
          <div className="logo-access" />
          <div className="user-credentials">
            <p className="access-window-title">Bienvenido de nuevo.</p>
            <p className="access-window-subtitle">
              No tienes una cuenta? <Link to="/signup">registrate aqui!</Link>
            </p>
            <form className={classes.form} onSubmit={this.handleFormSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Usuario</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Ingresar
              </Button>
            </form>
            <h1>{this.state.error ? "Error" : ""}</h1>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Login));
