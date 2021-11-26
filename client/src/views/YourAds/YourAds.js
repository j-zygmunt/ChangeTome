import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Paper, Typography,} from '@material-ui/core';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AdCard from '../../components/AdCard/AdCard';

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

function YourAds() {
    const classes = useStyles();
    const [myAds, setMyAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/getUsersAds',
            {
                params: {
                    email: jwtDecode(localStorage.getItem('token')).email
                }
            })
            .then(response => setMyAds(response.data))
    }, []);

    console.log(myAds);

    return (
        <Grid container component="main" className={classes.root} alignItems="flex-start" justify="center" >
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10} >
                <Typography variant="h4" style={{fontWeight: 'bold', margin: '2rem 0 1rem 0'}} >
                    Your ads
                </Typography>
            </Grid>
            {
                myAds.length !== 0 &&
                <Grid
                    container item
                    className={classes.paper}
                    component={Paper}
                    alignItems="center"
                    justify="flex-start"
                    spacing={3}
                    xl={8} lg={8} md={9} sm={10} xs={10}
                >
                    {
                        myAds.map((item) => {
                            return (
                                <Grid item key={item.id} xl={3} lg={4} md={4} sm={6} xs={12} >
                                    <AdCard item={item} isOwner={true} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            }
        </Grid>
    )
}

export default YourAds;