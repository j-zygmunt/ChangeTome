import React, {useState} from 'react';
import {Button, Grid, makeStyles, Paper, TextField, Typography, useMediaQuery} from '@material-ui/core';
import {NavLink, useHistory} from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import axios from 'axios';

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
            padding: '1em 2em 2em 2em',
        },
        margin: '0 auto',
    },
    image: {
        backgroundImage: 'url("../../img/bookshelf.jpg")',
        height: '100%',
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.secondary.light,
        fontSize: '1.2em',
    },
}));

function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mobile = useMediaQuery('(max-width:600px)');
    const history = useHistory();

    if (props.isLogged) {
        history.push('/');
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/login',
            {
                username: email,
                password: password
            },
            { withCredentials: true}
            )
            .then(response => {
                if (response.status === 200) {
                    props.setLogged(true);
                    history.push('/');
                    localStorage.setItem('token', response.data.access_token);
                }
            }).catch(error => {
            //todo
        });
    }

    return (
        <Grid container component='main' className={classes.root} alignItems='center'>
            <Grid item className={classes.image} md={6} sm={4} xs={false}/>
            <Grid
                container item
                component={Paper}
                elevation={2}
                className={classes.loginForm}
                alignItems='center'
                justify='center'
                xl={4} lg={5} md={5} sm={7} xs={11}
            >
                <Typography component='h1' variant='h5' paragraph>
                    Sign in
                </Typography>
                <Grid
                    container
                    component='form'
                    alignItems='center'
                    justify='center'
                    spacing={mobile ? 2 : 4}
                    onSubmit={handleSubmit}
                >
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            variant='outlined'
                            color='secondary'
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordInput
                            id='password'
                            name='password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            label='Password'
                            color='secondary'
                            size={mobile ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth type='submit' variant='contained' color='secondary' size='large'>
                            Sign in
                        </Button>
                    </Grid>
                    <Grid container item xs={12} justify='space-between'>
                        <Grid item xs={12}>
                            <NavLink to='/404' className={classes.link}>
                                Forgot password?
                            </NavLink>
                        </Grid>
                        <Grid item xs={12}>
                            <NavLink to='/signup' className={classes.link}>
                                Don't have an account? Sign Up
                            </NavLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SignIn;