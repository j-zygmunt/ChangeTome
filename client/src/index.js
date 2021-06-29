import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import App from './App';
import myTheme from './theme';


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={myTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);