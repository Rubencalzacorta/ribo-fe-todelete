import React from "react";
import { Link } from 'react-router-dom';
import moment from "moment";
import "./acc-investments.scss";
import numbro from 'numbro'


function AccInvestmentsTable(props) {
  const { investments } = props;
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
            <p className="title">%</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">TOTAL</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">VENTA</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">CAPITAL</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">INGRESO</p>
          </div>
          <div className="detail-schedule last head-content">
            <p className="title">ESTATUS</p>
          </div>
        </div>
        {Array.isArray(investments) ? investments.map((row, i) => {
          return (
            <div key={i} className="loan-schedule-content">
              <div className="detail-schedule details-date">
                <p className="acc-date">
                  {moment(row.startDate).format("YYYY-MM-DD")}
                </p>
              </div>
              <div className="detail-schedule details-name">
                <p className="acc-date">
                  <Link className="acc-date" to={`/admin/loan/${row._loan}`}>{row.firstName + " " + row.lastName}</Link>
                </p>
              </div>
              <div className="detail-schedule details-concept">
                <p className="acc-total">{numbro(row.investment / row.pct).format({
                  average: true,
                  mantissa: 2,
                })}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">
                  {parseFloat(row.pct * 100).toFixed(2) + "%"}
                </p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{numbro(row.investment).format({
                  average: true,
                  mantissa: 2,
                })}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{numbro(row.divestment).format({
                  average: true,
                  mantissa: 2,
                })}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{numbro(row.capital).format({
                  average: true,
                  mantissa: 2,
                })}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{numbro(row.interest + row.feeIncome - row.feeExpenses + row.commissionIncome + row.managementFeeIncome - row.commissionExpense - row.managementFeeExpense).format({
                  average: true,
                  mantissa: 2,
                })}</p>
              </div>
              <div className="detail-schedule details-content">
                <p className="acc-total">{row.status === 'OPEN' ? 'ACTIVO' : 'CERRADO'}</p>
              </div>
            </div>
          );
        }) : ''}
      </div>
    </>
  );
}

export default AccInvestmentsTable;
