import React, { Component } from 'react'
import './FinDashboard.scss'

export default class CashAccount extends Component {
    state = {
        getSummary: true
    }
    FinancialService = new FinancialService();


    fetchAccounts = async () => {
        if (this.state.getAccounts) {
            console.log(this.props.cashAccounts)
            console.log('aca')
            this.setState({ getSummary: false })
        }
    }

    render() {
        const { } = this.state
        return (
            <div className="content">
                aca
            </div>
        )
    }
}