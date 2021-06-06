import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core'
import { withRouter, useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    FolderOpen,
    MailOutline,
    FavoriteBorder,
    PermIdentity,
    ExitToApp,
} from '@material-ui/icons';
import LoginHeader from '../LoginHeader/LoginHeader';
import DesktopHeaderItems from '../DesktopHeaderItems/DesktopHeaderItems';
import MobileHeaderItems from '../MobileHeaderItems/MobileHeaderItems';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.secondary.main,
    },
    default: {
        minHeight: 64,
        backgroundColor: theme.palette.background.default,
    },
    desktopButtons: {
        '& > *': {
            marginLeft: theme.spacing(1)
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
}));

function Header(props) {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:960px)');
    const history = useHistory();

    const menuForUser = [
        {
            itemName: "Exchange",
            link: "/post-ad",
        },
        {
            itemName: "Manage my Ads",
            link: "/your-ads",
            icon: <FolderOpen/>
        },
        {
            itemName: "Messages",
            link: "/messages",
            icon: <MailOutline/>
        },
        {
            itemName: "Favourites",
            link: "/favourites",
            icon: <FavoriteBorder/>
        },
        {
            itemName: "My Details",
            link: "/manage-account",
            icon: <PermIdentity/>
        },
        {
            itemName: "Logout",
            link: "/logout",
            icon: <ExitToApp/>
        },
    ]

    const menuForGuest = [
        {
            itemName: "Sign in",
            link: "/signin"
        },
        {
            itemName: "Sign up",
            link: "/signup"
        },
        {
            itemName: "Exchange",
            link: "/signin"
        },
    ]

    if (props.location.pathname.toUpperCase() == "/SIGNUP" || props.location.pathname.toUpperCase() == "/SIGNIN")
        return (
            <LoginHeader/>
        );

    const logout = () => {
        axios.post('api/private/logout', {header: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(() => {
                localStorage.removeItem('token');
                history.push("/");
            })
            .catch();
    }

    return (
        <AppBar>
            <Toolbar className={classes.default}>
                {mobile &&
                    <MobileHeaderItems
                        headerItems={localStorage.getItem('token') ? menuForUser : menuForGuest}
                        logout={logout}
                    />
                }
                <Typography variant="h6" className={classes.title}>
                    <Link to="/home" className={classes.link}>
                        ChangeTome
                    </Link>
                </Typography>
                {!mobile &&
                    <DesktopHeaderItems 
                        headerItems={localStorage.getItem('token') ? menuForUser : menuForGuest}
                        logout={logout}
                    />
                }
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);