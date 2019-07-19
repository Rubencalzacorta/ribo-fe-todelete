import React, { Component } from 'react'
import './loan.scss'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'



const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: 20
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});


class Activity extends Component {
    state = {
        expanded: null,
        totalRemaining: 0,
        totalBorrowed: 0,
        numberOfLoans: 0
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    compare = (a, b) => {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    startDateCompare = (a, b) => {
        if (a.startDate < b.startDate)
            return -1;
        if (a.startDate > b.startDate)
            return 1;
        return 0;
    }

    componentDidMount = () => {
        this.totals()
    }

    totals = () => {
        let { loans } = this.props.user
        let totalRemaining = loans.reduce((acc, e) => { return acc + e.capitalRemaining }, 0)
        let totalBorrowed = loans.reduce((acc, e) => { return acc + e.capital }, 0)
        let numberOfLoans = loans.length

        this.setState({
            totalRemaining: totalRemaining,
            totalBorrowed: totalBorrowed,
            numberOfLoans: numberOfLoans
        })
    }


    render() {
        const { classes } = this.props;
        const { loans } = this.props.user;
        const { expanded, totalRemaining, numberOfLoans, totalBorrowed } = this.state;

        return (
            <div className="testing">
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">General</p>
                    </div>
                </div>
                <div className="account-cards">
                    <div className="account-card">
                        <p variant='heading' className="heading">Total por pagar</p>
                        <p variant='heading' className="heading-content">{(totalRemaining).toLocaleString()}</p>
                    </div>
                    <div className="account-card">
                        <p variant='heading' className="heading"># de prestamos</p>
                        <p variant='heading' className="heading-content">{(numberOfLoans).toLocaleString()}</p>
                    </div>
                    <div className="account-card">
                        <p variant='heading' className="heading">Pagado</p>
                        <p variant='heading' className="heading-content">{(totalBorrowed - totalRemaining).toLocaleString()}</p>
                    </div>
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Prestamos abiertos</p>
                    </div>
                </div>
                <div className={classes.root}>
                    {loans.sort(this.startDateCompare).filter((e) => e.status === 'OPEN').map((e, i) => (
                        <ExpansionPanel key={i} expanded={expanded === `panel${i + 1}`} onChange={this.handleChange(`panel${i + 1}`)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{e._id.substr(e._id.length - 7).toUpperCase()}</Typography>
                                <Typography className={classes.secondaryHeading}>{moment(e.startDate).format('DD/MM/YY')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="table-details-container">
                                <div className="table-details">
                                    <div className="loan-details-card">
                                        <div className="loan-detail-card">
                                            <p variant='heading' className="heading">Total</p>
                                            <p variant='heading' className="heading-content">{(e.capital).toLocaleString()}</p>
                                        </div>
                                        <div className="loan-detail-card">
                                            <p variant='heading' className="heading">Tasa</p>
                                            <p variant='heading' className="heading-content">{e.interest}%</p>
                                        </div>
                                        <div className="loan-detail-card">
                                            <p variant='heading' className="heading">Plazo</p>
                                            <p variant='heading' className="heading-content">{e.duration}</p>
                                        </div>
                                        <div className="loan-detail-card">
                                            <p variant='heading' className="heading">Amortizado</p>
                                            <p variant='heading' className="heading-content">{(e.capital - e.capitalRemaining).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="table-container">
                                        <ul className="responsive-table">
                                            <li className="table-header">
                                                <div className="table-col table-col-1">FECHA</div>
                                                <div className="table-col table-col-2">CUOTA</div>
                                                <div className="table-col table-col-3">INTERES</div>
                                                <div className="table-col table-col-4">CAPITAL</div>
                                                <div className="table-col table-col-5">P.INTERES</div>
                                                <div className="table-col table-col-6">P.CAPITAL</div>
                                                <div className="table-col table-col-7">P.CUOTA</div>
                                                <div className="table-col table-col-8"></div>
                                            </li>
                                            {e.loanSchedule.sort(this.compare).map((e, i) => (
                                                <li key={i} className="table-row">
                                                    <div className="table-col table-col-1" data-label="Fecha">{moment(e.date).format('DD/MM/YY')}</div>
                                                    <div className="table-col table-col-2" data-label="Cuota">{(e.interest + e.principal).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className="table-col table-col-3" data-label="Interes">{e.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className="table-col table-col-4" data-label="Capital">{e.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className="table-col table-col-5" data-label="Pago Interes">{(e.interest_pmt ? e.interest_pmt : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className="table-col table-col-6" data-label="Pago Capital">{(e.principal_pmt ? e.principal_pmt : 0).toLocaleString()}</div>
                                                    <div className="table-col table-col-7" data-label="Total pagado">{((e.principal_pmt ? e.principal_pmt : 0) + (e.interest_pmt ? e.interest_pmt : 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className="table-col table-col-8" data-label="Estatus">{(e.principal_pmt ? e.principal_pmt : 0) >= e.principal ? 'X' : ''}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                    )}
                </div>
                <div className="heading-activity">
                    <div>
                        <p variant='heading' className="heading">Prestamos cerrados</p>
                    </div>
                </div>
                <div className={classes.root}>
                    {loans.sort(this.startDateCompare).filter((e) => e.status === 'CLOSED').map((e, i) => (
                        <ExpansionPanel key={i} expanded={expanded === `panel${i + 1}`} onChange={this.handleChange(`panel${i + 1}`)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{e._id.substr(e._id.length - 7).toUpperCase()}</Typography>
                                <Typography className={classes.secondaryHeading}>{moment(e.startDate).format('DD/MM/YY')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="table-details-container">
                                <div className="loan-details-card">
                                    <div className="loan-detail-card">
                                        <p variant='heading' className="heading">Total</p>
                                        <p variant='heading' className="heading-content">{(e.capital).toLocaleString()}</p>
                                    </div>
                                    <div className="loan-detail-card">
                                        <p variant='heading' className="heading">Tasa</p>
                                        <p variant='heading' className="heading-content">{e.interest}%</p>
                                    </div>
                                    <div className="loan-detail-card">
                                        <p variant='heading' className="heading">Plazo</p>
                                        <p variant='heading' className="heading-content">{e.duration}</p>
                                    </div>
                                    <div className="loan-detail-card">
                                        <p variant='heading' className="heading">Amortizado</p>
                                        <p variant='heading' className="heading-content">{(e.capital - e.capitalRemaining).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="table-container">
                                    <ul className="responsive-table">
                                        <li className="table-header">
                                            <div className="table-col table-col-1">FECHA</div>
                                            <div className="table-col table-col-2">CUOTA</div>
                                            <div className="table-col table-col-3">INTERES</div>
                                            <div className="table-col table-col-4">CAPITAL</div>
                                            <div className="table-col table-col-5">P.INTERES</div>
                                            <div className="table-col table-col-6">P.CAPITAL</div>
                                            <div className="table-col table-col-7">P.CUOTA</div>
                                            <div className="table-col table-col-8"></div>
                                        </li>
                                        {e.loanSchedule.sort(this.compare).map((e, i) => (
                                            <li key={i} className="table-row">
                                                <div className="table-col table-col-1" data-label="Fecha">{moment(e.date).format('DD/MM/YY')}</div>
                                                <div className="table-col table-col-2" data-label="Cuota">{(e.interest + e.principal).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                <div className="table-col table-col-3" data-label="Interes">{e.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                <div className="table-col table-col-4" data-label="Capital">{e.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                <div className="table-col table-col-5" data-label="Pago Interes">{(e.interest_pmt ? e.interest_pmt : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                <div className="table-col table-col-6" data-label="Pago Capital">{(e.principal_pmt ? e.principal_pmt : 0).toLocaleString()}</div>
                                                <div className="table-col table-col-7" data-label="Total pagado">{((e.principal_pmt ? e.principal_pmt : 0) + (e.interest_pmt ? e.interest_pmt : 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                <div className="table-col table-col-8" data-label="Estatus">{(e.principal_pmt ? e.principal_pmt : 0) >= e.principal ? 'X' : ''}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                    )}
                </div>
            </div>

        )
    }
}

Activity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activity);