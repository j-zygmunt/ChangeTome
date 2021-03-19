import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    toolbar: {
        minHeight: 90,
        backgroundColor: "#eeeeee"
    }
});

function Header() {
  const classes = useStyles();

  return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <NavLink to="/home">
                    <Button color="inherit">ChangeTome</Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default Header;