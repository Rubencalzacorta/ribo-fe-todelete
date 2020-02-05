import React, { Component, useState, useEffect } from 'react';
import TransactionService from '../../../../services/TransactionService'
import { txConcepts } from '../../../../constants'
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
} from '@material-ui/core';

export default function Transaction(props) {
  const [txData, setTxData] = useState({
    _investor: props.investorId,
    cashAccount: "",
    concept: "",
    comment: "",
    amount: 0,
    date: new Date().toISOString().substring(0, 10),
  })
  const [cashAccounts, setCashAccounts] = useState([
    { account: 'RBPERU', country: 'PERU' },
    { account: 'GCUS', country: 'USA' },
    { account: 'GFUS', country: 'USA' },
    { account: 'GCDR', country: 'DOMINICAN_REPUBLIC' },
  ])

  const [txStatus, setTxStatus] = useState({ status: null })

  const transactionService = new TransactionService()


  useEffect(() => {
    try {
      let locationCAs = []
      if (props.location !== 'GLOBAL') {
        locationCAs = cashAccounts.filter(e => {
          return e.country === props.location
        })
      } else {
        locationCAs = cashAccounts
      }

      setCashAccounts(locationCAs)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTxData({
      ...txData,
      [name]: value
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    transactionService.transactionInvestor(txData)
      .then(response => {
        setTxData({
          _investor: props.investorId,
          cashAccount: "",
          concept: "",
          amount: 0,
          date: new Date(),
          comment: "",
        });

      })
      .then(() => {
        setTxStatus({
          status: 'success'
        })
      })
      .catch(error => {
        setTxStatus({
          error: error,
          status: 'failure'
        });
      })
  }

  return (
    <Grid
      container
      spacing={4}
      style={{ marginTop: '10px' }}
    >
      {
        txStatus.status === 'success' ?
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <div className="alert alert-success alert-dismissible">
              <button href="#" className="close" data-dismiss="alert" aria-label="close">&times;</button>
              <strong>Exito!</strong> La solicitud se ha procesado correctamente.
                            </div>
          </Grid>
          : txStatus.status === 'failure' ?
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <div className="alert alert-danger alert-dismissible">
                <button href="#" className="close" data-dismiss="alert" aria-label="close">&times;</button>
                <strong>Fallo!</strong> La solicitud no se ha procesado correctamente
                            </div>
            </Grid> : ""
      }
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
      >
        <Card>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleFormSubmit}
          >
            <CardHeader
              subheader="Registro de nuevas transacciones"
              title="Transacciones"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Cuenta de Efectivo"
                    margin="dense"
                    name="cashAccount"
                    onChange={(e) => handleChange(e)}
                    required
                    select
                    disabled={txData._investor ? false : true}
                    value={txData.cashAccount}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {(cashAccounts)
                      ? cashAccounts.map((e, i) => {
                        return <MenuItem key={i} value={e.account}>
                          {e.account}
                        </MenuItem>
                      })
                      : ""}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Seleccionar concepto"
                    margin="dense"
                    name="concept"
                    onChange={(e) => handleChange(e)}
                    required
                    select
                    value={txData.concept}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {txConcepts.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Fecha"
                    margin="dense"
                    name="date"
                    type='date'
                    onChange={(e) => handleChange(e)}
                    required
                    value={new Date(txData.date)
                      .toISOString()
                      .substring(0, 10)}
                    variant="outlined"
                    InputProps={{
                      inputProps: {
                        max: new Date(txData.date)
                          .toISOString()
                          .substring(0, 10)
                      }
                    }}
                  >
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Monto"
                    margin="dense"
                    name="amount"
                    type='number'
                    onChange={(e) => handleChange(e)}
                    required
                    value={txData.amount}
                    variant="outlined"
                  >
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Comentario"
                    margin="dense"
                    name="comment"
                    type='text'
                    onChange={(e) => handleChange(e)}
                    required
                    value={txData.comment}
                    variant="outlined"
                  >
                  </TextField>
                </Grid>
              </Grid>

            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type='submit'
              >
                REGISTRAR TX
                  </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

