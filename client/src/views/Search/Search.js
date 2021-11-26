import React, {useState, useEffect} from 'react';
import {Paper, Grid, Typography, makeStyles} from '@material-ui/core';
import {useLocation} from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import AdCard from '../../components/AdCard/AdCard';
import axios from 'axios';

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
}));

function Search() {
    const classes = useStyles();
    const [searchPhase, setSearchPhase] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const adsPerPage = 12;

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
        axios.get('/api/searchAds', 
        {
            params: 
            {
                offset: adsPerPage*(value-1), 
                phase: searchPhase
            }
        })
        .then(response => setSearchResult(response.data))
        .finally(
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        )
    }

    const handleSearch = (value) => {
        let phase = (value === undefined ? searchPhase : value);
        console.log(phase);
        axios.get('/api/getNumberOfResults', 
        {
            params: 
            {
                phase: phase
            }
        })
        .then(response => setNumberOfResults(response.data))
        .finally(setNumberOfPages(Math.ceil(numberOfResults/adsPerPage)))
        axios.get('/api/searchAds', 
        {
            params: 
            {
                offset: 0, phase: phase
            }
        })
        .then(response => setSearchResult(response.data))
        .finally(
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        )
    }

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfResults/adsPerPage))
    }, [numberOfResults]);

    useEffect(() => {
        if(typeof location.state !== 'undefined') {
            setSearchPhase(location.state.phase);
            handleSearch(location.state.phase);
        }
    }, [location]);

    console.log(searchResult)

    return (
        <Grid container component='main' className={classes.root} alignItems='flex-start' justify='center' >
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10} >
                <SearchBar searchPhase={searchPhase} setSearchPhase={setSearchPhase} handleSearch={handleSearch} />
            </Grid>
            <Grid item xl={8} lg={8} md={9} sm={10} xs={10} >
                <Typography variant='h4' style={{fontWeight: 'bold', margin: '2rem 0 1rem 0'}} >
                    Search results
                </Typography>
            </Grid>
            {
                searchResult.length !==0 &&
                <Grid
                    container item
                    className={classes.paper}
                    component={Paper}
                    alignItems='center'
                    justify='flex-start'
                    spacing={3}
                    xl={8} lg={8} md={9} sm={10} xs={10}
                >
                    {
                        searchResult.map((item) => {
                            return (
                                <Grid key={item.id} item xl={3} lg={4} md={4} sm={6} xs={12} >
                                    <AdCard item={item} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            }
            {
                searchResult.length !==0 &&
                <Grid
                    container item
                    justify='center'
                    xl={8} lg={8} md={9} sm={10} xs={10}
                    style={{marginBottom: '1.5rem'}}
                >
                    <Pagination 
                        count={numberOfPages} 
                        page={currentPage}
                        color='secondary'
                        onChange={handlePageChange}
                    />
                </Grid>
            }
        </Grid>
    )
}
 
export default Search;