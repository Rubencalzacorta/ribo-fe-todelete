import React from 'react'
import Modal from '@material-ui/core/Modal';
import LoanSchedule from "./LoanSchedule"

function LoanDetails(props) {
  let { loanDetails, openPaymentDate, handleClose, open, loanSchedule } = props
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
              <div className="form-group col-md-6 col-sm-6">
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
                  <option value="biWeekly">Quincenal</option>
                  <option value="payDay">Dia de pago</option>
                </select>
              </div>

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
            {openPaymentDate
              ?
              <div className="form-group col-md-6 col-sm-6">
                <label>Fecha de Pago</label>
                <input
                  type="date"
                  className="form-control"
                  id="paymentDate"
                  name="paymentDate"
                  min={loanDetails.paymentDate}
                  value={loanDetails.paymentDate}
                  onChange={e => props.handleLoanDetailsChange(e)}
                  required
                />
              </div>
              : ""
            }
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
          <div className="form-row col-md-12">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
