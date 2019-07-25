import React, { Component } from 'react'
import './portfolioCategoryItem.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Payment from '../../Loan/Detail/Payment'
import loanService from '../../../../../services/LoanService'


export default class PortfolioDueCategoryUnpaid extends Component {
    state = {
        openPayment: false
    }
    loanService = new loanService()

    openPaymentOption = (item) => {
        this.setState({
            openPayment: true,
            installment: item
        })
    }

    closePaymentOption = () => {
        this.setState({
            openPayment: false,
            installment: null
        })
    }

    paymentReceiver = (payment) => {
        this.loanService.makePayment({ ...payment, status: 'PAID' })
            .then(response => {
                this.props.loader()
                this.setState({ openPayment: false })
            })
            .catch(error => {
                this.setState({ error })
            }
            )
    }

    render() {
        let { data } = this.props
        let { installment } = this.state
        return (
            <div>
                <div className="item-cards">
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.firstName + " " + data.lastName).slice(0, 23)}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(moment(data.date).format('YYYY-MM-DD'))}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.interest).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.principal).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.principal + data.interest).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content"><Link to={`/admin/loan/${data._loan}`}>Detalle</Link> | <span className="payment-option" onClick={() => this.openPaymentOption(data)}>Pagar</span></p>
                        </div>
                    </div>
                </div>
                {this.state.openPayment && <Payment installment={installment} receivePayment={this.paymentReceiver} closePaymentOption={this.closePaymentOption} />}
            </div>
        )
    }
}