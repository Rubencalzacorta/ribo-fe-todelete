import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let schema = yup.object().shape({
  firstName: yup.string().nullable().required('Debe de introducir sus nombres'),
  lastName: yup.string().nullable().required('Debe de introducir sus apellidos'),
  DOB: yup.date('Debe de introducir una fecha valida').nullable().required('Debe seleccionar su fecha de nacimiento'),
  email: yup.string().email('Email no válido').required('Debe de introducir un email válido'),
  gender: yup.string().oneOf(['MALE', 'FEMALE']).required(),
  nationality: yup.string().required('Debe de introducir su nacionalidad'),
  nationalIdType: yup.string().required('Debe de introducir su tipo de documento'),  
  nationalId: yup.string().required('Debe de introducir su número de documento'),
  cellphoneNumber: yup.string().matches(phoneRegExp, 'Debe de introducir un numero valido'),
  address: yup.string().nullable().required('Debe de introducir su dirección completa'),
  city: yup.string().nullable().required('Debe de introducir su ciudad'),
  country: yup.string().required('Debe de seleccionar su país'),
  employmentStatus: yup.string().required(' Debe de seleccionar su estatus laboral'),
  monthlyIncome: yup.number().nullable().required('Debe de intrudicr su ingreso mensual')
})

export default schema