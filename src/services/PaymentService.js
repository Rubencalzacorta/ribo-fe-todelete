import axios from 'axios';
require('dotenv').config();

class PaymentService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/payment`,
            withCredentials: true,
        });
    }

    deletePayment = (paymentId) => {
        return this.service.delete(`/installment/${paymentId}`)
            .then(response => response.data)
    }

    newPayment = (paymentDetails) => {
        return this.service.post(`/installment/${paymentDetails._loanSchedule}`,
                paymentDetails
            )
            .then(response => response.data)
    }

    newFullPayment = (paymentDetails) => {
        return this.service.post(`/prepay-loan/installment/${paymentDetails._loanSchedule}`,
                paymentDetails
            )
            .then(response => response.data)
    }

    newBulkPayment = (bulkPayment) => {
        return this.service.post(`/bulk-payment`,
                bulkPayment
            )
            .then(response => response.data)
    }
}

export default PaymentService;