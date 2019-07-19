import React from "react";

import moment from "moment";
import {
  Link
} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./ClientDetails.scss";

export default function ClientLoan(props) {
  const {
    data,
    clientId
  } = props;
  return (
    <div className="main-holder">
      <div className="client-loan-summary-head">
        <div className="detail-summary first">
          <p className="title fc"> PRESTAMO </p>
        </div> <div className="detail-summary pct">
          <p className="title"> INICIO </p> </div>
        <div className="detail-summary pct">
          <p className="title"> TASA </p> </div>
        <div className="detail-summary pct">
          <p className="title"> DURACIÓN </p> </div>
        <div className="detail-summary pct">
          <p className="title"> CUOTA </p> </div>
        <div className="detail-summary">
          <p className="title"> AMORTIZADO </p> </div>
        <div className="detail-summary">
          <p className="title"> POR PAGAR </p> </div>
        <div className="detail-summary">
          <p className="title"> STATUS </p> </div>
        <div className="detail-summary last">
          <p className="title" />
        </div>
      </div>

      {
        data.loans ? data.loans.map((e, i) => {
          let kPmt = e.capital / e.duration;
          let iPmt = (e.interest / 100) * e.capital;

          return (<div key={
            i
          }
            className="client-loan-summary" >
            <div className="detail-summary first" >
              <p className="acc-total fc" >
                $ {
                  parseFloat(e.capital).toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })
                } </p> </div>
            <div className="detail-summary pct" >
              <p className="acc-total" > {
                moment(e.startDate).format("YY-MM-DD")
              } </p> </div>
            <div className="detail-summary pct" >
              <p className="acc-total" > {
                parseFloat(e.interest)
              } % </p> </div>
            <div className="detail-summary pct" >
              <p className="acc-total" > {
                parseFloat(e.duration)
              } </p> </div>
            <div className="detail-summary pct" >
              <p className="acc-total" >
                $ {
                  (iPmt + kPmt).toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })
                } </p> </div>
            <div className="detail-summary" >
              <p className="acc-total" >
                $ {
                  e.totalPaid.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })
                } </p> </div>
            <div className="detail-summary" >
              <p className="acc-total" >
                $ {
                  (e.capital - e.totalPaid).toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })
                } </p> </div>
            <div className="detail-summary" >
              <p className="acc-total" > {
                e.status === "CLOSED" ? "CERRADO" : "ABIERTO"
              } </p> </div> <div className="detail-summary last" >
              <Link to={
                `/admin/loan/${e._id}`
              } >
                <i className="material-icons info" > info </i> </Link>
            </div>
          </div>
          );
        }) : ""
      } <div className="client-loan-summary create" >
        <div className="detail-summary first" >
          <Link to={
            `/admin/create-loan/${clientId}`
          } >
            <Fab size="small"
              color="secondary"
              aria-label="Add" >
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </div>
    </div >
  );
}