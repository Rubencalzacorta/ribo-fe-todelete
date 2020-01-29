import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientService from '../../../../../services/ClientService'
import loanSelector from '../helpers/scheduleCalc.js'
import TransactionService from "../../../../../services/TransactionService";
import LoanService from "../../../../../services/LoanService";
import LoanDetails from './LoanDetails'
import LoanSchedule from "./LoanSchedule"
import { loanInitialState } from '../../../../../constants'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class CreateLoan extends Component {
  constructor(props) {
    super(props);
    this.state = loanInitialState
  }

  handleLoanDetailsChange = event => {
    const { name, value, type } = event.target;
    if (this.state.investmentEqCapital && name === 'capital') {
      this.setState(prevState => ({
        ...prevState,
        loanDetails: {
          ...prevState.loanDetails,
          [name]: type === "number" ? parseFloat(value) : value,
          investedCapital: type === "number" ? parseFloat(value) : value,
        },
        open: false,
        openPaymentDate: false
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        loanDetails: {
          ...prevState.loanDetails,
          [name]: type === "number" ? parseFloat(value) : value,
        },
        open: false,
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

  calcLoanSchedule = () => {
    let { loanDetails } = this.state;
    let schedule = loanSelector(1, loanDetails);
    this.setState({ loanSchedule: schedule, open: true });
  };

  render() {
    let { loanDetails, open, loanSchedule, investmentEqCapital } = this.state
    return (
      <div className="content">
        <form onSubmit={this.handleFormSubmit}>
          <LoanDetails
            loanDetails={loanDetails}
            handleLoanDetailsChange={this.handleLoanDetailsChange}
            openPaymentDate={this.state.openPaymentDate}
            open={open}
            handleClose={this.handleClose}
            loanSchedule={loanSchedule}
            investmentEqCapital={investmentEqCapital}
            toggleInvestmentEqCapital={this.toggleInvestmentEqCapital}
            calcLoanSchedule={this.calcLoanSchedule}
          />

          {open ? <LoanSchedule loanSchedule={loanSchedule} /> : ''}
        </form>
      </div>
    );
  }
}


export default withRouter(CreateLoan);
