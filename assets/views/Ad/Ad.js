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
    Button,
} from '@material-ui/core';
import {NavLink, useParams, withRouter} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PhotoCarousel from '../../components/PhotoCarousel/PhotoCarousel';
import axios from 'axios';

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

function Ad(props) {
    const classes = useStyles();
    const { id } = useParams();
    const [buttonContent, setButtonContent] = React.useState("My number");
    const [isLoading, setIsLoading] = React.useState(true);
    const [content, setContent] = React.useState({});
    const [message, setMessage] = React.useState("");
    const [userRating, setUserRating] = React.useState(0);
    const mobile = useMediaQuery('(max-width:960px)');

    const handleSubmit = event => {
        
    }

    const handleClick = (text) => {
        buttonContent === 'My number' ? setButtonContent(text) : setButtonContent('My number');
    }

    React.useEffect(() => {
        axios.get("/api/getAd", {params: {id: id}})
            .then(response => setContent(response.data))
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
    }, [id]);

    console.log(content, content.condition);

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
                        {!isLoading &&
                        <PhotoCarousel photos={content.photos}>
                        </PhotoCarousel>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" color="textSecondary" align="right">
                            {content.createdAt}
                        </Typography>
                        <Typography variant="h5" style={{ margin: '1rem 0' }}>
                            {content.title} | {content.author}
                        </Typography>
                        <Typography>
                            {content.description}
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
                            {content.price}$
                        </Typography>
                        <Divider orientation='horizontal' className={classes.divider} />
                        <Box className={classes.boxWrapper}>
                            <Box style={{ marginTop: '1em' }}>
                                <Typography component="legend">Condition</Typography>
                                {!isLoading&&
                                <Rating name="read-only" value={content.condition} readOnly precision={0.5} size="small"/>
                                }
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
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            inputProps={{
                                maxLength: 100,
                            }}
                            helperText={`${message.length}/${100}`}
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
                    {!isLoading &&
                    <Paper className={classes.paper}>
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                        >
                            <NavLink to="/404" className={classes.link}>
                                <Avatar alt={content.creator.name}></Avatar>
                            </NavLink>
                            <Box style={{ marginLeft: '1rem' }}>
                                <NavLink to="/404" className={classes.link}>
                                    <Typography variant="h6">
                                        {content.creator.name} | {content.creator.surname}
                                    </Typography>
                                </NavLink>
                                <Typography variant="body2" color="textSecondary">
                                    eamil: {content.creator.email}
                                </Typography>
                                {/* <Typography variant="body2" color="textSecondary">
                                    Last seen: dd:mm:rrrr
                                </Typography> */}
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
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Ad;