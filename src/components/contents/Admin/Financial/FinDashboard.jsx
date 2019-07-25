import React, { Component } from 'react'
import FinancialService from '../../../../services/FinancialService'
import CashAvailability from './CashAvailability.jsx'
import Cashflow from './Cashflow.jsx'
import './FinDashboard.scss'

export default class LoanList extends Component {
    state = {
        getSummary: true
    }
    FinancialService = new FinancialService();

    componentWillMount() {

        this.fetchSummary()
    }


    fetchSummary = async () => {
        if (this.state.getSummary) {
            let { userLocation } = this.props
            let cashAccountsTotals = await this.FinancialService.getCashAccountTotals(userLocation)

            Promise.all([cashAccountsTotals])
                // this.summaryService.totals(userLocation)
                .then(response => {
                    this.setState({
                        getSummary: false,
                        cashAccounts: response[0]
                    })
                })
                .catch(err => {
                    this.setState({
                        data: false
                    })
                })
        }
    }



    render() {
        const { cashAccounts } = this.state
        return (
            <div className="content">
                <CashAvailability cashAccounts={cashAccounts} />
                <Cashflow />
            </div>
        )
    }
}