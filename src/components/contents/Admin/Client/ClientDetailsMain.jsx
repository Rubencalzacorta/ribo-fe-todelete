import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientService from "../../../../services/ClientService";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { initialState } from "../../../../constants.js";
import EditProfileTest from "./EditProfileTest.jsx";
import { Button, Modal } from "@material-ui/core";
import moment from "moment";
import DocIncUpload from "./DocIncUpload";
import DocIDUpload from "./DocIDUpload";

const styles = theme => ({
  button: {
    fontSize: 12,
    margin: 0,
    fontWeight: 600,
    textDecoration: "none",
    textTransform: "none",
    borderRadius: 2,
    color: "rgb(145, 145, 145)"
  },
  name: {
    width: 440
  },
  citizenInfo: {
    width: 300
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 330
  },
  formControl: {
    margin: theme.spacing.unit
  },
  paper: {
    position: "absolute",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    maxHeight: "100%",
    overflowY: "auto"
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.service = new ClientService();
  }

  componentDidMount = () => {
    let { clientId } = this.props.match.params;

    this.service.getClient(clientId).then(response => {
      this.setState({ client: response });
    });
  };

  capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = status => {
    let { clientId } = this.props.match.params;
    this.setState({
      open: false,
      openDocID: false,
      openDocInc: false,
      editStatus: status
    });
    if (status === "updated") {
      this.service.getClient(clientId).then(response => {
        this.setState({ client: response });
      });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenDocID = () => {
    this.setState({ openDocID: true });
  };

  handleOpenDocInc = () => {
    this.setState({ openDocInc: true });
  };

  render() {
    let { client } = this.state;
    let { classes } = this.props;

    return (
      <div className="main-holder">
        <div className="borrower-profile">
          {this.state.editStatus === "updated" ? (
            <div className="alert alert-success" role="alert">
              Operación realizada exitosamente!
            </div>
          ) : this.state.editStatus === "failed" ? (
            <div className="alert alert-danger" role="alert">
              La operación a fallado.
            </div>
          ) : (
                ""
              )}
          <div className="heading-activity">
            <div>
              <p variant="heading" className="heading">
                Información Personal
              </p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                Primer y segundo nombre legal *
              </p>
              <p className="content-details">{client.firstName}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Apellidos legales *</p>
              <p className="content-details">{client.lastName}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Fecha de nacimiento</p>
              <p className="content-details">
                {moment(client.DOB).format("DD/MM/YY")}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">Documento de Identidad</p>
              <p className="content-details">{client.nationalId}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Tipo de Documento</p>
              <p className="content-details">{client.nationalIdType}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Teléfono</p>
              <p className="content-details">{client.cellphoneNumber}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Email</p>
              <p className="content-details">{client.email}</p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant="heading" className="heading">
                Dirección personal
              </p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">País</p>
              <p className="content-details">
                {this.capitalize(client.country)}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">Ciudad</p>
              <p className="content-details">{this.capitalize(client.city)}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Dirección</p>
              <p className="content-details">{client.address}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Código postal</p>
              <p className="content-details">{client.zipCode}</p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant="heading" className="heading">
                Información Laboral
              </p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">Empresa</p>
              <p className="content-details">{client.businessName}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Dirección</p>
              <p className="content-details">{client.businessAddress}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Numero de Telefono</p>
              <p className="content-details">{client.businessPhoneNumber}</p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant="heading" className="heading">
                Información Financiera
              </p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">Banco</p>
              <p className="content-details">{client.bank}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Número de cuenta</p>
              <p className="content-details">{client.accountNumber}</p>
            </div>
            <div className="profile-details">
              <p className="content-description">Ingresos</p>
              <p className="content-details">{client.monthlyIncome}</p>
            </div>
          </div>
          <div className="heading-activity">
            <div>
              <p variant="heading" className="heading">
                Documentación
              </p>
            </div>
          </div>
          <div className="profile-description">
            <div className="profile-details">
              <p className="content-description">
                <Button
                  variant="outlined"
                  onClick={this.handleOpenDocID}
                  className={classes.buttonDocID}
                >
                  Documento de Identidad
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.openDocID}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <DocIDUpload
                      details={client}
                      closeModal={this.handleClose}
                    />
                  </div>
                </Modal>
              </p>
              <p className="content-details">
                {client.documentID && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={client.documentID}
                  >
                    Visualiza tu Identicación
                  </a>
                )}
              </p>
            </div>
            <div className="profile-details">
              <p className="content-description">
                <Button
                  variant="outlined"
                  onClick={this.handleOpenDocID}
                  className={classes.buttonDocID}
                >
                  Nómina o Certificación de Ingresos
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.openDocInc}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <DocIncUpload
                      details={client}
                      closeModal={this.handleClose}
                    />
                  </div>
                </Modal>
              </p>
              <p className="content-details">
                {client.documentIncomeOrPayslip && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={client.documentIncomeOrPayslip}
                  >
                    Visualiza tu documento
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            <Button
              variant="outlined"
              onClick={this.handleOpen}
              className={classes.button}
            >
              Editar perfil
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <EditProfileTest
                  details={client}
                  closeModal={this.handleClose}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

Client.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Client));
