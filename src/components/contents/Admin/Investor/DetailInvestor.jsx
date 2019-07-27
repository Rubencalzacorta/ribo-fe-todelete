import React, { Component } from 'react';
import TransactionService from '../../../../services/TransactionService'
import InvestorService from '../../../../services/InvestorService'
// import AccDetailHolder from './AccDetailHolder';
// import AccTabsHolder from './AccTabsHolder';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './detail-investor.scss'
import AccTransactionsTable from './AccTransactionsTable';
import AccInvestmentsTable from './AccInvestmentsTable';
import AccLoanSummaryTable from './AccLoanSummaryTable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: 500,
    marginRight: theme.spacing.unit * 4,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
      outline: 'none'
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: 600,
      outline: 'none'
    },
    '&:focus': {
      color: '#40a9ff',
      outline: 'none'
    },
  },
  tabSelected: {},
});


class DetailInvestor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _investor: "",
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalCosts: 0,
      cashAvailable: 0,
      debitTotal: 0,
      totalInvestments: 0,
      creditTotal: 0,
      totalGCUS: 0,
      totalGFUS: 0,
      paidBackCapital: 0,
      interestReceived: 0,
      feeExpenses: 0,
      feeIncome: 0,
      transactions: [],
      cashAccounts: [],
      display: false,
      value: 0
    };
    this.TransactionService = new TransactionService();
    this.InvestorService = new InvestorService();
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };


  handleOnClick = async (event) => {
    event.preventDefault();

    const _investor = this.state._investor
    let transactions = await this.TransactionService.getInvestorTransactions(_investor)
    let investments = await this.InvestorService.getInvestorInvestments(_investor)
    let loanDetails = await this.TransactionService.getLoanInvestorDetails(_investor)
    let autoInvest = await this.InvestorService.getInvestorAutoInvest(_investor)

    return Promise.all([transactions, investments, loanDetails, autoInvest])
      .then(response => {
        this.setState({
          display: true,
          transactions: response[0],
          investments: response[1],
          loanDetails: response[2],
          isAutoInvesting: response[3].isAutoInvesting
        });
        return response
      })
      .then(response => {
        this.investorDetails(response[0])
      })
      .then(response => {

      })
      .catch(error => {
        this.setState({
          error: error
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
          response.sort((a, b) => a.lastName.localeCompare(b.lastName));
          this.setState({
            investors: response
          })
        })
        .catch(err => {
          this.setState({
            error: err
          })
        })
    }
  }

  toggleAutoInvest = () => {
    const _investor = this.state._investor
    this.InvestorService.toggleInvestorAutoInvest(_investor)
      .then(response => {
        console.log(response)
        if (response.updated) {
          this.setState({ isAutoInvesting: response.isAutoInvesting })
        } else {
          this.setState({ isAutoInvesting: this.state.isAutoInvesting })
        }
      })
  }

  investorDetails(transactions) {

    let paidBackCapital = transactions.filter((e) => {
      return (e.concept === 'CAPITAL')
    }).reduce((acc, e) => {
      return acc + e.debit
    }, 0)

    let interestReceived = transactions.filter((e) => {
      return (e.concept === 'INTEREST')
    }).reduce((acc, e) => {
      return acc + e.debit
    }, 0)

    let feeExpenses = transactions.filter((e) => {
      return (e.concept === 'FEE')
    }).reduce((acc, e) => {
      return acc + e.credit
    }, 0)

    let feeIncome = transactions.filter((e) => {
      return (e.concept === 'FEE')
    }).reduce((acc, e) => {
      return acc + e.debit
    }, 0)

    let totalDeposits = transactions.filter((e) => {
      return (e.concept === 'DEPOSIT')
    }).reduce((acc, e) => {
      return acc + e.debit
    }, 0)

    let totalWithdrawals = transactions.filter((e) => {
      return (e.concept === 'WITHDRAWAL')
    }).reduce((acc, e) => {
      return acc + e.credit
    }, 0)

    let totalCosts = transactions.filter((e) => {
      return (e.concept === 'COST')
    }).reduce((acc, e) => {
      return acc + e.credit
    }, 0)

    let totalInvestments = transactions.filter((e) => {
      return (e.concept === 'INVESTMENT')
    }).reduce((acc, e) => {
      return acc + e.credit
    }, 0)

    const cashAccountReducer = (transactions) => {
      let accountList = []
      let totals = []

      _.map(_.uniqBy(transactions, 'cashAccount'), _.partial(_.pick, _, ['cashAccount'])).forEach(e => { accountList.push(e.cashAccount) })

      accountList.forEach(e => {
        let total = transactions.filter((j) => { return (j.cashAccount === e) })
          .reduce((acc, k) => { return acc + k.debit - k.credit }, 0)

        let cashAccountTotal = { cashAccount: e, total: total }
        totals.push(cashAccountTotal)
      })
      return totals
    }



    // const feesReducer = (transactions) => {
    //   let accountList = []
    //   let totals = []

    //   let fees = transactions.filter((e) => {
    //     return (e.concept === 'FEE')
    //   })



    //   _.map(_.uniqBy(fees, '_investor'), _.partial(_.pick, _, ['_investor'])).forEach(e => { accountList.push(e._investor.firstName) })


    //   accountList.forEach(e => {
    //     let total = fees.filter((j) => { return (j._investor.firstName === e) })
    //       .reduce((acc, k) => { return acc + k.debit - k.credit }, 0)

    //     let cashAccountTotal = { cashAccount: e, total: total }
    //     totals.push(cashAccountTotal)
    //   })
    //   return totals
    // }

    let totals = cashAccountReducer(transactions)

    let debitTotal = transactions.reduce((acc, e) => {
      return acc + e.debit
    }, 0)
    let creditTotal = transactions.reduce((acc, e) => {
      return acc + e.credit
    }, 0)

    this.setState({
      paidBackCapital: paidBackCapital,
      interestReceived: interestReceived,
      totalInvestments: totalInvestments,
      totalCosts: totalCosts,
      feeExpenses: feeExpenses,
      feeIncome: feeIncome,
      totalDeposits: totalDeposits,
      totalWithdrawals: totalWithdrawals,
      debitTotal: debitTotal,
      creditTotal: creditTotal,
      cashAvailable: debitTotal - creditTotal,
      cashAccounts: totals
    })
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }




  render() {
    this.fetchInvestors()
    const { classes } = this.props
    const { cashAvailable, totalDeposits, totalInvestments,
      totalCosts, paidBackCapital, interestReceived, feeExpenses, feeIncome,
      totalWithdrawals, cashAccounts, transactions, investments, loanDetails, display, value } = this.state

    return (
      <div className="content">
        <div className="form-row">
          <div className="form-group" id="account_holder">
            <select className="form-control inv-select" name="_investor" id="investor" value={this.state._investor} onChange={e => this.handleChange(e)}>
              <option>Seleccionar Inversionista</option>
              {(this.state.investors) ? this.state.investors.map(e => <option key={e._id} value={e._id}>{e.lastName + ", " + e.firstName + " - " + e.location}</option>) : ""}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-info inv-search" onClick={e => this.handleOnClick(e)}>Buscar Inversionista</button>
          </div>
        </div>
        {display &&
          (<div>
            <FormControlLabel
              control={
                <Switch checked={this.state.isAutoInvesting} onChange={() => this.toggleAutoInvest()} value="checkedA" />
              }
              label="Reinvertir"
            />
            <div className="investment-acc-summary">
              <div className="detail-summary">
                <p className='title'>DISPONIBLE</p>
                <p className='total'>$ {cashAvailable.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                {(cashAccounts.length > 0) ? cashAccounts.map((e, i) => {
                  return <div key={i}><p className='acc-title'>{e.cashAccount}</p><p className='acc-total'>{e.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p> </div>
                }) : ""}
              </div>
              <div className="detail-summary center">
                <p className='title'>INVERSIONES</p>
                <p className='total'>${(totalInvestments - paidBackCapital).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>INTERESES</p>
                <p className='acc-total'>${interestReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}+</p>
                <p className='acc-title'>REPAGADO</p>
                <p className='acc-total'>${paidBackCapital.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>HISTORICO INVERTIDO</p>
                <p className='acc-total'>${totalInvestments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="detail-summary center">
                <p className='title'>COMISIONES</p>
                <p className='total'>${(feeIncome - feeExpenses).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>INGRESO</p>
                <p className='acc-total'>${feeIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>EGRESO</p>
                <p className='acc-total'>${feeExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="detail-summary">
                <p className='title'>DEPOSITOS</p>
                <p className='total'>${totalDeposits.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>COST</p>
                <p className='acc-total'>${totalCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className='acc-title'>RETIROS</p>
                <p className='acc-total'>${totalWithdrawals.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div>
              <div className="loan-content-holder">
                <div className={classes.root}>
                  <Tabs
                    value={value}
                    onChange={this.handleTabChange}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                  >
                    <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="DETALLES"
                    />
                    <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="INVERSIONES"
                    />
                    <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="TRANSACCIONES"
                    />
                  </Tabs>
                </div>
                {value === 0 && <AccLoanSummaryTable loanDetails={loanDetails} />}
                {value === 1 && <AccInvestmentsTable investments={investments} />}
                {value === 2 && <AccTransactionsTable data={transactions} />}
              </div>
            </div>
          </div>
          )}
      </div>

    )
  }
}


DetailInvestor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailInvestor);
