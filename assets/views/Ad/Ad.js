import React from 'react';
import {
    Paper,
    Grid,
    Typography,
    Divider,
    makeStyles,
    IconButton,
    Box,
    Avatar,
    useMediaQuery,
    TextField,
    Button
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PhotoCarousel from '../../components/PhotoCarousel/PhotoCarousel';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
        paddingTop: '3rem'
    },
    boxWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: theme.palette.secondary.main
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    paper: {
        padding: '1.5rem',
        width: '100%'
    }
}));

function Ad() {
    const classes = useStyles();
    const [buttonContent, setButtonContent] = React.useState("My number");
    const mobile = useMediaQuery('(max-width:960px)');

    const handleSubmit = event => {
        
    }

    const handleClick = (text) => {
        buttonContent === 'My number' ? setButtonContent(text) : setButtonContent('My number');
    }

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            direction='row'
            alignContent="center"
            justify={'center'}
        >
            <Grid
                xl={5} lg={5} md={5} sm={10} xs={11}
                container item
                spacing={3}
                alignItems='center'
                justify='center'
                style={ mobile ? {marginBottom: '1rem'} : {marginRight: '1rem'}}
            >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <PhotoCarousel>

                        </PhotoCarousel>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" color="textSecondary" align="right">
                            date hh:mm
                        </Typography>
                        <Typography variant="h5" style={{ margin: '1rem 0' }}>
                            Title | Author
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <Typography 
                            align="center" 
                            variant="h4" 
                            color="secondary" 
                            style={{
                                fontWeight: 'bold',
                                margin: '1rem 0',
                            }}
                        >
                            5$
                        </Typography>
                        <Divider orientation='horizontal' className={classes.divider} />
                        <Box className={classes.boxWrapper}>
                            <Box style={{ marginTop: '1em' }}>
                                <Typography component="legend">Condition</Typography>
                                <Rating name="read-only" value={3} readOnly size="small"/>
                            </Box>
                            <IconButton color="secondary">
                                <FavoriteBorderIcon/>
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
                <Grid
                    xs={12}
                    container item
                    alignItems='center'
                    justify='center'
                    component='form'
                >
                    <Paper className={classes.paper}>
                        <Typography variant="h6" paragraph>
                            Leave me a message
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            required
                            color="secondary"
                        />
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                            style={{ marginTop: '1.5rem' }}
                        >
                            Send
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                xl={3} lg={3} md={4} sm={10} xs={11}
                container item
                alignItems='flex-start'
                justify="center"
                spacing={3}
            >
                <Grid
                    xs={12}
                    container item
                    alignItems='center'
                    justify='center'
                >
                    <Paper className={classes.paper}>
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                        >
                            <NavLink to="/404" className={classes.link}>
                                <Avatar>NS</Avatar>
                            </NavLink>
                            <Box style={{ marginLeft: '1rem' }}>
                                <NavLink to="/404" className={classes.link}>
                                    <Typography variant="h6">
                                        Name | Surname
                                    </Typography>
                                </NavLink>
                                <Typography variant="body2" color="textSecondary">
                                    Last seen: dd:mm:rrrr
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.boxWrapper}>
                            <Box>
                                <Rating name="read-only" value={3} readOnly size="small"/>
                                <Typography>City, Country</Typography>
                            </Box>
                            <Box style={{ width: '50%'}}>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    size='large'
                                    onClick={()=>handleClick('997998999')}
                                    fullWidth
                                >
                                    {buttonContent}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Ad;