import axios from 'axios';
require('dotenv').config();

class InvestorService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/investor`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  createInvestor = (firstName, lastName, location, investor) => {
    return this.service.post('/', {
        firstName,
        lastName,
        location,
        investor
      })
      .then(response => response.data)
  }

  getInvestors = () => {
    return this.service.get('/list', )
      .then(response => response.data)
  }

  getInvestorInvestments = (investor) => {
    return this.service.get(`/investments/${investor}`, )
      .then(response => response.data)
  }

  getInvestorOptions = (investor) => {
    return this.service.get(`/detail/investmentStatus/${investor}`, )
      .then(response => response.data)
  }

  toggleInvestorAutoInvest = (investor) => {
    return this.service.post(`/detail/investmentStatus/${investor}`, )
      .then(response => response.data)
  }

  getInvestorFees = (investorId) => {
    return this.service.get(`/management-fee/${investorId}`, )
      .then(response => response.data)
  }

  addInvestorFees = (investorFee) => {
    return this.service.post(`/management-fee`,
        investorFee)
      .then(response => response.data)
  }

  deleteInvestorFees = (managementFeeId) => {
    return this.service.delete(`/management-fee/${managementFeeId}`, )
      .then(response => response.data)
  }

  changeInvestorType = (investorDetails) => {
    return this.service.put(`/type`, {
        ...investorDetails
      })
      .then(response => response.data)
  }
}

export default InvestorService;