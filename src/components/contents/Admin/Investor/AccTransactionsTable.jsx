import React from "react";
import moment from "moment";
import "./acc-transactions.scss";

function AccTransacionsTable(props) {
  const { data } = props;
  let acc = 0;

  return (
    <div className="personal-transactions-holder">
      <div className="loan-schedule-head ">
        <div className="detail-schedule head-date">
          <p className="title-date">FECHA</p>
        </div>
        <div className="detail-schedule head-name">
          <p className="title-date">CLIENTE</p>
        </div>
        <div className="detail-schedule head-concept">
          <p className="title-date">CONCEPTO</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">DEBITO</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">CREDITO</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">SALDO</p>
        </div>
        <div className="detail-schedule last head-content">
          <p className="title">CUENTA</p>
        </div>
        <div className="detail-schedule last head-comment">
          <p className="title">COMENTARIO</p>
        </div>
      </div>
      {data.map((row, i) => {
        acc = acc + (row.debit - row.credit);
        return (
          <div key={i} className="loan-schedule-content">
            <div className="detail-schedule details-date">
              <p className="acc-date">
                {moment(row.date).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="detail-schedule details-name">
              <p className="acc-date">
                {row.concept === 'INSURANCE_PREMIUM' ? 'PRIMA' :
                  row._loan ? row._loan._borrower.firstName + " " + row._loan._borrower.lastName : "PERSONAL"}
              </p>
            </div>
            <div className="detail-schedule details-concept">
              <p className="acc-date">{row.concept}</p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.debit.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {row.credit.toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">
                {acc.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="detail-schedule details-content">
              <p className="acc-total">{row.cashAccount}</p>
            </div>
            <div className="detail-schedule details-comment">
              <p>{row.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AccTransacionsTable;
