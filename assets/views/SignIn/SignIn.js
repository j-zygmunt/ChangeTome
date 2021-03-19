import React, {useState} from 'react';
import { 
    Grid, 
    makeStyles,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import NavLink from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import LoginHeader from '../../components/LoginHeader/LoginHeader'

const useStyles = makeStyles({
    root: {
        height: 'calc(100vh - 90px)',
        marginTop: 90
    },
    loginForm: {
        height: 'auto',
        padding: '2em 3em 3em 3em',
        margin: '0 auto'
    },
    image: {
        backgroundImage: 'url("./img/bookshelf.jpg")',
        height: '100%',
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

});

function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleSubmit = event => {
        
    }
    
    return(
        <div>
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
                xl={4} lg={5} md={5} sm={7} xs={10}
            > 
                <Typography 
                    component="h1"
                    variant="h5"
                    paragraph
                >
                    Sign in
                </Typography>
                <Grid
                    container
                    component="form"
                    alignItems="center"
                    justify="center"
                    spacing={4}
                    onSubmit={handleSubmit}
                >
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
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
    );
}

export default SignIn;