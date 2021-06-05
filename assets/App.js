import React, {useState, useEffect} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Error from './views/Error/Error';
import Home from './views/Home/Home';
import PostAd from './views/PostAd/PostAd';
import Profile from './views/Profile/Profile';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Header from './components/Header/Header';
import Ad from './views/Ad/Ad';
import YourAds from './views/YourAds/YourAds';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthorizationCheckService from './services/AuthorizationCheckService';

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        AuthorizationCheckService.isAuthorized()
    });

    return (
        <HashRouter>
            <Header/>
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
                <Route path="/home" render={(props) => (
                    <Home {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
                )}/>
                <PrivateRoute path="/post-ad" isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} render={(props) => (
                    <PostAd {...props}/>
                )}/>

                <PrivateRoute path="/manage-account" isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} render={(props) => (
                    <Profile {...props}/>
                )}/>
                <PrivateRoute path="/your-ads" isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} render={(props) => (
                    <YourAds {...props}/>
                )}/>
                <PrivateRoute path="/messages" isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} render={(props) => (
                    <Error {...props}/>
                )}/>
                <PrivateRoute path="/favourites" isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} render={(props) => (
                    <Error {...props}/>
                )}/>
                <Route path="/signin" render={(props) => (
                    <SignIn {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
                )}/>
                <Route path="/ad/:id" render={(props) => (
                    <Ad {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
                )}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/404" render={(props) => (
                    <Error {...props} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
                )}/>
                <Redirect to="/404" />
            </Switch>
        </HashRouter>
    );
}

export default App;