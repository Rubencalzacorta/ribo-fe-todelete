import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
    <Paper className={classes.root}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS" />
      <table className={classes.table} id="table-to-xls">
        <thead className="table-header">
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
        </thead>
        <tbody className='table-body'>
          {data.length > 0 ? data.map((row, i) => {
            console.log([_.countBy(row.loans, '_id')].length)
            return (

              <tr className="ser-item-holder">
                <td rowspan={_(row.loans).groupBy('_id').size()} className="ser-name-country">
                  <CountryFlag country={row.country} />
                  <h4 className="ser-client">
                    <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                  </h4>
                </td>
                <td rowspan={_(row.loans).groupBy('_id').size()} className="ser-businessName">
                  <p>{row.businessName ? row.businessName : ""}</p>
                </td>
                <td rowspan={_(row.loans).groupBy('_id').size()} className="ser-loanAmount">
                  <p>{_(row.loans).groupBy('_id').size()}</p>
                </td>
                <tr className="ser-loan">
                  {row.loans.map(e => {
                    return (
                      <td colspan='4' className="ser-loan-details">
                        <tr className="ser-loan-detail loan-amount"><Link to={`/admin/loan/${e._id}`}>{(e.capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link></tr>
                        <tr className="ser-loan-detail">{(e.capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</tr>
                        <tr className="ser-loan-detail">{(e.nextPayment.interest + e.nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</tr>
                        <tr className="ser-loan-detail">{moment(e.nextPayment.date).format('YYYY-MM-DD')}</tr>
                      </td>
                    )
                  })}
                </tr>
              </tr>

            )
          }) : ""}
        </tbody>
      </table>
    </Paper>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);