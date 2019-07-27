import axios from 'axios';
require('dotenv').config();

class InvestorService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/test/investor`,
      withCredentials: true,
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
    return this.service.get('/investor/list', )
      .then(response => response.data)
  }

  getInvestorInvestments = (investor) => {
    return this.service.get(`/investments/${investor}`, )
      .then(response => response.data)
  }
  getInvestorAutoInvest = (investor) => {
    return this.service.get(`/detail/investmentStatus/${investor}`, )
      .then(response => response.data)
  }
  toggleInvestorAutoInvest = (investor) => {
    return this.service.post(`/detail/investmentStatus/${investor}`, )
      .then(response => response.data)
  }
}

export default InvestorService;