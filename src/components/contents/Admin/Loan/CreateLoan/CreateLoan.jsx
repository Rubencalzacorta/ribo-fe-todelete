import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientService from '../../../../../services/ClientService'
// import { loanSelector } from './scheduler.js'
import TransactionService from "../../../../../services/TransactionService";
import LoanService from "../../../../../services/LoanService";
import Colateral from './Colateral'
import LoanDetails from './LoanDetails'
import { loanInitialState } from '../../../../../constants'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class CreateLoan extends Component {
  constructor(props) {
    super(props);
    this.state = loanInitialState
    this.ClientService = new ClientService();
    this.TransactionService = new TransactionService();
    this.LoanService = new LoanService();
  }

  componentDidMount = () => {

    let { clientId } = this.props.match.params;
    this.ClientService.getClient(clientId)
      .then((resp) => {
        this.setState({
          _id: clientId,
          country: resp.country
        })
        return resp.country
      })
      .then((country) => {
        this.fetchAccountsTotals(country)
      }
      )
  };



  handleFormSubmit = event => {
    event.preventDefault();

    const _borrower = this.state._id;
    const insurancePremium = this.state.insurancePremium
    const currency = this.state.currency;
    const collateralType = this.state.collateralType
    const collateralValue = this.state.collateralValue
    const collateralDescription = this.state.collateralDescription
    const loanDetails = this.state.loanDetails;
    const useOfFunds = this.state.useOfFunds;
    const toInvest = this.state.investors;
    const country = this.state.country;
    const autoInvest = this.state.autoInvest;

    (!autoInvest) ?
      this.LoanService.createLoan(
        _borrower,
        insurancePremium,
        collateralType,
        collateralValue,
        collateralDescription,
        loanDetails,
        useOfFunds,
        toInvest,
        currency
      )
        .then(response => {
          if (response._id) {
            this.props.history.push(`/admin/loan/${response._id}`);
          } else {
            console.log(response)
          }
        })
        .catch(error => {
          this.setState({
            error: true,
            message: error.response.data.message
          });
        }) :
      this.LoanService.createLoanAllActive(
        _borrower,
        insurancePremium,
        collateralType,
        collateralValue,
        collateralDescription,
        loanDetails,
        useOfFunds,
        currency,
        country
      )
        .then(response => {
          if (response.status === 'success') {
            this.props.history.push(`/admin/loan/${response.message._id}`);
          } else {
            this.setState({
              error: true,
              message: response.response.data.message
            })
          }
        })
        .catch(error => {
          this.setState({
            error: true,
            message: error.response.data.message
          });
        })
  };

  fetchAccountsTotals(country) {
    if (!this.state.accounts) {

      this.TransactionService.getInvestorsAvailability(country)
        .then(response => {
          this.setState({
            accounts: response
          });
        })
        .catch(err => {
          this.setState({
            accounts: false
          });
        });
    }
  }

  handleLoanDetailsChange = event => {
    const { name, value, type } = event.target;
    console.log(name, value)
    // if (name === 'loanType' && (value === 'linearIntFirst' || 'monday')) {

    //   this.setState(prevState => ({
    //     ...prevState,
    //     loanDetails: {
    //       ...prevState.loanDetails,
    //       [name]: value
    //     },
    //     openPaymentDate: true
    //   }))
    // } else 
    if (this.state.investmentEqCapital && name === 'capital') {
      console.log('aqui')
      this.setState(prevState => ({
        ...prevState,
        loanDetails: {
          ...prevState.loanDetails,
          [name]: type === "number" ? parseFloat(value) : value,
          investedCapital: type === "number" ? parseFloat(value) : value,
        },
        openPaymentDate: false
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        loanDetails: {
          ...prevState.loanDetails,
          [name]: type === "number" ? parseFloat(value) : value,
        },
        openPaymentDate: false
      }))
    }
  }

  handleChange = event => {
    const { name, value, type } = event.target;
    if (name === 'insurancePremium') {
      this.setState({ [name]: parseFloat(value) })
    } else {
      this.setState({ [name]: type === "number" ? parseFloat(value) : value });
    }
  };

  toggleInvestmentEqCapital = () => {
    this.setState({
      investmentEqCapital: !this.state.investmentEqCapital,
      loanDetails: { ...this.state.loanDetails, investedCapital: this.state.loanDetails.capital }
    })
  }

  handleAutoInvest = () => {
    this.setState({ autoInvest: !this.state.autoInvest })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelectedInvestor = event => {
    const { name, value } = event.target;
    let arr = value.split(',')
    let index = this.state.accounts.findIndex(e => e.investor[0]._id === arr[0] && e.cashAccount === arr[1]);
    this.setState({
      [name]: value,
      investorIndex: index,
      openInvestmentOption: true,
      investorFullName: this.state.accounts[index].investor[0].firstName + " " + this.state.accounts[index].investor[0].lastName,
      investorCashAvailable: parseFloat(this.state.accounts[index].accumTotal),
      investorCashRemaining: parseFloat(this.state.accounts[index].accumTotal),
      cashAccount: this.state.accounts[index].cashAccount
    });
  };

  handleInvestment = event => {
    let { name } = event.target;
    let value = parseFloat(event.target.value);
    let newValue = (isNaN(value) ? 0 : value);
    let index = this.state.investorIndex
    let investorCashAvailable = parseFloat(this.state.accounts[index].accumTotal);
    let newAvailability = investorCashAvailable - newValue;
    let pct = newValue / parseFloat(this.state.loanDetails.capital);
    pct = (isNaN(pct) ? 0 : pct)
    this.setState({
      [name]: newValue,
      investorCashRemaining: newAvailability,
      pct: pct
    });

  };

  handleNewInvestor = () => {
    let investor = this.state.investor.split(',');
    let investorFullName = this.state.investorFullName;
    let inv = parseFloat(this.state.investmentAmount);
    let pct = this.state.pct;
    let cashAccount = this.state.cashAccount;

    this.setState({
      openInvestmentOption: false,
      investors: [
        ...this.state.investors,
        {
          _investor: investor[0],
          investorFullName: investorFullName,
          amount: inv,
          pct: pct,
          cashAccount: cashAccount
        }
      ],
      investor: "",
      investorCashAvailable: 0,
      pct: 0,
      investmentAmount: 0
    });
  };

  deleteInvestor = i => {
    let investorsD = this.state.investors;
    investorsD.splice(i, 1);
    this.setState({ investors: investorsD });
  };

  // calcLoanSchedule = () => {
  // let { loanDetails } = this.state;
  // let schedule = loanSelector(1, loanDetails);
  // this.setState({ loanSchedule: schedule, open: true });
  // };

  render() {
    let { loanDetails, open, loanSchedule, investmentEqCapital } = this.state
    return (
      <div className="content">
        <form onSubmit={this.handleFormSubmit}>
          <Colateral details={this.state} handleChange={this.handleChange} />
          <LoanDetails
            loanDetails={loanDetails}
            handleLoanDetailsChange={this.handleLoanDetailsChange}
            openPaymentDate={this.state.openPaymentDate}
            // calcLoanSchedule={this.calcLoanSchedule}
            open={open}
            handleClose={this.handleClose}
            loanSchedule={loanSchedule}
            investmentEqCapital={investmentEqCapital}
            toggleInvestmentEqCapital={this.toggleInvestmentEqCapital}
          />
          <div className="form-row  general-loan-details">
            <div className="card col-md-12">
              <div className="card-body">
                <h5 className="card-title">Inversionista</h5>
                <FormControlLabel
                  control={
                    <Switch checked={this.state.autoInvest} onChange={() => this.handleAutoInvest()} value="checkedA" />
                  }
                  label="AutoInvest"
                />
                {(this.state.autoInvest) ?
                  <p>Los inversionistas se selecctionarán de acuerdo a su disponibilidad</p>
                  :
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
                            <option key={i} value={[e.investor[0]._id, e.cashAccount]}>
                              {e.cashAccount + " - " + e.investor[0].firstName + " " + e.investor[0].lastName}
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
                        value={this.state.cashAccount || undefined}
                      />
                    </div>
                  </div>
                }
                {this.state.openInvestmentOption ?
                  <>
                    <div className="form-row col-md-12 " id="participants">
                      <div className="form-group col-md-3">
                        <label>Inversion:</label>
                        <input
                          className="form-control"
                          type="number"
                          step="any"
                          name="investmentAmount"
                          max={this.state.investorCashAvailable}
                          value={this.state.investmentAmount || null}
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
                          value={this.state.investorCashAvailable}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Restante:</label>
                        <input
                          disabled
                          className="form-control"
                          type="text"
                          step="any"
                          name="availableCash"
                          value={this.state.investorCashRemaining}
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
                  </>
                  : ''}

                {(this.state.investors.length >= 1) ?
                  <div className="card-body table-holder">
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
                                <td>{e.investorFullName}</td>
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
                  </div> : ""}
              </div>
            </div>
          </div>
          <div className="form-row general-loan-details">
            <div className="card col-md-12">
              <div className="card-body">
                <div>
                  <button type="submit" className="btn btn-info" id="submit_button">
                    Crear
                  </button>
                  {(this.state.error) ? <div className="error">{this.state.message}</div> : ''}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(CreateLoan);
