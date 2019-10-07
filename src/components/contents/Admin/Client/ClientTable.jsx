import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './results-table.scss'
import CountryFlag from '../../../helpers/CountryFlag.jsx'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const styles = theme => ({
  root: {
    width: 1000,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function LoanTable(props) {
  const { classes, data } = props;
  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Descargar Excel" />
      <Paper className={classes.root}>
        <table className={classes.table} id="table-to-xls">
          <thead className="table-header">
            <tr>
              <th className="header header-name">
                CLIENTE
            </th>
              <th className="header header-company">
                COMPAÑÍA
            </th>
              <th className="header header-loan-number">
                #
            </th>
              <th className="header header-capital">
                PRESTAMO
            </th>
              <th className="header header-remaining">
                X REPAGAR
            </th>
              <th className="header header-payment">
                CUOTA
            </th>
              <th className="header header-date">
                FECHA
            </th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {data.length > 0 ? data.map((row, i) => {
              let loanAmount = _(row.loans).groupBy('_id').size()
              let array = [...Array(loanAmount).keys()]
              return (
                (loanAmount > 1) ?
                  array.map((e, j) => {
                    return (j === 0) ?
                      <tr className='ser-item-holder' key={row.loans[j] ? row.loans[j]._id : j}>
                        <td className="ser-name-country">
                          <CountryFlag country={row.country} />
                          <h4 className="ser-client">
                            <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                          </h4>
                        </td>
                        <td className="ser-businessName">
                          <p>{row.businessName ? row.businessName : ""}</p>
                        </td>
                        <td className="ser-loanAmount">
                          <p>{loanAmount}</p>
                        </td>
                        <td className="ser-loan-detail loan-amount">
                          {row.loans[j] ? <Link to={`/admin/loan/${row.loans[j]._id}`}>{(row.loans[j].capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link> : ""}
                        </td>
                        <td className="ser-loan-detail">
                          {row.loans[j] ? (row.loans[j].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                        </td>
                        <td className="ser-loan-detail">
                          {row.loans[j] ? (row.loans[j].nextPayment.interest + row.loans[j].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                        </td>
                        <td className="ser-loan-detail">{moment(row.loans[j].nextPayment.date).format('YYYY-MM-DD')}</td>
                      </tr> :
                      <tr className='ser-item-holder'>
                        <td className="ser-name-country">
                          {""}
                        </td>
                        <td className="ser-businessName">
                          {""}
                        </td>
                        <td className="ser-loanAmount">
                          {""}
                        </td>
                        <td className="ser-loan-detail loan-amount">
                          <Link to={`/admin/loan/${row.loans[j]._id}`}>{(row.loans[j].capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link>
                        </td>
                        <td className="ser-loan-detail">
                          {row.loans[j] ? (row.loans[j].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                        </td>
                        <td className="ser-loan-detail">
                          {row.loans[j] ? (row.loans[j].nextPayment.interest + row.loans[j].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                        </td>
                        <td className="ser-loan-detail">{row.loans[j] ? moment(row.loans[j].nextPayment.date).format('YYYY-MM-DD') : ""}</td>
                      </tr>
                  }) :
                  <tr className='ser-item-holder' key={row.loans[0] ? row.loans[0]._id : i}>
                    <td className="ser-name-country">
                      <CountryFlag country={row.country} />
                      <h4 className="ser-client">
                        <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                      </h4>
                    </td>
                    <td className="ser-businessName">
                      <p>{row.businessName ? row.businessName : ""}</p>
                    </td>
                    <td className="ser-loanAmount">
                      <p>{loanAmount}</p>
                    </td>
                    <td className="ser-loan-detail loan-amount">
                      {row.loans[0] ? <Link to={`/admin/loan/${row.loans[0]._id}`}>{(row.loans[0].capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link> : ""}
                    </td>
                    <td className="ser-loan-detail">
                      {row.loans[0] ? (row.loans[0].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                    </td>
                    <td className="ser-loan-detail">
                      {row.loans[0] ? (row.loans[0].nextPayment.interest + row.loans[0].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                    </td>
                    <td className="ser-loan-detail">{row.loans[0] ? moment(row.loans[0].nextPayment.date).format('YYYY-MM-DD') : ""}</td>
                  </tr>
              )
            }) : ""}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);