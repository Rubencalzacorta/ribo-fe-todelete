import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import qs from 'qs'
const FileDownload = require('js-file-download');
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

    collectionReport = (country) => {
        return this.service.get(`/collection-xls/${country}`)
            .then((response) => {
                FileDownload(response.data, 'data.xlsx');
            });
    }

    getFilterCollection = (conditions) => {
        let stringParams = qs.stringify(conditions)
        return this.service.get(`/collector`, {
            params: conditions
        }).then(response => response.data)
    }

    getCollectionReport = () => {
        return this.service.get(`/collection-days`)
            .then(response => response.data)
    }
    getPandL = (query) => {
        return this.service.get(`/p-and-l`, {
                params: query
            })
            .then(response => response.data)
    }

}

export default ReportingService;