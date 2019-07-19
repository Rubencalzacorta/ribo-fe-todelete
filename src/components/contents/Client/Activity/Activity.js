import React, { Component } from 'react'
import './activity.scss'
import moment from 'moment'


class Activity extends Component  {
    state = {
        duePayments: [],
        pastPayments: [],
        totalPaid: 0,
        toBePaid: 0,
        amount: 0
    }

    componentDidMount = () => {
        this.currentInstallments()
        this.pastPayment()
        this.totalPaid()
    }



    totalPaid = async () => {
        let { loans } = this.props.user
        let duePayments = []

        await loans.filter( e => 
            e.loanSchedule.some( (schedule) => moment(schedule.date).month() === moment(new Date()).month() ))
                .map(schedule => {
                    let newElt = Object.assign({}, schedule)
                    return newElt.loanSchedule.filter( schedule => moment(schedule.date).month() === moment(new Date()).month());
                }).forEach( e => e.forEach( z => duePayments.push(z)))
        
                
        let toBePaid = duePayments.reduce( (acc, e) => { 
            return acc + ((e.interest_pmt ? e.interest_pmt : 0) + (e.principal_pmt ? e.principal_pmt : 0))
            }, 0)
        let totalPaid = duePayments.reduce( (acc, e) => { 
            return acc + ((e.interest ? e.interest : 0) + (e.principal ? e.principal : 0))}, 0)

        this.setState({ toBePaid: toBePaid,
                        totalPaid: totalPaid
                    })

    }

    currentInstallments = () => {
        let { loans } = this.props.user
        let duePayments = []
        
        loans.filter( e => 
            e.loanSchedule.some( (schedule) => moment(schedule.date).month() === moment(new Date()).month() ))
                .map(schedule => {
                    let newElt = Object.assign({}, schedule)
                    return newElt.loanSchedule.filter( schedule => moment(schedule.date).month() === moment(new Date()).month());
                }).forEach( e => e.forEach( z => duePayments.push(z)))
    
        this.setState({duePayments: duePayments})
    }

    pastPayment = () => {
        let { loans } = this.props.user
        let amount = loans.length
        let pastPayments = []

        loans.filter( e => 
            e.loanSchedule.some( (schedule) => moment(schedule.date).month() === moment(new Date()).subtract(1, 'month').month() ))
                .map(schedule => {
                    let newElt = Object.assign({}, schedule)
                    return newElt.loanSchedule.filter( schedule => moment(schedule.date).month() === moment(new Date()).subtract(1, 'month').month());
                }).forEach( e => e.forEach( z => pastPayments.push(z)))

        this.setState({pastPayments: pastPayments, amount: amount})

        
    }

    render() {
        let { duePayments, pastPayments, totalPaid, toBePaid, amount } = this.state
        return(
            <div className="testing">
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Resúmen de cuenta</p>
                        
                    </div> 
                </div>
                <div className="account-cards">
                    <div className="summary-card">
                        <p variant='heading' className="heading">Total por pagar</p>
                        <p variant='heading' className="heading-content">{totalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 } )}</p>
                    </div>
                    <div className="summary-card">
                        <p variant='heading' className="heading"># de prestamos</p>
                        <p variant='heading' className="heading-content">{amount}</p>
                    </div>
                    <div className="summary-card">
                        <p variant='heading' className="heading">Pagado</p>
                        <p variant='heading' className="heading-content">{toBePaid.toLocaleString(undefined, { maximumFractionDigits: 2 } )}</p>
                    </div>
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Cronograma de pagos - {moment().format('MMMM')}</p>
                    </div> 
                </div>
                <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="table-col table-col-1">ID</div>
                        <div className="table-col table-col-2">PRÓX RECIBO</div>
                        <div className="table-col table-col-3">PRÓX IMPORTE</div>
                        <div className="table-col table-col-4">VENCIMIENTO</div>
                        <div className="table-col table-col-5">ESTATUS</div>
                    </li>
                    { duePayments.map( e => (
                        <li className="table-row">
                            <div className="table-col table-col-1" data-label="Prestamo">{e._loan.substr(e._loan.length - 7).toUpperCase()}</div>
                            <div className="table-col table-col-2" data-label="Próximo Recibo">{moment(e.date).format('DD/MM/YY')}</div>
                            <div className="table-col table-col-3" data-label="Proximo Importe">${e.payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                            <div className="table-col table-col-4" data-label="Vencimiento">{moment(e.date).format('DD/MM/YY')}</div>
                            <div className="table-col table-col-4" data-label="Estatus">{e.principal_pmt ? (e.principal_pmt >= e.principal ? 'PAGO' : 'PENDIENTE') : 'PENDIENTE' }</div>
                        </li>)
                    )}
                </ul>
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Transacciones Recientes</p>
                    </div> 
                </div>
                <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="table-col table-col-1">ID</div>
                        <div className="table-col table-col-2">RECIBO</div>
                        <div className="table-col table-col-3">IMPORTE</div>
                        <div className="table-col table-col-4">METODO</div>
                        <div className="table-col table-col-5">ESTATUS</div>
                    </li>
                    { pastPayments.map( e => (
                        <li className="table-row">
                            <div className="table-col table-col-1" data-label="Prestamo">{e._loan.substr(e._loan.length - 7).toUpperCase()}</div>
                            <div className="table-col table-col-2" data-label="Recibo">{moment(e.date).format('DD/MM/YY')}</div>
                            <div className="table-col table-col-3" data-label="Importe">${(e.principal_pmt+e.interest_pmt).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                            <div className="table-col table-col-4" data-label="METODO">TRANSFERENCIA</div>
                            <div className="table-col table-col-4" data-label="Estatus">{e.principal_pmt ? (e.principal_pmt.toFixed(2) >= e.principal.toFixed(2) ? 'PAGO' : 'PENDIENTE') : 'PENDIENTE' }</div>
                        </li>)
                    )}
                </ul>
                </div>
            </div>
            
        )
    }
}

export default Activity;