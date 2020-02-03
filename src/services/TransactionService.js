import axios from 'axios';
const env = runtimeEnv();
class TransactionService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/transaction`,
      withCredentials: true,
    });
  }


  transactionInvestor = (_investor, cashAccount, concept, amount, date, comment) => {
    return this.service.post('/', {
        _investor,
        cashAccount,
        concept,
        amount,
        date,
        comment
      })
      .then(response => response.data)
  }

  getTransactions = (_investor, page, pageSize) => {
    return this.service.get(`/investor/${_investor}/${page}/${pageSize}`)
      .then(response => response.data)
  }

  getInvestorsAvailability = (country) => {
    return this.service.get(`/totals/${country}`, )
      .then(response => response.data)
  }

}

export default TransactionService;