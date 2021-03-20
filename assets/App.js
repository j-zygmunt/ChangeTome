import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Error from './views/Error/Error';
import Home from './views/Home/Home';
import PostAd from './views/PostAd/PostAd';
import Profile from './views/Profile/Profile';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Header from './components/Header/Header';

import './styles/app.css'

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>    
                <Route path="/home" component={Home} />
                <Route path="/post-ad" component={PostAd} />
                <Route path="/profile" component={Profile} />
                <Route path="/signin" component={SignIn} />
                <Route path="/login">
                    <Redirect to="/signin" />
                </Route>
                <Route path="/signup" component={SignUp} />
                <Route path="/register">
                    <Redirect to="/signup" />
                </Route>
                <Route path="/404" component={Error} />
                <Redirect to="/404" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;