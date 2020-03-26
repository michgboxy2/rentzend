import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import './App.css';

import Home from './components/home';
import Kyc from './components/kyc';
import SignUp from './components/signUp';
import signIn from './components/signIn';



class App extends Component {
    render(){
        return (
            <HashRouter>
                <div className="App">
                   <Route exact path="/" component={SignUp}/>
                   <Route exact path="/login" component={signIn}/>
                   <Route exact path="/kyc" component={Kyc}/>
                   <Route exact path="/home" component={Home}/>

                </div>
            </HashRouter>
        )
    }
}

export default App;