import React from 'react'
// import Modal from '@material-ui/core/Modal';
// import LoanSchedule from "./LoanSchedule"

function LoanDetails(props) {
  let { loanDetails,
    // handleClose, 
    // open, 
    // loanSchedule, 
    investmentEqCapital } = props
  return (
    <div className="form-row general-loan-details">
      <div className="card col-md-12">
        <div className="card-body">
          <h5 className="card-title">Detalles del prestamo</h5>
          <div className="form-row col-md-12">
            <div className="form-group col-md-6 col-sm-6">
              <label>Esquema:</label>
              <select
                id="loan_type"
                className="form-control"
                name="loanType"
                value={loanDetails.loanType}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              >
                <option value="linear">
                  Pagos Iguales
                </option>
                <option value="linearIntFirst">
                  Interest + Pagos Iguales
                </option>
                <option value="monday">
                  Dia de pago lunes
                </option>
                <option value="payDay">
                  Dia de pago
                </option>
                <option value="lumpSum">
                  Final PMTs + Interest + No Amort
                </option>
                <option value="factoring">
                  Factoring
                </option>
                <option value="amort">
                  Amortizado
                </option>
                <option value="amort2">
                  Amortizado (Customizado)
                </option>
              </select>
            </div>
            {loanDetails.loanType === 'factoring' ?
              <div className="form-group col-md-6 col-sm-6">
                <label>Días</label>
                <input
                  type="number"
                  className="form-control"
                  id="days"
                  name="days"
                  value={loanDetails.days}
                  onChange={e => props.handleLoanDetailsChange(e)}
                  required
                />
              </div> :
              <>
                <div className="form-group col-md-3 col-sm-3">
                  <label>Frequencia:</label>
                  <select
                    id="loan_type"
                    className="form-control"
                    name="period"
                    value={loanDetails.period}
                    onChange={e => props.handleLoanDetailsChange(e)}
                    required
                  >
                    <option defaultValue="monthly">Mensual</option>
                    <option value="biWeekly">Bisemanal</option>
                    <option value="weekly">Semanal</option>
                    <option value="payDay">Dia de pago</option>
                  </select>
                </div>
                <div className="form-group col-md-3 col-sm-3">
                  <label>Periodos de solo interes :</label>
                  <input
                    type="number"
                    className="form-control"
                    id="startAmortPeriod"
                    name="startAmortPeriod"
                    value={loanDetails.startAmortPeriod}
                    onChange={e => props.handleLoanDetailsChange(e)}
                    disabled={loanDetails.loanType === 'amort2' ? false : true}
                  />
                </div>
              </>
            }
          </div>
          <div className="form-row col-md-12">
            <div className="form-group col-md-6 col-sm-6">
              <label>Fecha de Inicio</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={loanDetails.startDate}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              />
            </div>
            <div className="form-group col-md-6 col-sm-6">
              <label>Fecha de Pago</label>
              <input
                type="date"
                className="form-control"
                id="paymentDate"
                name="paymentDate"
                min={loanDetails.startDate ? loanDetails.startDate : null}
                value={loanDetails.paymentDate}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              />
            </div>
          </div>
          <div className="form-row col-md-12">
            <div className="form-group col-md-6 col-sm-6">
              <label>Principal:</label>
              <input
                className="form-control"
                type="number"
                step="any"
                id="capital"
                name="capital"
                value={loanDetails.capital}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              />
            </div>
            <div className="form-group col-md-6 col-sm-6">
              <label>Desembolso:</label>
              <input
                className="form-control"
                type="number"
                disabled={investmentEqCapital ? true : false}
                step="any"
                id="investedCapital"
                name="investedCapital"
                value={loanDetails.investedCapital}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              />
            </div>
            <div class="form-group col-md-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={e => props.toggleInvestmentEqCapital(e)}
                  checked={investmentEqCapital}
                />
                <label class="form-check-label" for="gridCheck" >
                  Capital igual a desembolso
                </label>
              </div>
            </div>
          </div>
          <div className="form-row col-md-12 col-sm-6">
            {loanDetails.loanType !== 'factoring' ?
              <div className="form-group col-md-6 col-sm-6">
                <label>Duracion:</label>
                <input
                  className="form-control"
                  type="number"
                  step="any"
                  id="duration"
                  name="duration"
                  value={loanDetails.duration}
                  onChange={e => props.handleLoanDetailsChange(e)}
                  required
                />
              </div> : ''}
            <div className="form-group col-md-6 col-sm-6">
              <label>Tasa de Interes (M):</label>
              <input
                className="form-control"
                type="number"
                step="any"
                id="interest"
                name="interest"
                value={loanDetails.interest}
                onChange={e => props.handleLoanDetailsChange(e)}
                required
              />
            </div>
          </div>
          {/* <div className="form-row col-md-12">
            <div className="calc-button col-md-6 ">
              <button
                type="button"
                className="btn btn-info"
                onClick={e => props.calcLoanSchedule(e)}
              >
                Visualizar cronograma
        </button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
              >
                <LoanSchedule loanSchedule={loanSchedule} />
              </Modal>
            </div>
          </div> */}
        </div>
      </div>
    </div >
  )
}

export default LoanDetails
