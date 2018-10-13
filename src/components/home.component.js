import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../css/home.css"
import Navigation from "./nav.component";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            accounts: [],
            isLoading: false
        };
    }

    componentDidMount() {
        (async () => {

            try {
                const token = this.props.token;

                const api = axios.create({
                    baseURL: 'http://45.77.58.134:8080',
                    headers: {'Authorization': 'Bearer ' + token}
                });

                this.setState({
                    isLoading: true
                });

                const clients = await api.get('/clients');
                const accounts = await api.get(`/accounts/${clients.data[0]._id}`);

                this.setState({
                    clients: clients.data,
                    accounts: accounts.data,
                    isLoading: false
                });
                // console.log(accounts);

            } catch (e) {
                // handle error.
                this.setState({
                    isLoading: false
                })
            }
        })();
    }

    render() {

        if (this.state.isLoading) {
            return "Loading..."
        }

        return (
            <Fragment>
                <Navigation/>

                <div>

                    <div className="navbar">
                        {this.state.clients.map(x =>
                            <h3 key={x._id}>
                                {`Welcome ${x.first} ${x.last}`}
                            </h3>
                        )}

                        <div className="navButtons">
                            <a href="GettingStarted.html">Switch Account</a>
                            <br/>
                            <Link to="/">Sign Out</Link>
                        </div>
                    </div>

                    <div className="container">
                        {
                            this.state.accounts.map((account) => (
                                <div key={account._id} className="card-deck">
                                    <div className="card">
                                        <div className="card-body text-left">

                                            <p className="card-text">
                                                {`Account: ${account.description}`}
                                            </p>

                                            <p className="card-text">
                                                {`Type: ${account.type}`}
                                            </p>

                                            <p className="card-text">
                                                {`Balance: R${account.balance}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                    <ul>
                        {this.state.clients.map(x =>
                            <li key={x._id}>
                                {`${x.first} ${x.last} - ${x.usernames}`}
                            </li>
                        )}
                    </ul>
                    ;

                </div>
            </Fragment>
        )
    }
}

export default Home