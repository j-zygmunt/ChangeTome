import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink, withRouter} from 'react-router-dom';
import LoginHeader from '../LoginHeader/LoginHeader'


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    default: {
        minHeight: 64,
    }
}));

function Header(props) {
    const classes = useStyles();

    if (props.location.pathname.toUpperCase() == "/SIGNUP" || props.location.pathname.toUpperCase() == "/SIGNIN")
        return(
            <LoginHeader />
        );

    return (
        <AppBar>
            <Toolbar className={classes.default}>
                <IconButton 
                    edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    ChangeTome
                </Typography>
                <NavLink to="/signin">
                    <Button color="inherit">Login</Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);