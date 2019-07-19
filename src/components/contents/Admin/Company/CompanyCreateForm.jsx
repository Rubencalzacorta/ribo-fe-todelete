import React from "react";
import { withFormik, Form, Field } from "formik";
import {
    countries,
    ownership
} from "../../../../constants";
import schema from './CompanyFormValidation'
import './createCompany.scss'
import CompanyService from '../../../../services/CompanyService'

const service = new CompanyService()

const CreateClient = ({
    values,
    errors,
    status,
    touched,
    handleSubmit,
    isSubmitting }) => (
        <div className="contentForm">
            <Form onSubmit={handleSubmit}>
                <div className="formHeaderHolder">
                    <div className="formHeader">
                        <h1>
                            <b>Creación de cuenta - Compañía</b>
                        </h1>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p>
                            <b>Información General:</b>
                        </p>
                    </div>
                    <div className="formInputsHolder">
                        <div className="form-label">
                            <p>Nombre del negocio</p>
                            <Field className="input-field" type="text" name="businessName" />
                            {errors.businessName && touched.businessName ? <p className='form-error'>{errors.businessName}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Identificador Fiscal</p>
                            <Field className="input-field" type="text" name="taxID" />
                            {errors.taxID && touched.taxID ? <p className='form-error'>{errors.taxID}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Sector</p>
                            <Field className="input-field" type="text" name="sector" />
                            {errors.sector && touched.sector ? <p className='form-error'>{errors.sector}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>País</p>
                            <Field className="select-field" component="select" name="country">
                                {countries.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Field>
                            {errors.country && touched.country ? <p className='form-error'>{errors.country}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Pública/Privada</p>
                            <Field className="select-field" component="select" name="ownership">
                                {ownership.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Field>
                            {errors.ownership && touched.ownership ? <p className='form-error'>{errors.ownership}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Años de operación</p>
                            <Field className="input-field" type="number" name="activeYears" />
                            {errors.activeYears && touched.activeYears ? <p className='form-error'>{errors.activeYears}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Cantidad de empleados</p>
                            <Field className="input-field" type="number" name="employeeAmount" />
                            {errors.employeeAmount && touched.employeeAmount ? <p className='form-error'>{errors.employeeAmount}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Pagina Web</p>
                            <Field className="input-field" type="text" name="website" />
                            {errors.website && touched.website ? <p className='form-error'>{errors.website}</p> : null}
                        </div>
                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                        <p>
                            <b>Datos de Contacto:</b>
                        </p>
                    </div>
                    <div className="formInputsHolder">
                        <div className="form-label">
                            <p>Persona Contacto</p> <Field className="input-field" type="text" name="contactEmployee" />
                            {errors.contactEmployee && touched.contactEmployee ? <p className='form-error'>{errors.contactEmployee}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Número Telefónico</p> <Field className="input-field" type="text" name="phoneNumber" />
                            {errors.phoneNumber && touched.phoneNumber ? <p className='form-error'>{errors.phoneNumber}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Email</p>
                            <Field className="input-field" type="email" name="email" />
                            {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Dirección</p>
                            <Field className="input-field" type="text" name="address" />
                            {errors.address && touched.address ? <p className='form-error'>{errors.address}</p> : null}
                        </div>
                        <div className="form-label">
                            <p>Ciudad</p>
                            <Field className="input-field" type="text" name="city" />
                            {errors.city && touched.city ? <p className='form-error'>{errors.city}</p> : null}
                        </div>

                    </div>
                </div>
                <div className="formSectionHolder">
                    <div className="formTitleHolder">
                    </div>
                    <div className="formOptionsHolder">
                        {status ? status.success ?
                            <div className='form-response success'>Compañia registrada exitosamente</div> :
                            <div className='form-response failure'>Compañia no pudo ser registrada con exito, intente nuevamente!</div> : ''}
                        <div>
                            <button disabled={isSubmitting} type="submit" className="btn btn-info">Enviar</button>
                        </div>
                    </div>


                </div>
            </Form>
        </div>
    );

const CreateClientForm = withFormik({
    mapPropsToValues({
        businessName,
        taxID,
        sector,
        country,
        ownership,
        activeYears,
        website,
        contactEmployee,
        phoneNumber,
        email,
        address,
        city
    }) {
        return {
            businessName: businessName || "",
            taxID: taxID || "",
            sector: sector || "",
            country: country || "PERU",
            ownership: ownership || "PRIVATE",
            activeYears: activeYears || "",
            website: website || "",
            contactEmployee: contactEmployee || "",
            phoneNumber: phoneNumber || "",
            email: email || "",
            address: address || "",
            city: city || "",
        };
    },
    validationSchema: schema,
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        service.createCompany(values)
            .then(() => {
                resetForm()
                setSubmitting(false)
                setStatus({ success: 'Compañia registrada existosamente!' })
            })
    }
})(CreateClient);

export default CreateClientForm;
