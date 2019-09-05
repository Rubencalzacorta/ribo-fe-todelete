import React, { Component } from "react";
import { accounts } from "../../../../../constants.js";
import "./loan-tx-pmt.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_pmt: new Date().toISOString().substring(0, 10),
      principal_pmt: undefined,
      interest_pmt: undefined,
      paymentId: undefined,
      cashAccount: undefined,
      currency: undefined,
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangePayment = event => {
    let { name, value } = event.target;
    if (name === "interest_pmt" || "principal_pmt") {
      value = parseFloat(value);
    }
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    let { installment } = this.props;
    this.setState({
      date_pmt: installment.date,
      principal_pmt: installment.principal.toFixed(2),
      interest_pmt: installment.interest.toFixed(2),
      paymentId: installment._id,
      currency: installment.currency,
      cashAccount: undefined,
      fee: []
    });
  };


  render() {
    let { receivePayment, closePaymentOption } = this.props;
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
            <label className="acc-title">INTERESES</label>
            <input
              label="INTERESES"
              name="interest_pmt"
              className="form-control input-sm"
              value={this.state.interest_pmt ? this.state.interest_pmt : 0}
              onChange={this.handleChangePayment}
              type="number"
            />
          </div>
          <div className="detail-schedule acc-fees">
            <label className="acc-title">CAPITAL</label>
            <input
              label="principal"
              name="principal_pmt"
              type="number"
              className="form-control input-sm"
              value={this.state.principal_pmt ? this.state.principal_pmt : 0}
              onChange={this.handleChangePayment}
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
