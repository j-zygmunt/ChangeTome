import React, {useState, useCallback} from 'react';
import {
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    useMediaQuery,
    TextField,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import cuid from 'cuid';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FileDropzone from '../../components/FileDropzone/FileDropzone';
import ImagesPreview from '../../components/ImagesPreview/ImagesPreview';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import {useHistory} from 'react-router-dom';
import NumberFormatCustom from '../../utils/NumberFormatCustom';

const RatingLabels = {
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
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        width: '100%',
        marginBottom: '2rem',
        padding: '1.5rem',
    },
    rating: {
        color: theme.palette.secondary.main,
    },
}));

function PostAd() {
    const classes = useStyles();
    const history = useHistory();
    const [condition, setCondition] = useState(-1);
    const [hover, setHover] = useState(-1);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const mobile = useMediaQuery('(max-width:600px)');
    const maxImagesAmount = 8;

    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    
    const moveImage = (dragIndex, hoverIndex) => {
        const draggedImage = images[dragIndex];
        setImages(
            update(images, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
            })
        );
    };

    const deleteImage = (index) => {
        let newImages = images.filter(item => item.id !== index);
        setImages(newImages);
    }

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(file => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                setImages(prevState => prevState.length < maxImagesAmount ? [
                    ...prevState,
                    { id: cuid(), src: event.target.result }
                ] : prevState);
            };
            fileReader.readAsDataURL(file);
        });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        if (condition != -1) {
            axios.post('/api/private/postAd', 
                {
                    title: title,
                    author: author,
                    description: description,
                    price: price,
                    condition: condition,
                    images: images,
                    creator: jwtDecode(localStorage.getItem('token')).email
                },
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(response => console.log(response.data))
                .catch(error => {
                    //todo
                })
                .finally(
                    setTimeout(() => {
                        history.push('/')
                        window.location.reload();
                }, 5000))
        }
        else {
            setDialogTitle('Invalid value');
            setDialogContent('Condition cannot remain unset');
            setIsDialogOpened(true);
        }
    }

    return (
        <Grid
            container
            component='main'
            className={classes.root}
            alignItems='flex-start'
            justify='center'
        >
            <Grid
                container item
                onSubmit={handleSubmit}
                component='form'
                justify='center' 
            >
                <Grid item xl={8} lg={8} md={9} sm={10} xs={10}>
                    <Typography variant='h4' style={{ fontWeight: 'bold', margin: '2rem 0 1rem 0' }}>
                        Post your offer!
                    </Typography>
                </Grid>
                <Grid
                    container item
                    className={classes.paper}
                    component={Paper}
                    alignItems='center'
                    justify='flex-start'
                    spacing={1}
                    xl={8} lg={8} md={9} sm={10} xs={10}
                >
                    <Grid item xs={12}>
                        <Typography variant='h5' style={{fontWeight: 'bold'}} paragraph>Informations</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body1' style={{fontWeight: 'bold'}}>Title*</Typography>
                        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                placeholder='e.g Metro 2033 brand new'
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                variant='outlined'
                                color='secondary'
                                size={mobile ? 'small' : 'medium'}
                                inputProps={{maxLength: 70}}
                                helperText={`${title.length}/${70}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body1' style={{fontWeight: 'bold'}}>Author*</Typography>
                        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                placeholder='e.g Dimitri Glukhovsky'
                                value={author}
                                onChange={event => setAuthor(event.target.value)}
                                variant='outlined'
                                color='secondary'
                                size={mobile ? 'small' : 'medium'}
                                inputProps={{maxLength: 70}}
                                helperText={`${author.length}/${70}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{fontWeight: 'bold'}}>Description*</Typography>
                        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                rows={4}
                                multiline
                                placeholder='Write as many details as possible'
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                variant='outlined'
                                color='secondary'
                                size={mobile ? 'small' : 'medium'}
                                inputProps={{maxLength: 5000}}
                                helperText={`${description.length}/${5000}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                        <Typography variant="body1" style={{fontWeight: 'bold'}}>Price($)*</Typography>
                        <Grid item sm={8} xs={4}>
                            <TextField
                                required
                                fullWidth
                                value={price}
                                name='price'
                                onChange={event => setPrice(event.target.value)}
                                variant='outlined'
                                color='secondary'
                                size='small'
                                InputProps={{inputComponent: NumberFormatCustom}}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xl={10} lg={10} md={8} sm={8} xs={12}>
                        <Typography variant='body1' style={{fontWeight: 'bold'}}>Condition*</Typography>
                        <Grid container item xs={12} justify='flex-start' alignItems='center'>
                            <Rating
                                className={classes.rating}
                                name='condition'
                                value={condition}
                                precision={0.5}
                                onChange={(event, condition) => {setCondition(condition)}}
                                onChangeActive={(event, hover) => {setHover(hover)}}
                            />
                            {
                                condition !== null &&
                                <Typography align='center' style={{marginLeft: '1rem'}} variant='caption'>
                                    {RatingLabels[hover !== -1 ? hover : condition]}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container item
                    className={classes.paper}
                    component={Paper}
                    alignItems='center'
                    justify='center'
                    xl={8} lg={8} md={9} sm={10} xs={10}
                >
                    <Grid item xs={12}>
                        <Typography variant='h4' style={{fontWeight: 'bold'}} paragraph>Images</Typography>
                        <Typography variant='caption' align='left' color='secondary'>
                            The first image will be the main one. You can drag and drop the image to change its order. You can upload up to 8 images.
                            </Typography>
                        <FileDropzone onDrop={onDrop}/>
                        <DndProvider backend={HTML5Backend}>
                            <ImagesPreview images={images} moveImage={moveImage} deleteImage={deleteImage}/>
                        </DndProvider>
                    </Grid>
                </Grid>
                <Grid
                    container item
                    alignItems='center'
                    justify='flex-end'
                    style={{marginBottom: '2rem'}}
                    xl={8} lg={8} md={9} sm={10} xs={10}
                >
                    <Grid item sm={4} xs={12}>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            size='large'
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <AlertDialog
                title={dialogTitle} 
                content={dialogContent} 
                isOpened={isDialogOpened} 
                setIsOpened={setIsDialogOpened}
            />
        </Grid>
    );
}

export default PostAd;