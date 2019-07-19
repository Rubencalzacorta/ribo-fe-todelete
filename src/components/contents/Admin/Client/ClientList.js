import React, { Component } from 'react'
import ClientService from '../../../../services/ClientService'
import ClientTable from './ClientTable'


export default class LoanList extends Component {
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

  fetchClients() {

    this.service.getClients(this.props.userLocation, this.state.inputValue)
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
      this.fetchClients();
    }
  }

  render() {

    const { clients } = this.state

    return (
      <div className="content">
        <div className="input-group mb-3 search-bar">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Buscar cliente</span>
          </div>
          <input type="text" name="inputValue" onKeyDown={(e) => this.onKeyPress(e)} onChange={(e) => this.handleChange(e)} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        {(clients.length > 0) ? <ClientTable data={clients} /> : ""}

      </div>
    )
  }
}


