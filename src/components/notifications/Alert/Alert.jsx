import React, { useState, useEffect } from 'react';
import {
    Grid
} from '@material-ui/core';

export default function Alert(props) {
    let { status, resetStatus } = props

    return (
        <React.Fragment>
            {
                status === 'success' ?
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <div className="alert alert-success alert-dismissible">
                            <button href="#" className="close" onClick={(e) => { resetStatus(e) }} data-dismiss="alert" aria-label="close">&times;</button>
                            <strong>Exito!</strong> La solicitud se ha procesado correctamente.
                            </div>
                    </Grid>
                    : status === 'failure' ?
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <div className="alert alert-danger alert-dismissible">
                                <button href="#" className="close" data-dismiss="alert" aria-label="close" onClick={(e) => { resetStatus(e) }}>&times;</button>
                                <strong>Fallo!</strong> La solicitud no se ha procesado correctamente
                            </div>
                        </Grid> : ""
            }
        </React.Fragment>
    )
}