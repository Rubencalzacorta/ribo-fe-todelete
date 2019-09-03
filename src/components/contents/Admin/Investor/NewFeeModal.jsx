
import React from 'react';
import { FormControl, Button, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import './acc-options.scss'



const NewFee = (props) => {
    let { feeReceivers, newPct, newManager, handleNewFee, saveNewFee } = props



    return (
        <div className="modal-fee">
            <h1>AGREGAR NUEVO GESTOR</h1>
            <FormControl className="fee-input-form">
                <div>
                    <TextField
                        select
                        label="Gestor"
                        className="management"
                        name="newManager"
                        value={newManager}
                        onChange={(e) => handleNewFee(e)}

                    >
                        {feeReceivers ? feeReceivers.map((e, i) =>

                            <MenuItem value={e._id} key={i}>{e.firstName + " " + e.lastName + " - " + e.location}</MenuItem>
                        ) : ""}
                    </TextField>
                </div>
                <div>
                    <TextField
                        className="fee"
                        label="Porcentaje"
                        value={newPct ? newPct : null}
                        onChange={(e) => handleNewFee(e)}
                        name="newPct"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </div>
                <Button disabled={!newPct || !newManager} variant="contained" color="primary" className='button-save' onClick={() => saveNewFee()}>
                    Agregar
                </Button>
            </FormControl>
        </div >
    )

}

export default NewFee;