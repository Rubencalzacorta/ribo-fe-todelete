import React, { Component } from 'react';
import TransactionService from '../../../../services/TransactionService'
import InvestorService from '../../../../services/InvestorService'
import { Tabs, Tab, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AccTransactionsTable from './AccTransactionsTable';
import AccOptions from './AccOptions';
import InvestorSummary from './InvestorSummary'
import AccInvestmentsTable from './AccInvestmentsTable';
import AccLoanSummaryTable from './AccLoanSummaryTable';
import './detail-investor.scss'
import '../Client/ClientList.scss'
import SelectBar from './SelectBar'

const rounder = (numberToRound) => {
  return Math.round(numberToRound * 10000) / 10000
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: 500,
    marginRight: theme.spacing(4),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tabSelected: {},
});


const investorInitialState = {
  summary: {
    totalDeposits: 0,
    totalWithdrawals: 0,
    cashAvailable: 0,
    debitTotal: 0,
    totalInvestments: 0,
    divestments: 0,
    creditTotal: 0,
    cashAccounts: [],
    paidBackCapital: 0,
    interestReceived: 0,
    feeExpenses: 0,
    totalCosts: 0,
    feeIncome: 0,
  },
  getTransactions: true,
  getLoanInvestments: true,
  getCashDetails: true,
  getInvestmentOptions: true,
  getInvestmentFees: true,
  getInvestmentDetails: true,
  getPLDetails: true,
  getCashMovements: true,
  getDetails: false,
  getInvestor: false,
  loanDetails: null,
  fetchInvestors: true,
  transactions: [],
  investments: [],
  display: false,
  newManager: "",
  value: 0
};

class DetailInvestor extends Component {
  constructor(props) {
    super(props);
    this.state = investorInitialState
    this.TransactionService = new TransactionService();
    this.InvestorService = new InvestorService();
  }


  componentDidUpdate() {
    let { investorId } = this.props
    let { getInvestor } = this.state

    if (investorId && getInvestor) {
      // this.investorDetails(investorId)
      this.fetchInvestor(investorId)
      this.setState({ getInvestor: false })
    }

  }

  componentDidMount() {
    let { investorId } = this.props
    if (investorId) {
      this.setState({
        getDetails: true,
        getInvestor: true,
        _investor: investorId
      })
    }

    if (this.state.fetchInvestors) {
      this.InvestorService.getInvestors()
        .then(async response => {
          if (this.props.location.toLowerCase() === "peru") {
            response = response.filter(e => {
              return e.location.toLowerCase() === "peru"
            })
          }
          let nameSort = await response.sort((a, b) => a.lastName.localeCompare(b.lastName));
          let countrySort = await nameSort.sort((a, b) => a.location.localeCompare(b.location))
          this.setState({
            investors: countrySort,
            fetchInvestors: false
          })
        })
        .catch(err => {
          this.setState({
            error: err
          })
        })
    }


  }

  handleTabChange = (event, value) => {
    let { investorId } = this.props
    this.setState({ value });
    if (value === 1) {
      this.InvestorService.getInvestmentsSummary(investorId)
        .then(response => {
          this.setState({ investments: response })
        })
    }
  };


  // investorDetails = async (_investor) => {
  //   this.setState({ ...investorInitialState, _investor: _investor })
  //   this.fetchInvestor(_investor)


  //   // let transactions = await this.TransactionService.getTransactions(_investor)
  //   // let loanDetails = await this.TransactionService.getLoanInvestorDetails(_investor)

  //   return Promise.all([
  //     loanDetails,
  //     // transactions,
  //   ])
  //     .then(response => {

  //       this.setState({
  //         display: true,
  //         // transactions: response[1],
  //         loanDetails: response[0],
  //         getDetails: false
  //       });
  //       return response
  //     })
  //     .catch(error => {
  //       this.setState({
  //         error: error
  //       });
  //     })
  // }

  fetchInvestor = async (id) => {

    this.setState({
      display: true
    })

    // if (this.state.getTransactions) {
    //   this.TransactionService.getTransactions(id)
    //     .then(response => {
    //       this.setState({
    //         transactions: response,
    //         getTransactions: false
    //       })
    //     })
    // }

    if (this.state.getLoanInvestments) {
      this.TransactionService.getLoanInvestorDetails(id)
        .then(response => {
          this.setState({
            loanDetails: response,
            getLoanInvestments: false
          })
        })
    }

    if (this.state.getCashDetails) {
      this.InvestorService.getCashDetails(id)
        .then(response => {
          this.setState({
            summary: {
              ...this.state.summary,
              ...response
            },
            getCashDetails: false
          })
        })
    }

    if (this.state.getInvestmentOptions) {
      this.InvestorService.getInvestorOptions(id)
        .then(response => {
          this.setState({
            ...this.state,
            isAutoInvesting: response.isAutoInvesting,
            investorType: response.investorType,
            getInvestmentOptions: false
          }
          )
        })
    }

    if (this.state.getInvestmentFees) {
      this.InvestorService.getInvestorFees(id)
        .then(response => {
          this.setState({
            ...this.state,
            investorFees: response.data,
            getInvestmentFees: false
          }
          )
        })
    }


    if (this.state.getInvestmentDetails) {
      this.InvestorService.getInvestmentDetails(id)
        .then(response => {
          this.setState({
            summary: {
              ...this.state.summary,
              ...response
            },
            getInvestmentDetails: false
          })
        })
    }

    if (this.state.getPLDetails) {
      this.InvestorService.getPLDetails(id)
        .then(response => {
          this.setState({
            summary: {
              ...this.state.summary,
              ...response
            },
            getPLDetails: false
          })
        })
    }

    if (this.state.getCashMovements) {
      this.InvestorService.getCashMovements(id)
        .then(response => {
          this.setState({
            summary: {
              ...this.state.summary,
              ...response
            },
            getCashMovements: false
          })
        })
    }
  }

  changeInvestorType = (event) => {

    const { value } = event.target;
    let investorType = value
    let investorId = this.state._investor
    let investorDetails = {
      investorId,
      investorType
    }
    this.InvestorService.changeInvestorType(investorDetails)
      .then(response => {
        console.log(response)
        if (response.status === "success") {
          this.setState({ investorType: response.data.investorType })

        } else {
          this.setState({ investorType: this.state.investorType })
        }
      })
  }

  toggleAutoInvest = () => {
    const _investor = this.state._investor
    this.InvestorService.toggleInvestorAutoInvest(_investor)
      .then(response => {
        console.log(response)
        if (response.status === 'success') {
          this.setState({ isAutoInvesting: response.isAutoInvesting })
        } else {
          this.setState({ isAutoInvesting: this.state.isAutoInvesting })
        }
      })
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, getInvestor: true });
  }

  handleNewFee = (event) => {
    const { name, value } = event.target;
    if (name === 'newPct') {
      console.log(value)
      if (value > 100) {
        this.setState({ newPct: 100 })
      } else if (value < 0) {
        this.setState({ newPct: 0 })
      } else {
        this.setState({ newPct: value })
      }
    } else {
      this.setState({ [name]: value })
    }
  }

  saveNewFee = () => {
    let { newPct, newManager, _investor } = this.state
    newPct = newPct / 100
    let investorFee = {
      investorId: _investor,
      managementAccountId: newManager,
      pct: newPct
    }

    return this.InvestorService.addInvestorFees(investorFee)
      .then(async response => {
        if (response.status === "success") {
          let investorFees = await this.InvestorService.getInvestorFees(_investor)
          this.setState({
            investorFees: investorFees.data,
            newPct: 0,
            newManager: null
          })
        } else {

        }
      })
  }

  deleteFee = (managementFeeId) => {
    let { _investor } = this.state
    this.InvestorService.deleteInvestorFees(managementFeeId)
      .then(async response => {
        if (response.status === "success") {
          let investorFees = await this.InvestorService.getInvestorFees(_investor)
          this.setState({ investorFees: investorFees.data })
        } else {

        }
      })
  }



  render() {

    const { classes, investorId } = this.props
    const {
      transactions,
      investments,
      loanDetails,
      display,
      value,
      summary,
      isAutoInvesting,
      investorFees,
      investorType,
      newPct,
      newManager,
      investors,
      // _investor
    } = this.state

    return (
      <div className="content">
        <div className="form-row">
          <SelectBar investors={investors} _investor={investorId} handleChange={this.handleChange} />
        </div>

        {display &&
          (<div>
            <InvestorSummary summary={summary} />
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
                      label="MOVIMIENTOS"
                    />
                    <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="OPCIONES"
                    />
                  </Tabs>
                </div>
                {value === 0 && <AccLoanSummaryTable loanDetails={loanDetails} />}
                {value === 1 && <AccInvestmentsTable investments={investments} />}
                {value === 2 && <AccTransactionsTable investorId={investorId} data={transactions} accountTotal={summary.cashAvailable} />}
                {value === 3 && <AccOptions
                  feeReceivers={this.state.investors}
                  changeInvestorType={this.changeInvestorType}
                  toggleAutoInvest={this.toggleAutoInvest}
                  investorFees={investorFees}
                  investorType={investorType}
                  isAutoInvesting={isAutoInvesting}
                  handleNewFee={this.handleNewFee}
                  newPct={newPct}
                  newManager={newManager}
                  saveNewFee={this.saveNewFee}
                  deleteFee={this.deleteFee}
                />}
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
