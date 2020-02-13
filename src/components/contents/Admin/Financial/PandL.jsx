import React, { useState, useEffect } from 'react'
import ReportingService from '../../../../services/ReportingService'
import InvestorService from '../../../../services/InvestorService'
import _ from 'lodash'
import moment from 'moment'
import {
    location,
    totalConcepts,
    periodicityData
} from '../../../../../src/constants'
import { Grid, CardHeader, Divider, TextField, MenuItem, Button, CardContent, Card } from '@material-ui/core'


export default function PandL() {
    const [PandLData, setPandLData] = useState([]);
    const [holdingAccounts, setholdingAccounts] = useState([]);
    const [error, setError] = useState()
    const [query, setQuery] = useState({
        account: "",
        startDate: "",
        endDate: "",
        periodicity: ""
    })
    const reportingService = new ReportingService();
    const investorService = new InvestorService();



    const handleChange = (event, newValue) => {
        let { name, value } = event.target
        setQuery({
            ...query,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()


        const emptyProfile = _.values(query).every(_.isEmpty);
        if (!emptyProfile) {
            if (error) { setError(false) }
            const res = await reportingService.getPandL(query)
            let data = [Object.keys(res[0])]
            res.forEach(e => {
                data.push(Object.values(e))
            })
            return setPandLData(data.slice(0, 12));
        } else {
            setError(true)
        }

    }

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await investorService.getHoldingAccounts()
                return setholdingAccounts(res)
            } catch (error) {
                console.log(error)
            }
        }
        FetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ display: 'flex', width: '100%', padding: '30px' }}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <Card>
                        <form
                            autoComplete="off"
                            noValidate
                            onSubmit={handleFormSubmit}
                        >
                            <CardHeader
                                title="Estado de Ganancia y Perdida"
                                subheader="Reporte"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Cuenta"
                                            margin="dense"
                                            name="account"
                                            onChange={(e) => handleChange(e)}
                                            required
                                            select
                                            value={query.account}
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            {holdingAccounts.map((e, i) => {
                                                return <MenuItem key={i} style={{ boxSizing: 'border-box', height: '35px', padding: '0px 0px 0px 10px' }} value={e._id}>
                                                    {location[e.location]}
                                                </MenuItem>
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        xs={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Desde"
                                            margin="dense"
                                            name="startDate"
                                            type='date'
                                            onChange={(e) => handleChange(e)}
                                            required
                                            value={query.startDate}
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        xs={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Hasta"
                                            margin="dense"
                                            name="endDate"
                                            type='date'
                                            onChange={(e) => handleChange(e)}
                                            required
                                            value={query.endDate}
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Periodicidad"
                                            margin="dense"
                                            name="periodicity"
                                            required
                                            select
                                            onChange={(e) => handleChange(e)}
                                            value={query.periodicity}
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            {periodicityData.map((e, i) => {
                                                return <MenuItem key={i} style={{ boxSizing: 'border-box', height: '35px', padding: '0px 0px 0px 10px' }} value={e.value}>
                                                    {e.label}
                                                </MenuItem>
                                            })}

                                        </TextField>
                                    </Grid>
                                    <Grid
                                        style={{ display: 'flex' }}
                                        item
                                        md={2}
                                        xs={12}
                                    >
                                        <Button
                                            fullWidth
                                            style={{ margin: 'auto', height: '42px', marginTop: '6px' }}
                                            color="primary"
                                            variant="contained"
                                            type='submit'
                                        >
                                            Reporte
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            {
                                error ?
                                    <div class="alert alert-danger alert-dismissible" style={{ margin: '10px 15px' }} >
                                        <button href="#" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                                        <strong>Fallo!</strong> Debe de completar todos los campos
                                    </div> : ""
                            }
                            <Divider />
                            <CardContent style={{
                                display: 'flex'
                            }}>
                                {PandLData ? PandLData.map((e, i) => {
                                    return (i === 0 ?
                                        <div key={i} style={{ width: '300px', wordWrap: 'break-all' }}>
                                            {e.map((j, k) => {
                                                return totalConcepts.includes(j) ? <div key={k} style={{ fontWeight: 'bold', borderBottom: '1px solid black', margin: '5px 0px 5px 0px' }}>
                                                    {j}
                                                </div> : <div key={k}>
                                                        {j}
                                                    </div>
                                            })}
                                        </div> :
                                        <div key={i} style={{ width: '170px' }}>
                                            {e.map((j, k) => {
                                                let a = PandLData[0][k]
                                                return k > 0 && totalConcepts.includes(a) ?
                                                    <div key={k} style={{ fontWeight: 'bold', borderBottom: '1px solid black', margin: '5px 0px 5px 0px', textAlign: 'right' }}>{parseFloat(j).toFixed(2)}</div> :
                                                    k > 0 ? <div key={k} style={{ textAlign: 'right' }}>{parseFloat(j).toFixed(2)}</div> :
                                                        <div key={k} style={{ fontWeight: 'bold', borderBottom: '1px solid black', margin: '5px 0px 5px 0px', textAlign: 'right' }}>{moment(j).format('YYYY-MM-DD')}</div>
                                            })}
                                        </div>
                                    )
                                }) : ''}
                            </CardContent>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div >
    )

}