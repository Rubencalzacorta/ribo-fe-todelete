import React from 'react';
import moment from 'moment'

function LoanSchedule(props) {
    const { loanSchedule } = props;

    return (
        <div className="loan-schedule-holder" style={{ "margin": "0 auto" }}>
            <div className="loan-schedule-head ">
                <div className="detail-schedule head-date">
                    <p className='title'>FECHA</p>
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
                    <p className='title'>STATUS</p>
                </div>
            </div>
            {loanSchedule.map((item, i) => {
                return (
                    <div key={i} className="loan-schedule-content">
                        <div className="detail-schedule details-date">
                            <p className='acc-total'>{moment(item.date).format("YY-MM-DD")}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{item.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{item.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{(parseFloat(item.interest) + parseFloat(item.principal)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="detail-schedule details-content">
                            <p className='acc-total'>{item.status}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}



export default LoanSchedule;