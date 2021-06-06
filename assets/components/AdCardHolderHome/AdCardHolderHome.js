import React from 'react';
import {
    makeStyles,
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import AdCard from '../AdCard/AdCard';


const useStyles = makeStyles((theme) => ({
    holder: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: theme.palette.secondary.main
    }
}));

function AdCardHolderHome(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {

        history.push({
            pathname: '/search',
            state: {phase: props.more}
        })
    }

    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.holder}
            spacing={2}
        >
            <Grid item container justify='space-between'>
                <Typography>
                    {props.name}
                </Typography>
                <Button
                    variant='contained'
                    color='secondary'
                    style={{padding: '2px 0'}}
                    onClick={handleClick}
                >
                    More
                </Button>
            </Grid>
            {
                props.lastestAds.map((item) => {
                    return (
                        <Grid
                            key={item.id}
                            item
                            xl={2} lg={2} md={4} sm={4} xs={12}
                        >
                            <AdCard item={item}/>
                        </Grid>
                    )
                })
            }
            <Divider orientation='horizontal' className={classes.divider} />
        </Grid>
    );
}

export default AdCardHolderHome;