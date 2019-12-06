import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CsvBuilder } from 'filefy';
import PaymentService from './../../../../services/PaymentService'
import MaterialTable from 'material-table';
import numbro from 'numbro'

const columnsFormat = [
    { title: 'Nombre', field: 'borrower', render: rowData => <Link to={`/admin/loan/${rowData._loan}`}>{rowData.borrower}</Link> },
    { title: 'Fecha', field: 'date_pmt', type: 'date' },
    { title: 'Cuenta', field: 'cashAccount' },
    {
        title: 'Monto', field: 'amount', render: rowData => numbro(rowData.amount).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
    { title: 'Tipo', field: 'paymentType' },
]

function PaymentList() {
    const paymentService = new PaymentService()
    const [response, setResponse] = useState({ columns: columnsFormat, data: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await paymentService.getAllPayments();
                setResponse({ ...response, data: res });
            } catch (error) {
                setError(error);
            }
        };
        FetchData();
    }, [response, paymentService]);

    return (
        <div className="content">
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
            columns={columnsFormat}
            data={model}
            title="PAGOS RECIBIDOS"
            options={{
                columnsButton: true,
                exportButton: true,
                actionsColumnIndex: -1,
                exportCsv: handleExportCsv,
                pageSize: 10,
                exportFileName: 'untitled.csv' // using custom this is not used anymore
            }}
            toolbar={true}
        // editable={{
        // onRowAdd: newData =>
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve();
        //             const data = [...state.data];
        //             data.push(newData);
        //             setState({ ...state, data });
        //         }, 600);
        //     }),
        // onRowUpdate: (newData, oldData) =>
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve();
        //             const data = [...state.data];
        //             data[data.indexOf(oldData)] = newData;
        //             setState({ ...state, data });
        //         }, 600);
        //     }),
        //     onRowDelete: oldData =>
        //         new Promise(resolve => {
        //             setTimeout(() => {
        //                 resolve();
        //                 const data = [...response.data];
        //                 data.splice(data.indexOf(oldData), 1);
        //                 setResponse({ ...response, data });
        //             }, 600);
        //         }),
        // }}
        />
    );
}

export default PaymentList