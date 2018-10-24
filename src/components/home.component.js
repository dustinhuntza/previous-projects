import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../css/home.css"
import Navigation from "./nav.component";
import Support from "./support.component";

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

                <ul>
                  {
                    this.state.accounts.map((account)=> (
                      <div key={account._id} class="container">
                        <div class="card">

                            <Link to={`/view-account/${account._id}`}><div class="card-header">{`${account.type}`}</div></Link>
                            <div class="card-body">{`Balance: R${account.balance}`}</div>

                        </div>
                      </div>
                    ))
                 }
               </ul>
               <Support />
            </Fragment>
        )
    }
}

export default Home
