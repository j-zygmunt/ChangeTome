import React, {useEffect} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Error from './views/Error/Error';
import Home from './views/Home/Home';
import PostAd from './views/PostAd/PostAd';
import Profile from './views/Profile/Profile';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Header from './components/Header/Header';
import Ad from './views/Ad/Ad';
import YourAds from './views/YourAds/YourAds';
import Search from './views/Search/Search';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthorizationCheckService from './services/AuthorizationCheckService';

function App() {
    useEffect(() => {
        AuthorizationCheckService.isAuthorized()
    });

    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path='/login'>
                    <Redirect to='/signin'/>
                </Route>
                <Route path='/register'>
                    <Redirect to='/signup'/>
                </Route>
                <Route path='/home' component={Home}/>
                <PrivateRoute path='/post-ad' component={PostAd}/>
                <PrivateRoute path='/manage-account' component={Profile}/>
                <PrivateRoute path='/your-ads' component={YourAds}/>
                <PrivateRoute path='/messages' component={Error}/>
                <PrivateRoute path='/favourites' component={Error}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='/ad/:id' component={Ad}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/search' component={Search}/>
                <Route path='/404' component={Error}/>
                <Route exact path='/'>
                    <Redirect to='/home'/>
                </Route>   
                <Redirect to='/404'/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;