import React from 'react';
import { 
    makeStyles,
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import BookCard from '../BookCard/BookCard'


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

function BookCardsHolder(props) {
    const classes = useStyles();

    return(
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.holder}
            xs={12}
            spacing={3}
        >
            <Grid
                item container
                justify='space-between'
            >
                <Typography>
                    {props.name}
                </Typography>
                <NavLink
                    to="/404"
                >
                    <Button
                        variant='contained'
                        color='secondary'
                        style={{
                            padding: '2px 0'
                        }}
                    >
                        More
                    </Button>
                </NavLink>
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>
            <Grid
                item
                xl={2} lg={2} md={4} sm={4} xs={12}
            >
                <BookCard />
            </Grid>

            <Divider orientation='horizontal' className={classes.divider} />
        </Grid>
    )
}

export default BookCardsHolder;