import React from 'react'
import numbro from 'numbro'
import moment from 'moment'
import CountryFlag from '../../../helpers/CountryFlag'

const Cashflow = (props) => {
    let { cashflow } = props
    return (
        <div className="sectionHolder">
            <h2 className="titleFin">Flujo de efectivo - 12 meses</h2>
            <div className="cashflowHolder">
                {cashflow ? cashflow.map((e, i) => {
                    let key = Object.keys(e)
                    return (
                        <div className="countryCashflow" key={i}>
                            <div className="countryTitle"><CountryFlag country={key[0]} />{"  " + cashflow[i][key][0].currency}</div>
                            < div className="cashHolder" >
                                <p className="accountTotal">Fecha</p>
                                <p className="accountTotal">Interes</p>
                                <p className="accountTotal">Capital</p>
                                <p className="accountTotal">Total</p>
                            </div>
                            {cashflow[i][key].map((e, j) => {
                                return (
                                    < div className="cashHolder" key={j} >
                                        <p className="accountTotal">{
                                            moment(`${e.year}/${e.month}/01`).format('MMM-YY')}
                                        </p>
                                        <p className="accountTotal">{
                                            numbro(e.interest).format({
                                                average: true,
                                                mantissa: 2,
                                            })}
                                        </p>
                                        <p className="accountTotal">{
                                            numbro(e.principal).format({
                                                average: true,
                                                mantissa: 2,
                                            })}
                                        </p>
                                        <p className="accountTotal">{
                                            numbro(e.principal + e.interest).format({
                                                average: true,
                                                mantissa: 2,
                                            })}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>)
                }) : ""}
            </div>
        </div>
    )
}


export default Cashflow;