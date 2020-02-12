import React from 'react'
import numbro from 'numbro'

const numberFormat = (number) => {
    return numbro(number).formatCurrency({ thousandSeparated: true, mantissa: 2 })
}
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
                <p className='total'>{numberFormat(cashAvailable)}</p>
                {(cashAccounts.length > 0) ? cashAccounts.map((e, i) => {
                    return <div key={i}>
                        <p className='acc-title'>{e.cashAccount}</p>
                        <p className='acc-total'>{numberFormat(e.total)}</p>
                    </div>
                }) : ""}
            </div>
            <div className="detail-summary center">
                <p className='title'>INVERSIONES</p>
                <p className='total'>{numberFormat((totalInvestments - paidBackCapital - divestments))}</p>

                <p className='acc-title'>REPAGADO</p>
                <p className='acc-total'>{numberFormat(paidBackCapital)}</p>
                <p className='acc-title'>HISTORICO INVERTIDO</p>
                <p className='acc-total'>{numberFormat(totalInvestments)}</p>
                <p className='acc-title'>VENTAS</p>
                <p className='acc-total'>{numberFormat(divestments)}</p>
            </div>
            <div className="detail-summary center">
                <p className='title'>UTILIDAD</p>
                <p className='total'>{numberFormat((interestReceived + feeIncome - feeExpenses - totalCosts))}</p>
                <p className='acc-title'>INTERESES</p>
                <p className='acc-total'>{numberFormat(interestReceived)}</p>
                <p className='acc-title'>FEE NETO</p>
                <p className='acc-total'>{numberFormat((feeIncome - feeExpenses))}</p>
                <p className='acc-title'>COST</p>
                <p className='acc-total'>{numberFormat(totalCosts)}</p>
            </div>
            <div className="detail-summary">
                <p className='title'>DEPOSITOS</p>
                <p className='total'>{numberFormat(totalDeposits)}</p>
                <p className='acc-title'>RETIROS</p>
                <p className='acc-total'>{numberFormat(totalWithdrawals)}</p>
            </div>
        </div>
    )
}

export default InvestorSummary;