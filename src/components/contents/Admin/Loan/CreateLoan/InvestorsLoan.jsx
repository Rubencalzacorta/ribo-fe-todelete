import React from 'react'

function InvestorLoan(props) {
    const { accounts } = props
    return (
        <div className="form-row  general-loan-details">
        <div className="card col-md-12">
          <div className="card-body">
            <h5 className="card-title">Inversionista</h5>
            <div className="form-row col-md-12 " id="participants">
              <div className="form-group col-md-6" id="investor-0">
                <label>Cuenta Inversionista:</label>
                <select
                  className="form-control"
                  name="investor"
                  value={this.state.investor}
                  onChange={e => this.handleSelectedInvestor(e)}
                >
                  <option>Seleccionar Cuenta</option>
                  {this.state.accounts
                    ? this.state.accounts.map((e, i) => (
                        <option key={i} value={e._id}>
                          { e.investor[0].firstName +
                            " " +
                            e.investor[0].lastName +
                            " "}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="form-group col-md-6" id="investor-0">
                <label>Cuenta de efectivo:</label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  step="any"
                  name="cashAccount"
                  value={this.state.cashAccount}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Inversion:</label>
                <input
                  className="form-control"
                  type="number"
                  step="any"
                  max={this.state.investorAvailability}
                  name="investmentAmount"
                  value={this.state.investmentAmount}
                  onChange={e => this.handleInvestment(e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Disponible:</label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  step="any"
                  name="availableCash"
                  value={this.state.investorAvailability}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Porcentage:</label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  step="any"
                  name="pct"
                  value={this.state.pct}
                />
              </div>
            </div>
            <div className="add_inv col-md-12 form-group align-bottom">
              <button
                type="button"
                className="btn btn-success align-bottom"
                onClick={() => this.handleNewInvestor()}
              >
                Agregar Inversionista
              </button>
            </div>
          </div>

        <div className="card-body">
        <table className="table investors">
          <thead>
            <tr>
              <th scope="col">Inversionista</th>
              <th scope="col">Efectivo</th>
              <th scope="col">Monto</th>
              <th scope="col">Porcentaje</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {this.state.investors.length > 0 ? (
              this.state.investors.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e._investor}</td>
                    <td>{e.cashAccount}</td>
                    <td>{e.amount}</td>
                    <td>{e.pct}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={i => this.deleteInvestor(i)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Agregue Inversionista</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        </div>
        </div>
    )
}

export default InvestorLoan