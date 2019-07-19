import axios from 'axios';
require('dotenv').config();

class TransactionService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/test/summary`,
      withCredentials: true,
    });
  }

  totals = (country) => {
    return this.service.get(`/totals/${country}`,)
  .then(response => response.data)
  }
  portfolioMonthStatus = () => {
    return this.service.get(`/portfolio/month/schedule/`,)
  .then(response => response.data)
  }

  portfolioAggregates = () => {
    return this.service.get(`/portfolioAggregates`,)
  .then(response => response.data)
  }
  
  portfolioTotalsByStatus = (status) => {   
    return this.service.get(`/portfolio/total/schedule/${status}`,)
    .then(response => response.data)
  }
  portfolioTotalsByEveryStatus = (status) => {   
    return this.service.get(`/portfolio/total/schedule/all`,)
    .then(response => response.data)
  }
}

export default TransactionService;