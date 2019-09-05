import React from 'react';
import moment from 'moment'
import './loanTransactions.scss'

function LoanSchedule(props) {
    const { transactions } = props;

    return (
        <div className="transactions-holder">
            <div className="loan-schedule-head ">
                <div className="detail-schedule head-date">
                    <p className='title-date'>FECHA</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title-date'>INVERSIONISTA</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title-date'>CONCEPTO</p>
                </div>
                <div className="detail-schedule center head-content">
                    <p className='title'>DEBITO</p>
                </div>
                <div className="detail-schedule last head-content">
                    <p className='title'>CREDITO</p>
                </div>
            </div>
            {transactions.map((item, i) => {
                return (
                    <div key={i} className="loan-schedule-content">
                        <div className="detail-schedule details-date">
                            <p className='acc-date'>{moment(item.date).format("YY-MM-DD")}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-date'>{item._investor.firstName + " " + item._investor.lastName}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-date'>{item.concept}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{item.debit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{item.credit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
}



export default LoanSchedule;