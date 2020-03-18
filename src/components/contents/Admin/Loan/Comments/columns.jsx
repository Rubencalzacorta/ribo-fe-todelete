import React from 'react'
import moment from 'moment'
import numbro from 'numbro'
import { Link } from 'react-router-dom'

const tableColumns = [
    { title: 'Personal', field: '_author' },
    { title: 'Fecha de contacto', field: 'contactDate', render: rowData => moment(rowData.contactDate).format('YYYY/MM/DD') },
    { title: 'Comentario', field: 'comment' },
    { title: 'Fecha estimada de pago', field: 'estimatePaymentDate', render: rowData => moment(rowData.estimatePaymentDate).format('YYYY/MM/DD') },
    { title: 'Monto', field: 'estimateAmount' },
]

export default tableColumns