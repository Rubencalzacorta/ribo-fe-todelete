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
import { investorInitialState } from '../../../../constants'
import './detail-investor.scss'



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
    this.state = investorInitialState
    this.TransactionService = new TransactionService();
    this.InvestorService = new InvestorService();
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };


  handleOnClick = async (event) => {
    event.preventDefault();

    const _investor = this.state._investor

    this.fetchInvestor(_investor)
    let transactions = await this.TransactionService.getTransactions(_investor)
    let investments = await this.InvestorService.getInvestorInvestments(_investor)
    let loanDetails = await this.TransactionService.getLoanInvestorDetails(_investor)
    let autoInvest = await this.InvestorService.getInvestorOptions(_investor)
    let investorFees = await this.InvestorService.getInvestorFees(_investor)

    return Promise.all([
      investments,
      loanDetails,
      autoInvest,
      investorFees,
      transactions
    ])
      .then(response => {
        this.setState({
          display: true,
          transactions: response[4],
          investments: response[0],
          loanDetails: response[1],
          isAutoInvesting: response[2].isAutoInvesting,
          investorType: response[2].investorType,
          investorFees: response[3].data
        });
        return response
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

  fetchInvestor = (id) => {

    this.setState({
      display: true
    })

    if (!this.state.getCashDetails) {
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

    if (!this.state.getInvestmentDetails) {
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

    if (!this.state.getPLDetails) {
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

    if (!this.state.getCashMovements) {
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
    this.setState({ [name]: value });
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
    this.fetchInvestors()

    const { classes } = this.props
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
    } = this.state

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
        <InvestorSummary summary={summary} />
        {display &&
          (<div>
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
                {value === 2 && <AccTransactionsTable data={transactions} />}
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
