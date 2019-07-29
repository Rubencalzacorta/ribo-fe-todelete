import React from 'react'
import numbro from 'numbro'

const Stats = (props) => {
    let { stats } = props
    console.log(stats)
    return (
        <div className="sectionHolder">
            <h2 className="titleFin">Cartera</h2>
            <div className="countryStatHolder">
                {stats ? stats.map((e, i) => {
                    return (
                        <div className="countryStats" key={i}>
                            <div className="countryTitle">{e.country}</div>
                            < div className="statHolder"  >
                                <p className="accountTotalTitle">Capital Inicial:</p>
                                <p className="accountTotal">{numbro(e.totalInitialCapital).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Amortizado:</p>
                                <p className="accountTotal">{numbro(e.totalAmortized).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Por amortizar:</p>
                                <p className="accountTotal">{numbro(e.totalAllocated).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Prestamos:</p>
                                <p className="accountTotal">{e.totalLoan}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Max Capital:</p>
                                <p className="accountTotal">{numbro(e.maxLoanCapital).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Min Capital:</p>
                                <p className="accountTotal">{numbro(e.minLoanCapital).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Avg Capital:</p>
                                <p className="accountTotal">{numbro(e.avgLoanCapital).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Max Tasa:</p>
                                <p className="accountTotal">{numbro(e.maxLoanIntRate).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Min Tasa:</p>
                                <p className="accountTotal">{numbro(e.minLoanIntRate).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Max Plazo:</p>
                                <p className="accountTotal">{numbro(e.maxLoanDuration).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Min Plazo:</p>
                                <p className="accountTotal">{numbro(e.minLoanDuration).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                            < div className="statHolder">
                                <p className="accountTotalTitle">Avg Plazo:</p>
                                <p className="accountTotal">{numbro(e.avgLoanDuration).format({
                                    average: true,
                                    mantissa: 2,
                                })}</p>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>
        </div>
    )
}


export default Stats;