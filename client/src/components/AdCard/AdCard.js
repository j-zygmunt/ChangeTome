import React from 'react';
import {
    IconButton,
    Divider,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    CardActions,
    makeStyles,
    Button
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import {NavLink} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
    },
    media: {
        height: 200,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

function AdCard(props) {
    const classes = useStyles();

    return (
        <Card style={{width: '100%', padding: '1em'}}>
            <NavLink to={`/ad/${props.item.id}`} className={classes.link}>
                <CardMedia className={classes.media} image={
                    typeof props.item.photos[0] === 'undefined'
                    ? require('../../img/NoImage.png')
                    : require(`./client/public/uploads/${props.item.photos[0].name}`)}
                />
                <CardContent style={{padding: '1em 0 0 0'}}>
                    <Typography gutterBottom variant='h6'>
                        {props.item.title} | {props.item.author}
                    </Typography>
                    <Box className={classes.wrapper}>
                        <Box>
                            <Typography component='legend'>Condition</Typography>
                            <Rating name='read-only' value={props.item.condition} readOnly size='small'/>
                        </Box>
                        <Typography>
                            {props.item.price}$
                        </Typography>
                    </Box>
                    <Divider orientation='horizontal' className={classes.divider} />
                </CardContent>
            </NavLink>
            {
                props.isOwner === true
                ?   <CardActions style={{padding: '0.5em 0 0 0', justifyContent: 'space-between'}}>
                        <Button
                            style={{width: '40%'}}
                            variant='contained'
                            color='secondary'
                            startIcon={<SettingsIcon/>}
                        >
                            Edit
                        </Button>
                        <Button
                            style={{width: '40%'}}
                            variant='contained'
                            color='secondary'
                            startIcon={<DeleteIcon/>}
                        >
                            Delete
                        </Button>
                    </CardActions>
                : < CardActions className={classes.wrapper}>
                        <IconButton color='secondary'>
                            <FavoriteBorderIcon/>
                        </IconButton>
                        <Box>
                            <Typography variant='caption' color='textSecondary' align='right' component='p' style={{marginLeft: 'auto'}}>
                                city
                            </Typography>
                            <Typography variant='caption' color='textSecondary' align='right' component='p' style={{margin: '0 0 0 auto'}}>
                                {props.item.createdAt}
                            </Typography>
                        </Box> 
                    </CardActions>
            }
        </Card>
    );
}

export default AdCard;