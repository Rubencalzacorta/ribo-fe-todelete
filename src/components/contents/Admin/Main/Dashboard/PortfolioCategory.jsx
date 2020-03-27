import React from 'react'
import './portfolioCategory.scss'

const PortfolioCategory = (props) => {
    let { data, title, cash } = props
    return (
        <div className="category-cards">
            <div className="category-header">{title.toUpperCase()}{(cash > 0) ? (<span> / EFECTIVO DISPONIBLE: {cash.toLocaleString()}</span>) : ""}</div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-content"></p>
                    <p className="category-title">CLIENTE</p>
                </div>
            </div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-content"></p>
                    <p className="category-title">FECHA DE PAGO</p>
                </div>
            </div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-title">INGRESO ESTIMADO</p>
                    <p className="category-content">{(data.interest).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-title">REPAGO DE CAPITAL</p>
                    <p className="category-content">{(data.principal).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-title">TOTAL A PAGAR</p>
                    <p className="category-content">{(data.principal + data.interest).toLocaleString()}</p>
                </div>
            </div>
            <div className="category-items-unpaid">
                <div className="item-holder">
                    <p className="category-title"># DE CUOTAS</p>
                    <p className="category-content">{(data.numberOfInstallments).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCategory;