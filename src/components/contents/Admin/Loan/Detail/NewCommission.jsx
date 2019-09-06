
import React from 'react';
import { FormControl, Button, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import './commissions.scss'



const NewCommission = (props) => {
    let { salesmen,
        newPct,
        newSalesman,
        handleNewCommission,
        saveNewCommission
    } = props



    return (
        <div className="modal-fee">
            <h1 className="modal-title">AGREGAR NUEVA COMISIÓN</h1>
            <FormControl className="fee-input-form">
                <div>
                    <TextField
                        select
                        label="Comisionista"
                        className="management"
                        name="newSalesman"
                        value={newSalesman}
                        onChange={(e) => handleNewCommission(e)}
                    >
                        {salesmen.length > 0 ? salesmen.map((e, i) =>
                            <MenuItem value={e._id} key={i}>{e.firstName + " " + e.lastName + " - " + e.location}</MenuItem>
                        ) : ""}
                    </TextField>
                </div>
                <div>
                    <TextField
                        className="fee"
                        label="Porcentaje"
                        value={newPct ? newPct : null}
                        onChange={(e) => handleNewCommission(e)}
                        name="newPct"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </div>
                <Button disabled={!newPct || !newSalesman} variant="contained" color="primary" className='button-save' onClick={() => saveNewCommission()}>
                    Agregar
                </Button>
            </FormControl>
        </div >
    )

}

export default NewCommission;