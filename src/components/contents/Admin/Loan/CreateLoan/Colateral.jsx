import React from 'react'

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
              <input
                className="form-control"
                type="text"
                step="any"
                name="useOfFunds"
                value={useOfFunds}
                onChange={(e) => props.handleChange(e)}
                required
              />
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