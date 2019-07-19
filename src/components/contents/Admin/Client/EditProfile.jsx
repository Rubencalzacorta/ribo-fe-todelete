import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './editProfile.scss'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ClientService from '../../../../services/ClientService'

const styles = theme => ({
    name: {
        width: 440
    },
    citizenInfo: {
        width: 300
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 300,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.details
        }
        this.service = new ClientService();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ details: { ...this.state.details, [name]: value } });
    }

    handleSubmit = () => {
        let { details } = this.state

        const _id = details._id
        const firstName = details.firstName
        const lastName = details.lastName
        const nationalId = details.nationalId
        const cellphoneNumber = details.cellphoneNumber
        const city = details.city
        const zipCode = details.zipCode
        const street = details.address
        const email = details.email
        const bank = details.bank
        const accountNumber = details.accountNumber
        const monthlyIncome = details.monthlyIncome

        this.service.updateAccount(
            _id,
            firstName,
            lastName,
            nationalId,
            cellphoneNumber,
            city,
            zipCode,
            street,
            email,
            bank,
            accountNumber,
            monthlyIncome)
            .then((response) => { (response.status === "updated") ? this.props.closeModal('updated') : this.props.closeModal('failed') })
            .catch(e => this.props.closeModal('failed'))
    }


    render() {
        let { classes } = this.props
        let { details } = this.state
        return (
            <div className="modal-holder">
                <div className="formHeader">
                    <p>Editar Cuenta</p>
                </div>
                <div className="form-input-holder">
                    <div className="form-inputs-holder">
                        <TextField
                            label="Nombre"
                            value={details.firstName}
                            name="firstName"
                            type="text"
                            onChange={(e) => this.handleChange(e)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"

                        />
                        <TextField
                            label="Apellido"
                            name="lastName"
                            type="text"
                            value={details.lastName}
                            onChange={(e) => this.handleChange(e)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"

                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="text"
                            value={details.email}
                            onChange={(e) => this.handleChange(e)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="date"
                            name="DOB"
                            label="Fecha de Nacimiento"
                            value={details.DOB}
                            onChange={(e) => this.handleChange(e)}
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="cellphoneNumber"
                            label="Número de Teléfono"
                            value={details.cellphoneNumber}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="nationalId"
                            label="DNI / Cédula / Pasaporte"
                            type="text"
                            value={details.nationalId}
                            onChange={(e) => this.handleChange(e)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>
                    <div className="form-inputs-holder">
                        <TextField
                            name="country"
                            label="País"
                            type="text"
                            value={details.country}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            disabled
                        />
                        <TextField
                            name="city"
                            label="Ciudad"
                            type="text"
                            value={details.city}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="address"
                            label="Dirección"
                            type="text"
                            value={details.address}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="zipCode"
                            label="Codigo Postal"
                            type="text"
                            value={details.zipCode}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>
                    <div className="form-inputs-holder">
                        <TextField
                            name="businessName"
                            label="Empresa"
                            type="text"
                            value={details.businessName || ''}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="businessPhoneNumber"
                            label="Numero de Telefono"
                            type="text"
                            value={details.businessPhoneNumber}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="businessAddress"
                            label="Dirección"
                            type="text"
                            value={details.businessAddress}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>
                    <div className="form-inputs-holder">
                        <TextField
                            name="bank"
                            label="Banco"
                            type="text"
                            value={details.bank}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="accountNumber"
                            label="Cuenta bancaria"
                            type="text"
                            value={details.accountNumber}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            name="income"
                            label="Ingreso"
                            type="number"
                            value={details.monthlyIncome}
                            className={classes.textField}
                            onChange={(e) => this.handleChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </div>
                    <div className="edit-form-submit">
                        <button onClick={() => this.handleSubmit()} className="btn btn-info">Editar</button>
                    </div>
                </div>
            </div>

        )
    }
}


EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);