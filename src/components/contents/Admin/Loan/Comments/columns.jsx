import React from 'react'
import moment from 'moment'
import numbro from 'numbro'
import { Link } from 'react-router-dom'

const tableColumns = [
    { title: 'Personal', field: '_author' },
    { title: 'Fecha Estimada', field: 'estimateDate', render: rowData => moment(rowData.estimateDate).format('YYYY/MM/DD') },
    { title: 'Comentario', field: 'comment' },
]

export default tableColumns