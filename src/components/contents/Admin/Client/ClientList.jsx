import React, { Component } from 'react'
import ClientService from '../../../../services/ClientService'
import PaymentService from '../../../../services/PaymentService'
import { withRouter } from 'react-router-dom'
import numbro from 'numbro'
import ClientTable from './ClientTable'
import { Link } from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import queryString from 'query-string'
import './ClientList.scss'
import { rounder } from './../../../helpers/numberFunctions'
import { TextField, InputLabel, FormControl, Dialog, Badge, Button, IconButton, Divider, Paper, InputBase, Select, MenuItem } from '@material-ui/core';
import { accounts } from '../../../../constants';



class LoanList extends Component {
  state = {
    clients: [],
    getClients: false,
    bulkPayment: [],
    cashAccount: null,
    paymentDate: null
  }
  service = new ClientService();
  paymentService = new PaymentService();


  handleChange = (event) => {
    const { name, value } = event.target;
    if (value === "" || null || undefined) {
      this.setState({ getClients: false, clients: [] })
    } else {
      this.setState({ [name]: value, getClients: true });
    }
  }

  handleSelect = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    let { bulkPayment, paymentDate, cashAccount } = this.state
    this.paymentService.newBulkPayment({
      bulkPayment: bulkPayment,
      paymentDate: paymentDate,
      cashAccount: cashAccount
    })
      .then(response => {
        if (response.status === 'success') {
          this.setState({
            open: false,
            cashAccount: null,
            paymentDate: null,
            bulkPayment: [],
            paymentStatus: 'success'
          });
          this.fetchClients(this.state.clientName)
        }
      })
      .catch(e => {
        this.setState({
          open: false,
          cashAccount: null,
          paymentDate: null,
          bulkPayment: [],
          paymentStatus: 'failure'
        });
      })
  }

  toggleChange = (e) => {
    const { name, value, checked } = e.target
    let obj = JSON.parse(value)
    let _id = name
    let isChecked = checked
    if (isChecked) {
      this.setState({
        bulkPayment: [...this.state.bulkPayment, {
          _loanSchedule: _id,
          _loan: obj._loan,
          amount: rounder(obj.payment),
          client: obj.client,
          date: obj.date
        }
        ]
      })
    } else {
      let arr = this.state.bulkPayment
      let equalId = (element) => element._loanSchedule === _id
      let index = arr.findIndex(equalId)
      if (index > -1) {
        arr.splice(index, 1)
      }

      this.setState({ bulkPayment: arr })
    }
  }


  componentDidUpdate() {
    const values = queryString.parse(this.props.location.search)
    if (this.state.getClients && values.clientName !== undefined) {
      this.fetchClients(values.clientName)
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    if (values.clientName !== undefined) {
      this.setState({ getClients: true, clientName: values.clientName })
      this.fetchClients(values.clientName)
    }
  }


  fetchClients(clientName) {
    this.service.getClients(this.props.userLocation, clientName)
      .then(response => {
        this.setState({
          getClients: false,
          clients: response
        })
      })
      .catch(err => {
        this.setState({
          clients: false,
          getClients: false
        })
      })
  }



  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      this.props.history.push({
        pathname: '/admin/client/list',
        search: "?" + new URLSearchParams({ clientName: this.state.inputValue }).toString()
      })
      this.setState({ getClients: true })
      this.fetchClients(this.state.inputValue)
    }
  }

  render() {

    const { clients, bulkPayment, clientName, open, cashAccount, paymentDate, paymentStatus } = this.state

    return (
      <div className="content">
        {paymentStatus === 'success' ?
          <div class="alert alert-success alert-dismissible">
            <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
            <strong>Exito!</strong> El pago se ha procesado correctamente.
        </div>
          : paymentStatus === 'failure' ?
            <div class="alert alert-success alert-dismissible">
              <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
              <strong>Fallo!</strong> La operación no se ha procesado correctamente
        </div> : ""
        }
        <Paper className="root">
          <IconButton className="iconButton" disabled aria-label="menu">
            <i className="material-icons">
              account_circle
          </i>
          </IconButton>
          <InputBase
            className="input"
            placeholder="Buscar cliente"
            name="inputValue"
            onKeyDown={(e) => this.onKeyPress(e)}
            onChange={(e) => this.handleChange(e)}
            inputProps={{ "aria-label": "buscar cliente" }}
          />
          <IconButton disabled className="iconButton" aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider className="divider" orientation="vertical" />
          <IconButton
            color="secondary"
            className="iconButton"
            aria-label="directions"
          >
            <i className="material-icons">
              <Link to="/admin/client/create">
                create
              </Link>
            </i>
          </IconButton>
        </Paper>
        <Button className="button-client-search" variant="contained">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename={clientName ? `${clientName} - ${new Date()}` : `resultados-busqueda-${new Date()}`}
            sheet="tablexls"
            buttonText='DESCARGAR'
          />
        </Button>
        <Badge color="primary" badgeContent={bulkPayment.length}>
          <Button onClick={() => this.handleClickOpen()} className="button-client-search" variant="contained">PAGOS</Button>
        </Badge>
        <Dialog onClose={() => this.handleClose()} open={open}>
          <Paper className="payment-modal">
            <h6>LISTADO DE PAGOS POR PROCESAR</h6>

            <FormControl className="input-date-cash" required>
              <InputLabel htmlFor="filled-age-simple">Cuenta</InputLabel>
              <Select
                value={cashAccount}
                name="cashAccount"
                type="string"
                label="Cuenta"
                onChange={(e) => this.handleSelect(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accounts.map(e => {
                  return (<MenuItem value={e}>{e}</MenuItem>)
                })}
              </Select>
              <TextField
                id="date"
                name="paymentDate"
                label="Fecha de Pago"
                type="date"
                value={paymentDate}
                className="paymentDate"
                onChange={(e) => this.handleSelect(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <table>
              <thead>
                <tr>
                  <th className="table-client head">Cliente</th>
                  <th className="table-date">Fecha</th>
                  <th className="table-amount">Monto</th>
                </tr>
              </thead>
              <tbody>
                {bulkPayment.length > 0 ?
                  bulkPayment.map((e, i) => {
                    return (<tr>
                      <td className="content">{`${i + 1}.- ${e.client}`}</td>
                      <td className="date">{e.date}</td>
                      <td className="table-amount">{numbro(e.amount).format({
                        thousandSeparated: true,
                        mantissa: 2,
                      })}</td>
                    </tr>)
                  }) : ''}
                <tr>
                  <td className="table-client totals head">Total</td>
                  <td className="table-client totals head"></td>
                  <td className="table-amount totals">
                    {bulkPayment.length > 0 ? numbro(bulkPayment.reduce((acc, e) => {
                      return acc + e.amount
                    }
                      , 0)).format({
                        thousandSeparated: true,
                        mantissa: 2,
                      }) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button onClick={() => this.handleClose()} className="button-client-search" variant="contained">CANCELAR</Button>
            <Button onClick={() => this.handleSubmit()} className="button-client-search" variant="contained">PROCESAR</Button>
          </Paper>
        </Dialog>
        {(clients.length > 0) ? <ClientTable data={clients} onChange={this.toggleChange} bulkPayment={bulkPayment} /> : ""}
      </div>
    )
  }
}



export default withRouter(LoanList)