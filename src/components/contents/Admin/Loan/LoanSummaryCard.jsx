import React from 'react';

import moment from 'moment'
import {Link} from 'react-router-dom'

export default function LoanSummaryCard(props) {
    const { data, totalPortfolio } = props;

    return (
        <div>
            <div className="loan-summary-head ">
            <div className="detail-summary head-left">
                <p className='title'>PRESTAMO</p>
            </div>
            <div className="detail-summary center head-content">
                <p className='title'>PESO EN CARTERA</p>
            </div>
            <div className="detail-summary center head-content">
                <p className='title'>CUOTAS * MONTO</p>
            </div>
            <div className="detail-summary last head-content">
                <p className='title'>POR AMORTIZAR</p>
            </div>
            </div>
            {data.map((e, i) => {
                let kPmt = (e.capital / e.duration)
                let iPmt = ((e.interest / 100) * e.capital)
                return (<div key={i} className="loan-summary">
                    <div className="detail-summary detail-left">
                        <p className='title'>{e._borrower.firstName.toUpperCase()+" "+e._borrower.lastName.toUpperCase()}</p>
                        <p className='total'>${parseFloat(e.capital).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                        <p className='acc-total'>{parseFloat(e.interest)}%  &nbsp;&nbsp;  |   &nbsp;&nbsp; {moment(e.startDate).format('LL')}</p>
                    </div>
                    <div className="detail-summary center detail-content">
                        <p className='total'>{(((e.capital - parseFloat(e.totalPaid ? e.totalPaid : 0))/totalPortfolio)*100).toLocaleString(undefined, {maximumFractionDigits: 2 })}%</p>
                        <p className='acc-total'>{((e.capital/totalPortfolio)*100).toLocaleString(undefined, {maximumFractionDigits: 2 })}%</p>
                    </div>
                    <div className="detail-summary center detail-content">
                        <p className='total'>{((e.totalPaid) ? Math.ceil((e.capital - parseFloat(e.totalPaid)) / kPmt) : e.duration)} * ${(iPmt + kPmt).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                        <p className='acc-total'>${iPmt.toLocaleString(undefined, {maximumFractionDigits: 2 })} + ${kPmt.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="detail-summary last detail-content">
                        <div>
                            <p className='total'>${(parseFloat(e.capital) - ((e.totalPaid) ? parseFloat(e.totalPaid) : 0)).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                            <p className='acc-total'>${(isNaN(e.totalPaid)) ? 0 : parseFloat(e.totalPaid).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                        </div>
                        <div >
                            <Link to={`/admin/loan/${e._id}`}><i className="material-icons">info</i></Link>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>

    )
}