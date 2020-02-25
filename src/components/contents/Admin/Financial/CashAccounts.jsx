import React, { useState, useEffect } from 'react'
import './FinDashboard.scss'
import FinancialService from './../../../../services/FinancialService'
import { Link } from 'react-router-dom'
import MaterialTable from 'material-table'
import { CsvBuilder } from 'filefy';
import moment from 'moment'
import numbro from 'numbro'


const tableColumns = [
    { title: 'Fecha', field: 'date', render: rowData => moment(rowData.date).format('YYYY/MM/DD') },
    { title: 'Prestamo', field: '_loan', render: rowData => <Link to={`/admin/loan/${rowData._loan}`}>{rowData._loan}</Link > },
    {
        title: 'Inversor', field: '_investor', render: rowData => {
            if (rowData.concept !== 'INVESTMENT') {
                return <Link to={`/admin/investor/details/${rowData._investor}`}> {rowData._investor}</Link >
            }
        }
    },
    { title: 'Concepto', field: 'concept' },
    {
        title: 'Debito', field: 'debit', render: rowData => numbro(rowData.debit).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    {
        title: 'Credito', field: 'credit', render: rowData => numbro(rowData.credit).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    {
        title: 'Total', field: 'total', render: rowData => numbro(rowData.total).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    }
]

function CashAccount(props) {
    const financialService = new FinancialService()
    const [response, setResponse] = useState({ columns: tableColumns, data: [] });
    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await financialService.cashAccountMovements(props.cashAccount, props.totalCash);
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
        <div style={{ 'padding': '20px' }}>
            <Index model={response.data} cashAccount={props.cashAccount} />
        </div>
    )
}

function Index({ model, cashAccount }) {
    const handleExportCsv = (columns, renderData) => {
        const csvColumns = columns
            .filter(columnDef => {
                return !columnDef.hidden && columnDef.field && columnDef.export !== false;
            });

        const data = renderData.map(rowData =>
            csvColumns.map(columnDef => rowData[columnDef.field])
        );

        const builder = new CsvBuilder(`bank-account-${cashAccount}.csv`)
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
            title={` Cuenta ${cashAccount}`}
            options={{
                columnsButton: true,
                exportButton: true,
                // actionsColumnIndex: -1,
                // filtering: true,
                exportCsv: handleExportCsv,
                pageSize: 10,
                exportFileName: `bank-account-${cashAccount}.csv` // using custom this is not used anymore
            }}
            toolbar={true} />
    )
}

export default CashAccount
// export default class CashAccount extends Component {
//     state = {
//         getAccounts: true
//     }
//     FinancialService = new FinancialService()

//     componentDidMount = () => {
//         this.fetchAccounts()
//     }

//     fetchAccounts = async () => {
//         if (this.state.getAccounts) {
//             this.FinancialService.cashAccountMovements(this.props.cashAccount, this.props.totalCash)
//                 .then(response => {
//                     this.setState({ movements: response })
//                 })
//                 .catch(e => console.log(e.message))

//         }
//     }

//     render() {
//         // this.fetchAccounts()
//         let { cashAccount, movements, totalCash } = this.state

//         let acc = totalCash
//         return (
//             <div className="content">
//                 {cashAccount ? <caption className="">{cashAccount}</caption> : null}
//                 <table>
//                     <tr>
//                         <th>Fecha</th>
//                         <th>Prestamo</th>
//                         <th>Inversionista</th>
//                         <th>Concepto</th>
//                         <th>Debito</th>
//                         <th>Credito</th>
//                     </tr>
//                     {movements ?
//                         movements.map((e, i) => {
//                             if (i === 0) {
//                                 acc = totalCash
//                             } else {
//                                 console.log(movements[i - 1].debit, movements[i - 1].credit, movements[i - 1].debit - movements[i - 1].credit)
//                                 acc = acc - (movements[i - 1].debit - movements[i - 1].credit);
//                             }
//                             return (
//                                 <tr>
//                                     <td>{moment(e.date).format('YYYY-MM-DD')}</td>
//                                     <td>{e._loan}</td>
//                                     <td>{e._investor}</td>
//                                     <td>{e.concept}</td>
//                                     <td>{e.debit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                                     <td>{e.credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                                     <td>{acc.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                                 </tr>)
//                         })
//                         : null
//                     }
//                 </table>
//             </div>
//         )
//     }
// }