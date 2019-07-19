import React from "react";
import "./acc-loan-summary.scss";

function AccLoanSummaryTable(props) {
  const { loanDetails } = props;
  return (
    <div className="personal-loan-holder">
      <div className="loan-schedule-head ">
        <div className="detail-schedule head-name">
          <p className="title-date">NOMBRE</p>
        </div>
        <div className="detail-schedule last head-pct">
          <p className="title">%</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">INVERSION</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">INTERESES</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">CAPITAL</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">INGRESO (F)</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">EGRESO (F)</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">INGRESO </p>
        </div>
      </div>
      {loanDetails.map((row, i) => {
        return (
          <div key={i} className="loan-schedule-content">
            <div className="detail-schedule details-name">
              <p className="acc-date">{row.name} </p>
            </div>
            <div className="detail-schedule details-pct">
              <p className="acc-total">
                {parseFloat(
                  row.ownership.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })
                ) * 100}
                %
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.investment.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.interest.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.capital.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.feeIncome.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.feeExpense.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {(row.interest + row.feeIncome - row.feeExpense).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AccLoanSummaryTable;
