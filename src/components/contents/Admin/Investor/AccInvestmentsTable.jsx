import React from "react";

import moment from "moment";
import "./acc-investments.scss";

function AccInvestmentsTable(props) {
  const { investments } = props;
console.log(investments)
  return (
    <>
      <div className="personal-inv-summary-holder">
        <div className="loan-schedule-head ">
          <div className="detail-schedule head-date">
            <p className="title-date">FECHA</p>
          </div>
          <div className="detail-schedule head-name">
            <p className="title-date">PRESTAMO</p>
          </div>
          <div className="detail-schedule head-concept">
            <p className="title">MONTO</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">% INVERTIDO</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">TOTAL INVERTIDO</p>
          </div>
        </div>
        {Array.isArray(investments) ? investments.map((row, i) => {
          return (
            <div key={i} className="loan-schedule-content">
              <div className="detail-schedule details-date">
                <p className="acc-date">
                  {moment(row._loan.startDate).format("YYYY-MM-DD")}
                </p>
              </div>
              <div className="detail-schedule details-name">
                <p className="acc-date">
                  {row._loan ? row._loan._borrower.firstName + " " + row._loan._borrower.lastName : ""}
                </p>
              </div>
              <div className="detail-schedule details-concept">
                <p className="acc-total">{parseInt(row.amount / row.pct)}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">
                  {parseFloat(row.pct * 100).toFixed(2) + "%"}
                </p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{row.amount.toFixed(2)}</p>
              </div>
            </div>
          );
        }) : ''}
      </div>
    </>
  );
}

export default AccInvestmentsTable;
