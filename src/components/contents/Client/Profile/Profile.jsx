import React, { Component } from 'react'
import './profile.scss'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';
import moment from 'moment'
import EditProfile from './EditProfile.jsx'
import ClientService from '../../../../services/ClientService'
import DocIncUpload from './DocIncUpload';
import DocIDUpload from './DocIDUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const styles = theme => ({
  button: {
    fontSize: 12,
    margin: 0,
    fontWeight: 600,
    textDecoration: 'none',
    textTransform: 'none',
    borderRadius: 2,
    color: 'rgb(145, 145, 145)',
  },
  buttonDoc: {
    fontSize: 12,
    margin: 0,
    marginLeft: 30,
    fontWeight: 600,
    textDecoration: 'none',
    textTransform: 'none',
    borderRadius: 2,
    color: 'rgb(145, 145, 145)',
  },
  input: {
    display: 'none',
  },
  paper: {
    position: 'absolute',
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    maxHeight: '100%',
    overflowY: 'auto'
  },
});


class Profile extends Component {
  state = {
    open: false,
    details: {
    }
  };
  service = new ClientService()

  componentDidMount = () => {
    let details = this.props.user
    this.setState({ details })
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenDocID = () => {
    this.setState({ openDocID: true });
  };

  handleOpenDocID = () => {
    this.setState({ openDocInc: true });
  };

  handleClose = (status) => {
    let { _id } = this.state.details
    this.setState({ open: false, openDocID: false, openDocInc: false, editStatus: status });

    if (status === 'updated') {
      this.service.getClient(_id)
        .then(details => {
          this.setState({ details })
        })
    }
  };

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  }


  render() {
    const { classes } = this.props;
    const { details } = this.state
    return (
      <div className="main-holder">
        <div className="profile-actions">
          <Button variant="outlined" onClick={this.handleOpen} className={classes.button}>
            Editar perfil
                </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <EditProfile details={details} closeModal={this.handleClose} />
            </div>
          </Modal>
        </div>
        <div className="testing">
          {this.state.editStatus === "updated" ?
            (<div className="alert alert-success" role="alert">
              Operación realizada exitosamente!
                        </div>) : this.state.editStatus === "failed" ? (<div className="alert alert-danger" role="alert">
              La operación a fallado.
                        </div>) : ""
          }
          <div className="heading-activity">
            <div>
              <p variant='heading' className="heading">Información Personal</p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                Primer y segundo nombre legal *
                      </p>
              <p className="content-details">
                {details.firstName}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Apellidos legales *
                      </p>
              <p className="content-details">
                {details.lastName}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Fecha de nacimiento
                      </p>
              <p className="content-details">
                {moment(details.DOB).format('DD/MM/YY')}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Documento de Identidad
                      </p>
              <p className="content-details">
                {details.nationalId}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Tipo de Documento
                      </p>
              <p className="content-details">
                {details.nationalIdType}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Teléfono
                      </p>
              <p className="content-details">
                {details.cellphoneNumber}
              </p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant='heading' className="heading">Dirección personal</p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                País
                      </p>
              <p className="content-details">
                {this.capitalize(details.country)}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Ciudad
                      </p>
              <p className="content-details">
                {this.capitalize(details.city)}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Dirección
                      </p>
              <p className="content-details">
                {details.address}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Código postal
                      </p>
              <p className="content-details">
                {details.zipCode}
              </p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant='heading' className="heading">Información Financiera</p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                Banco
                      </p>
              <p className="content-details">
                {details.bank}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Número de cuenta
                      </p>
              <p className="content-details">
                {details.accountNumber}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                Ingresos
                      </p>
              <p className="content-details">
                {details.monthlyIncome}
              </p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant='heading' className="heading">Documentación</p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                <Button variant="outlined" onClick={this.handleOpenDocID} className={classes.buttonDocID}>
                  Documento de Identidad
                        </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.openDocID}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <DocIDUpload details={details} closeModal={this.handleClose} />
                  </div>
                </Modal>
              </p>
              <p className="content-details">
                {details.documentID && <a target="_blank" rel="noopener noreferrer" href={details.documentID}>Visualiza tu Identicación</a>}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                <Button variant="outlined" onClick={this.handleOpenDocID} className={classes.buttonDocID}>
                  Nómina o Certificación de Ingresos
                        </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.openDocInc}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <DocIncUpload details={details} closeModal={this.handleClose} />
                  </div>
                </Modal>
              </p>
              <p className="content-details">
                {details.documentIncomeOrPayslip && <a target="_blank" rel="noopener noreferrer" href={details.documentIncomeOrPayslip}>Visualiza tu documento</a>}
              </p>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Profile);