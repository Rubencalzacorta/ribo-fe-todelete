import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import loanService from '../../../../../services/LoanService'
import PaymentService from '../../../../../services/PaymentService'
import Investors from './Investors'
import Schedule from './Schedule'
import Transactions from './Transactions'
import Statistics from './Statistics'
import Commissions from './Commissions'
import Documents from './Documents'
import Payment from './Payment';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Collateral from '../Collateral'

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


class LoanDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loan: {
                details: {},
                investors: {}
            },
            interestIncome: 0,
            interestProjected: 0,
            openPayment: false,
            installment: null,
            value: 0
        }
        this.loanService = new loanService()
        this.PaymentService = new PaymentService()
    }

    componentDidMount = async () => {
        this.loader()
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };


    loader = async () => {
        const { loanId } = this.props
        let loan = await this.loanService.getLoanCompleteDetails(loanId)
        let commissions = await this.loanService.getLoanCommissions(loanId)
        let salesmen = await this.loanService.getSalesmen()

        this.setState({
            loan,
            commissions: commissions.data,
            salesmen: salesmen.data
        })
        this.detailsCalc()
    }

    detailsCalc = () => {
        let { loanSchedule } = this.state.loan.details

        let interestIncome = loanSchedule.reduce((acc, e) => {
            return acc + (e.interest_pmt ? e.interest_pmt : 0)
        }, 0)

        let interestProjected = loanSchedule.reduce((acc, e) => {
            return acc + (e.interest ? e.interest : 0)
        }, 0)

        this.setState({
            interestIncome,
            interestProjected
        })
    }

    handleNewCommission = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
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

    saveNewCommission = () => {
        const { loanId } = this.props
        let { newPct, newSalesman } = this.state
        newPct = newPct / 100
        let salesmanCommission = {
            _loan: loanId,
            _salesmen: newSalesman,
            pct: newPct
        }

        return this.loanService.addCommission(salesmanCommission)
            .then(async response => {
                if (response.status === "success") {
                    let commissions = await this.loanService.getLoanCommissions(loanId)
                    this.setState({
                        commissions: commissions.data
                    })
                } else {

                }
            })
    }

    deleteCommission = (id) => {
        let { loanId } = this.props
        this.loanService.deleteCommission(id)
            .then(async response => {
                if (response.status === "success") {
                    let commissions = await this.loanService.getLoanCommissions(loanId)
                    this.setState({
                        commissions: commissions.data
                    })
                } else {

                }
            })
    }

    compare = (a, b) => {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    reversePayment = (id) => {
        this.PaymentService.deletePayment(id)
            .then(response => {
                this.loader()
            })
            .catch(error => {
                this.setState({ error })
            }
            )
    }

    deletePayments = (id) => {
        this.loanService.deletePayments(id)
            .then(response => {
                this.loader()
            })
            .catch(error => {
                this.setState({ error })
            }
            )
    }

    openPaymentOption = (item, fullPayment) => {
        this.setState({
            openPayment: true,
            installment: item,
            fullPayment: fullPayment
        })
    }

    closePaymentOption = () => {
        this.setState({
            openPayment: false,
            installment: null,
            fullPayment: false
        })
    }

    paymentReceiver = (payment) => {
        let { fullPayment } = this.state

        if (fullPayment) {
            this.PaymentService.newFullPayment(payment)
                .then(response => {
                    this.loader()
                    this.setState({ openPayment: false })
                })
                .catch(error => {
                    this.setState({ error })
                }
                )
        } else {
            this.PaymentService.newPayment(payment)
                .then(response => {
                    this.loader()
                    this.setState({ openPayment: false })
                })
                .catch(error => {
                    this.setState({ error })
                }
                )
        }

    }

    loanRemove = (id) => {
        this.loanService.deleteLoan(id)
            .then(() => {
                this.props.history.push(`/admin/client/${this.state.loan.details._borrower._id}`)
            })
            .catch(error => {
                this.setState({ error })
            }
            )
    }

    render() {
        let { interestIncome,
            interestProjected,
            installment,
            value,
            commissions,
            salesmen,
            newPct,
            newSalesman,
            fullPayment
        } = this.state
        const { classes } = this.props;
        let { details, investors, transactions } = this.state.loan
        return (
            (this.state.loan.details._borrower) ?
                (
                    <div className="content">
                        <Statistics details={details} interestIncome={interestIncome} interestProjected={interestProjected} />
                        <div className="loan-content-holder">
                            <div className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={this.handleChange}
                                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                >
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="CRONOGRAMA"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="INVERSIONISTAS"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="MOVIMIENTOS"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="COMISIONES"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="COLATERAL"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        label="DOCUMENTOS"
                                    />
                                </Tabs>
                            </div>
                            {value === 0 &&
                                <div>
                                    {this.state.openPayment &&
                                        <Payment
                                            installment={installment}
                                            loan={details}
                                            receivePayment={this.paymentReceiver}
                                            closePaymentOption={this.closePaymentOption}
                                            fullPayment={fullPayment}
                                        />}
                                    <Schedule
                                        loanSchedule={details.loanSchedule.sort(this.compare)}
                                        openPaymentOption={this.openPaymentOption}
                                        reversePayment={this.reversePayment}
                                        deletePayments={this.deletePayments}
                                        capitalRemaining={details.capitalRemaining}
                                    />
                                    <div className='loan-delete'>
                                        <Button variant="contained" color="secondary" className='right-button' onClick={() => this.loanRemove(details._id)}>
                                            ELIMINAR PRESTAMO
                                        <DeleteIcon />
                                        </Button>
                                    </div>
                                </div>
                            }
                            {value === 1 && <Investors investors={investors} />}
                            {value === 2 && <Transactions transactions={transactions} />}
                            {value === 3 && <Commissions
                                commissions={commissions}
                                salesmen={salesmen}
                                newPct={newPct}
                                newSalesman={newSalesman}
                                handleNewCommission={this.handleNewCommission}
                                saveNewCommission={this.saveNewCommission}
                                deleteCommission={this.deleteCommission} />}
                            {value === 4 && <Collateral loanId={details._id} />}
                            {value === 5 && <Documents />}
                        </div>
                    </div>
                ) :
                "")
    }
}

LoanDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoanDetails));