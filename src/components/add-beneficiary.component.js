import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/add-ben.css"

class AddBeneficiary extends Component {
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
                <Navigation clients={this.props.clients}/>
                <h1>Add Beneficiary</h1>

                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="login-form">
                          <form>
                            <h2 class="text-center">Add Payment Beneficiary</h2>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Bank" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Branch" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Account type" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Account Number" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Reference" required="required"/>
                            </div>
                            <div class="form-group">
                              <a href="Home.html">
                                <button type="button" class="btn btn-primary btn-block">Save</button>
                              </a>
                            </div>
                          </form>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="login-form">
                        <form>
                          <h2 class="text-center">Add Purchase Beneficiary</h2>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Name" required="required"/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Mobile Number" required="required"/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Network Operator" required="required"/>
                          </div>
                          <div class="form-group">
                            <a href="Home.html">
                              <button type="button" class="btn btn-primary btn-block">Save</button>
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

export default AddBeneficiary
