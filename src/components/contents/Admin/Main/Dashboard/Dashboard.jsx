import React, { Component } from 'react'
import LoanService from '../../../../../services/LoanService'
import TransactionService from '../../../../../services/TransactionService'
import moment from 'moment'
import PortfolioCategory from './PortfolioCategory'
import PortfolioCategoryPaid from './PortfolioCategoryPaid'
import PortfolioCategoryGeneral from './PortfolioCategoryGeneral'
import PortfolioCategoryItem from './PortfolioCategoryItem'
import PortfolioCategoryItemUnpaid from './PortfolioCategoryItemUnpaid'
import PortfolioCategoryItemOut from './PortfolioCategoryItemOut'

export default class Dashboard extends Component {
  state = {
    loans: [],
    getLoan: true,
    startDate: moment().subtract(7, 'days').toISOString().substring(0, 10),
    endDate: moment().add(7, 'days').toISOString().substring(0, 10),
    country: 'Todos',
    countries: ['Todos', 'Venezuela', 'Peru'],
  }
  service = new LoanService();
  TransactionService = new TransactionService();

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }


  componentDidMount = () => {
    this.fetchLoans()
    this.fetchAccountsTotals()
  }

  loader = async () => {
    this.fetchAccountsTotals()
    this.fetchLoans()
  }

  fetchAccountsTotals() {
    if (!this.state.accounts) {
      let country = this.props.userLocation
      this.TransactionService.getInvestorsAvailability(country)
        .then(response => {
          let total = response.reduce((acc, e) => { return acc + e.accumTotal }, 0)
          this.setState({
            total: total
          })
        })
        .catch(err => {
          this.setState({
            total: false
          })
        })
    }
  }

  fetchLoans(e) {

    if (e) { e.preventDefault(e) }
    const { startDate, endDate } = this.state
    const { userLocation } = this.props
    this.service.getPortfolioStatus(userLocation, startDate, endDate)
      .then(async response => {
        let loans = response

        this.setState({
          getLoan: false,
          portfolio: loans.portfolio,
          paid: loans.paid,
          due: loans.due,
          overdue: loans.overdue,
          outstanding: loans.outstanding
        })
      })
      .catch(err => {
        this.setState({
          loans: false
        })
      })
  }



  render() {

    const { portfolio, overdue, due, paid, total, outstanding } = this.state;

    return (
      <div className="content">
        <div>
          {portfolio ? (<PortfolioCategoryGeneral data={portfolio} title={'Pagos - Portafolio'} cash={total} />) : ""}
          {overdue ? (
            <div>
              <PortfolioCategory data={overdue} title={'Pagos atrasados (+7d)'} />
              {overdue.installments.map((e, i) => <PortfolioCategoryItemUnpaid key={i} data={e} loader={this.loader} />)}
            </div>) : ""}
          {due ? (
            <div>
              <PortfolioCategory data={due} title={'Pagos pendientes (±7d)'} />
              {due.installments.map((e, i) => <PortfolioCategoryItemUnpaid key={i} data={e} loader={this.loader} />)}
            </div>) : ""}
          {outstanding ? (
            <div>
              <PortfolioCategory data={outstanding} title={'Pagos Incompletos'} />
              {outstanding.installments.map((e, i) => <PortfolioCategoryItemOut key={i} data={e} loader={this.loader} />)}
            </div>) : ""}
          {paid ? (
            <div>
              <PortfolioCategoryPaid data={paid} title={'Pagos realizados'} />
              {paid.installments.map((e, i) => <PortfolioCategoryItem key={i} data={e} />)}
            </div>) : ""}
        </div>
      </div>
    )
  }
} 