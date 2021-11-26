import React, {useState} from 'react';
import {Avatar, Box, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {deepOrange} from '@material-ui/core/colors';
import Rating from "@material-ui/lab/Rating";

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
    orange: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

function Profile() {
    const classes = useStyles();
    const [user, setUser] = useState('');

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
        <Grid container component="main" className={classes.root} alignItems="flex-start" justify="center">
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10}>
                <Typography variant="h4" style={{fontWeight: 'bold', margin: '2rem 0 1rem 0'}}>
                    {} profile
                </Typography>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems='center'
                justify='flex-start'
                spacing={1}
                xl={8} lg={8} md={9} sm={10} xs={10}
            >
                <Grid container justify='center' alignItems='center' xs={4}>
                    <Avatar alt="Remy Sharp" src="/broken-image.jpg" variant="rounded" className={classes.orange}>
                        B
                    </Avatar>
                </Grid>
                <Grid xs={8}>
                    <Grid xs={12}>
                        <Typography variant='h5' style={{fontWeight: 'bold'}}>
                            email: {/*{content.creator.email}*/}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant='h5' style={{fontWeight: 'bold'}}>
                            phone: {/*{content.creator.email}*/}
                        </Typography>
                    </Grid>
                    <Box>
                        <Rating name='read-only' value={3} readOnly size='small' />
                        <Typography>
                            City, Country
                        </Typography>
                    </Box>
                </Grid>
                {
                    // myAds.length !== 0 &&
                    <Grid
                        container item
                        alignItems="center"
                        justify="flex-start"
                        spacing={3}
                        xl={8} lg={8} md={9} sm={10} xs={10}
                    >
                        {
                            // myAds.map((item) => {
                            //     return (
                            //         <Grid item key={item.id} xl={3} lg={4} md={4} sm={6} xs={12} >
                            //             <AdCard item={item} isOwner={true} />
                            //         </Grid>
                            //     )
                            // })
                        }
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

export default Profile;