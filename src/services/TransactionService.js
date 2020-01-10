import axios from 'axios';
require('dotenv').config();

class TransactionService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/test/transaction`,
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

  getLoanInvestorDetails = (_investor) => {
    return this.service.get(`/loaninvestordetails/${_investor}`)
      .then(response => response.data)
  }

  getInvestorTransactions = (_investor) => {
    return this.service.get(`/list/${_investor}`)
      .then(response => response.data)
  }

  getTransactions = (_investor, page, pageSize) => {
    return this.service.get(`/transaction-list/${_investor}/${page}/${pageSize}`)
      .then(response => response.data)
  }

  getInvestorsAvailability = (country) => {
    return this.service.get(`/totals/${country}`, )
      .then(response => response.data)
  }



}

export default TransactionService;