import {Redirect, Route} from "react-router-dom";
import React, {useEffect} from "react";
import axios from 'axios';

function PrivateRoute(props) {
    useEffect(() => {
        axios.get('api/private/isAuthorized', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(data => {
                if(data.status === 200){
                    props.setIsAuthorized(true);
                }
            })
            .catch(() => {
                props.setIsAuthorized(false);
            })
    }, [])

    return props.isAuthorized 
    ? (
        <Route {...props} />
    ) : (
        <Redirect to='/login'/>
    );
}

export default PrivateRoute;