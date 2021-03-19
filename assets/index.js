import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CssBaseline, ThemeProvider} from '@material-ui/core';

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);