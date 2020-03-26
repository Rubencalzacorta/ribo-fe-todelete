import React, { useState, useEffect } from 'react';
import './filterBar.scss'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import { countries } from '../../../../../../constants'
import moment from 'moment'
import ReportingService from '../../../../../../services/ReportingService'
import PaymentService from '../../../../../../services/PaymentService'
import Dialog from '../../../../../Modal/Dialog'
import PaymentModal from '../../../../../Modal/PaymentModal'
import CollectionTable from '../CollectionTable'


const useStyles = makeStyles(theme => ({
    root: {
        margin: 20,
        marginBottom: 0,
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    rootTable: {
        margin: 20,
        marginTop: 0,
        padding: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        flexDirection: 'row'
    },
    table: {
        padding: '20px',
        marginLeft: 20,
        width: '90vh'
    },
    input: {
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    formControlLast: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    button: {
        // marginTop: 20
        marginTop: 10,
        marginBottom: 10,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, countryName, theme) {
    return {
        fontWeight:
            countryName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function valuetext(value) {
    return `${value}`;
}

export default function Collection({ userLocation }) {
    const classes = useStyles();
    const theme = useTheme();
    const [filterCountries, setCountries] = useState(countries)
    const [payment, setPayment] = useState(false)
    const [filter, setFilter] = useState({
        dayRange: [-30, 180],
        country: [],
        UID: moment().format('YYYY-MM-DD')
    });
    const [data, setData] = useState([])
    let reportingService = new ReportingService()
    let paymentService = new PaymentService()

    const togglePaymentOption = (data) => {
        setPayment(!payment)
        setData(data)
    }
    const paymentReceiver = (payment) => {
        paymentService.newPayment(payment)
            .then(() => {
                setPayment(false)
                searchCollection()
            })
    }

    const handleRangeChange = (event, newValue) => {
        setFilter({ ...filter, dayRange: newValue });
    };

    const handleCountryChange = (event) => {
        setFilter({ ...filter, country: event.target.value });
    };

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value })
    }

    const searchCollection = () => {
        reportingService.getFilterCollection(filter)
            .then(response => setData(response))
    }

    useEffect(() => {

        const setCountryOptions = () => {
            try {
                let fc = countries
                if (userLocation !== 'GLOBAL') {
                    fc = countries.filter(e => {
                        return e.value === userLocation
                    })
                    setCountries(fc)
                }
            } catch (e) {
                console.log(e)
            }
        }

        const setInitialfilter = () => {
            try {
                if (filter.country.length === 0 && filterCountries) {
                    let initialCountries = countries.map(e => e.value)
                    let countryOne = initialCountries[0]
                    setFilter({ ...filter, country: [countryOne] })
                }
            } catch (e) {
                console.log(e)
            }
        }

        setCountryOptions()
        setInitialfilter()
    })

    return (
        <Grid container spacing={3}>
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
            <Grid item xs={12} md={12}>
                <Paper elevation={3} className={classes.root}>
                    <Grid item xs={12} md={12} className={classes.content}>
                        <Grid item xs={1} md={1} className={classes.input}>
                            <FormControl className={classes.formControl}>
                                <h1 id="range-slider">
                                    Filtros
                            </h1>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} className={classes.input}>
                            <FormControl className={classes.formControl}>
                                <div id="range-slider">
                                    <h1>País</h1>
                                </div>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={filter.country}
                                    onChange={handleCountryChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {filterCountries.map(e => (
                                        <MenuItem key={e.value} value={e.value} style={getStyles(e.value, filter.country, theme)}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} className={classes.input}>
                            <FormControl className={classes.formControlLast}>
                                <div id="range-slider" gutterBottom>
                                    <h1>Fecha máxima</h1>
                                </div>
                                <TextField
                                    id="date"
                                    type="date"
                                    name='UID'
                                    onChange={handleChange}
                                    className={classes.textField}
                                    value={new Date(filter.UID)
                                        .toISOString()
                                        .substring(0, 10)}
                                    InputProps={{
                                        inputProps: {
                                            max: new Date(moment().add(30, 'days').format("YYYY-MM-DD"))
                                                .toISOString()
                                                .substring(0, 10),
                                            min: new Date(moment().format("YYYY-MM-DD"))
                                                .toISOString()
                                                .substring(0, 10)
                                        }
                                    }}
                                    helperText="Fecha máxima del próximo vencimiento"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} className={classes.input}>
                            <FormControl className={classes.formControl}>
                                <div id="range-slider" gutterBottom>
                                    <h1>Rango de días de atraso</h1>
                                </div>
                                <Slider
                                    className='slider'
                                    value={filter.dayRange}
                                    name='dayRange'
                                    onChange={handleRangeChange}
                                    valueLabelDisplay="auto"
                                    step={15}
                                    max={365}
                                    min={-30}
                                    marks={[{
                                        value: 0,
                                        label: '0 días',
                                    }]}
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={1} md={1} className={classes.input}>
                        <Button className={classes.button} onClick={searchCollection} variant="outlined" color="primary">
                            Buscar
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} className={classes.rootTable} >
                <CollectionTable togglePaymentOption={togglePaymentOption} tableData={data} className="result-table" />
            </Grid>
        </Grid >
    )
}