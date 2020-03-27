
import React, { useState } from 'react';
import { Button, MenuItem, TextField, Paper } from '@material-ui/core';
import './collateral.scss'
import constants from './constants'

const AddCollateral = (props) => {
    const [collateral, setCollateral] = useState(constants.initialCollateralState)
    const [hidden, setHidden] = useState(true)



    const setDetails = e => {
        let { name, value } = e.target
        console.log(value, constants.vehicleCollateralTypes.indexOf(value))
        if (name === 'status' || name === 'date') {
            setCollateral({ ...collateral, currentStatus: { ...collateral.currentStatus, [name]: value } })
        } else {
            setCollateral({ ...collateral, [name]: value })
        }

        if (constants.vehicleCollateralTypes.indexOf(collateral.type) !== -1) {
            setHidden(false)
        } else {
            setHidden(true)
        }

    }

    return (
        <Paper className="modal-col">
            <div >
                <h2 className='modal-title'>Datos básicos del colateral:</h2>
                {constants.basicCollateral.map(e => {
                    return (
                        <TextField
                            id={`standard-${e.name}`}
                            select={e.select ? true : false}
                            label={e.label}
                            name={e.name}
                            type={e.type}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={e.type === 'text' ? 'textField' : 'textField'}
                            value={(e.name === 'status' || e.name === 'date') ?
                                collateral.currentStatus[e.name] : collateral[e.name]
                            }
                            onChange={(e) => setDetails(e)}
                            margin="normal"
                        >
                            {e.select && e.name === 'type' ?
                                constants.collateralTypes.map(e => {
                                    return (
                                        <MenuItem key={e.value} value={e.value}>
                                            {e.label}
                                        </MenuItem>)
                                }) : null}
                            {e.select && e.name === 'status' ?
                                constants.currentStatus.map(e => {
                                    return (
                                        <MenuItem key={e.value} value={e.value}>
                                            {e.label}
                                        </MenuItem>)
                                }) : null}
                        </TextField>
                    )
                })}
                <h2 className='modal-title'>Detalles del Colateral</h2>
                {constants.vehicleConstants.map(e => {
                    return (
                        <TextField
                            id={`standard-${e.name}`}
                            select={e.select ? true : false}
                            disabled={hidden}
                            label={e.label}
                            name={e.name}
                            type={e.type}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={e.type === 'text' ? 'textField' : 'textField'}
                            value={(e.name === 'status' || e.name === 'date') ?
                                collateral.currentStatus[e.name] : collateral[e.name]
                            }
                            onChange={(e) => setDetails(e)}
                            margin="normal"
                        >
                            {e.select && e.name === 'type' ?
                                constants.collateralTypes.map(e => {
                                    return (
                                        <MenuItem key={e.value} value={e.value}>
                                            {e.label}
                                        </MenuItem>)
                                }) : null}
                            {e.select && e.name === 'status' ?
                                constants.currentStatus.map(e => {
                                    return (
                                        <MenuItem key={e.value} value={e.value}>
                                            {e.label}
                                        </MenuItem>)
                                }) : null}
                        </TextField>
                    )
                })}
                <br />
                <br />
                <div className="optionHolder">
                    <Button variant="contained" color="primary" onClick={() => props.addCollateral(collateral)}>
                        Agregar
                    </Button>
                </div>

            </div>
        </Paper>
    )

}

export default AddCollateral;