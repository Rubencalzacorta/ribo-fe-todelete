import React from "react";
import { withFormik, Form, Field } from "formik";
import {
  employmentStatus,
  gender,
  nationalIdType,
  civilStatus,
  academicLevel,
  countries
} from "../../../../constants";
import schema from './ClientFormValidation'
import './createClient.scss'
import ClientService from '../../../../services/ClientService'

const service = new ClientService()

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
              <b>Creación de cuenta</b>
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
              <p>Nombres</p>

              <Field className="input-field" type="text" name="firstName" />
              {errors.firstName && touched.firstName ? <p className='form-error'>{errors.firstName}</p> : null}
            </div>
            <div className="form-label">
              <p>Apellidos</p>
              <Field className="input-field" type="text" name="lastName" />
              {errors.lastName && touched.lastName ? <p className='form-error'>{errors.lastName}</p> : null}
            </div>
            <div className="form-label">
              <p>Email</p>
              <Field className="input-field" type="email" name="email" />
              {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
            </div>
            <div className="form-label">
              <p>Fecha de Nacimiento</p>
              <Field className="input-field" type="date" name="DOB" />
              {errors.DOB && touched.DOB ? <p className='form-error'>{errors.DOB}</p> : null}
            </div>
            <div className="form-label">
              <p>Lugar de Nacimiento</p>
              <Field className="input-field" type="text" name="placeOfBirth" />
            </div>

            <div className="form-label">
              <p>Género</p>
              <Field className="select-field" component="select" name="gender">
                {gender.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              {errors.gender && touched.gender ? <p className='form-error'>{errors.gender}</p> : null}
            </div>
            <div className="form-label">
              <p>Estado civil</p>
              <Field className="select-field" component="select" name="civilStatus">
                {civilStatus.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-label">
              <p>Nacionalidad</p>
              <Field className="input-field" type="text" name="nationality" />
              {errors.nationality && touched.nationality ? <p className='form-error'>{errors.nationality}</p> : null}
            </div>
            <div className="form-label">
              <p>Número de Identidad</p>
              <Field className="input-field" type="text" name="nationalId" />
              {errors.nationalId && touched.nationalId ? <p className='form-error'>{errors.nationalId}</p> : null}
            </div>
            <div className="form-label">
              <p>Tipo de documento</p>
              <Field className="select-field" component="select" name="nationalIdType">
                {nationalIdType.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              {errors.nationalIdType && touched.nationalIdType ? <p className='form-error'>{errors.nationalIdType}</p> : null}
            </div>
            <div className="form-label">
              <p>Nivel Academico</p>
              <Field className="select-field" component="select" name="academicLevel">
                {academicLevel.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
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
              <p>Número Telefónico</p> <Field className="input-field" type="text" name="cellphoneNumber" />
              {errors.cellphoneNumber && touched.cellphoneNumber ? <p className='form-error'>{errors.cellphoneNumber}</p> : null}
            </div>
            <div className="form-label">
              <p> Dirección</p>
              <Field className="input-field" type="text" name="address" />
              {errors.address && touched.address ? <p className='form-error'>{errors.address}</p> : null}
            </div>

            <div className="form-label">
              <p>Ciudad</p>
              <Field className="input-field" type="text" name="city" />
              {errors.city && touched.city ? <p className='form-error'>{errors.city}</p> : null}
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
          </div>
        </div>
        <div className="formSectionHolder">
          <div className="formTitleHolder">
            <p>
              <b>Información de Laboral:</b>
            </p>
          </div>
          <div className="formInputsHolder">
            <div className="form-label">
              <p>Estatus laboral</p>
              <Field className="select-field" component="select" name="employmentStatus">
                {employmentStatus.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              {errors.employmentStatus && touched.employmentStatus ? <p className='form-error'>{errors.employmentStatus}</p> : null}
            </div>
            <div className="form-label">
              <p>Empresa</p>
              <Field className="input-field" type="text" name="businessName" />
            </div>
            <div className="form-label">
              <p>Fecha de Inicio</p>
              <Field className="input-field" type="date" name="startDate" />
            </div>
            <div className="form-label">
              <p>Direccion de la empresa</p>
              <Field className="input-field" type="text" name="businessAddress" />
            </div>
            <div className="form-label">
              <p>Núumero de télefono</p>
              <Field className="input-field" type="text" name="businessPhoneNumber" />
            </div>
            <div className="form-label">
              <p>Ingreso</p>
              <Field className="input-field" type="number" name="monthlyIncome" />
              {errors.monthlyIncome && touched.monthlyIncome ? <p className='form-error'>{errors.monthlyIncome}</p> : null}
            </div>
          </div>
        </div>
        <div className="formSectionHolder">
          <div className="formTitleHolder">
          </div>
          <div className="formOptionsHolder">
            {status ? status.success ?
              <div className='form-response success'>El usuario fue registrado exitosamente</div> :
              <div className='form-response failure'>El usuario no pudo ser registrado con exito, intente nuevamente!</div> : ''}
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
    firstName,
    lastName,
    email,
    DOB,
    placeOfBirth,
    cellphoneNumber,
    gender,
    civilStatus,
    nationality,
    nationalId,
    nationalIdType,
    academicLevel,
    address,
    city,
    country,
    employmentStatus,
    businessName,
    startDate,
    businessAddress,
    businessPhoneNumber,
    monthlyIncome
  }) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      DOB: DOB || "",
      placeOfBirth: placeOfBirth || "",
      cellphoneNumber: cellphoneNumber || "",
      gender: gender || "MALE",
      civilStatus: civilStatus || "SINGLE",
      nationality: nationality || "",
      nationalId: nationalId || "",
      nationalIdType: nationalIdType || "PASSPORT",
      academicLevel: academicLevel || "",
      address: address || "",
      city: city || "",
      country: country || "PERU",
      employmentStatus: employmentStatus || "EMPLOYED",
      businessName: businessName || "",
      startDate: startDate || "",
      businessAddress: businessAddress || "",
      businessPhoneNumber: businessPhoneNumber || "",
      monthlyIncome: monthlyIncome || ""
    };
  },
  validationSchema: schema,
  handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
    service.createAccount(values)
      .then(() => {
        resetForm()
        setSubmitting(false)
        setStatus({ success: 'El usuario fue registrado existosamente!' })
      })
  }

})(CreateClient);

export default CreateClientForm;
