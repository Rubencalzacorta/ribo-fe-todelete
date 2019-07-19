import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
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

  function dateDiff(paymentDate) {
    var now = moment(new Date()); //todays date
    var end = moment(paymentDate); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    
    return days 
  }
  function lateFeeHandle(paymentDate, interest_pmt) {
    return (dateDiff(paymentDate) > 0 && !interest_pmt) ? true : false;
  }


  function lateFeeCalc(paymentDate, capital) {
    return dateDiff(paymentDate)*0.01*capital
  }


  return (
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="right">Pago</CustomTableCell>
            <CustomTableCell>Prestatario</CustomTableCell>
            <CustomTableCell align="left">Fecha de Pago</CustomTableCell>
            <CustomTableCell align="right">Balance</CustomTableCell>
            <CustomTableCell align="right">Capital</CustomTableCell>
            <CustomTableCell align="right">Intereses</CustomTableCell>
            <CustomTableCell align="right">Mora</CustomTableCell>
            <CustomTableCell align="right">Total Cuota</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter( e => { return e.tracking !== 'disburstment'}).map((row, i) => (
            <TableRow className={classes.row} key={i}>
              <CustomTableCell component="th" scope="row">
              {parseInt(row.interest_pmt) > 0 ? 
                <i className="material-icons"> done_outline</i>  : <i className="material-icons">
                priority_high
                </i>}</CustomTableCell>
              <CustomTableCell align="left">
                <Link to={`/admin/loan/${row._loan}`}>{row.borrower[0].fullName}</Link>
              </CustomTableCell>
              <CustomTableCell align="right">{moment(row.date).format('YYYY-MM-DD')}</CustomTableCell>
              <CustomTableCell align="right">{parseInt(row.balance).toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{row.principal.toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{row.interest.toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{ lateFeeHandle(row.date, row.interest_pmt) ? lateFeeCalc(row.date, row.principal).toFixed(2) : ""} </CustomTableCell>
              <CustomTableCell align="right">{parseInt(row.payment).toFixed(2)}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="right">Aprobados</CustomTableCell>
            <CustomTableCell>Prestatario</CustomTableCell>
            <CustomTableCell align="left">Fecha</CustomTableCell>
            <CustomTableCell align="right">Monto</CustomTableCell>
            <CustomTableCell align="right">Capital</CustomTableCell>
            <CustomTableCell align="right">Intereses</CustomTableCell>
            <CustomTableCell align="right">Total Cuota</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter( e => { return e.status === 'DISBURSTMENT'}).map((row, i) => (
            <TableRow className={classes.row} key={i}>
              <CustomTableCell component="th" scope="row">
                <i className="material-icons"> done_outline</i> 
              </CustomTableCell>
              <CustomTableCell align="left">
                <Link to={`/admin/loan/${row._loan}`}>{row.borrower[0].fullName}</Link>
              </CustomTableCell>
              <CustomTableCell align="right">{moment(row.date).format('YYYY-MM-DD')}</CustomTableCell>
              <CustomTableCell align="right">{parseInt(row.balance).toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{row.principal.toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{row.interest.toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{parseInt(row.payment).toFixed(2)}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);