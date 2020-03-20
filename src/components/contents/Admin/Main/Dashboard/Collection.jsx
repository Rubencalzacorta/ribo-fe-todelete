import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TreeMap from "react-d3-treemap";
import { makeStyles } from '@material-ui/core/styles';
import ReportingService from '../../../../../services/ReportingService'
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PaymentService from '../../../../../services/PaymentService'
import Box from '@material-ui/core/Box';
import Dialog from '../../../../Modal/Dialog'
import PaymentModal from '../../../../Modal/PaymentModal'
import './collectionCard.scss'
import CollectionTable from './CollectionTable';
const paymentService = new PaymentService()

const countries = {
    'DOMINICAN_REPUBLIC': 'República Dominicana',
    'VENEZUELA': 'Venezuela',
    'PERU': 'Perú'
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [data, setData] = useState();
    const [getInitialData, setGetInitialData] = useState(true)
    const [report, setReport] = useState(0);
    const [collection, setCollection] = useState(0);
    const reportingService = new ReportingService();
    const [payment, setPayment] = useState(false)

    const togglePaymentOption = (data) => {
        setPayment(!payment)
        setData(data)
    }
    const paymentReceiver = (payment) => {
        paymentService.newPayment(payment)
            .then(response => {
                setPayment(false)
                setGetInitialData(true)

            })
    }

    const handleDownload = (event, country) => {
        event.preventDefault()
        console.log(country)
        reportingService.collectionReport(country)
        //     .then()
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (getInitialData) {
            const FetchData = async () => {
                try {
                    const res = await reportingService.getCollection()
                    setGetInitialData(false)
                    return setCollection(res);

                } catch (error) {
                    console.log(error)
                }
            };
            FetchData();
        }
        // eslint-disable-next-line
    }, [getInitialData]);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await reportingService.getCollectionReport()
                return setReport(res);
            } catch (error) {
                console.log(error)
            }
        };
        FetchData();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="dashboard-content">
            <div className={classes.root}>
                <AppBar position="static" style={{ 'background-color': 'rgb(0,68,107)' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
                        {collection ? collection.children.map((e, i) => {
                            return (<Tab label={countries[e.name]} {...a11yProps(i)} />)
                        }) : ''}
                        {collection ? <Tab label='RESUMEN' {...a11yProps(collection.children.length)} /> : <Tab label='RESUMEN' {...a11yProps(0)} />}
                    </Tabs>
                </AppBar>
                {payment &&
                    <Dialog
                        toggle={togglePaymentOption}
                        open={payment}
                        title='Inserte detalles de pago'
                    >
                        <PaymentModal
                            submitTitle={'Procesar Pago'}
                            installment={data.oldest_installment}
                            receivePayment={paymentReceiver}
                            toggle={togglePaymentOption}
                        />
                    </Dialog>}
                {collection ?
                    <>
                        {collection.children.map((e, i) => {
                            return (
                                <TabPanel value={value} index={i} className='period-card'>
                                    {e.children.map(j => {
                                        return (<CollectionTable country={e.name} handleDownload={handleDownload} togglePaymentOption={togglePaymentOption} tableData={j.children} />)
                                    })}
                                </TabPanel>
                            )
                        })}
                        <TabPanel value={value} index={collection.children.length} className='period-card'>
                            <TreeMap height={700} width={1200} data={report} valueUnit={'USD'} />
                        </TabPanel>
                    </> : ''}
            </div>
        </div >
    );
}