import React, { Component } from 'react'
import './FinDashboard.scss'
import FinancialService from './../../../../services/FinancialService'
import moment from 'moment'

export default class CashAccount extends Component {
    state = {
        getAccounts: true
    }
    FinancialService = new FinancialService()

    componentDidMount = () => {
        this.fetchAccounts()
    }

    fetchAccounts = async () => {
        if (this.state.getAccounts) {
            console.log(this.props.cashAccount)
            this.setState({ cashAccount: this.props.cashAccount })
            this.FinancialService.cashAccountMovements(this.props.cashAccount)
                .then(response => {
                    console.log(response)
                    this.setState({ movements: response })
                })
                .catch(e => console.log(e.message))

        }
    }

    render() {
        // this.fetchAccounts()
        let { cashAccount, movements } = this.state
        let acc = 0
        return (
            <div className="content">
                {cashAccount ? <caption className="">{cashAccount}</caption> : null}
                <table>
                    <tr>
                        <th>Fecha</th>
                        <th>Prestamo</th>
                        <th>Inversionista</th>
                        <th>Concepto</th>
                        <th>Debito</th>
                        <th>Credito</th>
                    </tr>
                    {movements ?
                        movements.map(e => {
                            acc = acc + (e.debit - e.credit);
                            return (
                                <tr>
                                    <td>{moment(e.date).format('YYYY-MM-DD')}</td>
                                    <td>{e._loan}</td>
                                    <td>{e._investor}</td>
                                    <td>{e.concept}</td>
                                    <td>{e.debit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td>{e.credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td>{acc.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>)
                        })
                        : null
                    }
                </table>
            </div>
        )
    }
}