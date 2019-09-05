import React, { Component } from 'react'
import FinancialService from '../../../../services/FinancialService'
import CashAvailability from './CashAvailability.jsx'
import Cashflow from './Cashflow.jsx'
import Stats from './Stats.jsx'
import './FinDashboard.scss'

export default class LoanList extends Component {
    state = {
        getSummary: true
    }
    FinancialService = new FinancialService();

    UNSAFE_componentWillMount() {

        this.fetchSummary()
    }


    fetchSummary = async () => {
        if (this.state.getSummary) {
            let { userLocation } = this.props
            let cashAccountsTotals = await this.FinancialService.getCashAccountTotals(userLocation)
            let cashflow = await this.FinancialService.getCashflow(userLocation)
            let stats = await this.FinancialService.getStats(userLocation)

            Promise.all([cashAccountsTotals, cashflow, stats])
                // this.summaryService.totals(userLocation)
                .then(response => {
                    this.setState({
                        getSummary: false,
                        cashAccounts: response[0],
                        cashflow: response[1],
                        stats: response[2]
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
        const { cashAccounts, cashflow, stats } = this.state
        return (
            <div className="content">
                <CashAvailability cashAccounts={cashAccounts} />
                <Stats stats={stats} />
                <Cashflow cashflow={cashflow} />
            </div>
        )
    }
}