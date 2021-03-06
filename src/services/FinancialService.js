import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();


class FinancialService {
    constructor() {
        this.service = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/api/financials`,
            withCredentials: true,
        });
    }

    getCashAccountTotals = (country) => {
        return this.service.get(`/cash-available/accounts/${country}`, )
            .then(response => response.data)
    }

    getCashflow = (country) => {
        return this.service.get(`/cashflow/${country}`, )
            .then(response => response.data)
    }

    getStats = (country) => {
        return this.service.get(`/general/stats/${country}`, )
            .then(response => response.data)
    }
    cashAccountMovements = (account, total) => {
        return this.service.get(`/cash-movements/account/${account}/${total}`, )
            .then(response => response.data)
    }

}

export default FinancialService;