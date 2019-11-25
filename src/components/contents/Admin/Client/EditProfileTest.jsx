import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import './editProfile.scss'
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ClientService from '../../../../services/ClientService'
import { countries, nationalIdType } from '../../../../constants'

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
        minWidth: 225,
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
        let { _id } = details
        this.service.updateAccount(_id, details)
            .then((response) => { (response.status === "updated") ? this.props.closeModal('updated') : this.props.closeModal('failed') })
            .catch(e => this.props.closeModal('failed'))
    }
    render() {

        let { classes } = this.props
        let { details } = this.state

        return (
            <div className="modal-holder">

                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Información Personal</p>
                    </div>
                </div>
                <div className="form-inputs-holder">
                    <TextField
                        label="Nombres legales *"
                        value={details.firstName}
                        name="firstName"
                        type="text"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}

                    />
                    <TextField
                        label="Apellidos legales"
                        name="lastName"
                        type="text"
                        value={details.lastName}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}

                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={details.email}
                        type="text"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}

                    />
                    <TextField
                        id="date"
                        name="DOB"
                        label="Fecha de Nacimiento"
                        value={moment(details.DOB).format('YYYY-MM-DD')}
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}

                    />
                    <TextField
                        name="cellphoneNumber"
                        label="Número de Teléfono"
                        value={details.cellphoneNumber}
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        name="nationalId"
                        label="Documento de Identidad"
                        type="text"
                        value={details.nationalId}
                        onChange={(e) => this.handleChange(e)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"

                    />
                    <TextField
                        name="nationalIdType"
                        label="Tipo de Documento"
                        select
                        type="text"
                        value={details.nationalIdType}
                        onChange={(e) => this.handleChange(e)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    >
                        {nationalIdType.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="personalReference"
                        label="Referencia personal"
                        type="text"
                        value={details.personalReference}
                        onChange={(e) => this.handleChange(e)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Dirección Personal</p>
                    </div>
                </div>
                <div className="form-inputs-holder">
                    <TextField
                        select
                        name="country"
                        label="País"
                        type="text"
                        value={details.country}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    >
                        {countries.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="city"
                        label="Ciudad"
                        type="text"
                        value={details.city}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <TextField
                        name="address"
                        label="Dirección"
                        type="text"
                        value={details.address}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <TextField
                        name="zipCode"
                        label="Código Postal"
                        type="text"
                        value={details.zipCode}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Información Laboral</p>
                    </div>
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
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Información Financiera</p>
                    </div>
                </div>
                <div className="form-inputs-holder">
                    <TextField
                        name="bank"
                        label="Banco"
                        type="text"
                        value={details.bank}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <TextField
                        name="accountNumber"
                        label="Numero de cuenta"
                        type="text"
                        value={details.accountNumber}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <TextField
                        name="monthlyIncome"
                        label="Ingresos"
                        type="number"
                        value={details.monthlyIncome}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={(e) => this.handleChange(e)}

                    />
                </div>
                <div className="edit-form-submit">
                    <button onClick={() => this.handleSubmit()} className="btn btn-info">Editar Detalles</button>
                </div>
            </div>


        )
    }
}


EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);