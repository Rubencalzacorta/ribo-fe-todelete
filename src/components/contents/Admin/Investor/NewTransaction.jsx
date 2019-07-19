import React, { Component } from 'react';
import TransactionService from '../../../../services/TransactionService'
import InvestorService from '../../../../services/InvestorService'

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _investor: "",
      cashAccount: "",
      concept: "",
      debit: 0,
      credit: 0
    };
    this.TransactionService = new TransactionService();
    this.InvestorService = new InvestorService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const _investor = this.state._investor
    const cashAccount = this.state.cashAccount
    const concept = this.state.concept
    const date = this.state.txDate
    const amount = this.state.txAmount
    const comment = this.state.comment
    let debit = 0
    let credit = 0

    if ((concept === "WITHDRAWAL") || (concept === "COST")) {
      debit = 0
      credit = amount
    } else {
      debit = amount
      credit = 0
    }

    this.TransactionService.transactionInvestor(_investor, cashAccount, concept, debit, credit, date, comment)
      .then(response => {
        this.setState({
          _investor: "",
          cashAccount: "",
          concept: "",
          date: null,
          amount: 0,
          comment: "",
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
      })
  }

  fetchInvestors() {
    if (!this.state.investors) {
      this.InvestorService.getInvestors()
        .then(response => {

          if (this.props.location.toLowerCase() === "peru") {
            response = response.filter(e => {
              return e.location.toLowerCase() === "peru"
            })
          }
          this.setState({
            investors: response
          })
        })
        .catch(err => {
          this.setState({
            clients: false
          })
        })
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }




  render() {
    this.fetchInvestors()
    let cashAccount = ['PLPERU', 'REMPERU', 'GCUS', 'GFUS', 'GCDR']
    return (
      <div className="content">
        <h2 className="display-6">Nueva Transacción:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6" id="account_holder">
              <label>Inversionista:</label>
              <select className="form-control" name="_investor" id="investor" value={this.state._investor} onChange={e => this.handleChange(e)}>
                <option>Seleccionar Inversionista</option>
                {(this.state.investors) ? this.state.investors.map(e => <option key={e._id} value={e._id}>{e.location + " - " + e.firstName + " " + e.lastName}</option>) : ""}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Numero de Cuenta:</label>
              <select className="form-control" name="cashAccount" id="cashAccount" value={this.state.cashAccount} onChange={e => this.handleChange(e)}>
                <option>Cuenta de efectivo:</option>
                {(cashAccount) ? cashAccount.map((e, i) => <option key={i} value={e}>{e}</option>) : ""}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Fecha:</label>
              <input className="form-control" type="date" step="any" name="txDate" value={this.state.txDate} onChange={e => this.handleChange(e)} />
            </div>
            <div className="form-group col-md-6">
              <label>Concepto:</label>
              <select className="form-control" name="concept" id="concept" value={this.state.concept} onChange={e => this.handleChange(e)}>
                <option>Seleccionar concepto</option>
                <option value="DEPOSIT">Deposito</option>
                <option value="WITHDRAWAL">Retiro</option>
                <option value="COST">Costo</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Cantidad:</label>
              <input className="form-control" type="number" step="any" name="txAmount" value={this.state.txAmount} onChange={e => this.handleChange(e)} />
            </div>
            <div className="form-group col-md-6">
              <label>Comentario:</label>
              <input className="form-control" type="string" step="any" name="comment" value={this.state.comment} onChange={e => this.handleChange(e)} />
            </div>
            <div>
              <button type="submit" className="btn btn-info" id="submit_button">Insertar Transacción</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewTransaction;