import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

function AlertDialog(props) {

    const handleClose = () => {
        props.setIsOpened(false);
    }

    return (
        <Dialog
            open={props.isOpened}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color='secondary' variant='contained' autoFocus>
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;