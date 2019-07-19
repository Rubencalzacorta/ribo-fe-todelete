import React from 'react'
import './portfolioCategoryGeneral.scss'

const PortfolioCategoryGeneral = (props) => {
    let { data, title, cash } = props
    return (
        <div className="category-cards">
            <div className="category-header">{title.toUpperCase()}{(cash > 0) ? (<span> / EFECTIVO DISPONIBLE: {cash.toLocaleString()}</span>) : ""}</div>
            <div className="category-items">
                <div className="item-holder">
                    <p className="category-title">INGRESO X INTERESES</p>
                    <p className="category-content">{(data.interest_pmt).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items">
                <div className="item-holder">
                    <p className="category-title">CAPITAL</p>
                    <p className="category-content">{(data.principal_pmt).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items">
                <div className="item-holder">
                    <p className="category-title">INGRESO ESTIMADO</p>
                    <p className="category-content">{(data.interest).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items">
                <div className="item-holder">
                    <p className="category-title">REPAGO DE CAPITAL</p>
                    <p className="category-content">{(data.principal).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items">
                <div className="item-holder">
                    <p className="category-title"># DE PRESTAMOS</p>
                    <p className="category-content">{(data.numberOfInstallments).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCategoryGeneral;