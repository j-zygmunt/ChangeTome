import React from 'react';
import {
    Paper,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';
import MyAdCard from '../../components/MyAdCard/MyAdCard';

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

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
            justify="center"
        >
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10}>
                <Typography variant="h4" style={{ fontWeight: 'bold', margin: '2rem 0 1rem 0' }}>
                    Your ads
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
            >
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
                <Grid
                    item xl={3} lg={4} md={4} sm={6} xs={12}
                >
                    <MyAdCard/>
                </Grid>
            </Grid>
            <Grid 
                container item
                justify="center" 
                xl={4} lg={5} md={5} sm={7} xs={10}
                style={{marginBottom: '1.5rem'}}
            >
                <Pagination count={4} color='secondary'/>
            </Grid>
        </Grid>
    )
}

export default YourAds;