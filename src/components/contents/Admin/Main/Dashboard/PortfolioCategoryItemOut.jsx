import React, { useState } from 'react'
import './portfolioCategoryItem.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PaymentService from '../../../../../services/PaymentService'
import PaymentModal from '../../../../Modal/PaymentModal'
import Dialog from '../../../../Modal/Dialog'


const PortfolioCategoryItemOut = (props) => {
    const [payment, setPayment] = useState(false)
    const paymentService = new PaymentService()

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
        <div>
            <div className="item-cards">
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content">{(data.firstName.split().length >= 1 && data.lastName.split().length >= 1 ? data.firstName.split(" ")[0] + " " + data.lastName.split(" ")[0] : data.firstName + " " + data.lastName).slice(0, 23)}</p>
                    </div>
                </div>
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content">{(moment(data.date).format('YYYY-MM-DD')) + " | " + moment(data.date).diff(moment(), 'd') * -1}</p>
                    </div>
                </div>
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content number-content">{(data.interest - data.interest_pmt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content number-content">{(data.principal - data.principal_pmt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content number-content">{(data.balanceDue).toLocaleString() + " " + data.currency}</p>
                    </div>
                </div>
                <div className="item-content-unpaid">
                    <div className="item-holder">
                        <p className="content"><Link to={`/admin/loan/${data._loan}`}>Detalle</Link> | <span className="payment-option" onClick={() => togglePaymentOption()}>Pagar</span></p>
                    </div>
                </div>
            </div>
            {payment &&
                <Dialog
                    toggle={togglePaymentOption}
                    open={payment}
                    title='Inserte detalles de pago'
                >
                    <PaymentModal
                        submitTitle={'Procesar Pago'}
                        installment={data._id}
                        receivePayment={paymentReceiver}
                        toggle={togglePaymentOption}
                    />
                </Dialog>}
        </div>
    )

}

export default PortfolioCategoryItemOut