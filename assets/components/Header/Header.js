import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    useMediaQuery
} from '@material-ui/core'

import {
    NavLink,
    withRouter
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LoginHeader from '../LoginHeader/LoginHeader'


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.secondary.light
    },
    default: {
        minHeight: 64,
        backgroundColor: theme.palette.background.default
    }
}));

function Header(props) {
    const [isUser, setIsUser] = useState(true);
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:600px)');

    if (props.location.pathname.toUpperCase() == "/SIGNUP" || props.location.pathname.toUpperCase() == "/SIGNIN")
        return(
            <LoginHeader />
        );

    return (
        <AppBar>
            <Toolbar className={classes.default}>
                {mobile &&
                    <IconButton 
                        edge="start"
                        className={classes.menuButton}
                        color="secondary"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                }
                <Typography variant="h6" className={classes.title}>
                    ChangeTome
                </Typography>
                {!mobile &&
                    <div>
                        <NavLink to="/signin">
                            <Button color="secondary">Sign in</Button>
                        </NavLink>                    
                        <NavLink to="/signup">
                            <Button color="secondary">Sign up</Button>
                        </NavLink>                 
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);