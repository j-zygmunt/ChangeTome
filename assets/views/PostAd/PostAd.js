import React from 'react';
import {
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    Input,
    Box
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import cuid from 'cuid';
import FileDropzone from '../../components/FileDropzone/FileDropzone';


const labels = {
    0.5: 'Used: Poor',
    1: 'Used: Poor +',
    1.5: 'Used: Acceptable -',
    2: 'Used: Acceptable',
    2.5: 'Used: Acceptable +',
    3: 'Used: Good -',
    3.5: 'Used: Good',
    4: 'Used: Very Good',
    4.5: 'Used: Like New',
    5: 'New',
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        width: '100%',
        padding: '4em',
        [theme.breakpoints.down('sm')]:{
            padding: '2em'
        },
    },
    rating: {
        color: theme.palette.secondary.main,
    },
}));

function PostAd() {
    const classes = useStyles();
    const [images, setImages] = React.useState([]);
    const [condition, setCondition] = React.useState(4);
    const [hover, setHover] = React.useState(-1);

    const onDrop = React.useCallback(acceptedFiles => {
        console.log("xd")
        acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prevState => [
                    ...prevState,
                    { id: cuid(), src: e.target.result }
                ]);
            }
            reader.readAsDataURL(file);
            console.log(file)
        });
        console.log(images)
    }, []);

    React.useEffect(() => {
        fetch("/api/users")
        .then(user => console.log(user))

    }, []);

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
            justify="center"
        >
            <Grid item xl={8} lg={8} md={8} sm={8} xs={10}>
                <Typography align="left" variant="h4" style={{fontWeight: 'bold', marginTop: '2em'}}>
                    Post your offer!
                </Typography>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems="center"
                justify="center"
                xl={8} lg={8} md={8} sm={8} xs={10}
            >
                <Grid item xs={12}>
                    <Typography>Title</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Author</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Description</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Condition</Typography>
                    <Grid container item xs={12} justify="flex-start" alignItems="center">
                        <Rating 
                            className={classes.rating}
                            name="condition" 
                            value={condition} 
                            precision={0.5}
                            onChange={(event, condition) => { setCondition(condition); }}
                            onChangeActive={(event, hover) => { setHover(hover); }}
                        />
                        {
                            condition !== null && 
                            <Typography align="center" style={{marginLeft: '1rem'}} variant='caption'>
                                { labels[hover !== -1 ? hover : condition] }
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems="center"
                justify="center"
                xl={8} lg={8} md={8} sm={8} xs={10}
            >
                <Grid item xs={12}>
                    <Typography>Photos</Typography>
                    <FileDropzone onDrop={onDrop}></FileDropzone>
                </Grid>
            </Grid>
            <Grid
                container item
                className={classes.paper}
                component={Paper}
                alignItems="center"
                justify="center"
                xl={8} lg={8} md={8} sm={8} xs={10}
            >
                <Grid item xs={12}>
                    <NavLink to="/home">
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                        >
                            Add
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PostAd;