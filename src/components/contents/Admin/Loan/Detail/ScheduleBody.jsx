import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Chip, ListItemSecondaryAction } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'
import './Schedule.scss'

function ScheduleBody(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let { scheduleDetails } = props
    let { loanSchedule, openPaymentOption, reversePayment, deletePayments } = scheduleDetails

    return (
        loanSchedule.map((item, i) => {
            return (
                <>
                    <ExpansionPanel expanded={expanded === `panel${i}`} className="expansion" onChange={i !== 0 ? handleChange(`panel${i}`) : null}>
                        <ExpansionPanelSummary
                            expandIcon={i !== 0 ? <ExpandMoreIcon /> : null}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className="expansion"
                        >
                            <div key={i} className="loan-schedule-content">
                                <div className="detail-schedule details-date">
                                    <p className='acc-date'>{moment(item.date).format("YY-MM-DD")}</p>
                                </div>
                                <div className="detail-schedule details-content-status">
                                    <p className='acc-total-status'>
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
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className='payment-summary'>
                                <p>PAGOS </p>
                                <div className='payment-holder'>
                                    {item.payments.length > 0 ? item.payments.map((e, y) => {
                                        return (
                                            y === item.payments.length - 1 ?
                                                <Chip
                                                    variant="outlined"
                                                    icon={<PaymentIcon />}
                                                    label={`${moment(e.date_pmt).format("YY-MM-DD")} - ${e.cashAccount} - ${e.amount}`}
                                                    onDelete={() => reversePayment(e._id)}
                                                    className="chip"
                                                /> : <Chip
                                                    variant="outlined"
                                                    icon={<PaymentIcon />}
                                                    label={`${moment(e.date_pmt).format("YY-MM-DD")} - ${e.cashAccount} - ${e.amount}`}
                                                    deleteIcon={<DoneIcon />}
                                                    className="chip"
                                                />

                                        )
                                    }) : ""}
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </>
            )
        })

    )
}

export default ScheduleBody;