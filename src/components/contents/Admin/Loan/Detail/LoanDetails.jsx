import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import loanService from '../../../../../services/LoanService'
import InvestorList from './InvestorList'
import LoanSchedule from './LoanSchedule'
import LoanTransactions from './LoanTransactions'
import LoanDetailHeader from './LoanDetailHeader'
import LoanDocuments from './LoanDocuments'
import Payment from './Payment';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
        this.setState({ loan })
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

    compare = (a, b) => {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    reversePayment = (id) => {
        this.loanService.deletePayment(id)
            .then(response => {
                this.loader()
            })
            .catch(error => {
                this.setState({ error })
            }
            )
    }

    openPaymentOption = (item) => {
        this.setState({
            openPayment: true,
            installment: item
        })
    }

    closePaymentOption = () => {
        this.setState({
            openPayment: false,
            installment: null
        })
    }

    paymentReceiver = (payment) => {

        this.loanService.makePayment({ ...payment, status: 'PAID' })
            .then(response => {
                this.loader()
                this.setState({ openPayment: false })
            })
            .catch(error => {
                this.setState({ error })
            }
            )
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
        let { interestIncome, interestProjected, installment, value } = this.state
        const { classes } = this.props;
        let { details, investors, transactions } = this.state.loan
        return (
            (this.state.loan.details._borrower) ?
                (
                    <div className="content">
                        <LoanDetailHeader details={details} interestIncome={interestIncome} interestProjected={interestProjected} />
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
                                        label="DOCUMENTOS"
                                    />
                                </Tabs>
                            </div>
                            {value === 0 &&
                                <div>
                                    {this.state.openPayment && <Payment installment={installment} receivePayment={this.paymentReceiver} closePaymentOption={this.closePaymentOption} />}
                                    <LoanSchedule loanSchedule={details.loanSchedule.sort(this.compare)} openPaymentOption={this.openPaymentOption} reversePayment={this.reversePayment} />
                                    <div className='loan-delete'>
                                        <Button variant="contained" color="secondary" className='right-button' onClick={() => this.loanRemove(details._id)}>
                                            ELIMINAR PRESTAMO
                                        <DeleteIcon />
                                        </Button>
                                    </div>
                                </div>
                            }
                            {value === 1 && <InvestorList investors={investors} />}
                            {value === 2 && <LoanTransactions transactions={transactions} />}
                            {value === 3 && <LoanDocuments />}
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