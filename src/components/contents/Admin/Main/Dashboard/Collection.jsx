import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import TreeMap from "react-d3-treemap";
import { makeStyles } from '@material-ui/core/styles';
import ReportingService from '../../../../../services/ReportingService'
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table'
import Box from '@material-ui/core/Box';
import moment from 'moment'
import numbro from 'numbro';
import './collectionCard.scss'


const dataColumns = [
    {
        title: 'Name', field: 'name', render: rowData => <Link to={
            `/admin/loan/${rowData._id}`
        } >{rowData.name}</Link>
    },
    { title: 'Fecha', field: 'date', type: 'date', render: rowData => moment(rowData.date).format('YYYY/MM/DD') },
    {
        title: 'Monto', field: 'value', type: 'numeric',
        render: rowData => numbro(rowData.value).format({
            thousandSeparated: true,
            mantissa: 2,
        }),
    },
    { title: 'Clasificación', field: 'periodClassification' },
    {
        title: 'Dias', field: 'dayDiff', type: 'numeric',
        render: rowData => numbro(rowData.dayDiff).format({
            thousandSeparated: true,
            mantissa: 0,
        })
    },
    { title: 'Estatus', field: 'status' },
    {
        title: 'Cuota', field: 'oldest_payment',
        render: rowData => numbro(rowData.oldest_payment).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
    { title: '# de Cuotas', field: 'number_unpaid', type: 'numeric' },
    {
        title: 'Capital', field: 'remainingCapital',
        render: rowData => numbro(rowData.remainingCapital).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
]

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
    const [report, setReport] = useState(0);
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
                {collection ?
                    <>
                        {collection.children.map((e, i) => {
                            console.log(e)
                            return (
                                <TabPanel value={value} index={i} className='period-card'>
                                    {e.children.map(e => {
                                        return (<MaterialTable
                                            title="Cobranza"
                                            columns={dataColumns}
                                            data={e.children}
                                            options={{
                                                search: true,
                                                sort: true,
                                                showTitle: false,
                                                toolbar: true,
                                                pageSize: 10
                                            }}
                                        />)
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