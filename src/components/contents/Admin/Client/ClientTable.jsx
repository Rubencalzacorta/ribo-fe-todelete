import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './results-table.scss'


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
      <Table className={classes.table}>
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
            console.log([_.countBy(row.loans, '_id')].length)
            return (
              <>
                <div className="ser-item-holder">
                  <div className="ser-name-country">
                    <span role="img" aria-label='country-flag'>
                      {(row.country === 'DOMINICAN_REPUBLIC')
                        ? <i class="em em-flag-do"></i> : (row.country === 'VENEZUELA')
                          ? <i class="em em-flag-ve"></i> : (row.country === 'PERU')
                            ? <i class="em em-flag-pe"></i> : ''
                      }
                    </span>
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
              </>
            )
          }) : ""}
        </div>
      </Table>
    </Paper>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);