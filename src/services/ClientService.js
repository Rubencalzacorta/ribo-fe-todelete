import axios from 'axios';
const env = runtimeEnv();
import runtimeEnv from '@mars/heroku-js-runtime-env';

class ClientService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/client`,
      withCredentials: true,
    });
  }

  //keep
  updateAccount = (_id, details) => {
    return this.service.patch(`/update/details/${_id}`, {
        details
      })
      .then(response => response.data)
  }

  updateDocumentID = (_id, documentID) => {
    const formData = new FormData();
    formData.append('photo', documentID)

    return this.service.post(`/update/documentID/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => response.data)
  }

  updateDocumentIncome = (_id, documentIncomeOrPayslip) => {
    const formData = new FormData();
    formData.append('photo', documentIncomeOrPayslip)

    return this.service.post(`/update/documentIncome/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => response.data)
  }

  //keep

  createAccount = (details) => {
    return this.service.post(`/create-account`, {
        details
      })
      .then(response => response.data)
  }

  getClients = (query) => {
    return this.service.get(`/search/${query}`)
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