import React from 'react';
import { 
    IconButton,
    Drawer,
    makeStyles,
    Button,
    MenuList,
    Paper,
    Divider,
    InputBase
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import TuneIcon from '@material-ui/icons/Tune';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    searchBar: {
        padding: '1px 0.5em',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(4), 
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
        width: 2,
        backgroundColor: theme.palette.secondary.main
    },
}));


function SearchBar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    }

    return (
        <Paper className={classes.searchBar}>
            <IconButton color="secondary">
                <SearchIcon />
            </IconButton>
            <Divider
                orientation='vertical' 
                className={classes.divider}  
            />
            <InputBase
                placeholder="Search"
                className={classes.input}
            />
            <Divider
                orientation='vertical' 
                className={classes.divider}  
            />
            <IconButton 
                color='secondary'
                onClick={toggleDrawer(true)}
            >
                <TuneIcon/>
            </IconButton>
            <Drawer
                open={open}
                anchor="right"
                onClose={toggleDrawer(false)}
                BackdropProps={{ invisible: true }}
            >
                <IconButton
                    color="secondary"
                    aria-label="menu"
                    onClick={toggleDrawer(false)}
                >
                    <CloseIcon style={{fontSize: "1.5em"}}/>
                </IconButton>
                <MenuList >
                    <NavLink
                        to='/404'
                        style={{display: 'block'}}
                    >
                        <Button
                            onClick={toggleDrawer(false)}
                            color='secondary'
                            size="large"
                            fullWidth
                        >
                            button
                        </Button>
                    </NavLink>
                </MenuList>
            </Drawer>
        </Paper>
    )
}

export default SearchBar;