import React, {useRef} from 'react';
import {makeStyles, Grid, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDrag, useDrop} from 'react-dnd';

const useStyles = makeStyles((theme) => ({
    image: {
        height: '100%',
        width: '100%',
        border: '5px solid',
        borderColor: theme.palette.secondary.main,
        objectFit: 'cover',
    },
    wrapper: {
        height: '150px',
    },
    imageList: {
        padding: '1rem 0',
    },
    delete: {
        margin: '-200px 0 0 -50px',
    },
}));

function Image({ image, index, moveImage, deleteImage }) {
    const classes = useStyles();
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'Image',
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type: 'Image',
        item: {id: image.id, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <Grid
            className={classes.wrapper}
            ref={ref}
            item
            xl={2} lg={2} md={3} sm={4} xs={6}
            style={{ opacity: isDragging ? 0.2 : 1 }}
        >
            <img alt={`img - ${image.id}`} src={image.src} className={classes.image} />
            <IconButton className={classes.delete} onClick={() => deleteImage(image.id)}>
                <DeleteIcon color='secondary'/>
            </IconButton>
        </Grid>
    );
}

function ImagesPreview({ images, moveImage, deleteImage }) {
    const classes = useStyles();

    const renderImage = (image, index) => {
        return (
            <Image image={image} index={index} key={`${image.id}-image`} moveImage={moveImage} deleteImage={deleteImage} />
        )
    }

    return (
        <Grid
            container item
            spacing={2}
            className={classes.imageList}
            alignItems='flex-start'
            justify='flex-start'
        >
            {images.map(renderImage)}
        </Grid>
    )
}

export default ImagesPreview;