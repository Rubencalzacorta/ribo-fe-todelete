import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
class TransactionService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/transaction`,
      withCredentials: true,
    });
  }


  transactionInvestor = (txData) => {
    return this.service.post('/', txData)
      .then(response => response.data)
  }

  getTransactions = (_investor, page, pageSize) => {
    return this.service.get(`/investor/${_investor}/${page}/${pageSize}`)
      .then(response => response.data)
  }

  getAllTransactions = (_investor) => {
    return this.service.get(`/all/investor/${_investor}`)
      .then(response => response.data)
  }

  getInvestorsAvailability = (country) => {
    return this.service.get(`/totals/${country}`, )
      .then(response => response.data)
  }

}

export default TransactionService;