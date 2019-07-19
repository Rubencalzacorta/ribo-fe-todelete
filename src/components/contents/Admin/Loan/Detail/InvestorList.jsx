import React from 'react';
import './loanInvestors.scss'

function InvestorList(props) {
    const { investors } = props;
    return (
        <div className="loan-investor-holder">
            <div className="investor-head ">
                <div className="detail-summary-left">
                    <p className='title-main'>INVERSIONISTA</p>
                </div>
                <div className="detail-summary">
                    <p className='title'>MONTO</p>
                </div>
                <div className="detail-summary">
                    <p className='title'>%</p>
                </div>
                <div className="detail-summary">
                    <p className='title'>FEE</p>
                </div>
                <div className="detail-summary">
                    <p className='title'>INGRESOS</p>
                </div>
                <div className="detail-summary">
                    <p className='title'>UTILIDAD</p>
                </div>
            </div>
            {investors.map((e,i) => {
            return (
                <div key={i} className="investor">
                    <div className="detail-summary-left acc-inv-main">
                        {e._investor.firstName.toUpperCase() + " " + e._investor.lastName.toUpperCase()}
                    </div>
                    <div className="detail-summary">
                        <p className="acc-inv">{e.amount.toLocaleString()}</p>
                    </div>
                    <div className="detail-summary">
                        <p className="acc-inv">{e.pct.toFixed(2) * 100}</p>
                    </div>
                    <div className="detail-summary">
                        <p className="acc-inv"></p>
                    </div>
                    <div className="detail-summary">
                        <p className="acc-inv"></p>
                    </div>
                    <div className="detail-summary">
                        <p className="acc-inv"></p>
                    </div>
                </div>)
            })}
        </div>
    );
}



export default InvestorList;