import React from 'react';
import {Grid, makeStyles, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        width: '100%',
        marginBottom: '2rem',
        padding: '1.5rem',
    },
    rating: {
        color: theme.palette.secondary.main,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
    },
    media: {
        height: 200,
    },
    infoWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

function Messages() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root} alignItems="flex-start" justify="center" >
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10} >
                <Typography variant="h4" style={{fontWeight: 'bold', margin: '2rem 0 1rem 0'}} >
                    Messages
                </Typography>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems="center"
                justify="flex-start"
                spacing={3}
                xl={8} lg={8} md={9} sm={10} xs={10}
            />
        </Grid>
    )
}

export default Messages;