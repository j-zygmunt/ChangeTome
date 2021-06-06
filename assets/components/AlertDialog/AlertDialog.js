import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import {useHistory} from "react-router-dom";

function AlertDialog(props) {
    const history = useHistory();

    const handleClose = () => {
        props.setIsOpened(false);
        console.log(typeof props.redirect !== 'undefined')
        if(typeof props.redirect !== 'undefined') {
            console.log(props.redirect);
            history.push(props.redirect);
        }
    }
    console.log(typeof props.redirect !== 'undefined')
    return (
        <Dialog
            open={props.isOpened}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant='contained' autoFocus>
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;