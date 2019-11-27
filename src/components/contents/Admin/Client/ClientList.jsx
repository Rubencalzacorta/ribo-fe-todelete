import React, { Component } from 'react'
import ClientService from '../../../../services/ClientService'
import { withRouter } from 'react-router-dom'
import numbro from 'numbro'
import ClientTable from './ClientTable'
import _ from "lodash"
import { Link } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import queryString from 'query-string'
import './ClientList.scss'
import { rounder } from './../../../helpers/numberFunctions'
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';



class LoanList extends Component {
  state = {
    clients: [],
    getClients: false,
    bulkPayment: []
  }
  service = new ClientService();


  handleChange = (event) => {
    const { name, value } = event.target;
    if (value === "" || null || undefined) {
      this.setState({ getClients: false, clients: [] })
    } else {
      this.setState({ [name]: value, getClients: true });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleChange = (e) => {
    const { name, value, checked } = e.target
    let obj = JSON.parse(value)
    let _id = name
    let isChecked = checked
    if (isChecked) {
      this.setState({
        bulkPayment: [...this.state.bulkPayment, {
          _id: _id,
          payment: rounder(obj.payment),
          client: obj.client,
          date: obj.date
        }
        ]
      })
    } else {
      let arr = this.state.bulkPayment
      let equalId = (element) => element._id == _id
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

    const { clients, bulkPayment, clientName, open } = this.state

    return (
      <div className="content">
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
                      <td className="table-amount">{numbro(e.payment).format({
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
                      return acc + e.payment
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
            <Button className="button-client-search" variant="contained">PROCESAR</Button>
          </Paper>
        </Dialog>
        {(clients.length > 0) ? <ClientTable data={clients} onChange={this.toggleChange} bulkPayment={bulkPayment} /> : ""}
      </div>
    )
  }
}



export default withRouter(LoanList)