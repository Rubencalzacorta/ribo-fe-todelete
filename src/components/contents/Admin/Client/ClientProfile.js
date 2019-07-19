import React, { Component } from 'react';
import ClientService from '../../../../services/ClientService'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { employmentStatus, initialClientState, gender, civilStatus, academicLevel, countries } from '../../../../constants'

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
        width: 330,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});



class Client extends Component {
    constructor(props) {
        super(props);
        this.state = initialClientState;
        this.service = new ClientService();
    }


    handleSubmit = (event) => {

        event.preventDefault()

        const _id = this.state.user._id
        const fullName = this.state.fullName
        const gender = this.state.gender
        const civilStatus = this.state.civilStatus
        const nationalId = this.state.nationalId
        const nationality = this.state.nationality
        const otherNationalities = this.state.otherNationalities
        const placeOfBirth = this.state.placeOfBirth
        const DOB = this.state.DOB
        const immigrationCertificate = this.state.immigrationCertificate
        const academicLevel = this.state.academicLevel
        const Occupation = this.state.Occupation
        const spouseFullName = this.state.spouseFullName
        const spouseNationalId = this.state.spouseNationalId
        const spouseDOB = this.state.spouseDOB
        const spousePlaceOfBirth = this.state.spousePlaceOfBirth
        const street = this.state.street
        const residenceName = this.state.residenceName
        const residenceNumber = this.state.residenceNumber
        const city = this.state.city
        const country = this.state.country
        const cellphoneNumber = this.state.cellphoneNumber
        const email = this.state.email
        const employmentStatus = this.state.employmentStatus
        const businessName = this.state.businessName
        const businessAddress = this.state.businessAddress
        const businessPosition = this.state.businessPosition
        const startDate = this.state.startDate
        const businessPhoneNumber = this.state.businessPhoneNumber
        const businessEmail = this.state.businessEmail
        const monthlyIncome = this.state.monthlyIncome
        const otherIncome = this.state.otherIncome
        const borrowerStatus = true


        this.service.updateAccount(_id, fullName, gender, civilStatus, nationalId, nationality, otherNationalities,
            placeOfBirth, DOB, immigrationCertificate, academicLevel, Occupation, spouseFullName,
            spouseNationalId, spouseDOB, spousePlaceOfBirth, street, residenceName, residenceNumber,
            city, country, cellphoneNumber, email, employmentStatus, businessName, businessAddress,
            businessPosition, startDate, businessPhoneNumber, businessEmail, monthlyIncome, otherIncome, borrowerStatus
        )

            .then(response => {
                if (response.status === "updated") {
                    this.setState({
                        status: "success",
                        gender: "MALE",
                        civilStatus: "SINGLE",
                        DOB: "1990-01-01",
                        academicLevel: "MIDDLESCHOOL",
                        spouseDOB: "1990-01-01",
                        country: 'PERU',
                        employmentStatus: "EMPLOYED",
                        startDate: "2015-01-01",
                        fullName: null,
                        nationalId: null,
                        nationality: null,
                        otherNationalities: null,
                        placeOfBirth: null,
                        immigrationCertificate: null,
                        Occupation: null,
                        spouseFullName: null,
                        spouseNationalId: null,
                        spousePlaceOfBirth: null,
                        street: null,
                        residenceName: null,
                        residenceNumber: null,
                        city: null,
                        cellphoneNumber: null,
                        email: null,
                        businessName: null,
                        businessAddress: null,
                        businessPosition: null,
                        businessPhoneNumber: null,
                        businessEmail: null,
                        monthlyIncome: null,
                        otherIncome: null,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    reset() {
        this.setState(initialClientState)
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render() {
        let { classes } = this.props
        return (

            <div className="contentForm">
                <div className="formHeaderHolder">
                    <div className="formHeader">
                        <h1><b>Activa tu perfil rellenando los siguientes datos:</b></h1>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p><b>Información General:</b></p>
                    </div>
                    <div className="formInputsHolder">
                        <div >
                            <TextField
                                label="Nombre Completo"
                                value={this.state.fullName || ''}
                                name="fullName"
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                id="date"
                                name="DOB"
                                label="Fecha de Nacimiento"
                                type="date"
                                defaultValue="1990-01-01"
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                name="placeOfBirth"
                                label="Lugar de Nacimiento"
                                type="text"
                                value={this.state.placeOfBirth || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                name="cellphoneNumber"
                                label="Número de Teléfono"
                                type="number"
                                value={this.state.cellphoneNumber || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                name="email"
                                label="Correo Electrónico"
                                type="email"
                                value={this.state.email || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                select
                                className={classes.textField}
                                name="gender"
                                value={this.state.gender ? this.state.gender : ''}
                                onChange={(e) => this.handleChange(e)}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                label="Género"
                                margin="normal"
                                required
                            >

                                {
                                    gender.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                            </TextField>
                            <TextField
                                select
                                className={classes.textField}
                                name="civilStatus"
                                value={this.state.civilStatus}
                                onChange={(e) => this.handleChange(e)}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                label="Estado civil"
                                margin="normal"
                            >
                                {civilStatus.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                name="nationalId"
                                label="DNI / Cédula / Pasaporte"
                                type="text"
                                value={this.state.nationalId || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                name="nationality"
                                label="Nacionalidad"
                                type="text"
                                value={this.state.nationality || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Otra Nacionalidad"
                                name="otherNationalities"
                                type="text"
                                value={this.state.otherNationalities || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                name="immigrationCertificate"
                                label="Certificado Migratorio"
                                type="text"
                                value={this.state.immigrationCertificate || ''}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </div>
                        <div >
                            <TextField
                                select
                                className={classes.textField}
                                name="academicLevel"
                                value={this.state.academicLevel}
                                onChange={(e) => this.handleChange(e)}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                label="Nivel académico"
                                margin="normal"
                            >
                                {academicLevel.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p><b>Datos del conyugé:</b></p>
                    </div>
                    <div className="formInputsHolder">
                        <div>
                            <TextField
                                label="Nombre completo"
                                value={this.state.spousefullName || ''}
                                name="spouseFullName"
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="date"
                                name="spouseDOB"
                                label="Fecha de Nacimiento"
                                type="date"
                                defaultValue="1990-01-01"
                                value={this.state.spouseDOB}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                label="Documento de Identidad"
                                value={this.state.spouseNationalId || ''}
                                name="spouseNationalId"
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                label="Lugar de Nacimiento"
                                value={this.state.spousePlaceOfBirth || ''}
                                name="spousePlaceOfBirth"
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </div>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p><b>Datos del domicilio:</b></p>
                    </div>
                    <div className="formInputsHolder">
                        <div>
                            <TextField

                                label="Calle"
                                value={this.state.street}
                                name="street"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField

                                label="Residencia / Condominio"
                                value={this.state.residenceName}
                                name="residenceName"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField

                                label="# de Apto o Casa"
                                value={this.state.residenceNumber}
                                name="residenceNumber"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                label="Ciudad"
                                value={this.state.city}
                                name="city"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                select
                                label="País"
                                value={this.state.country}
                                name="country"
                                onChange={(e) => this.handleChange(e) || ''}
                                className={classes.textField}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                required
                            >
                                {countries.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p><b>Datos laborales:</b></p>
                    </div>
                    <div className="formInputsHolder">
                        <div>
                            <TextField
                                select
                                className={classes.textField}
                                name="employmentStatus"
                                value={this.state.employmentStatus}
                                onChange={(e) => this.handleChange(e) || ''}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                label="Estatus laboral"
                                margin="normal"
                                required
                            >
                                {employmentStatus.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField


                                label="Empresa"
                                value={this.state.businessName}
                                name="businessName"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,

                                }}
                                margin="normal"
                            />
                            <TextField
                                id="date"
                                name="startDate"
                                label="Fecha de Inicio"
                                type="date"
                                defaultValue="2015-01-01"
                                onChange={(e) => this.handleChange(e) || ''}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField

                                label="Posición"
                                value={this.state.businessPosition}
                                name="businessPosition"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,

                                }}
                                margin="normal"
                            />
                            <TextField

                                label="Direccion de la Empresa"
                                value={this.state.businessAddress}
                                name="businessAddress"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="text"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,

                                }}
                                margin="normal"
                            />
                            <div>
                                <TextField

                                    label="# de teléfono"
                                    value={this.state.businessPhoneNumber}
                                    name="businessPhoneNumber"
                                    onChange={(e) => this.handleChange(e) || ''}
                                    type="text"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                    margin="normal"
                                />
                                <TextField
                                    label="Correo Electrónico"
                                    value={this.state.businessEmail}
                                    name="businessEmail"
                                    onChange={(e) => this.handleChange(e) || ''}
                                    type="email"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </div>
                            <TextField
                                label="Ingreso Mensual"
                                value={this.state.monthlyIncome}
                                name="monthlyIncome"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Otros ingresos"
                                value={this.state.otherIncome}
                                name="otherIncome"
                                onChange={(e) => this.handleChange(e) || ''}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </div>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formLastSubmitHolder">
                    </div>
                    <div className="formSubmitHolder">
                        {this.state.status === "success" ?
                            (<div className="alert alert-success" role="alert">
                                Cuenta creada exitosamente!
                        </div>) : ""
                        }
                        {this.state.error ?
                            (<div className="alert alert-danger" role="alert">
                                La cuenta no pudo ser creada, reintente nuevamente!
                        </div>) : ""
                        }

                        <button onClick={this.handleSubmit} className="btn btn-info">Crear Cuenta</button>

                    </div>
                </div>
            </div>
        )
    }
}


Client.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Client);