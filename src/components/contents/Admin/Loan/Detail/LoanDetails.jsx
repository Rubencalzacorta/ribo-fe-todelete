import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import loanService from '../../../../../services/LoanService'
import PaymentService from '../../../../../services/PaymentService'
import Investors from './Investors'
import Schedule from './Schedule'
import RestructureForm from './RestructureForm'
import Transactions from './Transactions'
import Statistics from './Statistics'
import Commissions from './Commissions'
import Documents from './Documents'
import Payment from './Payment';
import Comments from '../Comments';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Grid, ButtonGroup, Dialog } from '@material-ui/core';
import Collateral from '../Collateral'
//for modal - Dialog ya esta importado de material UI
import PaymentModal from '../../../../Modal/PaymentModal'
import DialogBox from '../../../../Modal/Dialog'


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
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
            value: 0,
            payment: false,
            fullPayment: false,
            restructuringDetails: {

            }
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

    togglePaymentOption = (thisInstallment, isFullPayment = false) => {
        this.setState({ ...this.state, fullPayment: isFullPayment, payment: !this.state.payment, installment: thisInstallment })
    }


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
            if (e.status !== 'RESTRUCTURED') return acc + (e.interest_pmt ? e.interest_pmt : 0)
            else return acc
        }, 0)

        let interestProjected = loanSchedule.reduce((acc, e) => {
            if (e.status !== 'RESTRUCTURED') return acc + (e.interest ? e.interest : 0)
            else return acc
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

    loanRestructure = () => {
        let { restructuringDetails, loan } = this.state
        let { details } = loan
        let { loanId } = this.props
        this.loanService.restructure(loanId, restructuringDetails)
            .then((response) => {
                this.setState({
                    open: false,
                    status: 'success',
                    loan: {
                        ...loan,
                        details: {
                            ...details,
                            loanSchedule: response.loanSchedule.sort(this.compare)
                        }
                    }
                })
            })
            .catch(e => {
                this.setState({ status: 'failure' })
            })

    }

    closePaymentOption = () => {
        this.setState({
            openPayment: false,
            installment: null,
            fullPayment: false
        })
    }

    onChangeRestructuring = (e) => {
        let { name, value, type } = e.target
        let { restructuringDetails } = this.state
        this.setState({
            restructuringDetails: {
                ...restructuringDetails,
                [name]: type === 'number' ? parseFloat(value) : value
            }
        })
    }

    paymentReceiver = (payment) => {
        let { fullPayment } = this.state
        if (fullPayment) {
            this.PaymentService.newFullPayment(payment)
                .then(response => {
                    this.loader()
                    this.setState({
                        // openPayment: false,
                        payment: false
                    })
                })
                .catch(error => {
                    this.setState({ error })
                }
                )
        } else {
            this.PaymentService.newPayment(payment)
                .then(response => {
                    this.loader()
                    this.setState({
                        // openPayment: false
                        payment: false,
                    })
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

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

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
        let { open, restructuringDetails, status } = this.state
        return (
            (this.state.loan.details._borrower) ?
                (
                    <div style={{ width: 1200, marginTop: 10, marginLeft: 20 }}>
                        {status === 'success' ?
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
                        <Statistics details={details} interestIncome={interestIncome} interestProjected={interestProjected} />
                        <div
                            style={{ width: 1200, marginTop: 10 }}
                        // className="loan-content-holder"
                        >
                            <div className={classes.root}>
                                <Tabs
                                    value={value}
                                    orientation="vertical"
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
                                        label="COMENTARIOS"
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
                                <div style={{ marginLeft: 20, marginTop: -20 }}>
                                    {value === 0 &&
                                        <div>
                                            {this.state.payment &&
                                                <DialogBox
                                                    toggle={this.togglePaymentOption}
                                                    open={this.state.payment}
                                                    title='Inserte detalles de pago'
                                                >
                                                    <PaymentModal
                                                        submitTitle={'Procesar Pago'}
                                                        installment={installment._id}
                                                        loan={details}
                                                        receivePayment={this.paymentReceiver}
                                                        toggle={this.togglePaymentOption}
                                                        fullPayment={fullPayment}
                                                    />
                                                </DialogBox>}

                                            {/* {this.state.openPayment &&
                                                <Payment
                                                    installment={installment}
                                                    loan={details}
                                                    receivePayment={this.paymentReceiver}
                                                    closePaymentOption={this.closePaymentOption}
                                                    fullPayment={fullPayment}
                                                />} */}
                                            <Schedule
                                                loanSchedule={details.loanSchedule.sort(this.compare)}
                                                openPaymentOption={this.openPaymentOption}
                                                togglePaymentOption={this.togglePaymentOption}
                                                reversePayment={this.reversePayment}
                                                deletePayments={this.deletePayments}
                                                capitalRemaining={details.capitalRemaining}
                                            />
                                            <div className='loan-delete'>
                                                <Grid item xs={12} md={6}>
                                                    <Grid style={{ marginLeft: 100 }} container spacing={1} direction="column" alignItems="center">
                                                        <Grid item>
                                                            <ButtonGroup
                                                                variant="contained"
                                                                color="primary"
                                                                aria-label="full-width contained primary button group"
                                                            >
                                                                <Button onClick={() => this.handleClickOpen()}>REESTRUCTURAR</Button>
                                                                <Button onClick={() => this.loanRemove(details._id)}>
                                                                    ELIMINAR PRESTAMO
                                                            <DeleteIcon />
                                                                </Button>
                                                            </ButtonGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Dialog onClose={() => this.handleClose()} open={open}>
                                                    <RestructureForm
                                                        onChangeRestructuring={this.onChangeRestructuring}
                                                        loanRestructure={this.loanRestructure}
                                                        restructuringDetails={restructuringDetails} />
                                                </Dialog>
                                            </div>
                                        </div>
                                    }
                                    {value === 1 && <Investors investors={investors} />}
                                    {value === 2 && <Comments loanId={details._id} />}
                                    {value === 3 && <Transactions transactions={transactions} />}
                                    {value === 4 && <Commissions
                                        commissions={commissions}
                                        salesmen={salesmen}
                                        newPct={newPct}
                                        newSalesman={newSalesman}
                                        handleNewCommission={this.handleNewCommission}
                                        saveNewCommission={this.saveNewCommission}
                                        deleteCommission={this.deleteCommission} />}
                                    {value === 5 && <Collateral loanId={details._id} />}
                                    {value === 6 && <Documents />}
                                </div>
                            </div>
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