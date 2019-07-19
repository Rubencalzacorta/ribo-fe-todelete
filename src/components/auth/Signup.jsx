// EditUserDialog.js
import React from "react";
import { Formik } from "formik";
import { withRouter, Link } from 'react-router-dom';
import * as Yup from "yup";
import AuthService from "./AuthService";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import './auth.scss'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    border: '1px solid red',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    height: '500px',
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#0F1433',
    color: '#F2F5F7',
    width: '100%',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#011D66',
      color: '#F2F5F7',
    }
  },
  inputErrors: {
    color: 'red',
  }
});

const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Inserte un email válido')
    .required('Inserte su email'),
  firstName: Yup.string()
    .min(2, 'Inserte su nombre, más de 2 caracteres')
    .max(40, 'Inserte su nombre, menos de 40 caracteres')
    .required('Inserte su nombre'),
  lastName: Yup.string()
    .min(2, 'Inserte su apellido, más de 2 caracteres')
    .max(40, 'Inserte su apellido, menos de 40 caracteres')
    .required('Inserte su apellido'),
  password: Yup.string()
    .min(8, "Inserte más de 8 caracteres")
    .max(40, "Inserte menos de 40 caracteres")
    .required("Inserte una contraseña"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben de ser iguales')
});



const Signup = props => {
  let initialValues = { email: "", password: "", passwordConfirmation: "", firstName: "", lastName: "" };
  let service = new AuthService();
  let { classes, getUser } = props;

  function onSubmit(values, { setSubmitting, setErrors }) {

    service.signup(values)
      .then(response => {
        getUser(response)
        props.history.push('/')
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <div className="access-holder">
      <div className="entry">
      </div>
      <div className="access-window">
        <div className="logo-access">
        </div>
        <div className="user-credentials">
          <p className="access-window-title">
            Bienvenido a Ribo
        </p>
          <p className="access-window-subtitle">
            Ya tiene una cuenta? <Link to='/login'>ingrese aqui!</Link>
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signupValidationSchema}
            render={({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Email</InputLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className={classes.inputErrors}>{errors.email}</div>
                    )}
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Nombre</InputLabel>
                    <Input
                      type="firstName"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className={classes.inputErrors}>{errors.firstName}</div>
                    )}
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Apellido</InputLabel>
                    <Input
                      type="lastName"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className={classes.inputErrors}>{errors.lastName}</div>
                    )}
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Contraseña</InputLabel>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <div className={classes.inputErrors}>{errors.password}</div>
                    )}
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Confirmar contraseña</InputLabel>
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passwordConfirmation}
                    />
                    {errors.passwordConfirmation && touched.passwordConfirmation && (
                      <div className={classes.inputErrors}>{errors.passwordConfirmation}</div>
                    )}
                  </FormControl>
                  <div className="buttonHolder">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      type="submit" disabled={isSubmitting}>
                      Crear cuenta
              </Button>
                    {errors.error && <div className={classes.inputErrors}>{errors.error}</div>}
                  </div>
                </form>
              )}
          />
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Signup));
