import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import {Link} from "react-router-dom";

class MakePayments extends Component {
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
                <h1>Make Payments</h1>
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="login-form">
                          <form>
                            <h2 class="text-center">Make Once-off Payment</h2>
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
                                <input type="text" class="form-control" placeholder="Account Type" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Account Number" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Reference"/>
                            </div>
                            <div class="form-group">
                                <Link to="/payment"><button type="button" class="btn btn-primary btn-block">Next</button></Link>
                            </div>
                          </form>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="login-form">
                        <form>
                          <h2 class="text-center">Pay Beneficiary</h2>
                            <div class="radio">
                              <label><input type="radio" name="optradio"/>Beneficiary 1</label>
                            </div>
                            <div class="radio">
                              <label><input type="radio" name="optradio"/>Beneficiary 2</label>
                            </div>
                            <div class="radio disabled">
                              <label><input type="radio" name="optradio"/>Beneficiary 3</label>
                            </div>
                            <div class="radio disabled">
                              <label><input type="radio" name="optradio"/>Beneficiary 4</label>
                            </div>
                            <div class="radio disabled">
                              <label><input type="radio" name="optradio"/>Beneficiary 5</label>
                            </div>
                            <div class="radio disabled">
                              <label><input type="radio" name="optradio"/>Beneficiary 6</label>
                            </div>
                            <div class="radio disabled">
                              <label><input type="radio" name="optradio"/>Beneficiary 7</label>
                            </div>
                            <div class="form-group">
                                <Link to="/payment"><button type="button" class="btn btn-primary btn-block">Next</button></Link>                           
                            </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="login-form">
                          <form>
                            <h2 class="text-center">Make Reccuring Payment</h2>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Reccuring Date" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Beneficiary" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Amount" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Reference"/>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary btn-block">Pay and Save</button>
                            </div>
                          </form>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="login-form">
                        <form>
                          <h2 class="text-center">Make Future Dated Payment</h2>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Day to pay each month" required="required"/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Beneficiary" required="required"/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Amount" required="required"/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Reference"/>
                          </div>
                          <div class="form-group">
                              <button type="button" class="btn btn-primary btn-block">Pay and Save</button>
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

export default MakePayments
