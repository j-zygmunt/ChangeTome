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
    CardActionArea,
    TextField,
    Button
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { NavLink } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
        paddingTop: '3rem'
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    },
    wrapper: {
        height: '500px',
    },
    carousel: {
        width: '100%'
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
    field: {
        '& label.Mui-focused': {
          color: 'green',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.secondary.main,
          },
          '&:hover fieldset': {
            borderColor: 'yellow',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'green',
          },
        },
    },
    button: {
        marginTop: '1.5rem'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

function Ad() {
    const classes = useStyles();

    const [buttonContent, setButtonContent] = React.useState("My number")

    const handleSubmit = event => {
        
    }

    const handleClick = (text) => {
        buttonContent === 'My number' ? setButtonContent(text) : setButtonContent('My number')
    }

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            direction='column'
            alignContent="center"
        >
            <Grid
                xs={5}
                container item
                spacing={3}
                alignItems='center'
                justify='center'
                style={{marginRight: '1rem'}}
            >
                <Grid
                    item xs={12}    
                >
                    <Paper
                        style={{padding: '1.5rem', width: '100%'}}
                    >
                        <Carousel
                            className={classes.carousel}
                            autoPlay={false}
                            fullHeightHover={false} 
                            indicatorIconButtonProps={{
                                style: {
                                    padding: '0',
                                    marginTop: '-60px',
                                    color: '#dddddd'
                                }
                            }}
                            indicatorContainerProps={{
                                style: {
                                    marginTop: '-20px'
                                }
                            }}
                            NextIcon={<NavigateNextIcon fontSize="large"/>}
                            PrevIcon={<NavigateBeforeIcon fontSize="large"/>}
                            IndicatorIcon={<FiberManualRecordIcon/>}
                            activeIndicatorIconButtonProps={{
                                style: {
                                    color: '#555555aa'
                                }
                            }}
                            navButtonsProps={{          
                                style: {
                                    color: '#222222',
                                    backgroundColor: '#999999aa',
                                    borderRadius: 5,
                                    padding: 0
                                }
                            }}
                            navButtonsAlwaysVisible={true} 
                        >
                            <Grid item xs={12} className={classes.wrapper}>
                                <img src="../../img/bookshelf.jpg" className={classes.image} />
                            </Grid>
                            <Grid item xs={12} className={classes.wrapper}>
                                <img src={require("../../img/book.jpg")} className={classes.image} />
                            </Grid>
                            <Grid item xs={12} className={classes.wrapper}>
                                <img src={require("../../img/2.jpg")} className={classes.image} />
                            </Grid>
                            <Grid item xs={12} className={classes.wrapper}>
                                <img src="../../img/bookshelf.jpg" className={classes.image} />
                            </Grid>
                        </Carousel>
                    </Paper>
                </Grid>
                <Grid
                    xs={12}
                    container item
                    alignItems='center'
                    justify='center'
                >
                    <Paper style={{padding: '1.5rem', width: '100%'}}>
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
                            className={classes.button} 
                        >
                            Send
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                xs={4}
                container item
                alignItems='center'
                justify='center'
                spacing={3}
                component='form'
            >
                <Grid
                    item xs={12}
                >
                    <Paper style={{padding: '1.5rem', width: '100%'}}>
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
                >
                    <Paper
                        style={{padding: '1.5rem', width: '100%'}}
                    >
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