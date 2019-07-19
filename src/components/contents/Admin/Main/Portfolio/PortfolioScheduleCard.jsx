import React from 'react';
import './portfolio.scss'


function PortfolioScheduleCard(props) {
  const { data } = props;
  const titles = ['PAGOS REALIZADOS', 'POR PAGAR', 'VENCIDOS', 'PENDIENTE']
  return (
    <div className="loans-summary">
        
        {data.map( (e, i) => 

            {return (
            <div key={i} className="detail-summary">
                <p className='title'>{titles[i]}</p>
                <p className='total'>${e[0].totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>TOTAL INTERESES</p>
                <p className='acc-total'>${e[0].totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>TOTAL CAPITAL</p>
                <p className='acc-total'>${e[0].totalCapital.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>CANTIDAD</p>
                <p className='acc-total'># {e[0].totalQuantity.toLocaleString(undefined, {maximumFractionDigits: 2 })}</p>
            </div>)} 
        )}
        <div className="detail-summary-notes">
            <p className='notes'>* Datos historicos, representan los datos acumulados reflejados en el cronograma de pago.</p>
            <p className='notes'>* Por pagar: próximos 30 días + los últimos 7 días.</p>
            <p className='notes'>* Vencidos: más de 7 días sin pagar.</p>
        </div>
    </div>
  );
}

export default (PortfolioScheduleCard);