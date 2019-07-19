import React from 'react';
// import moment from 'moment'

function CashAvailability(props) {
    const { details, summary } = props;
    let total = details.reduce((acc, e) => { return acc + e.accumTotal }, 0)

    return (

        <div className="one-loan-details-summary">
            <div className="detail-summary detail-left">
                <p className='title'>EFECTIVO DISPONIBLE</p>
                <p className='total'>${parseFloat(total).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary detail-content">
                <p className='title'>INTERESES</p>
                <p className='total'>{summary.interestPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span className='acc-total'>/ {summary.interestIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </p>
            </div>
            <div className="detail-summary detail-content">
                <p className='title'>CAPITAL</p>
                <p className='total'>{summary.capitalRepaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span className='acc-total'>/ {summary.capitalScheduled.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </p>
            </div>
            <div className="detail-summary detail-content">
                <p className='title'>TOTAL</p>
                <p className='total'>{(summary.capitalRepaid + summary.interestPaid).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span className='acc-total'>/ {(summary.capitalScheduled + summary.interestIncome).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </p>
            </div>

        </div>
    );
}



export default CashAvailability;