import React, { Component, useState } from 'react'
import './portfolioCategoryItem.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Payment from '../../Loan/Detail/Payment'
import PaymentService from '../../../../../services/PaymentService'
import useWindowWidth from '../../../../../hooks/useWindowWidth'

const PortfolioDueCategoryUnpaid = (props) => {
    const [payment, setPayment] = useState(false)
    const paymentService = new PaymentService()
    const width = useWindowWidth()

    const togglePaymentOption = () => {
        setPayment(!payment)
    }

    let { data } = props

    const paymentReceiver = (payment) => {
        paymentService.newPayment(payment)
            .then(response => {
                props.loader()
                setPayment(false)
            })
    }

    return (
        (width >= 500) ? (
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
                            <p className="content"><Link to={`/admin/loan/${data._loan}`}>Detalle</Link> | <span className="payment-option" onClick={() => togglePaymentOption()}>Pagar</span></p>
                        </div>
                    </div>
                </div>
                {payment && <Payment installment={data} receivePayment={paymentReceiver} closePaymentOption={togglePaymentOption} />}
            </div>) :
            <div>
                <div className="item-cards">
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">{(data.firstName.split().length >= 1 && data.lastName.split().length >= 1 ? data.firstName.split(" ")[0] + " " + data.lastName.split(" ")[0] : data.firstName + " " + data.lastName).slice(0, 23)}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">Fecha: {moment(data.date).diff(moment(), 'd') * -1 > 0 ? (moment(data.date).format('YYYY-MM-DD')) + "  |  Dias:" + moment(data.date).diff(moment(), 'd') * -1 + "d" : (moment(data.date).format('YYYY-MM-DD'))}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">Interes: {(data.interest).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">Capital: {(data.principal).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content">Cuota: {(data.principal + data.interest).toLocaleString() + " " + data.currency}</p>
                        </div>
                    </div>
                    <div className="item-content-unpaid">
                        <div className="item-holder">
                            <p className="content"><Link to={`/admin/loan/${data._loan}`}>Detalle</Link> | <span className="payment-option" onClick={() => togglePaymentOption()}>Pagar</span></p>
                        </div>
                    </div>
                </div>
                {payment && <Payment installment={data} receivePayment={paymentReceiver} closePaymentOption={togglePaymentOption} />}
            </div>)


}

export default PortfolioDueCategoryUnpaid