import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    root: {
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        width: '100%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


export default function CustomizedDialogs({ children, toggle, open, submitTitle, title }) {

    return (
        <Dialog onClose={toggle} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title"
                onClose={toggle}
            >
                {title}
            </DialogTitle>
            {children}
        </Dialog>
    );
}