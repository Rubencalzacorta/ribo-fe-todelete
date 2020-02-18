import React, { useState, useEffect } from "react";
import TransactionService from "../../../../services/TransactionService";
import moment from "moment";
import Alert from "../../../notifications/Alert/Alert";
import { txConcepts } from "../../../../constants";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

interface IAlert {
  error: any;
  status: "success" | "failure" | "";
}

export default function Transaction(props) {
  const [txStatus, setTxStatus] = useState<IAlert>({ status: "", error: null });
  const transactionService = new TransactionService();
  const [txData, setTxData] = useState({
    _investor: props.investorId,
    cashAccount: "",
    concept: "",
    comment: "",
    amount: 0,
    date: new Date().toISOString().substring(0, 10),
    currentDate: moment().format("YYYY-MM-DD")
  });
  const [cashAccounts, setCashAccounts] = useState({
    filterAccounts: true,
    accounts: [
      { account: "RBPERU", country: "PERU" },
      { account: "GCUS", country: "USA" },
      { account: "GFUS", country: "USA" },
      { account: "GCDR", country: "DOMINICAN_REPUBLIC" }
    ]
  });

  useEffect(() => {
    setTxData({ ...txData, _investor: props.investorId });
    // eslint-disable-next-line
  }, [props.investorId]);

  const resetStatus = e => {
    setTxStatus({ error: null, status: "" });
  };

  useEffect(() => {
    if (cashAccounts.filterAccounts) {
      let locationCAs: any[] = [];
      try {
        if (props.location !== "GLOBAL") {
          locationCAs = cashAccounts.accounts.filter((e, i, array) => {
            return e.country === props.location;
          });

          setCashAccounts({
            filterAccounts: false,
            accounts: locationCAs
          });
        } else {
          setCashAccounts({
            ...cashAccounts,
            filterAccounts: false
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [cashAccounts, props.location]);

  const handleChange = event => {
    const { name, value } = event.target;
    setTxData({
      ...txData,
      [name]: value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    transactionService
      .transactionInvestor(txData)
      .then(response => {
        setTxData({
          _investor: props.investorId,
          cashAccount: "",
          concept: "",
          amount: 0,
          date: new Date().toISOString().substring(0, 10),
          currentDate: moment().format("YYYY-MM-DD"),
          comment: ""
        });
      })
      .then(() => {
        props.refreshDetails();
      })
      .then(() => {
        setTxStatus({
          error: null,
          status: "success"
        });
      })
      .catch(error => {
        setTxStatus({
          error: error,
          status: "failure"
        });
      });
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "10px" }}>
      <Alert status={txStatus.status} resetStatus={resetStatus} />
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Card>
          <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <CardHeader
              subheader="Registro de nuevas transacciones"
              title="Transacciones"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Cuenta de Efectivo"
                    margin="dense"
                    name="cashAccount"
                    onChange={e => handleChange(e)}
                    required
                    select
                    disabled={txData._investor ? false : true}
                    value={txData.cashAccount}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {cashAccounts.accounts
                      ? cashAccounts.accounts.map((e, i) => {
                          return (
                            <MenuItem key={i} value={e.account}>
                              {e.account}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Seleccionar concepto"
                    margin="dense"
                    name="concept"
                    onChange={e => handleChange(e)}
                    required
                    select
                    value={txData.concept}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {txConcepts.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    margin="dense"
                    name="date"
                    type="date"
                    onChange={e => handleChange(e)}
                    required
                    value={new Date(txData.date).toISOString().substring(0, 10)}
                    variant="outlined"
                    InputProps={{
                      inputProps: {
                        max: new Date(txData.currentDate)
                          .toISOString()
                          .substring(0, 10)
                      }
                    }}
                  ></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Monto"
                    margin="dense"
                    name="amount"
                    type="number"
                    onChange={e => handleChange(e)}
                    required
                    value={txData.amount === 0 ? "" : txData.amount}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Comentario"
                    margin="dense"
                    name="comment"
                    type="text"
                    onChange={e => handleChange(e)}
                    required
                    value={txData.comment}
                    variant="outlined"
                  ></TextField>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit">
                REGISTRAR TX
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
