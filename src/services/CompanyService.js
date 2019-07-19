import axios from 'axios';
require('dotenv').config();

class ClientService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/company`,
      withCredentials: true,
    });
  }


  createCompany = (details) => {
    return this.service.post(`/`,
        details)
      .then(response => response.data)
  }

  getClients = (country, firstName) => {
    return this.service.get(`/all-clients/${country}/${firstName}`)
      .then(response => response.data)
  }

  getClient = (clientId) => {
    return this.service.get(`/detail/${clientId}`)
      .then(response => response.data)
  }

  getInvAccounts = () => {
    return this.service.get('/get-accounts')
      .then(response => response.data)
  }

}

export default ClientService;