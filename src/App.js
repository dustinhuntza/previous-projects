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
            token: null,
            clients: null
        }
        this.setToken = this.setToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setClients = this.setClients.bind(this);
    }

    setToken(token) {
        this.setState({
            token: token,
            loggedin: true
        })
    }

    setClients(clients) {
        this.setState({
            clients: clients
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
                        return <Login setToken={this.setToken} history={history} setClients={this.setClients}/>
                    }}/>
                    <Route exact path="/home" render={() => <Home logOut={this.logOut} clients={this.state.clients} token={this.state.token}/>}/>
                    <Route exact path="/manage-accounts" render={() => <ManageAccounts clients={this.state.clients} token={this.state.token}/>}/>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
