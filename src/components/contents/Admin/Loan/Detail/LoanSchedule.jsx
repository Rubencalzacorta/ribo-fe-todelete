import React from 'react';
import moment from 'moment'
import './loanSchedule.scss'

function LoanSchedule(props) {
    const { loanSchedule, openPaymentOption, reversePayment, deletePayments } = props;

    return (
        <div className="loan-schedule-detail-holder">
            <div className="loan-schedule-head ">
                <div className="detail-schedule head-date">
                    <p className='title-date'>FECHA</p>
                </div>
                <div className="detail-schedule head-content">
                    <p className='title'>ESTATUS</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>INTERES</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>CAPITAL</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>CUOTA</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>INT/P</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>CAP/P</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>TOTAL</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>CUENTA</p>
                </div>
                <div className="detail-schedule last head-content">
                    <p className='title'>OPCIONES</p>
                </div>
            </div>
            {loanSchedule.map((item, i) => {
                return (
                    <>
                        <div key={i} className="loan-schedule-content">
                            <div className="detail-schedule details-date">
                                <p className='acc-date'>{moment(item.date).format("YY-MM-DD")}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>
                                    {item.status === 'DISBURSTMENT' ? 'INICIO' :
                                        item.status === 'PAID' ? 'PAGO' :
                                            item.status === 'DUE' ? 'PAGADERO' :
                                                item.status === 'OVERDUE' ? 'ATRASADO' :
                                                    item.status === 'PENDING' ? 'PENDIENTE' : item.status}
                                </p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{item.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{item.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{(item.interest + item.principal).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{(item.interest_pmt) ? item.interest_pmt.toLocaleString(undefined, { maximumFractionDigits: 2 }) : ""}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{(item.principal_pmt) ? item.principal_pmt.toLocaleString(undefined, { maximumFractionDigits: 2 }) : ""}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{(item.principal_pmt || item.interest_pmt) ? ((item.principal_pmt ? item.principal_pmt : 0) + (item.interest_pmt ? item.interest_pmt : 0)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : ""}</p>
                            </div>
                            <div className="detail-schedule details-content">
                                <p className='acc-total'>{(item.cashAccount) ? item.cashAccount : ""}</p>
                            </div>
                            <div className="detail-schedule last details-content">
                                {(function () {
                                    switch (item.status) {
                                        case 'PAID':
                                            return <p className='itmt-options'>
                                                <i className="material-icons" onClick={() => deletePayments(item._id)}>delete_box</i>
                                            </p>;
                                        case 'DUE':
                                            return ((item.principal_pmt > 0) ?
                                                <p className='itmt-options'>
                                                    <i className="material-icons" onClick={() => deletePayments(item._id)}>delete_box</i>
                                                    <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                </p> : (!item.principal_pmt) ?
                                                    <p className='itmt-options'>
                                                        <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                    </p> : '')
                                        case 'OVERDUE':
                                            return ((item.principal_pmt > 0) ?
                                                <p className='itmt-options'>
                                                    <i className="material-icons" onClick={() => deletePayments(item._id)}>delete_box</i>
                                                    <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                </p> : (!item.principal_pmt) ?
                                                    <p className='itmt-options'>
                                                        <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                    </p> : '')
                                        case 'PENDING':
                                            return ((item.principal_pmt > 0) ?
                                                <p className='itmt-options'>
                                                    <i className="material-icons" onClick={() => deletePayments(item._id)}>delete_box</i>
                                                    <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                </p> : (!item.principal_pmt) ?
                                                    <p className='itmt-options'>
                                                        <i className="material-icons" onClick={() => openPaymentOption(item)}>add_box</i>
                                                    </p> : '')
                                        case 'DISBURSTMENT':
                                            return null;
                                        default:
                                            return null;
                                    }
                                })()}
                            </div>
                        </div>
                        {item.payments.length > 0 ? item.payments.map((e, y) => {
                            return (
                                <div key={e._id} className={y === 0 ? "loan-schedule-content-payment first-pmt" :
                                    y === item.payments.length - 1 ? "loan-schedule-content-payment last-pmt" :
                                        "loan-schedule-content-payment"}>
                                    <div className="detail-schedule details-date">
                                        <p className='acc-date'>{moment(e.date_pmt).format("YY-MM-DD")}</p>
                                    </div>
                                    <div className="detail-schedule details-content">

                                        <p className='itmt-options'><i className="material-icons"> payment </i></p>

                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'></p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'></p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'></p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'></p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'></p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'>{e.amount}</p>
                                    </div>
                                    <div className="detail-schedule details-content">
                                        <p className='acc-total'>{(e.cashAccount) ? e.cashAccount : ""}</p>
                                    </div>
                                    <div className="detail-schedule last details-content">
                                        <p className='itmt-options'><i className="material-icons" onClick={() => reversePayment(e._id)}> delete_box </i></p>
                                    </div>
                                </div>
                            )
                        }) : ""}
                    </>
                )
            })}
        </div>
    );
}



export default LoanSchedule;