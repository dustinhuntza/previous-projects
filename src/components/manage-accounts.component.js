import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/manage-acc.css"
import {Link} from "react-router-dom";

class ManageAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          acc: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

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
        return (
            <Fragment>
                <Navigation clients={this.props.clients}/>
                <h1>Manage Accounts</h1>

                <div class="row">
                  <div class="col-sm-6">

                  <ul>
                    {
                      this.state.accounts.map((account)=> (
                        <div key={account._id} class="container">
                          <div class="card">

                              <div class="card-header">{`${account.type}`}</div>
                              <div class="card-body">{`Balance: R${account.balance}`}</div>
                              <Link to="/view-account"><div class="card-body"><button onClick={this.handleClick}>View Account</button></div></Link>

                          </div>
                        </div>
                      ))
                   }
                 </ul>

                  </div>

                  <div class="col-sm-6">

                    <div class="container">
                      <div class="login-form">
                        <form>
                            <h2 class="text-center">Apply for new Account</h2>
                            <div class="form-group">
                              <label for="sel1">Select Account Type (select one):</label>
                              <select class="form-control" id="sel1">
                                <option>Cheque</option>
                                <option>Savings</option>
                                <option>Credit</option>
                                <option>Investment</option>
                              </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="ID number" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Proof of Address" required="required"/>
                            </div>
                            <div class="form-group">
                                <label>Date of Birth</label>
                                <input type="date" class="form-control" placeholder="Date of birth" required="required"/>
                            </div>
                            <div class="form-group">
                              <a href="Home.html">
                                <button type="button" class="btn btn-primary btn-block">Apply</button>
                              </a>
                            </div>
                        </form>
                      </div>
                    </div>



                  </div>
                </div>
            </Fragment>
        )
    }
}

export default ManageAccounts
