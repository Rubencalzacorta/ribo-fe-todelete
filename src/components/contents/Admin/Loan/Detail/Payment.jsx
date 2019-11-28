import React, { Component } from "react";
import { accounts } from "../../../../../constants.js";
import "./Payment.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_pmt: new Date().toISOString().substring(0, 10),
      amount: undefined,
      _loan: undefined,
      _loanSchedule: undefined,
      cashAccount: undefined,
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangePayment = event => {
    let { name, value } = event.target;
    if (name === "amount") {
      value = parseFloat(value);
    }
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    let { installment, loan, fullPayment } = this.props;
    console.log(installment)

    this.setState({
      date_pmt: installment.date,
      amount: fullPayment ? loan.capitalRemaining : Math.round(installment.balanceDue * 100) / 100,
      _loan: installment._loan,
      _loanSchedule: installment._id,
      cashAccount: undefined,
    });
  };


  render() {
    let { receivePayment, closePaymentOption, fullPayment, loan } = this.props;
    return (
      <div className="loan-schedule-holder">
        <div className="loan-payment-holder">
          <div className="detail-schedule details-date">
            <label className="acc-title">FECHA</label>
            <input
              type="date"
              name="date_pmt"
              className="form-control"
              value={new Date(this.state.date_pmt)
                .toISOString()
                .substring(0, 10)}
              onChange={this.handleChange}
            />
          </div>
          <div className="detail-schedule acc-fees">
            <label className="acc-title">MONTO</label>
            <input
              label="Monto"
              name="amount"
              min={fullPayment ? loan.capitalRemaining : 0}
              className="form-control input-sm"
              value={this.state.amount ? this.state.amount : undefined}
              onChange={this.handleChangePayment}
              type="number"
            />
          </div>
          <div className="detail-schedule acc-fees">
            <label className="acc-title">CUENTA</label>
            <select
              className="form-control input-sm"
              name="cashAccount"
              id="cashAccount"
              value={this.state.cashAccount}
              onChange={e => this.handleChange(e)}
            >
              <option />
              {accounts.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="detail-schedule">
            <label className="acc-title">*</label>
            <div className="payment-operations">
              <div className="acc-total">
                <i
                  className="material-icons"
                  onClick={() => receivePayment(this.state)}
                >
                  add_box
                </i>
              </div>
              <div className="acc-total">
                <i
                  className="material-icons"
                  onClick={() => closePaymentOption()}
                >
                  remove_circle
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
