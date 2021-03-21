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
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  

    if (!props.isUser)
        return (
            <div className={classes.desktopButtons}>
                {
                    props.headerItems.map((item) => {
                        return (
                            <NavLink 
                                to={item.link}
                                key={item.itemName}
                            >
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
              endIcon={<ExpandMoreIcon style={{fontSize: '2em'}}/>}
              size='large'
              color="secondary"
              style={{marginRight: '2em'}}
            >
              My Profile
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper
                            className={classes.paper}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open}>
                                {
                                    props.headerItems.slice(0, 5).map((item) => {
                                        return (
                                            <NavLink
                                                to={item.link}
                                                key={item.itemName}
                                                style={{display: 'block'}}
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
            <NavLink 
                to={props.headerItems[props.headerItems.length -1].link}
                key={props.headerItems[props.headerItems.length -1].itemName}
            >
                <Button 
                    color="secondary" 
                    size="large"
                    variant='contained'
                >
                    {props.headerItems[props.headerItems.length -1].itemName}
                </Button>
            </NavLink>  
        </div>
    );
}

export default DesktopHeaderItems;