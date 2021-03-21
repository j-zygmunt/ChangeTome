import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    login: {
        minHeight: 90,
        backgroundColor: theme.palette.background.default
    },
    link: {
        textDecoration: 'none',
        margin: 'auto',
        color: theme.palette.secondary.main,
    }
}));

function LoginHeader() {
  const classes = useStyles();

  return (
    <AppBar>
        <Toolbar className={classes.login}>
            <NavLink to="/home" className={classes.link}>
                <Typography
                    variant='h4'
                    align='center'
                    style={{ fontWeight: 600 }}
                >
                    ChangeTome
                </Typography>
            </NavLink>
        </Toolbar>
    </AppBar>
    );
}

export default LoginHeader;