import React, {useState, useEffect} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Error from './views/Error/Error';
import axios from 'axios';
import Home from './views/Home/Home';
import PostAd from './views/PostAd/PostAd';
import Profile from './views/Profile/Profile';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Header from './components/Header/Header';
import Ad from './views/Ad/Ad';
import YourAds from './views/YourAds/YourAds';
import jwtDecode from 'jwt-decode'

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            if(jwtDecode(localStorage.getItem('token')).exp < Date.now() / 1000) {
                localStorage.removeItem('token');
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            } 
        } else {
            axios.get('api/private/isAuthorized', {header: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
                if(response.status === 200) {
                    setIsAuthorized(true);
                    localStorage.setItem('token', response.data.token);
                }
            }).catch(error => {
                console.log(error);
                setIsAuthorized(false);
                localStorage.removeItem('token');
            })
        }
    });

    return (
        <HashRouter>
            <Header isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
            <Switch>
                <Route exact path="/" >
                    <Redirect to="/home" />
                </Route>    
                <Route path="/login">
                    <Redirect to="/signin" />
                </Route>
                <Route path="/register">
                    <Redirect to="/signup" />
                </Route>
                <Route path="/home" render={
                    (props) => (<Home {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/post-ad" render={
                    (props) => (<PostAd {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/manage-account" render={
                    (props) => (<Profile {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/your-ads" render={
                    (props) => (<YourAds {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/messages" render={
                    (props) => (<Error {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/favourites" render={
                    (props) => (<Error {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/signin" render={
                    (props) => (<SignIn {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/ad" render={
                    (props) => (<Ad {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/signup" render={
                    (props) => (<SignUp {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Route path="/404" render={
                    (props) => (<Error {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>)}/>
                <Redirect to="/404" />
            </Switch>
        </HashRouter>
    );
}

export default App;