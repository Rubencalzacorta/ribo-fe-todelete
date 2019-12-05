
import React from 'react';
import {
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    Divider,
    Typography,
    FormControl,
    Grid,
    Paper,
    Button
} from '@material-ui/core';

const RestructureForm = (props) => {
    let {
        onChangeRestructuring,
        loanRestructure,
        restructuringDetails
    } = props


    return (
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
                onChange={(e) => onChangeRestructuring(e)}
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
                onChange={(e) => onChangeRestructuring(e)}
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
                onChange={(e) => onChangeRestructuring(e)}
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
                    onChange={(e) => onChangeRestructuring(e)}


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
                    onChange={(e) => onChangeRestructuring(e)}
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
                    onChange={(e) => onChangeRestructuring(e)}
                    value={restructuringDetails.loanType}

                    name="loanType"

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
                onChange={(e) => onChangeRestructuring(e)}
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
                onChange={(e) => onChangeRestructuring(e)}
                value={restructuringDetails.paymentDate}
                margin="normal"
                name="paymentDate"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className='loan-delete'>
                <Button color="primary" variant="contained" onClick={() => loanRestructure()}>
                    reestructurar
                                                    </Button>
            </div>
        </Paper>
    )

}

export default RestructureForm;