import React, { useState } from 'react';
import { 
    Grid, 
    makeStyles,
    Paper,
    TextField,
    Typography,
    Button,
    Checkbox,
    useMediaQuery
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput/PasswordInput'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 90px)',
        marginTop: 90,
        backgroundColor: theme.palette.background.default,
    },
    loginForm: {
        height: 'auto',
        padding: '2em 3em 3em 3em',
        '@media (max-width:600px)': {
            padding: '1em 2em 2em 2em'
        },
        margin: '0 auto'
    },
    image: {
        backgroundImage: 'url("./img/bookshelf.jpg")',
        height: '100%',
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        fontSize: '1.2em',
    },
    wrap: {
        width: '100%',
        margin: '0 16px'
    }
}));

function SignUp() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [accepted, setAccepted] = useState(false);
    const mobile = useMediaQuery('(max-width:600px)');

    const handleSubmit = event => {
        
    }

    return(
        <Grid
            container
            component="div"
            className={classes.root}
            alignItems="center"
        >
            <Grid 
                item
                className={classes.image}
                md={6} sm={4} xs={false}
            />
            <Grid
                container item
                component={Paper}
                elevation={2}
                className={classes.loginForm}
                alignItems="center"
                justify="center"
                xl={4} lg={5} md={5} sm={7} xs={11}
            > 
                <Typography 
                    component="h1"
                    variant="h5"
                    paragraph
                >
                    Sign up
                </Typography>
                <Grid
                    container
                    component="form"
                    alignItems="center"
                    justify="center"
                    spacing={mobile ? 2 : 4}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="First Name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            variant="outlined"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            required
                            fullWidth
                            id="surname"
                            name="surname"
                            label="Last Name"
                            value={surname}
                            onChange={event => setSurname(event.target.value)}
                            variant="outlined"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            variant="outlined"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <PasswordInput 
                            id="password"
                            name="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            label="Password"
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                        <Typography
                            className={classes.wrap}
                            variant={mobile ? 'caption' : 'subtitle2'}
                        >
                            {'At least 8 characters, 1 uppercase, 1 number'}
                        </Typography>
                    <Grid
                        item
                        xs={12}
                    >
                        <PasswordInput 
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={event => setPassword2(event.target.value)}
                            label="Confirm password"
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                    <div className={classes.wrap}>
                        <Checkbox 
                            color="secondary" 
                            value={accepted}
                            onClick={() => setAccepted(!accepted)}
                        />
                        <NavLink 
                            to="/terms-and-conditions" 
                            className={classes.link}
                            >
                                I accept terms and conditions
                        </NavLink>
                    </div>
                    <Grid
                        item
                        xs={12}
                    >
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                            className={classes.submit} 
                        >
                            Sign up
                        </Button>
                    </Grid>
                    <NavLink to="/signin" className={classes.link}>
                        Sign in
                    </NavLink>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SignUp;