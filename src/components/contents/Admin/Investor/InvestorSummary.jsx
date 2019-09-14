import React from 'react'

const InvestorSummary = (props) => {
    let {
        cashAvailable,
        cashAccounts,
        paidBackCapital,
        totalInvestments,
        divestments,
        interestReceived,
        feeIncome,
        feeExpenses,
        totalCosts,
        totalDeposits,
        totalWithdrawals
    } = props.summary

    return (
        <div className="investment-acc-summary">
            <div className="detail-summary">
                <p className='title'>DISPONIBLE</p>
                <p className='total'>$ {cashAvailable.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                {(cashAccounts.length > 0) ? cashAccounts.map((e, i) => {
                    return <div key={i}><p className='acc-title'>{e.cashAccount}</p><p className='acc-total'>{e.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p> </div>
                }) : ""}
            </div>
            <div className="detail-summary center">
                <p className='title'>INVERSIONES</p>
                <p className='total'>${(totalInvestments - paidBackCapital - divestments).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>

                <p className='acc-title'>REPAGADO</p>
                <p className='acc-total'>${paidBackCapital.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>HISTORICO INVERTIDO</p>
                <p className='acc-total'>${totalInvestments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>VENTAS</p>
                <p className='acc-total'>${divestments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary center">
                <p className='title'>UTILIDAD</p>
                <p className='total'>${(interestReceived - feeIncome - feeExpenses - totalCosts).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>INTERESES</p>
                <p className='acc-total'>$+{interestReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>FEE NETO</p>
                <p className='acc-total'>${(feeIncome - feeExpenses).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>COST</p>
                <p className='acc-total'>$-{totalCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="detail-summary">
                <p className='title'>DEPOSITOS</p>
                <p className='total'>${totalDeposits.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>RETIROS</p>
                <p className='acc-total'>${totalWithdrawals.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
        </div>
    )
}

export default InvestorSummary;