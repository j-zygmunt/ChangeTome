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
    makeStyles
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import { NavLink } from 'react-router-dom';
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
    infoWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            <NavLink to="/ad" className={classes.link}>
                <CardMedia className={classes.media} image={require('../../img/book.jpg')}/>
                <CardContent style={{padding: '1em 0 0 0'}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title | Author
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="right">
                        City - date hh:mm
                    </Typography>
                    <Box className={classes.infoWrapper}>
                        <Box>
                            <Typography component="legend">Condition</Typography>
                            <Rating name="read-only" value={3} readOnly size="small"/>
                        </Box>
                        <Typography>
                            5$
                        </Typography>
                    </Box>
                    <Divider orientation='horizontal' className={classes.divider} />
                </CardContent>
            </NavLink>
            <CardActions style={{padding: '0.5em 0 0 0'}}>
                <IconButton color="secondary">
                    <FavoriteBorderIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default AdCard;