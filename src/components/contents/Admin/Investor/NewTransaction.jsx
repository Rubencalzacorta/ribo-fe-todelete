import React, { Component } from 'react';
import TransactionService from '../../../../services/TransactionService'
import InvestorService from '../../../../services/InvestorService'
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

let cashAccounts = [
  { account: 'RBPERU', country: 'PERU' },
  { account: 'GCUS', country: 'USA' },
  { account: 'GFUS', country: 'USA' },
  { account: 'GCDR', country: 'DOMINICAN_REPUBLIC' },
]
class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _investor: "",
      cashAccount: "",
      concept: "",
      txAmount: 0,
      txDate: new Date(),
    };
    this.TransactionService = new TransactionService();
    this.InvestorService = new InvestorService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const _investor = this.state._investor
    const cashAccount = this.state.cashAccount
    const concept = this.state.concept
    const date = this.state.txDate
    const amount = this.state.txAmount
    const comment = this.state.comment

    this.TransactionService.transactionInvestor(_investor, cashAccount, concept, amount, date, comment)
      .then(response => {
        this.setState({
          _investor: "",
          cashAccount: "",
          concept: "",
          txAmount: 0,
          txDate: new Date(),
          comment: "",
          status: 'success'
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          status: 'failure'
        });
      })
  }

  fetchInvestors() {
    if (!this.state.investors) {
      this.InvestorService.getInvestors()
        .then(response => {

          if (this.props.location.toLowerCase() === "peru") {
            response = response.filter(e => {
              return e.location.toLowerCase() === "peru"
            })
          }
          this.setState({
            investors: response
          })
        })
        .catch(err => {
          this.setState({
            clients: false
          })
        })
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === '_investor') {
      let location = this.state.investors.find(e => {
        return e._id === value
      })['location']

      let accounts = cashAccounts.filter(e => {
        return e.country === location
      })


      this.setState({
        country: location,
        cashAccounts: accounts
      })
    }
  }


  render() {
    this.fetchInvestors()
    let { status } = this.state
    return (
      <div className="content"
        style={{ padding: '10px' }}>
        {
          status === 'success' ?
            <div class="alert alert-success alert-dismissible">
              <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
              <strong>Exito!</strong> La solicitud se ha procesado correctamente.
                            </div>
            : status === 'failure' ?
              <div class="alert alert-danger alert-dismissible">
                <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                <strong>Fallo!</strong> La solicitud no se ha procesado correctamente
                            </div> : ""
        }
        <Grid
          container
          spacing={4}
        >

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
                onSubmit={this.handleFormSubmit}
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
                        label="Inversionista"
                        margin="dense"
                        name="_investor"
                        onChange={(e) => this.handleChange(e)}
                        required
                        select
                        value={this.state._investor}
                        variant="outlined"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(this.state.investors)
                          ? this.state.investors.map(e => <MenuItem key={e._id} value={e._id}>{e.location + " - " + e.firstName + " " + e.lastName}</MenuItem>) : ""
                        }
                      </TextField>
                    </Grid>
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
                        onChange={(e) => this.handleChange(e)}
                        required
                        select
                        disabled={this.state._investor ? false : true}
                        value={this.state.cashAccount}
                        variant="outlined"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(this.state.cashAccounts)
                          ? this.state.cashAccounts.map((e, i) => {
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
                        onChange={(e) => this.handleChange(e)}
                        required
                        select
                        value={this.state.concept}
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
                        name="txDate"
                        type='date'
                        onChange={(e) => this.handleChange(e)}
                        required
                        value={this.state.txDate}
                        variant="outlined"
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
                        name="txAmount"
                        type='number'
                        onChange={(e) => this.handleChange(e)}
                        required
                        value={this.state.txAmount}
                        variant="outlined"
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
                        label="Comentario"
                        margin="dense"
                        name="comment"
                        type='text'
                        onChange={(e) => this.handleChange(e)}
                        required
                        value={this.state.comment}
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
      </div>
    )
  }
}

export default NewTransaction;