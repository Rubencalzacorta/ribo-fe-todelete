import * as yup from 'yup';


let schema = yup.object().shape({
  businessName: yup.string().nullable().required('Debe de introducir el nombre de la compañía'),
  country: yup.string().required('Debe de seleccionar su país'),
  ownership: yup.string().oneOf(['PUBLIC', 'PRIVATE']).required(),
  activeYears: yup.number().nullable().required('Debe introducir cantidad de años operativa'),
  employeeAmount: yup.number().nullable().required('Debe introducir cantidad de empleados'),
  contactEmployee: yup.string().required('Debe introducir un empleado de contacto'),
  phoneNumber: yup.string().required('Debe introducir un número de teléfono'),
  address: yup.string().required('Debe de introducir la dirección'),
  city: yup.string().required('Debe de introducir la ciudad')
})

export default schema