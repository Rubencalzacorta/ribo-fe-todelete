import React, { Component } from 'react'
import './portfolioCategoryItem.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Payment from '../../Loan/Detail/Payment'
import PaymentService from '../../../../../services/PaymentService'

export default class PortfolioDueCategoryUnpaid extends Component {
    state = {
        openPayment: false
    }
    PaymentService = new PaymentService()

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
        this.PaymentService.newPayment(payment)
            .then(response => {
                this.props.loader()
                this.setState({ openPayment: false })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        let { data } = this.props
        let { installment } = this.state
        return (
            <div>
                <div className="item-cards">
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.firstName.split().length >= 1 && data.lastName.split().length >= 1 ? data.firstName.split(" ")[0] + " " + data.lastName.split(" ")[0] : data.firstName + " " + data.lastName).slice(0, 23)}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{moment(data.date).diff(moment(), 'd') * -1 > 0 ? (moment(data.date).format('YYYY-MM-DD')) + "  |  " + moment(data.date).diff(moment(), 'd') * -1 + "d" : (moment(data.date).format('YYYY-MM-DD'))}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content number-content">{(data.interest).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content number-content">{(data.principal).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content number-content">{(data.principal + data.interest).toLocaleString() + " " + data.currency}</p>
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