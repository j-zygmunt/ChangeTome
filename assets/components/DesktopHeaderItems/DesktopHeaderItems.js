import {
    makeStyles,
    Button,
    Popper,
    Grow,
    Paper,
    MenuList,
    ClickAwayListener,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    desktopButtons: {
        '& > *': {
            marginLeft: theme.spacing(1),
            textDecoration: 'none',
        },
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
        padding: '0 1em'
    }
}));

function DesktopHeaderItems(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target))
            return;
        setOpen(false);
    };

    React.useEffect(() => {
        if (prevOpen.current === true && open === false)
            anchorRef.current.focus();

        prevOpen.current = open;
    }, [open]);


    if (!props.isAuthorized)
        return (
            <div className={classes.desktopButtons}>
                {
                    props.headerItems.map((item) => {
                        return (
                            <NavLink to={item.link} key={item.itemName} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="large"
                                    variant={item.itemName === "Exchange" ? 'contained' : 'text'}
                                >
                                    {item.itemName}
                                </Button>
                            </NavLink>
                        );
                    })
                }
            </div>
        );

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<ExpandMoreIcon style={{ fontSize: '2em' }} />}
                size='large'
                color="secondary"
                style={{ marginRight: '2em' }}
            >
                My Profile
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open}>
                                    {
                                        props.headerItems.slice(1, 6).map((item) => {
                                            return item.itemName === 'Logout' 
                                            ? (
                                                <Button
                                                    key={item.itemName}
                                                    onClick={props.logout}
                                                    startIcon={item.icon}
                                                    color='primary'
                                                >
                                                    {item.itemName}
                                                </Button>
                                            )
                                            : (
                                                <NavLink
                                                    to={item.link}
                                                    key={item.itemName}
                                                    style={{display: 'block', textDecoration: 'none'}}
                                                >
                                                    <Button
                                                        onClick={handleClose}
                                                        startIcon={item.icon}
                                                        color='primary'
                                                    >
                                                        {item.itemName}
                                                    </Button>
                                                </NavLink>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <NavLink to={props.headerItems[0].link} key={props.headerItems[0].itemName} style={{textDecoration: 'none'}}>
                <Button color="secondary" size="large" variant='contained'>
                    {props.headerItems[0].itemName}
                </Button>
            </NavLink>
        </div>
    );
}

export default DesktopHeaderItems;