import React from 'react';
import {Paper, Grid, Typography, Button, makeStyles} from '@material-ui/core';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        width: '100%',
        padding: '4em',
        [theme.breakpoints.down('sm')]:{
            padding: '2em',
        },
    },
    error: {
        fontWeight: "bold",
        fontSize: '12rem',
        [theme.breakpoints.down('sm')]:{
            fontSize: '8rem',
        },
    },
    message: {
        fontSize: '1.4rem',
        [theme.breakpoints.down('md')]:{
            fontSize: '1.2rem',
        },
        [theme.breakpoints.down('sm')]:{
            fontSize: '1rem',
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '0.8rem',
        },
    },
}));

function Error() {
    const classes = useStyles();

    return(
        <Grid container component='main' className={classes.root} alignItems='center' justify='center' >
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems='center'
                justify='center'
                xl={5} lg={6} md={7} sm={8} xs={10}
            >
                <Grid item xs={12} >
                    <Typography align='center' className={classes.error} >
                        4
                        <Typography component={'span'} color='secondary' className={classes.error} >
                            0
                        </Typography>
                        4
                    </Typography>
                    <Typography align='center' className={classes.message} >
                        THE PAGE YOU REQUESTED COULD NOT BE FOUND
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <NavLink to='/home' >
                        <Button fullWidth type='submit' variant='contained' color='secondary' size='large' >
                            GO TO HOMEPAGE
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Error;