import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {makeStyles, Container} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    wrapper: {
        height: '500px',
        width: "100%",
        padding: 0,
    },
}));

function PhotoCarousel(props) {
    const classes = useStyles();

    return (
        <Carousel
            autoPlay={false}
            fullHeightHover={false} 
            indicatorIconButtonProps={{
                style: {
                    padding: '0',
                    marginTop: '-60px',
                    color: '#dddddd'
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '-20px'
                }
            }}
            NextIcon={<NavigateNextIcon fontSize='large'/>}
            PrevIcon={<NavigateBeforeIcon fontSize='large'/>}
            IndicatorIcon={<FiberManualRecordIcon/>}
            activeIndicatorIconButtonProps={{
                style: {
                    color: '#555555aa'
                }
            }}
            navButtonsProps={{          
                style: {
                    color: '#222222',
                    backgroundColor: '#999999aa',
                    borderRadius: 5,
                    padding: 0
                }
            }}
            navButtonsAlwaysVisible={true}
            style={{width: '100%'}}
        >
            {
                typeof props.photos[0] === 'undefined'
                ? <Container className={classes.wrapper}>
                    <img 
                        src={require('../../img/NoImage.png')} 
                        className={classes.image}
                    />
                </Container>
                : props.photos.map((photo) => {
                    return (
                    <Container className={classes.wrapper} key={photo.id}>
                        <img 
                            src={require(`./client/public/uploads/${photo.name}`)}
                            className={classes.image}
                        />
                    </Container>
                    );
                })
            }
        </Carousel>
    )
}

export default PhotoCarousel;