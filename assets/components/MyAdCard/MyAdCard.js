import React from 'react';
import {
    Typography,
    Button,
    makeStyles,
    Box,
    Card,
    Divider,
    CardContent,
    CardMedia,
    CardActions
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    rating: {
        color: theme.palette.secondary.main,
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
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
    },
}));

function MyAdCard(props) {
    const classes = useStyles();
    
    return (
        <Card style={{ width: '100%', padding: '1em', marginBottom: '1rem', flexDirection: 'row' }}>
            <NavLink to="/ad" className={classes.link}>
                <CardMedia className={classes.media} image={require('../../img/book.jpg')} />
                <CardContent style={{ padding: '1em 0 0 0' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title | Author
                    </Typography>
                    <Box className={classes.infoWrapper}>
                        <Box>
                            <Typography component="legend">Condition</Typography>
                            <Rating name="read-only" value={3} readOnly size="small" />
                        </Box>
                        <Typography>
                            5$
                        </Typography>
                    </Box>
                    <Divider orientation='horizontal' className={classes.divider} />
                </CardContent>
            </NavLink>
            <CardActions style={{ padding: '0.5em 0 0 0', justifyContent: 'space-between' }}>
                <Button
                    style={{ width: '40%' }}
                    variant="contained"
                    color="secondary"
                    startIcon={<SettingsIcon />}
                >
                    Edit
                </Button>
                <Button
                    style={{ width: '40%' }}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default MyAdCard