import React from 'react'

function Colateral(props) {
  let { useOfFunds, collateralType, collateralValue, collateralDescription, currency } = props.details
  return (
    <div className="form-row general-loan-details">
      <div className="card col-md-12">
        <div className="card-body">
          <h5 className="card-title">Datos básicos</h5>
          <div className="form-row col-md-12">
            <div className="form-group col-md-12">
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
          </div>
          <div className="form-row col-md-12">
            <div className="form-group col-md-6 col-sm-6">
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

            <div className="form-group col-md-6 col-sm-6">
              <label>Colateral:</label>
              <select
                className="form-control"
                name="collateralType"
                value={collateralType}
                onChange={e => props.handleChange(e)}
                required
              >
                <option value="NoCollateral">
                  Sin Colateral
                </option>
                <option value="invoice">
                  Factura
                </option>
                <option value="automobiles">
                  Automóvil
                </option>
                <option value="electronic_items">
                  Equipos electronicos
                </option>
                <option value="insurance_policies">
                  Poliza de Seguro
                </option>
                <option value="investments">
                  Inversiones
                </option>
                <option value="machinery_and_equipment">
                  Maquinaria y Equipos
                </option>
                <option value="real_estate">
                  Bienes Raices
                </option>
                <option value="valuables_and_collectibles">
                  Valuables y coleccionables
                </option>
              </select>
            </div>
            {collateralType !== 'NoCollateral' ? <>
              <div className="form-group col-md-6 col-sm-6">
                <label>Valor del Colateral:</label>
                <input
                  className="form-control"
                  type="number"
                  step="any"
                  name="collateralValue"
                  value={collateralValue}
                  onChange={e => props.handleChange(e)}
                />
              </div>
              <div className="form-group col-md-12">
                <label form="collateral_description">
                  Descripción del Colateral
                  </label>
                <textarea
                  className="form-control col-md-12"
                  name="collateralDescription"
                  id="collateralDescription"
                  rows="2"
                  value={collateralDescription}
                  onChange={e => props.handleChange(e)}
                />
              </div>
            </> : ""}
          </div>

        </div>
      </div>
    </div>
  )

}

export default Colateral