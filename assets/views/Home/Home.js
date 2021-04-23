import React from 'react';
import {
    makeStyles,
    Grid,
    Paper,
    Button,
    Typography,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import AdCardHolderHome from '../../components/AdCardHolderHome/AdCardHolderHome';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    }, 
    image: {
        backgroundImage: 'url("../../img/bookshelf.jpg")',
        height: '280px',
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: theme.spacing(4),
    },
    banner: {
        backgroundColor: theme.palette.background.default,
    },
}));

function Home() {
    const classes = useStyles();

    React.useEffect(() => {
        fetch("/api/getUser")
        .then(response => response.json())
        .then(data => console.log(data));

    }, []);

    return(
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
            justify="center"
        >
            <Grid item xl={4} lg={5} md={5} sm={7} xs={10}>
                <SearchBar />
            </Grid>
            <Grid
                container item
                className={classes.image}
                alignItems="center"
                justify="center"
                xs={12}
            >
                <Grid
                    container item
                    elevation={2}
                    component={Paper}
                    alignItems="center"
                    justify="center"
                    square
                    className={classes.banner}
                    xl={5} lg={5} md={6} sm={7} xs={10}
                >
                    <Grid item xs={12} >
                        <Typography
                            variant='h4'
                            style={{
                                fontWeight: 'bold',
                                marginTop: '2rem',
                                marginBottom: '1rem'
                            }}
                            align='center'
                        >
                            Get rid of unwanted books now
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} justify='center'>
                        <NavLink to="post-ad" style={{ margin: 'auto' }}>
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{
                                    marginBottom: '2rem',
                                    fontSize: '2em',
                                    padding: '0 2em'
                                }}
                            >
                                Start exchanging
                            </Button>
                        </NavLink>
                    </Grid>
                </Grid> 
            </Grid>
                <AdCardHolderHome name="Lastest"/>           
                <AdCardHolderHome name="Popular"/>           
        </Grid>
    );
}

export default Home;