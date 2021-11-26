import axios from 'axios';
import React, {useRef, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from "lodash.debounce"

export default function ApiSearchBox(props) {
    const [open, setOpen] = React.useState(false);
    const [searchPhase, setSearchPhase] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const inputRef = useRef()
    let loading = open && options.length === 0;

    const updateQuery = () => {
        (async () => {
            const response = await axios.get('http://localhost:8080/api/googleBooks/search',
                {
                    params: {
                        searchPhase: searchPhase,
                        maxResults: 40
                    }
                });
            const books = await response.data;
            setOptions(books);
        })();
    }

    const delayedQuery = useCallback(debounce(updateQuery, 500), [searchPhase]);

    React.useEffect(() => {
        setOptions([])
        delayedQuery();
        return delayedQuery.cancel;
    }, [searchPhase, delayedQuery]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => {setOpen(true);}}
            onClose={() => {setOpen(false);}}
            onChange={(event, value) => props.setSelectedOption(value)}
            getOptionSelected={(option, value) => option.volumeInfo.title === value.volumeInfo.title}
            options={options}
            getOptionLabel={(option) => option.volumeInfo.title + " | " +
                (option.volumeInfo.authors !== undefined ? option.volumeInfo.authors : "unknown author") + " | " +
                (option.volumeInfo.publisher !== undefined ? option.volumeInfo.publisher : "unknown publisher")}
            loading={loading}
            disablePortal={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Enter title and author here"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    value={searchPhase}
                    ref={inputRef}
                    onChange={event => setSearchPhase(event.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}