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
<<<<<<< HEAD
    <Paper className={classes.root}>
      <div className={classes.table}>
        <div className="table-header">
          <div className="header header-name">
            CLIENTE
          </div>
          <div className="header header-company">
            COMPAÑÍA
          </div>
          <div className="header header-loan-number">
            #
          </div>
          <div className="header header-capital">
            PRESTAMO
          </div>
          <div className="header header-remaining">
            X REPAGAR
          </div>
          <div className="header header-payment">
            CUOTA
          </div>
          <div className="header header-date">
            FECHA
          </div>
        </div>
        <div className='table-body'>
          {data.length > 0 ? data.map((row, i) => {
            return (
                <div className="ser-item-holder">
                  <div className="ser-name-country">
                    <CountryFlag country={row.country} />
                      <h4 className="ser-client">
                        <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                      </h4>
                    </div>
                    <div className="ser-businessName">
                      <p>{row.businessName ? row.businessName : ""}</p>
                    </div>
                    <div className="ser-loanAmount">
                      <p>{_(row.loans).groupBy('_id').size()}</p>
                    </div>
                    <div className="ser-loan">
                      {row.loans.map(e => {
                        return (
                          <div className="ser-loan-details">
                            <p className="ser-loan-detail loan-amount"><Link to={`/admin/loan/${e._id}`}>{(e.capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link></p>
                            <p className="ser-loan-detail">{(e.capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p className="ser-loan-detail">{(e.nextPayment.interest + e.nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p className="ser-loan-detail">{moment(e.nextPayment.date).format('YYYY-MM-DD')}</p>
                          </div>
                        )
                      })}
                  </div>
                </div>
            ) 
          }) : ""}    
        </div>
        </div>
    </Paper>
  );  
}   
 
=======
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
              let loanAmount = _(row.loans).groupBy('_id').size()
              let array = [...Array(loanAmount).keys()]
              console.log(array)
              console.log(loanAmount)

              return (
                (loanAmount > 1) ?
                  array.map((e, j) => {
                    return (j === 0) ?
                      <tr className='ser-item-holder'>
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
                          <Link to={`/admin/loan/${row.loans[j]._id}`}>{(row.loans[j].capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link>
                        </td>
                        <td className="ser-loan-detail">
                          {(row.loans[j].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="ser-loan-detail">
                          {(row.loans[j].nextPayment.interest + row.loans[j].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                          {(row.loans[j].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="ser-loan-detail">
                          {(row.loans[j].nextPayment.interest + row.loans[j].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="ser-loan-detail">{moment(row.loans[j].nextPayment.date).format('YYYY-MM-DD')}</td>
                      </tr>
                  }) :
                  <tr className='ser-item-holder'>
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
                      <Link to={`/admin/loan/${row.loans[0]._id}`}>{(row.loans[0].capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link>
                    </td>
                    <td className="ser-loan-detail">
                      {(row.loans[0].capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="ser-loan-detail">
                      {(row.loans[0].nextPayment.interest + row.loans[0].nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="ser-loan-detail">{moment(row.loans[0].nextPayment.date).format('YYYY-MM-DD')}</td>
                  </tr>
              )
            }) : ""}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

>>>>>>> feature-excel-output
LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(LoanTable);