import React, {useEffect} from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import AdCard from "../../components/AdCard/AdCard";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
}));

function ManageProfile() {
    const classes = useStyles();

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/user/getUsersAds',
    //         {
    //             params: {
    //                 email: jwtDecode(localStorage.getItem('token')).email
    //             }
    //         })
    //         .then(response => setMyAds(response.data))
    // }, []);

    return (
        <Grid container component="main" className={classes.root} alignItems="flex-start" justify="center" >
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10} >
                <Typography variant="h4" style={{fontWeight: 'bold', margin: '2rem 0 1rem 0'}} >
                    Manage your profile
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ManageProfile;