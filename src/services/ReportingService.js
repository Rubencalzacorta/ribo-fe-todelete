import axios from 'axios';
import qs from 'qs'
require('dotenv').config();

class ReportingService {
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

    getPandL = (query) => {
        console.log(query)
        return this.service.get(`/p-and-l`, {
                params: query
            })
            .then(response => response.data)
    }

}

export default ReportingService;