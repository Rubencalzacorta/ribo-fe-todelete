import React from 'react';
import './loanInvestors.scss'

function LoanDocuments(props) {
    // const { investors } = props;
    return (
        <div className="transactions-holder">
        <div className="loan-schedule-head ">
            <div className="detail-schedule center head-content">
                <p className='title-date'>DOCUMENTO</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title-date'>LINK</p>
            </div>
            <div className="detail-schedule last head-content">
                <p className='title'>SUBIR</p>
            </div>
        </div>
        <div className="loan-schedule-content">
            <div className="detail-schedule center details-content">
                <p className='acc-date'>PRESTAMO DE DINERO</p>
            </div>
            <div className="detail-schedule details-content">
            <p className='acc-total'></p>
            </div>
            <div className="detail-schedule details-content">
            <p className='acc-total'>
                    <input
                    type="file"
                    name="documentID"
                    className=""
                    placeholder="documentID"
                    onChange={e => this.handleChange(e)}
                    />
                </p>
                
            </div>
        </div>
        <div className="loan-schedule-content">
            <div className="detail-schedule center details-content">
                <p className='acc-date'>CONTRATO DE COMPRA-VENTA</p>
            </div>
            <div className="detail-schedule details-content">
                <p className='acc-date'></p>
            </div>
            <div className="detail-schedule details-content">
            <p className='acc-total'>
                    <input
                    type="file"
                    name="documentID"
                    className=""
                    placeholder="documentID"
                    onChange={e => this.handleChange(e)}
                    />
                </p>
            </div>
        </div>
        </div>
    );
}



export default LoanDocuments;