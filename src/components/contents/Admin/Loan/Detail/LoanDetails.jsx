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
import { Divider, Typography, Tabs, Tab, Grid, FormControl, ButtonGroup, Paper, Dialog, TextField, Select, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import Collateral from '../Collateral'
import { classPrivateMethod } from '@babel/types';

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
            value: 0,
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
                    <div className="content">
                        {status === 'success' ?
                            <div class="alert alert-success alert-dismissible">
                                <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                                <strong>Exito!</strong> La solicitud se ha procesado correctamente.
                            </div>
                            : status === 'failure' ?
                                <div class="alert alert-success alert-dismissible">
                                    <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                                    <strong>Fallo!</strong> La solicitud no se ha procesado correctamente
                            </div> : ""
                        }
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
                                        <Grid item xs={12} md={6}>
                                            <Grid container spacing={1} direction="column" alignItems="center">
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
                                            <Paper style={{ padding: 30, width: 600, display: 'flex', flexWrap: 'wrap' }}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h6">
                                                        REESTRUCTURACIÓN DE PRESTAMO
                                                    </Typography>
                                                </Grid>
                                                <Divider />
                                                <TextField
                                                    id="standard-full-width"
                                                    label="TASA DE INTERES"
                                                    style={{ margin: 8 }}
                                                    helperText="% mensual"
                                                    onChange={(e) => this.onChangeRestructuring(e)}
                                                    type="number"
                                                    name="interest"
                                                    value={restructuringDetails.interest}
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-full-width"
                                                    label="CUOTAS"
                                                    type="number"
                                                    name="duration"
                                                    onChange={(e) => this.onChangeRestructuring(e)}
                                                    style={{ margin: 8 }}
                                                    helperText="numero total de cuotas a pagar"
                                                    value={restructuringDetails.duration}
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-full-width"
                                                    label="CUOTAS DE SOLO INTERES"
                                                    name="startAmortPeriod"
                                                    onChange={(e) => this.onChangeRestructuring(e)}
                                                    style={{ margin: 8 }}
                                                    value={restructuringDetails.startAmortPeriod}
                                                    helperText="cuotas de solo intereses antes de pagar capital"
                                                    fullWidth
                                                    type="number"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <FormControl style={{
                                                    width: '100%', marginTop: 15, marginLeft: 8, marginRight: 8
                                                }}>
                                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                        TIPO DE REESTRUCTURACIÓN
                                                </InputLabel>
                                                    <Select
                                                        name="restructuringType"
                                                        value={restructuringDetails.restructuringType}
                                                        type="string"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        fullWidth
                                                        onChange={(e) => this.onChangeRestructuring(e)}
                                                    // value={age}
                                                    // onChange={handleChange}
                                                    >
                                                        <MenuItem value={'capital'}>Capital</MenuItem>
                                                        <MenuItem value={'capitalAndDueInterest'}>Capital e Intereses Adeudados</MenuItem>
                                                        <MenuItem value={'capitalAndPendingInterest'}>Capital, intereses adeudados y pendientes</MenuItem>
                                                    </Select>
                                                    <FormHelperText>indicará el monto a reestructurar</FormHelperText>
                                                </FormControl>
                                                <FormControl style={{
                                                    width: '100%', marginTop: 15, marginLeft: 8, marginRight: 8
                                                }}>
                                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                        FRECUENCIA
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        fullWidth
                                                        value={restructuringDetails.period}
                                                        name="period"
                                                        onChange={(e) => this.onChangeRestructuring(e)}
                                                    // value={age}
                                                    // onChange={handleChange}
                                                    >
                                                        <MenuItem value={'weekly'}>Semanal</MenuItem>
                                                        <MenuItem value={'biWeekly'}>Cada 2 semanas</MenuItem>
                                                        <MenuItem value={'payDay'}>Dia de pago (Quincenas)</MenuItem>
                                                        <MenuItem value={'monthly'}>Mensual</MenuItem>
                                                    </Select>
                                                    <FormHelperText>frequencia con la que se realizaran los pagos</FormHelperText>
                                                </FormControl>
                                                <FormControl style={{
                                                    width: '100%', marginTop: 15, marginLeft: 8, marginRight: 8
                                                }}>
                                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                        TIPO DE AMORTIZACIÓN
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        fullWidth
                                                        onChange={(e) => this.onChangeRestructuring(e)}
                                                        value={restructuringDetails.loanType}
                                                        // value={age}
                                                        name="loanType"
                                                    // onChange={handleChange}
                                                    >
                                                        <MenuItem value={'amort2'}>Amortización</MenuItem>
                                                    </Select>
                                                    <FormHelperText>esquema de repago</FormHelperText>
                                                </FormControl>
                                                <TextField
                                                    id="standard-full-width"
                                                    type="date"
                                                    label="FECHA DE INICIO"
                                                    style={{ margin: 8, marginTop: 15 }}
                                                    helperText="fecha desde la cual se empezarán a calcular los primeros intereses"
                                                    fullWidth
                                                    onChange={(e) => this.onChangeRestructuring(e)}
                                                    value={restructuringDetails.startDate}
                                                    margin="normal"
                                                    name="startDate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    id="standard-full-width"
                                                    type="date"
                                                    label="FECHA DE PAGO"
                                                    style={{ margin: 8, marginTop: 15 }}
                                                    helperText="fecha en la que se realizara el primer pago"
                                                    fullWidth
                                                    onChange={(e) => this.onChangeRestructuring(e)}
                                                    value={restructuringDetails.paymentDate}
                                                    margin="normal"
                                                    name="paymentDate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <div className='loan-delete'>
                                                    <Button color="primary" variant="contained" onClick={() => this.loanRestructure()}>
                                                        reestructurar
                                                    </Button>
                                                </div>
                                            </Paper>
                                        </Dialog>
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