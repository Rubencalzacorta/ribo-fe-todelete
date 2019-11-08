import React from 'react'

const useOfFundsContent = [
  { value: 'vehicle', text: 'Vehiculo' },
  { value: 'motorcycle', text: 'Moto' },
  { value: 'personal', text: 'Personal' },
  { value: 'workingCapital', text: 'Capital Trabajo' },
  { value: 'capitalGoods', text: 'Bienes de Capital' },
  { value: 'refinancing', text: 'Refinanciamiento' },
  { value: 'debtConsolidation', text: 'Consolidación de Deuda' },
  { value: 'factoring', text: 'Factoring' },
  { value: 'vehicleWithInsurance', text: 'Vehiculo con seguro' },
  { value: 'motorcycleWithInsurance', text: 'Moto con seguro' },
  { value: 'personalWithInsurance', text: 'Personal con seguro' },
  { value: 'capitalGoodsWithInsurance', text: 'Bienes de Capital con Seguro' },
  { value: 'creditLine', text: 'Linea de credito' },
]

function Colateral(props) {
  let { useOfFunds, currency } = props.details
  return (
    <div className="form-row general-loan-details">
      <div className="card col-md-12">
        <div className="card-body">
          <h5 className="card-title">Datos básicos</h5>
          <div className="form-row col-md-12">
            <div className="form-group col-md-9">
              <label>Uso de los fondos:</label>
              <select
                id="loan_type"
                className="form-control"
                name="useOfFunds"
                value={useOfFunds}
                onChange={e => props.handleChange(e)}
                required
              >
                {useOfFundsContent.map(e => {
                  return <option value={e.value}>
                    {e.text}
                  </option>
                })}
              </select>
            </div>
            <div className="form-group col-md-3 col-sm-3">
              <label>Moneda:</label>
              <select
                id="loan_type"
                className="form-control"
                name="currency"
                value={currency}
                onChange={e => props.handleChange(e)}
                required
              >
                <option value="USD">
                  USD
                </option>
                <option value="DOP">
                  DOP
                </option>
                <option value="PEN">
                  PEN
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Colateral