import React, { useState, useEffect } from 'react'
import LoanService from '../../services/LoanService'
import Button from '@material-ui/core/Button';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { ClipLoader } from "react-spinners";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 550,
        padding: 20,
        paddingTop: 0,
        width: '100%',
        minHeight: 300,
    },
    actions: {
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(1),
    }
}));

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



const CommentModal = ({ toggle, submitTitle, ...props }) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        comment: '',
        estimateDate: moment()
    })

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    }

    return (
        <div className={classes.root} >
            <DialogContent dividers>
                <Grid className={classes.content} container spacing={3}>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="date"
                                required={true}
                                label="Fecha estimada de pago"
                                type="date"
                                name="estimateDate"
                                onChange={handleChange('estimateDate')}
                                value={new Date(values.estimateDate)
                                    .toISOString()
                                    .substring(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Monto</InputLabel>
                            <Input
                                required={true}
                                id="standard-adornment-amount"
                                value={values.amount}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">{values.currency}</InputAdornment>}
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
                                value={values.comment}
                                onChange={handleChange('comment')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid className={classes.actions} item xs={12} md={12}>
                    <Button
                        onClick={toggle}
                    >
                        Cancelar
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                    // disabled={(loading || !enabled) ? true : false}
                    // onClick={() => {
                    //     setLoading(true)
                    //     props.receivePayment(values)
                    // }}
                    >
                        {/* {loading ?
                            <ClipLoader
                                size={10}
                                color='white'
                                loading={!payment}
                            /> : submitTitle} */}
                    </Button>
                </Grid>
            </DialogActions>
            {/* : */}
            {/* <Grid container className={classes.root} spacing={3} >
                <ClipLoader
                    size={50}
                    color={"#123abc"}
                    loading={!payment}
                />
            </Grid > */}
        </div >
    )
}

export default CommentModal