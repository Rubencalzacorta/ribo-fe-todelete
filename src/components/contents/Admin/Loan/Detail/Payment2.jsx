import React, { useState, useEffect } from 'react'
import LoanService from '../../../../../services/LoanService'
import useWindowWidth from '../../../../../hooks/useWindowWidth'
import Modal from '../../../../Modal/Modal'
import { ClipLoader } from "react-spinners";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 550,
        padding: 20,
        minWidth: 300,
        marginTop: 20
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        marginTop: 20
    }
    // margin: {
    //     maxWidth: 150,
    // },
    // textField: {
    //     marginLeft: theme.spacing(1),
    //     marginRight: theme.spacing(1),
    //     width: 200,
    // },
}));

const PaymentProcessor = (props) => {
    const classes = useStyles();
    const [payment, setPayment] = useState(false)
    const loanService = new LoanService()

    const [values, setValues] = React.useState({
        amount: '',
        date: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        loanService.getInstallment(props.installment._id)
            .then(response => {
                console.log(response)
                setPayment(response)
            })
    }, [])
    return (
        <div className={classes.root}>
            <Typography variant="subtitle1">Insertar detalles de pago</Typography>
            {payment ?
                <Grid className={classes.content} container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Monto</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={payment.interest + payment.principal - payment.interest_pmt - payment.principal_pmt}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">{payment.currency}</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="date"
                                label="Fecha de pago"
                                type="date"
                                defaultValue="2017-05-24"
                                // className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Cuenta</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={'RBPERU'}
                                onChange={handleChange('account')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Referencia</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={0}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">#</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="standard-multiline-static"
                                label="Comentario"
                                multiline
                                rows="2"
                                defaultValue=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid className={classes.buttons} item xs={12} md={12}>
                        <Button>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary">
                            Procesar pago
                        </Button>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={3}>
                    <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={!payment}
                    />
                </Grid>
            }

        </div >
    )
}

export default PaymentProcessor