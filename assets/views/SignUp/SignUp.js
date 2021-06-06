import React, {useState} from 'react';
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
import {NavLink,  useHistory} from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import axios from 'axios';
import NumberFormatCustom from '../../utils/NumberFormatCustom';
import AlertDialog, {createAlertDialog} from '../../components/AlertDialog/AlertDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 90px)',
        marginTop: 90,
        backgroundColor: theme.palette.background.default,
    },
    loginForm: {
        height: 'auto',
        padding: '2rem 3rem 3rem 3rem',
        '@media (max-width:600px)': {
            padding: '1rem 2rem 1rem 2rem'
        },
        margin: 'auto',
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
        '@media (max-width:600px)': {
            fontSize: '1rem',
        },
    },
    wrap: {
        margin: '0 16px',
        padding: '0 !important',
    },
}));

function SignUp() {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:600px)');
    const history = useHistory();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [accepted, setAccepted] = useState(false);

    const [isDialogOpened, setIsDialogOpened] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogContent, setDialogContent] = React.useState('');
    const [dialogRedirectPath, setDialogRedirectPath] = React.useState();

    if(localStorage.getItem('token')) {
        history.push("/");
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (password !== password2) {
            setDialogTitle('Sign up');
            setDialogContent("Passwords don't match");
            setIsDialogOpened(true);
        }
        if (!accepted) {
            setDialogTitle('Sign up');
            setDialogContent('You have to accept the terms and conditions');
            setIsDialogOpened(true);
        }
        else {
            axios.post("/api/register", 
                {name: name, surname: surname, email: email, phone: phone, password: password, password2: password2}
            )
            .then(response => {
                if(response.data === 'success') {
                    setDialogRedirectPath('/login');
                }
                setDialogTitle('Sign up');
                setDialogContent(response.data);
                setIsDialogOpened(true);
            })
        }
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
                <Typography component="h1" variant="h5" paragraph>
                    Sign up
                </Typography>
                <Grid
                    container
                    component="form"
                    alignItems="center"
                    justify="center"
                    spacing={mobile ? 2 : 2}
                    onSubmit={handleSubmit}
                >
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="First Name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            variant="outlined"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="surname"
                            name="surname"
                            label="Last Name"
                            value={surname}
                            onChange={event => setSurname(event.target.value)}
                            variant="outlined"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            variant="outlined"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                            variant="outlined"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordInput 
                            id="password"
                            name="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            label="Password"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                        <Typography className={classes.wrap} variant={mobile ? 'caption' : 'subtitle2'}>
                            {'At least 8 characters, 1 uppercase, 1 number'}
                        </Typography>
                    <Grid item xs={12}>
                        <PasswordInput 
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={event => setPassword2(event.target.value)}
                            label="Confirm password"
                            color="secondary"
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.wrap}>
                        <Checkbox 
                            color="secondary" 
                            value={accepted}
                            onClick={() => setAccepted(!accepted)}
                        />
                        <NavLink to="/terms-and-conditions" className={classes.link}>
                                I accept terms and conditions
                        </NavLink>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                        >
                            Sign up
                        </Button>
                    </Grid>
                    <NavLink to="/signin" className={classes.link}>
                        Sign in
                    </NavLink>
                </Grid>
            </Grid>
            <AlertDialog 
                title={dialogTitle} 
                content={dialogContent} 
                isOpened={isDialogOpened} 
                setIsOpened={setIsDialogOpened} 
                redirect={dialogRedirectPath}/>
        </Grid>
    );
}

export default SignUp;