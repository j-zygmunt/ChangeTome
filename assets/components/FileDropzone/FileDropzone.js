import React, { useRef, useState } from "react";
import {
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    Input,
    IconButton,
} from '@material-ui/core';
import { useDropzone } from "react-dropzone";


const useStyles = makeStyles((theme) => ({
    dnd: {
        height: '200px',
        width: '50%',
        padding: '4em',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]:{
            padding: '2em'
        },
    },
    dndActive: {
        backgroundColor: '#000000'
    }
}));

function FileDropzone(props) {
    const classes = useStyles();

    const { getRootProps, getInputProps, isDragActive } = useDropzone( props.onDrop );

    return (
        <Grid 
            container
            component={Paper}
            alignItems="center"
            justify="center"
            className={isDragActive ? classes.dndActive + ' ' + classes.dnd : classes.dnd}
            {...getRootProps()}
        >
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                    <p className="dropzone-content">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
        </Grid>
    );
}

export default FileDropzone;