import React, {Component, Fragment} from 'react';
import Home from "./components/home.component"
import Login from "./components/login.component"
import ManageAccounts from "./components/manage-accounts.component"
import ManageBeneficiaries from "./components/manage-beneficiaries.component"
import MakePayments from "./components/make-payments.component"
import Transfer from "./components/transfer.component"
import Buy from "./components/buy.component"
import ViewAccounts from "./components/view-account.component"
import AddBeneficiary from "./components/add-beneficiary.component"
import ViewBeneficiary from "./components/view-beneficiary.component"
import Payment from "./components/payment.component"
import Register from "./components/register.component"
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            token: null,
            clients: null,
            transactions: null,
            beneficiaries: [
              {
                id: 1,
                name:"John",
                bank:"Absa",
                branch:"Absa Branch",
                accType:"Cheque",
                accNr:"123456",
                ref:"Rent"
              },
              {
                id: 2,
                name:"Peter",
                bank:"FNB",
                branch:"FNB Branch",
                accType:"Savings",
                accNr:"123456",
                ref:"Rent"
              },
            ],

        };
        this.setToken = this.setToken.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setClients = this.setClients.bind(this);
        this.setTransactions = this.setTransactions.bind(this);

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

    setTransactions(transactions, accountId) {
        const existingTransactions = this.state.transactions;
        this.setState({
            transactions: {
                [accountId]: transactions,
                ...existingTransactions
            }
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
                    <Route exact path="/manage-beneficiaries" render={() => <ManageBeneficiaries clients={this.state.clients} token={this.state.token} beneficiaries={this.state.beneficiaries}/>}/>
                    <Route exact path="/make-payments" render={() => <MakePayments clients={this.state.clients} token={this.state.token} beneficiaries={this.state.beneficiaries}/>}/>
                    <Route exact path="/transfer" render={() => <Transfer clients={this.state.clients} token={this.state.token}/>}/>
                    <Route exact path="/buy" render={() => <Buy clients={this.state.clients} token={this.state.token} beneficiaries={this.state.beneficiaries}/>}/>
                    <Route exact path="/view-account/:accountId" render={(props) => <ViewAccounts {...props} clients={this.state.clients} token={this.state.token} setTransactions={this.setTransactions} transactions={this.state.transactions}/>}/>
                    <Route exact path="/add-beneficiary" render={() => <AddBeneficiary clients={this.state.clients} token={this.state.token}/>}/>
                    <Route exact path="/view-beneficiary/:UserId" render={() => <ViewBeneficiary beneficiaries={this.state.beneficiaries} clients={this.state.clients} token={this.state.token}/>}/>
                    <Route exact path="/payment" render={() => <Payment clients={this.state.clients} token={this.state.token}/>}/>
                    <Route exact path="/register" render={() => <Register clients={this.state.clients} token={this.state.token}/>}/>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
