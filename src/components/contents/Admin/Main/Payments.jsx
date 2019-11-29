import React, { useState, useEffect } from 'react'
import PaymentService from './../../../../services/PaymentService'
// import moment from 'moment';
import MaterialTable from 'material-table';
import numbro from 'numbro'

const columnsFormat = [
    { title: 'Nombre', field: 'borrower' },
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
                console.log(res)
                setResponse({ ...response, data: res });
            } catch (error) {
                setError(error);
            }
        };
        FetchData();
    }, []);




    return (
        <div className="content">
            <MaterialTable
                title="REGISTRO DE PAGOS"
                columns={response.columns}
                data={response.data}
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
        </div>
        // <div className="content">
        //     {response.data.map(e => {
        //         return (<p>{e._loan + " " + e.paymentType + " " + moment(e.date_pmt).format('YYYY-MM-DD') + " " + e.amount + " " + e.cashAccount}</p>)
        //     })}
        // </div>
    )
}

export default PaymentList