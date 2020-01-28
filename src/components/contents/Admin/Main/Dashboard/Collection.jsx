import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReportingService from '../../../../../services/ReportingService'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from 'moment'
import numbro from 'numbro';
import './collectionCard.scss'

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
    const [collection, setCollection] = useState(0);
    const reportingService = new ReportingService();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await reportingService.getCollection()
                return setCollection(res);
            } catch (error) {
                console.log(error)
            }
        };
        FetchData();
        // eslint-disable-next-line
    }, []);




    return (
        <div className="content dashboard-content">
            <div className={classes.root}>
                <AppBar position="static" style={{ 'background-color': 'rgb(0,68,107)' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {collection ? collection.children.map((e, i) => {
                            return (<Tab label={countries[e.name]} {...a11yProps(i)} />)
                        }) : ''}
                        {collection ? <Tab label='RESUMEN' {...a11yProps(collection.children.length + 1)} /> : <Tab label='RESUMEN' {...a11yProps(0)} />}
                    </Tabs>
                </AppBar>
                {collection ? collection.children.map((e, i) => {
                    ''
                    return (<TabPanel value={value} index={i} className='period-card'>
                        {e.children.map(e => {
                            return (<>
                                <div className='collection-card'>
                                    <div className='date-col'>
                                        {e.name}
                                    </div>
                                    <div className='name-col'>
                                        Deudor
                                    </div>
                                    <div className='amount-col'>
                                        Monto Vencido
                                    </div>
                                    <div className='quote-col'>
                                        Cuotas
                                    </div >
                                    <div className='since-col'>
                                        Días
                                    </div>
                                    <div className='option-col'>
                                        Opciones
                                    </div>
                                </div>
                                {e.children.map(e => {
                                    return (
                                        <div className='collection-info-card'>
                                            <div className='date-col'>
                                                {moment(e.date).format('YYYY-MM-DD')}
                                            </div>
                                            <div className='name-col'>
                                                {e.name}
                                            </div>
                                            <div className='amount-col'>
                                                {numbro(e.value).format({
                                                    thousandSeparated: true,
                                                    mantissa: 2,
                                                })}
                                            </div>
                                            <div className='quote-col'>
                                                {e.number_unpaid}
                                            </div >
                                            <div className='since-col'>
                                                {numbro(e.dayDiff).format({
                                                    thousandSeparated: true,
                                                    mantissa: 0,
                                                })}
                                            </div>
                                            <div className='option-col'>
                                                PAGAR ({numbro(e.oldest_payment).format({
                                                    thousandSeparated: true,
                                                    mantissa: 2,
                                                })})
                                    </div>
                                        </div>
                                    )
                                })}
                            </>)
                        })}
                    </TabPanel>)
                }) : ''}


            </div>
        </div >
    );
}