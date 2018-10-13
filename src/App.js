import React, {Component, Fragment} from 'react';
import Home from "./components/home.component"
import Login from "./components/login.component"
import ManageAccounts from "./components/manage-accounts.component"
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            token: null
        }
        this.setToken = this.setToken.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    setToken(token) {
        this.setState({
            token: token,
            loggedin: true
        })
    }

    logOut() {
        this.setState({
            loggedin: false
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route exact path="/" render={({ history }) => {
                        return <Login setToken={this.setToken} history={history}/>
                    }}/>
                    <Route exact path="/home" render={() => <Home logOut={this.logOut} token={this.state.token}/>}/>
                    <Route exact path="/manage-accounts" component={ManageAccounts}/>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
