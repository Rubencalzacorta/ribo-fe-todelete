import axios from 'axios';
require('dotenv').config();

class PaymentService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/reporting`,
            withCredentials: true,
        });
    }

    getCollection = () => {
        return this.service.get(`/collection`)
            .then(response => response.data)
    }

}

export default PaymentService;