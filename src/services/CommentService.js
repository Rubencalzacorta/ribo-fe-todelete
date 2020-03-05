import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

class CommentService {
    constructor() {
        this.service = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/api/comment`,
            withCredentials: true,
        });
    }

    getComments = () => {
        return this.service.get(`/`, )
            .then(response => response.data)
    }

    getLoanComments = (loanId) => {
        return this.service.get(`/${loanId}`, )
            .then(response => response.data)
    }

    getComment = (commentId) => {
        return this.service.get(`/${commentId}`, )
            .then(response => response.data)
    }

    newComment = (comment) => {
        return this.service.post(`/`,
                comment)
            .then(response => response.data)
    }

    updateComment = (commentId, comment) => {
        return this.service.patch(`/${commentId}`, comment)
            .then(response => response.data)
    }

    deleteComment = (commentId) => {
        return this.service.delete(`/${commentId}`, )
            .then(response => response.data)
    }

}

export default CommentService;