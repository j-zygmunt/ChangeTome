import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    login: {
        minHeight: 90,
    },
    link: {
        textDecoration: 'none',
        margin: 'auto',
        color: "#FFFFFF"
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
                >
                    ChangeTome
                </Typography>
            </NavLink>
        </Toolbar>
    </AppBar>
    );
}

export default LoginHeader;