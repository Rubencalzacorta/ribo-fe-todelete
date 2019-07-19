import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import { Link } from 'react-router-dom'

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
        <TableHead>
          <TableRow>
            <CustomTableCell>Clientes</CustomTableCell>
            <CustomTableCell></CustomTableCell>
            <CustomTableCell></CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((row, i) => (
            <TableRow className={classes.row} key={i}>
              <CustomTableCell align="left">
                <div className="client-summary">
                  <h4>
                    <Link to={`/admin/client/${row._id}`}>{row.firstName + " " + row.lastName}</Link>
                  </h4>
                  <p>Pais: {row.country}</p>
                  <p>Desde: {moment(row.created_at).format("YYYY-MM-DD")}</p>
                </div>
              </CustomTableCell>
              <CustomTableCell align="left">
                <div className="client-summary">
                  <h4>Prestamos</h4>
                  <p>Activos: {row.loans.filter(e => { return e.status === "OPEN" }).length}</p>
                  <p>Total:{row.loans.length}</p>
                </div>
              </CustomTableCell>
              <CustomTableCell align="left">
                <div className="client-summary">
                  <p>Prestado: {row.loans.filter(e => { return e.status === "OPEN" }).reduce((acc, e) => { return acc + e.capital }, 0).toLocaleString("en-GB", { style: "currency", currency: "USD" })}</p>
                  <p>Activo:   {row.loans.reduce((acc, e) => { return acc + e.capital }, 0).toLocaleString("en-GB", { style: "currency", currency: "USD" })}</p>
                </div>
              </CustomTableCell>
              <CustomTableCell align="left" >
                <div className="client-summary">
                  <p>Amortizado: {parseInt(row.loans.reduce((acc, e) => { return acc + (e.totalPaid ? e.totalPaid : 0) }, 0)).toLocaleString("en-GB", { style: "currency", currency: "USD" })}</p>
                  <p>Por pagar:  {(parseInt(row.loans.reduce((acc, e) => { return acc + e.capital }, 0)) - parseInt(row.loans.reduce((acc, e) => { return acc + (e.totalPaid ? e.totalPaid : 0) }, 0))).toLocaleString("en-GB", { style: "currency", currency: "USD" })}</p>
                </div>
              </CustomTableCell>
            </TableRow>
          )) : ""}
        </TableBody>
      </Table>
    </Paper>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);