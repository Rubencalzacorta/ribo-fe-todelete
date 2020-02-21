import React, { useState, useEffect } from 'react'
import LoanService from '../../../../services/LoanService'
import { Link } from 'react-router-dom'
import MaterialTable from 'material-table'
import { CsvBuilder } from 'filefy';
import numbro from 'numbro'
import moment from 'moment'


const loanVars = {
    'status': 'Estatus',
    'collateralValue': 'Valor Colateral',
    'collateralType': 'Tipo de Colateral',
    'collateralDescription': 'Descricion de Colateral',
    'startDate': 'Inicio',
    'duration': 'Duración',
    'capital': 'Monto',
    'interest': 'Tasa',
    'loanType': 'Tipo',
    'useOfFunds': 'Uso',
    'created_at': 'Registro',
    'totalPaid': 'Pagado',
    'capitalRemaining': 'Por Pagar',
    'currency': 'Moneda',
    'IRR': 'TIR',
    'paybackPeriod': 'PdR',
    'interestEarned': 'Ingreso',
    'paidback': 'Repagado',
    'country': 'Pais',
    'name': 'Nombre',
    'period': 'Periodo',
    'isRestructured': 'Restructurado',
    'insurancePremium': 'Prima',
}
const tableColumns = [
    { title: loanVars['name'], field: 'name', render: rowData => <Link to={`/admin/client/${rowData._borrower}`}> {rowData.name}</Link > },
    { title: loanVars['status'], field: 'status', lookup: { OPEN: 'ABIERTO', CLOSED: 'CERRADO' } },
    {
        title: loanVars['capital'],
        field: 'capital',
        customFilterAndSearch: (term, rowData) => term < rowData.capital,
        render: rowData =>
            <Link to={`/admin/loan/${rowData._id}`}> {numbro(rowData.capital).format({
                thousandSeparated: true,
                mantissa: 2,
            })}</Link >


    },
    { title: loanVars['startDate'], field: 'startDate', render: rowData => moment(rowData.startDate).format('YYYY/MM/DD') },
    { title: loanVars['duration'], field: 'duration', customFilterAndSearch: (term, rowData) => term < rowData.duration },
    { title: loanVars['interest'], field: 'interest', customFilterAndSearch: (term, rowData) => term < rowData.interest },
    { title: loanVars['loanType'], field: 'loanType' },
    { title: loanVars['period'], field: 'period' },
    { title: loanVars['isRestructured'], field: 'isRestructured' },
    { title: loanVars['insurancePremium'], field: 'insurancePremium' },
    { title: loanVars['useOfFunds'], field: 'useOfFunds' },
    { title: loanVars['created_at'], field: 'created_at', render: rowData => moment(rowData.created_at).format('YYYY/MM/DD') },
    {
        title: loanVars['totalPaid'], field: 'totalPaid', render: rowData => numbro(rowData.totalPaid).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    {
        title: loanVars['capitalRemaining'], field: 'capitalRemaining', render: rowData => numbro(rowData.capitalRemaining).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    { title: loanVars['currency'], field: 'currency' },
    { title: loanVars['IRR'], field: 'IRR' },
    { title: loanVars['paybackPeriod'], field: 'paybackPeriod' },
    {
        title: loanVars['interestEarned'], field: 'interestEarned', render: rowData => numbro(rowData.interestEarned).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    { title: loanVars['paidback'], field: 'paidback' },
    { title: loanVars['country'], field: 'country' },
    {
        title: loanVars['collateralValue'], field: 'collateralValue', render: rowData => numbro(rowData.collateralValue).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    { title: loanVars['collateralType'], field: 'collateralType' },
    { title: loanVars['collateralDescription'], field: 'collateralDescription' },
]

function LoanList() {
    const loanService = new LoanService()
    const [response, setResponse] = useState({ columns: tableColumns, data: [] });
    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await loanService.getLoanDetails();
                const newRes = {
                    ...response,
                    data: res
                }
                return setResponse(newRes);
            } catch (error) {
                console.log(error)
            }
        };
        FetchData();
        // eslint-disable-next-line
    }, []);


    return (
        <div style={{ 'width': '1200px', 'padding': '20px' }}>
            <Index model={response.data} />
        </div>
    )
}


function Index({ model }) {
    const handleExportCsv = (columns, renderData) => {
        const csvColumns = columns
            .filter(columnDef => {
                return !columnDef.hidden && columnDef.field && columnDef.export !== false;
            });

        const data = renderData.map(rowData =>
            csvColumns.map(columnDef => rowData[columnDef.field])
        );

        const builder = new CsvBuilder('pagos recibidos.csv')
            .setDelimeter(',')
            .setColumns(csvColumns.map(columnDef => columnDef.title))
            .addRows(data)
            .exportFile();
        return builder
    }

    return (
        <MaterialTable
            columns={tableColumns}
            data={model}
            title="HISTORICO DE PRESTAMOS"
            options={{
                columnsButton: true,
                exportButton: true,
                actionsColumnIndex: -1,
                filtering: true,
                exportCsv: handleExportCsv,
                pageSize: 10,
                exportFileName: 'untitled.csv' // using custom this is not used anymore
            }}
            toolbar={true} />
    )
}

export default LoanList