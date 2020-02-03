import axios from 'axios';
const env = runtimeEnv();
import runtimeEnv from '@mars/heroku-js-runtime-env';


class InvestorService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/investor`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  //keep
  getInvestors = () => {
    return this.service.get('/list', )
      .then(response => response.data)
  }

  //keep
  getHoldingAccounts = () => {
    return this.service.get('/holding-account/list', )
      .then(response => response.data)
  }

  //keep
  //extend functionlity. abstract more
  createInvestor = (firstName, lastName, location, investor) => {
    return this.service.post('/', {
        firstName,
        lastName,
        location,
        investor
      })
      .then(response => response.data)
  }

  //keep
  getCashDetails = (investor) => {
    return this.service.get(`/profile/cash-available/${investor}`, )
      .then(response => response.data)
  }

  //keep
  getInvestmentDetails = (investor) => {
    return this.service.get(`/profile/investment-details/${investor}`, )
      .then(response => response.data)
  }

  //keep
  getPLDetails = (investor) => {
    return this.service.get(`/profile/profit-and-loss/${investor}`, )
      .then(response => response.data)
  }

  getCashMovements = (investor) => {
    return this.service.get(`/profile/cash-movements/${investor}`, )
      .then(response => response.data)
  }

  //start preferences
  getInvestorOptions = (investor) => {
    return this.service.get(`/detail/investment-preference/${investor}`, )
      .then(response => response.data)
  }

  toggleInvestorAutoInvest = (investor) => {
    return this.service.post(`/detail/investment-preference/${investor}`, )
      .then(response => response.data)
  }

  //end preferences

  getInvestmentsSummary = (investor) => {
    return this.service.get(`/investment-summary/${investor}`, )
      .then(response => response.data)
  }

  getLoanInvestorDetails = (_investor) => {
    return this.service.get(`/investment-details/${_investor}`)
      .then(response => response.data)
  }

  //keep
  getInvestorFees = (investorId) => {
    return this.service.get(`/detail/management-fee/${investorId}`, )
      .then(response => response.data)
  }

  //keep
  addInvestorFees = (investorFee) => {
    return this.service.post(`/detail/management-fee`,
        investorFee)
      .then(response => response.data)
  }

  //keep
  deleteInvestorFees = (managementFeeId) => {
    return this.service.delete(`/detail/management-fee/${managementFeeId}`, )
      .then(response => response.data)
  }

  //keep
  changeInvestorType = (investorDetails) => {
    return this.service.put(`/detail/investment-preference/investor-type`, {
        ...investorDetails
      })
      .then(response => response.data)
  }
}

export default InvestorService;