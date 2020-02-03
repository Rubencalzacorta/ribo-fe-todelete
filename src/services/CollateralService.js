import axios from 'axios';
require('dotenv').config();

class CollateralService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/collateral`,
      withCredentials: true,
    });
  }


  addCollateral = (newCollateral) => {
    return this.service.post(`/`,
        newCollateral)
      .then(response => response.data)
  }

  getCollaterals = (loanId) => {
    return this.service.get(`/${loanId}`)
      .then(response => response.data)
  }

  getInvAccounts = () => {
    return this.service.get('/get-accounts')
      .then(response => response.data)
  }

}

export default CollateralService;