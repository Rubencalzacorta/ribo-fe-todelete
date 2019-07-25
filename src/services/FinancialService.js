import axios from 'axios';
require('dotenv').config();

class FinancialService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/financials`,
            withCredentials: true,
        });
    }


    getCashAccountTotals = (country) => {
        return this.service.get(`/cash-available/accounts/${country}`, )
            .then(response => response.data)
    }

}

export default FinancialService;