import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/view-acc.css"
import {Link} from "react-router-dom"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: []};
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

                <div class="login-form">
                  <form>
                      <h2 class="text-center">Register</h2>
                      <div class="form-group">
                        <label for="sel1">Select Account Type (select one):</label>
                        <select class="form-control" id="sel1">
                          <option>Personal</option>
                          <option>Business</option>
                        </select>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="First Name" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Last Name" required="required"/>
                      </div>
                      <div class="form-group">
                          <label for="sel1">Date of Birth</label>
                          <input type="date" class="form-control" placeholder="Date of birth" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Username" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Email" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Confirm Email" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="password" class="form-control" placeholder="Password" required="required"/>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Confirm Password" required="required"/>
                      </div>
                      <div class="form-group">
                          <button type="button" class="btn btn-primary btn-block">Register</button>
                      </div>
                  </form>
              </div>

            </Fragment>
        )
    }
}

export default Register
