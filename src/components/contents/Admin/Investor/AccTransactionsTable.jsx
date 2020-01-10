import React, { useState, useEffect } from "react";
import TransactionService from '../../../../services/TransactionService'
import MaterialTable from 'material-table'
import numbro from 'numbro'
import moment from "moment";
import "./acc-transactions.scss";

function AccTransacionsTable(props) {
  const transactionService = new TransactionService();
  const { investorId } = props;


  return (
    <div className="personal-transactions-holder">

      <MaterialTable
        title="Movimientos"
        columns={[
          {
            title: 'Fecha', field: 'date', type: 'date', render: rowData => moment(rowData.date).format('YYYY/MM/DD')
          },
          { title: 'Cliente', field: 'fullName' },
          { title: 'Concepto', field: 'concept' },
          {
            title: 'Movimiento', field: 'debit',
            render: rowData => numbro(rowData.debit - rowData.credit).format({
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
        ]}
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
          toolbar: false,
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
