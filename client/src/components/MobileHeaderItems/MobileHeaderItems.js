import React, {useState} from 'react';
import { 
    IconButton,
    Drawer,
    makeStyles,
    Button,
    MenuList
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    mobileButtons: {
        '& > *': {
            margin: '0 3em',
        },
        width: '280px',
    },
}));

function MobileHeaderItems(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    }

    const logoutWrapper = () => {
        setOpen(false);
        props.logout();
    }

    return (
        <div>
            <IconButton
                onClick={toggleDrawer(true)}
                color='secondary'
                style={{ paddingLeft: '0'}}    
            >
                <MenuOpenIcon style={{fontSize: '1.5em'}}/>
            </IconButton>
            <Drawer
                open={open}
                anchor='left'
                onClose={toggleDrawer(false)}
            >
                <IconButton
                    color='secondary'
                    onClick={toggleDrawer(false)}
                >
                    <CloseIcon style={{fontSize: '1.5em'}}/>
                </IconButton>
                <MenuList className={classes.mobileButtons}>
                    {
                        props.headerItems.map((item) => {
                            return item.itemName === 'Logout'
                            ? (
                                <a
                                    style={{display: 'block', textDecoration: "none"}}
                                    key={item.itemName}
                                >
                                    <Button
                                        onClick={logoutWrapper}
                                        startIcon={item.icon}
                                        color='secondary'
                                        size='large'
                                        variant='text'
                                        fullWidth
                                        style={{justifyContent: 'flex-start'}}
                                    >
                                        {item.itemName}
                                    </Button>
                                </a>
                            )
                            : (
                                <NavLink
                                    to={item.link}
                                    key={item.itemName}
                                    style={{display: 'block', textDecoration: "none"}}
                                >
                                    <Button
                                        onClick={toggleDrawer(false)}
                                        startIcon={item.icon}
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        variant={item.itemName === 'Exchange' ? 'contained' : 'text'}
                                        style={item.itemName === 'Exchange' ? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}
                                    >
                                        {item.itemName}
                                    </Button>
                                </NavLink>
                            );
                        })
                    }
                </MenuList>
            </Drawer>
        </div>
    )
}

export default MobileHeaderItems;