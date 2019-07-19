import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ClientService from '../../../../services/ClientService'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { initialState } from '../../../../constants.js';
import { Tabs, Tab } from '@material-ui/core';
import ClientDetails from './ClientDetailsMain.jsx'
import ClientLoan from './ClientLoan.jsx'
import './ClientDetails.scss'


const styles = theme => ({
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        fontSize: '0.8rem',
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

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState, value: 0 }
        this.service = new ClientService();
    }


    componentDidMount = () => {
        let { clientId } = this.props.match.params

        this.service.getClient(clientId)
            .then(response => {
                this.setState({ client: response })
            })
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (status) => {
        let { clientId } = this.props.match.params
        this.setState({ open: false, editStatus: status });
        if (status === 'updated') {
            this.service.getClient(clientId)
                .then(response => {
                    this.setState({ client: response })
                })
        }
    };


    render() {

        let { client, value } = this.state
        let { classes } = this.props

        return (
            <div className="main-holder">
                <div className="client-header">
                    <div className="client-fullname">
                        {client.firstName ? (client.firstName + " " + client.lastName).toUpperCase() : "Loading..."}
                    </div>
                </div>
                <div className="content">
                    <div className="loan-content-holder">
                        <div className={classes.root}>
                            <Tabs
                                value={value}
                                onChange={this.handleTabChange}
                                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                            >
                                < Tab
                                    disableRipple
                                    classes={
                                        {
                                            root: classes.tabRoot,
                                            selected: classes.tabSelected
                                        }
                                    }
                                    label="PRESTAMOS" /
                                >
                                <Tab
                                    disableRipple
                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                    label="DETALLES"
                                />


                            </Tabs>
                        </div>
                        {value === 0 && <ClientLoan data={client} clientId={client._id} />}
                        {value === 1 && <ClientDetails />}
                    </div>
                </div>
            </div>

        )
    }
}


Client.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Client));