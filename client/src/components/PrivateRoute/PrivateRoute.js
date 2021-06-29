import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthorizationCheckService from '../../services/AuthorizationCheckService';

function PrivateRoute(props) {
    useEffect(() => {
        AuthorizationCheckService.isAuthorized();
    }, [])

    return localStorage.getItem('token')
    ? (
        <Route {...props} />
    ) : (
        <Redirect to='/login'/>
    );
}

export default PrivateRoute;