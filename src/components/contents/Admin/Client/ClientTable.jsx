import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Checkbox } from '@material-ui/core';
import moment from 'moment'
import { Link } from 'react-router-dom'
import './results-table.scss'
import CountryFlag from '../../../helpers/CountryFlag.jsx'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
  table: {
    width: '100%',

  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function LoanTable(props) {
  const { classes, data, onChange, bulkPayment } = props;
  return (
    <Paper className={classes.root}>
      <table className={classes.table} id="table-to-xls">
        <thead className="table-header">
          <tr style={{ width: '100%' }}>
            <Grid container
              spacing={2}
              direction="row"
              className="gridContainer"
              justify="space-evenly"
              alignItems="center">
              <Grid item xs={12} md={3}>
                <th className="header header-name">
                  CLIENTE
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={1}>
                <th className="header header-company">
                  TIPO
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={2}>
                <th className="header header-company">
                  COMPAÑÍA
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={2}>
                <th className="header header-capital">
                  PRESTAMO
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={1}>
                <th className="header header-remaining">
                  REPAGAR
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={2}>
                <th className="header header-payment">
                  CUOTA
                </th>
              </Grid>
              <Grid className="header" item xs={4} md={1}>
                <th className="header header-date">
                  FECHA
                </th>
              </Grid>
            </Grid>
          </tr>
        </thead>
        <tbody className='table-body'>
          {data.length > 0 ? data.map((row, i) => {
            return (
              <tr className='row-height row-center' key={i} >
                <Grid container
                  spacing={3}
                  direction="row"
                  // justify="space-evenly"
                  className="gridContainer1 row-height"
                  alignItems="center">
                  <Grid item xs={12} md={3}>
                    <td className="content-cell" style={{ paddingLeft: '20px' }}>
                      <CountryFlag country={row.country} />
                      <h4 className="ser-client" style={{ paddingLeft: '5px' }}>
                        {row.investor ?
                          <Link to={`/admin/investor/details/${row._id}`}>{row.firstName + " " + row.lastName}</Link> :
                          <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                        }
                      </h4>
                    </td>
                  </Grid>
                  <Grid item xs={4} md={1} >
                    <td className="content-cell">
                      {row.investor ? 'Inversor' : row.firstName === '' ? '' : 'Prestatario'}
                    </td>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <td className="content-cell">
                      {row.businessName ? row.businessName : ""}
                    </td>
                  </Grid>

                  <Grid item xs={4} md={2}>
                    <td className="content-cell">
                      {row.capital > 0 ? <Link to={`/admin/loan/${row._loanId}`}>{(row.capital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Link> : ""}
                    </td>
                  </Grid>
                  <Grid item xs={4} md={1}>
                    <td className="content-cell">
                      {row.capital > 0 ? (row.capitalRemaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                    </td>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <td className="content-cell">
                      {row.capital ?
                        <>
                          <Checkbox
                            className="pure-material-checkbox"
                            type="checkbox"
                            name={row.nextPayment._id}
                            value={JSON.stringify({
                              _loan: row._loanId,
                              client: row.firstName + " " + row.lastName,
                              payment: (row.nextPayment.interest + row.nextPayment.principal),
                              date: moment(row.nextPayment.date).format('YYYY-MM-DD')
                            })}
                            checked={bulkPayment._id}
                            onChange={(e) => onChange(e)}
                          />
                          {(row.nextPayment.interest + row.nextPayment.principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </> : ""}
                    </td>
                  </Grid>
                  <Grid item xs={4} md={1} >
                    <td className="content-cell">{row.capital ? moment(row.nextPayment.date).format('YYYY-MM-DD') : ''}</td>
                  </Grid>
                </Grid>
              </tr>)
          }) : ''}
        </tbody>
      </table>
    </Paper >
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);