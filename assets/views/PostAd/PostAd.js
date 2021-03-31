import React, { useEffect } from 'react';
import {
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';


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
            padding: '2em'
        },
    },
}));

function PostAd() {
    const classes = useStyles();


    React.useEffect(() => {
        fetch("/api/users")
        .then(user => console.log(user))

    });

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
            justify="center"
    
        >
            <Grid
                item
                xl={8} lg={8} md={8} sm={8} xs={10}
            >
                <Typography align="left" variant="h4" style={{fontWeight: 'bold', marginTop: '2em'}}>
                    Post your offer!
                </Typography>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems="center"
                justify="center"
                xl={8} lg={8} md={8} sm={8} xs={10}
            >
                <Grid
                    item
                    xs={12}
                >
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <NavLink
                        to="/home"
                    >
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                        >
                            Add
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PostAd;