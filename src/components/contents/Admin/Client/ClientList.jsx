import React, { Component } from 'react'
import ClientService from '../../../../services/ClientService'
import { withRouter } from 'react-router-dom'
import ClientTable from './ClientTable'
import { Link } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import queryString from 'query-string'
import './ClientList.scss'



class LoanList extends Component {
  state = {
    clients: [],
    getClients: false,
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

  componentDidUpdate() {
    const values = queryString.parse(this.props.location.search)
    if (this.state.getClients && values.clientName !== undefined) {
      this.fetchClients(values.clientName)
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    if (values.clientName !== undefined) {
      this.setState({ getClients: true })
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

    const { clients } = this.state

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
        {(clients.length > 0) ? <ClientTable data={clients} /> : ""}
      </div>
    )
  }
}



export default withRouter(LoanList)