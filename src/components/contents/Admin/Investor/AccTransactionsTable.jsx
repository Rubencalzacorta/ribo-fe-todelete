import React from "react";
import TransactionService from '../../../../services/TransactionService'
import MaterialTable from 'material-table'
import numbro from 'numbro'
import moment from "moment";
import "./acc-transactions.scss";
import { CsvBuilder } from 'filefy';


const tableColumns = [
  {
    title: 'Fecha', field: 'date', type: 'date', render: rowData => moment(rowData.date).format('YYYY/MM/DD')
  },
  { title: 'Cliente', field: 'fullName' },
  { title: 'Concepto', field: 'concept' },
  {
    title: 'Movimiento', field: 'change',
    render: rowData => numbro(rowData.change).format({
      thousandSeparated: true,
      mantissa: 2,
    }),
    type: 'numeric'
  },
  {
    title: 'Saldo', field: 'balance',
    render: rowData => numbro(rowData.balance).format({
      thousandSeparated: true,
      mantissa: 2,
    }),
    type: 'numeric'
  },
  { title: 'Comentario', field: 'comment' },
]

function AccTransacionsTable(props) {
  const transactionService = new TransactionService();
  const { investorId } = props;

  const handleExportCsv = async (columns) => {
    const csvColumns = columns
      .filter(columnDef => {
        return !columnDef.hidden && columnDef.field && columnDef.export !== false;
      });

    const rawData = await transactionService.getAllTransactions(investorId)

    const data = rawData.map(rowData =>
      csvColumns.map(columnDef => rowData[columnDef.field])
    );

    const builder = new CsvBuilder(`investor-account-${investorId}.csv`)
      .setDelimeter(',')
      .setColumns(csvColumns.map(columnDef => columnDef.title))
      .addRows(data)
      .exportFile();
    return builder
  }

  return (
    <div className="personal-transactions-holder">

      <MaterialTable
        title="Movimientos"
        columns={tableColumns}
        data={query =>
          new Promise((resolve, reject) => {
            transactionService.getTransactions(investorId, query.page + 1, query.pageSize)
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
          })
        }
        options={{
          sort: false,
          search: false,
          showTitle: false,
          toolbar: true,
          exportButton: true,
          exportCsv: handleExportCsv,
          exportFileName: `transacciones.csv`,
          pageSize: 20,
          style: {
            width: '100%'
          }
        }}
      />


    </div>
  );
}

export default AccTransacionsTable;
