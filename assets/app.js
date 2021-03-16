import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './styles/app.css';
import Component from './components/Component';

ReactDOM.render(
    <Router><Component /></Router>,
    document.getElementById('root')
);