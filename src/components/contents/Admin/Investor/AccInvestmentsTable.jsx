import React from "react";
import { Link } from 'react-router-dom';
import InvestorService from '../../../../services/InvestorService'
import MaterialTable from 'material-table'
import moment from "moment";
import "./acc-investments.scss";
import numbro from 'numbro'


function AccInvestmentsTable(props) {
  const investorService = new InvestorService();
  const { investorId } = props;
  return (
    <div className="personal-transactions-holder">

      <MaterialTable
        title="Movimientos"
        className='materialTable'
        columns={[
          {
            title: 'Fecha', field: 'date', type: 'date', render: rowData => moment(rowData.startDate).format('YYYY/MM/DD')
          },
          {
            title: 'Cliente', field: 'fullName', render: rowData =>
              <Link className="acc-date" to={`/admin/loan/${rowData._loan}`}>
                {(rowData.firstName.split().length >= 1 && rowData.lastName.split().length >= 1 ? rowData.firstName.split(" ")[0] + " " + rowData.lastName.split(" ")[0] : rowData.firstName + " " + rowData.lastName).slice(0, 23)}
              </Link>
          },
          {
            title: 'Nominal', field: 'debit',
            render: rowData => numbro(rowData.investment / rowData.pct).format({
              average: true,
              mantissa: 2,
            }),
            type: 'numeric'
          },
          {
            title: '%', field: 'pct',
            render: rowData => numbro(rowData.pct * 100).format({ mantissa: 2 }) + '%'
            ,
            type: 'numeric'
          },
          {
            title: 'Invertido', field: 'total', render: rowData =>
              numbro(rowData.investment).format({
                average: true,
                mantissa: 2,
              })
            ,
            type: 'numeric'
          },
          {
            title: 'Venta', field: 'disvestments', render: rowData =>
              numbro(rowData.divestment).format({
                average: true,
                mantissa: 2,
              })
            ,
            type: 'numeric'
          },
          {
            title: 'Venta', field: 'disvestments', render: rowData =>
              numbro(rowData.capital).format({
                average: true,
                mantissa: 2,
              }),
            type: 'numeric'
          },
          {
            title: 'Ingreso', field: 'income', render: rowData =>
              numbro(rowData.interest
                + rowData.feeIncome
                - rowData.feeExpenses
                + rowData.commissionIncome
                + rowData.managementFeeIncome
                - rowData.commissionExpense
                - rowData.managementFeeExpense
              ).format({
                average: true,
                mantissa: 2,
              })
            ,
            type: 'numeric'
          },
          { title: 'Estatus', field: 'status' },
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            investorService.getInvestmentsSummary(investorId, query.page + 1, query.pageSize)
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
          pageSize: 10,
          style: {
            width: '1000px'
          }
        }}
      />

    </div>
  );
}

export default AccInvestmentsTable;
