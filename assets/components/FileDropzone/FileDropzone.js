import React from "react";
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles((theme) => ({
    dnd: {
        height: '150px',
        width: '100%',
        padding: '1em',
        backgroundColor: theme.palette.background.default,
        border: '5px dashed',
        cursor: 'pointer',
        borderColor: theme.palette.secondary.main,
    },
    dndActive: {
        border: '5px solid',
        borderColor: theme.palette.secondary.main,
    }
}));

function FileDropzone({ onDrop }) {
    const classes = useStyles();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

    return (
        <Grid
            container
            alignItems="center"
            justify="center"
            className={isDragActive ? classes.dndActive + ' ' + classes.dnd : classes.dnd}
            {...getRootProps()}
        >
            <input className="dropzone-input" {...getInputProps()} />
            <div style={{textAlign: 'center'}}>
                {isDragActive ? (
                    <Typography variant='body1'>Release to upload the files</Typography>
                ) : (
                    <div>
                        <Typography variant='body1'>Drag your images or click</Typography>
                        <Typography variant='caption' color='secondary'>(Only .jpeg and .png)</Typography>
                    </div>
                )}
            </div>
        </Grid>
    );
}

export default FileDropzone;