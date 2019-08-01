import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import './loanDetails.scss'

function LoanDetailHeader(props) {
    const { details, interestIncome, interestProjected } = props;
    return (

        <div className="one-loan-details-summary">
            <div className="loan-detail-summary loan-detail-left">
                <p className='title name'><Link className='link' to={`/admin/client/${details._borrower._id}`}>{details._borrower.firstName.toUpperCase() + " " + details._borrower.lastName.toUpperCase()}</Link></p>
                <p className='total'>${parseFloat(details.capital).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " " + details.currency}
                </p>
            </div>
            <div className="loan-detail-summary loan-detail-content">
                <div>
                    <p className='title'>INT & TME</p>
                    <p className='total'>{parseFloat(details.interest)}% | {parseFloat(details.IRR) ? parseFloat(details.IRR) : ""}% </p>
                </div>
            </div>
            <div className="loan-detail-summary loan-detail-content">
                <div>
                    <p className='title'>POR AMORTIZAR</p>
                    <p className='total'>${((details.capitalRemaining > 1 ? details.capitalRemaining : 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
            <div className="loan-detail-summary last loan-detail-content">
                <div>
                    <p className='title'>INGRESO</p>
                    <p className='total'>${(interestIncome).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div className="loan-detail-summary loan-detail-left">
                <p className='title'>INICIO</p>
                <p className='total'>
                    <span className='total'>{moment(details.startDate).format('LL')}</span>
                </p>
            </div>
            <div className="loan-detail-summary loan-detail-content">
                <div>
                    <p className='title'>PLAZO & PR</p>
                    <p className='total'>{details.duration} m | {details.PaybackPeriod ? (details.PaybackPeriod).toLocaleString(undefined, { maximumFractionDigits: 2 }) : ""} m</p>
                </div>
            </div>
            <div className="loan-detail-summary loan-detail-content">
                <div>
                    <p className='title'>AMORTIZADO</p>
                    <p className='total'>${(isNaN(details.totalPaid)) ? 0 : parseFloat(details.totalPaid).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div className="loan-detail-summary last loan-detail-content">
                <div>
                    <p className='title'>INTERES PROJECTADO</p>
                    <p className='total'>${interestProjected.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
        </div>
    );
}



export default LoanDetailHeader;