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
{(!mobile && !isUser) &&
    <div className={classes.desktopButtons}>
        <NavLink to="/signin">
            <Button color="secondary" size="large">Sign in</Button>
        </NavLink>                    
        <NavLink to="/signup">
            <Button color="secondary" size="large">Sign up</Button>
        </NavLink>                 
        <NavLink to="/signin">
            <Button color="secondary" variant='contained' size="large">Exchange</Button>
        </NavLink>                 
    </div>
}