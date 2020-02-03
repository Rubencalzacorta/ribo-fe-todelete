import axios from 'axios';
const env = runtimeEnv();

class ReportingService {
    constructor() {
        this.service = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/api/reporting`,
            withCredentials: true,
        });
    }

    getCollection = () => {
        return this.service.get(`/collection`)
            .then(response => response.data)
    }

    getCollectionReport = () => {
        return this.service.get(`/collection-days`)
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