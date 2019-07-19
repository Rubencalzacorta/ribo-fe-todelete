import React from 'react';
import './portfolio.scss'


function PortfolioCard(props) {
    let { data, monthData } = props;
    let month = monthData[0]

    return (
        <div className="loans-summary">
            <div className="detail-summary">
                <p className='title'>{data._id.toUpperCase()}</p>
                <p className='total'>${data.totalCapitalRemaining.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>AMORTIZADO</p>
                <p className='acc-total'>${data.totalPaid.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>TOTAL NOMINAL</p>
                <p className='acc-total'>${data.totalCapital.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary">
                <p className='title'>TASA REAL</p>
                <p className='total'>{ monthData ? ( (month.details.projectedInterest/month.details.projectedPrincipal) * 100).toLocaleString(undefined, {maximumFractionDigits: 2 }) : ""}%</p>
                <p className='acc-title'>TASA</p>
                <p className='acc-total'>{(data.averageIntRate * 100).toLocaleString(undefined, {maximumFractionDigits: 2 })}%</p>
                <p className='acc-title'>INTERESES</p>
                <p className='acc-total'>${ month ? ( (month.details.interestPaid).toLocaleString(undefined, {maximumFractionDigits: 2 })): ""}</p>
                <p className='acc-title'>INTERESES PROJECTADOS</p>
                <p className='acc-total'>${(month.details.projectedInterest).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary">
                <p className='title'>CAPITAL RESTANTE MEDIO</p>
                <p className='total'>${data.averageLoanActiveCap.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>PRESTAMO MEDIO</p>
                <p className='acc-total'>${data.averageLoan.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>AMORTIZADO</p>
                <p className='acc-total'>${(month.details.principalPaid).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>AMORTIZCIÓN MES</p>
                <p className='acc-total'>${(month.details.projectedPrincipal).toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary">
                <p className='title'>DURACION INICIAL</p>
                <p className='total'>{data.averageDuration.toLocaleString(undefined, {maximumFractionDigits: 2 })} meses</p>
                <p className='acc-title'># INVERSIONES</p>
                <p className='acc-total'>{data.totalActiveLoans}</p>
            </div>
        </div>
    );
}

export default (PortfolioCard);