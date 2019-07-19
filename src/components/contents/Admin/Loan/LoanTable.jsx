import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
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
    color: 'white',
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
  const { classes, data, loanRemove } = props;


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Prestatario</CustomTableCell>
            <CustomTableCell align="right">Fecha de Inicio</CustomTableCell>
            <CustomTableCell align="right">Capital</CustomTableCell>
            <CustomTableCell align="right">Por pagar</CustomTableCell>
            <CustomTableCell align="right">Pagado</CustomTableCell>
            <CustomTableCell align="right">Duración</CustomTableCell>
            <CustomTableCell align="right">Interes</CustomTableCell>
            <CustomTableCell align="right"></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow className={classes.row} key={i}>
              <CustomTableCell component="th" scope="row">
                {row._borrower.fullName}
              </CustomTableCell>
              <CustomTableCell align="right">{moment(row.startDate).format('YYYY-MM-DD')}</CustomTableCell>
              <CustomTableCell align="right">{parseFloat(row.capital).toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{parseFloat(row.capital).toFixed(2) - ((row.totalPaid) ? parseFloat(row.totalPaid).toFixed(2) : 0)}</CustomTableCell>
              <CustomTableCell align="right">{(isNaN(row.totalPaid)) ? 0: parseFloat(row.totalPaid).toFixed(2)}</CustomTableCell>
              <CustomTableCell align="right">{row.duration}</CustomTableCell>
              <CustomTableCell align="right">{row.interest}%</CustomTableCell>
              <CustomTableCell align="right"><DeleteOutlinedIcon onClick={() => loanRemove(row._id)}/></CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

LoanTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanTable);