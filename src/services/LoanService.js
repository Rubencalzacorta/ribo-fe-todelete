import axios from 'axios';
const env = runtimeEnv();
import runtimeEnv from '@mars/heroku-js-runtime-env';

class LoanService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/loan`,
      withCredentials: true,
    });
  }

  getLoanCommissions = (loanId) => {
    return this.service.get(`/commission/${loanId}`)
      .then(response => response.data)
  }

  getSalesmen = () => {
    return this.service.get('/commission/salesmen')
      .then(response => response.data)
  }

  addCommission = (salesmanCommission) => {
    return this.service.post('commission', {
      ...salesmanCommission
    }).then(response => {
      return response.data
    })
  }

  deleteCommission = (id) => {
    return this.service.delete(`commission/${id}`)
      .then(response => {
        return response.data
      })
  }

  getLoanDetails = () => {
    return this.service.get('/')
      .then(response => response.data)
  }

  getLoanCompleteDetails = (id) => {
    return this.service.get(`/complete-details/${id}`)
      .then(response => response.data)
  }

  getPeriodSchedule = (startDate, endDate, location) => {
    return this.service.get(`/schedule/${startDate}/${endDate}/${location}`)
      .then(response => response.data)
  }

  getPortfolioStatus = (location, fromDate, toDate) => {
    return this.service.get(`/portfolio-status/${location}/${fromDate}/${toDate}`)
      .then(response => response.data)
  }

  getOpenLoanDetails = () => {
    return this.service.get('/open')
      .then(response => response.data)
  }

  getLoanSchedule = (loanId) => {
    return this.service.get(`/loanschedule/${loanId}`, {
        loanId
      })
      .then(response => response.data)
  }

  getWeekSchedule = () => {
    return this.service.get('/current-week')
      .then(response => response.data)
  }

  restructure = (loanId, restructuringDetails) => {
    return this.service.post(`/restructure/${loanId}`, restructuringDetails)
      .then(response => response.data)
  }


  createLoan = (_borrower, insurancePremium, collateralType, collateralValue, collateralDescription, loanDetails, useOfFunds, toInvest, currency) => {

    return this.service.post('/create', {
        _borrower,
        insurancePremium,
        collateralType,
        collateralValue,
        collateralDescription,
        loanDetails,
        useOfFunds,
        toInvest,
        currency
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response
      })

  }

  createLoanAllActive = (_borrower, insurancePremium, collateralType, collateralValue, collateralDescription, loanDetails, useOfFunds, currency, country) => {

    return this.service.post('/create/all-active-invest', {
        _borrower,
        insurancePremium,
        collateralType,
        collateralValue,
        collateralDescription,
        loanDetails,
        useOfFunds,
        currency,
        country
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })
  }

  makePayment = (payment) => {
    return this.service.patch(`/installmentpmt/${payment.paymentId}`, {
      payment
    }).then(response => response.data)
  }

  deletePayments = (id) => {
    return this.service.delete(`/deletepmt/${id}`)
      .then(response => response.data)
  }

  deleteLoan = (id) => {
    return this.service.delete(`/${id}`)
      .then(response => response.data)
  }

}

export default LoanService;