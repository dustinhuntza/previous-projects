import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../css/home.css"
import Navigation from "./nav.component";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

                const accounts = await api.get(`/accounts/${this.props.clients[0]._id}`);

                this.setState({
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
                <Navigation clients={this.props.clients}/>
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
                    {this.props.clients.map(x =>
                        <li key={x._id}>
                            {`${x.first} ${x.last} - ${x.usernames}`}
                        </li>
                    )}
                </ul>
            </Fragment>
        )
    }
}

export default Home