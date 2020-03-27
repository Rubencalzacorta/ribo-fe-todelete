import React from 'react'
import { Link } from 'react-router-dom'


const CashAvailability = (props) => {
    let { cashAccounts } = props
    return (
        <div className="sectionHolder">
            <h2 className="titleFin">Disponibilidad de efectivo</h2>
            <div className="cashAccountsHolder">
                {cashAccounts ? cashAccounts.map((e, i) => {
                    return <div className="cashHolder" key={i}>
                        <p className="accountTotal">{e.total.toLocaleString(undefined, { minimunFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="accountName"><Link to={`/admin/cash-account/${e.cashAccount}/${e.total}`}>{e.cashAccount}</Link></p>
                    </div>
                }) : ""}
            </div>
        </div>
    )
}

export default CashAvailability;