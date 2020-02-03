// auth/auth-service.js
import axios from 'axios';
const env = runtimeEnv();
import runtimeEnv from '@mars/heroku-js-runtime-env';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${env.REACT_APP_API_URL}/api/auth`,
      withCredentials: true
    });
  }

  signup = (signUpInput) => {
    return this.service.post('/signup', signUpInput)
      .then(response => response.data)
  }

  confirm = (confirmationCode) => {
    return this.service.post('/confirmation', confirmationCode)
      .then(response => response.data)
      .catch(e => e)
  }

  resendVerification = () => {
    return this.service.get('/resend-confirmation', )
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {
        username,
        password
      })
      .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser', )
      .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout', )
      .then(response => response.data)
  }
}

export default AuthService;