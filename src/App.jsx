import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, withRouter } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login';
import EmailConfirmation from './components/auth/EmailConfirmation';
import PendingConfirmation from './components/auth/PendingConfirmation';
import Portfolio from './components/contents/Admin/Main/Portfolio/Portfolio'
import PortfolioGraphs from './components/contents/Admin/Main/Portfolio/PortfolioGraphs'
import Dashboard from './components/contents/Admin/Main/Dashboard/Dashboard'
import CreateClientForm from './components/contents/Admin/Client/CreateClientForm';
import CompanyCreateForm from './components/contents/Admin/Company/CompanyCreateForm';
import ClientList from './components/contents/Admin/Client/ClientList'
import ClientDetails from './components/contents/Admin/Client/ClientDetails.jsx'
import CreateInvestor from './components/contents/Admin/Investor/CreateInvestor'
import NewTransaction from './components/contents/Admin/Investor/NewTransaction'
import DetailInvestor from './components/contents/Admin/Investor/DetailInvestor.jsx'
import CreateLoan from './components/contents/Admin/Loan/CreateLoan/CreateLoan.jsx'
import FinDashboard from './components/contents/Admin/Financial/FinDashboard.jsx'
import LoanList from './components/contents/Admin/Loan/LoanList'
import LoanWeekList from './components/contents/Admin/Loan/LoanWeekList'
import PeriodSchedule from './components/contents/Admin/Loan/PeriodSchedule'
import LoanDetails from './components/contents/Admin/Loan/Detail/LoanDetails'
import Activity from './components/contents/Client/Activity/Activity'
import Loan from './components/contents/Client/Loan/Loan'
import Profile from './components/contents/Client/Profile/Profile'
import Layout from './components/layout/Layout.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
      .then((res) => {
        if (res.message === 'success') {
          this.setState({ loggedInUser: null });
          this.props.history.push('/login')
        }
      })

  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
          this.props.history.push('/')
        })
    }
  }

  render() {
    this.fetchUser()

    if (this.state.loggedInUser && this.state.loggedInUser.admin) {
      return (
        <div className="App">
          <Layout userInSession={this.state.loggedInUser} logout={this.logout} >
            <Switch>
              <Route exact path='/' render={() => <Dashboard getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/client/create' render={() => <CreateClientForm getUser={this.getTheUser} location={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/investor/create' render={() => <CreateInvestor getUser={this.getTheUser} location={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/investor/transaction' render={() => <NewTransaction getUser={this.getTheUser} location={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/investor/details' render={() => <DetailInvestor getUser={this.getTheUser} location={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/financials' render={() => <FinDashboard getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/loan/list' render={() => <LoanList getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/loan/period' render={() => <PeriodSchedule getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/activity' render={() => <Dashboard getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/portfolio' render={() => <Portfolio getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/company/create' render={() => <CompanyCreateForm getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/evolution' render={() => <PortfolioGraphs getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/weekly-schedule' render={() => <LoanWeekList getUser={this.getTheUser} location={this.state.loggedInUser.location} />} />
              <Route exact path='/admin/client/list' render={() => <ClientList getUser={this.getTheUser} userLocation={this.state.loggedInUser.location} />} />
              <Route path='/admin/loan/:loanId' render={({ match }) => <LoanDetails loanId={match.params.loanId} />} />
              <Route path='/admin/client/:clientId' render={({ match }) => <ClientDetails clientId={match.params.clientId} />} />
              <Route path='/admin/create-loan/:clientId' render={({ match }) => <CreateLoan clientId={match.params.clientId} userLocation={this.state.loggedInUser.location} />} />
            </Switch>
          </Layout>
        </div>
      );
    } else if (this.state.loggedInUser && this.state.loggedInUser.status === 'PENDING') {
      return (
        <div className="App-auth">
          <header className="App-header">
            <Switch>
              <Route exact path='/' render={() => <PendingConfirmation user={this.state.loggedInUser} />} />
            </Switch>
          </header>
        </div>
      );
    } else if (this.state.loggedInUser && this.state.loggedInUser.borrower) {
      return (
        <div className="App">
          <Layout userInSession={this.state.loggedInUser} logout={this.logout} >
            <Switch>
              <Route exact path="/" render={() => <Activity user={this.state.loggedInUser} getUser={this.getTheUser} />} />
              <Route exact path="/client/activity" render={() => <Activity user={this.state.loggedInUser} getUser={this.getTheUser} />} />
              <Route exact path="/client/loan" render={() => <Loan user={this.state.loggedInUser} getUser={this.getTheUser} />} />
              <Route exact path="/client/profile" render={() => <Profile user={this.state.loggedInUser} getUser={this.getTheUser} />} />
            </Switch>
          </Layout>
        </div>
      );
    } else {
      return (
        <div className="App-auth">
          <header className="App-header">
            <Switch>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser} />} />
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
              <Route path='/confirmation/:confirmationCode' render={({ match }) => <EmailConfirmation confirmationCode={match.params.confirmationCode} />} />
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default withRouter(App);