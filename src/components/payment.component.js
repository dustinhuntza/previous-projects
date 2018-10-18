import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";

class Payment extends Component {
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

                <div class="login-form">
                  <form>
                      <h2 class="text-center">Payment</h2>
                      <p>Payment to EXAMPLE CLIENT</p>
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Amount" required="required"/>
                      </div>
                      <div class="form-group">
                        <label for="sel1">Select From Account (select one):</label>
                        <select class="form-control" id="sel1">
                          <option>Cheque</option>
                          <option>Savings</option>
                        </select>
                      </div>
                      <div class="form-group">
                          <button type="button" class="btn btn-primary btn-block">Pay</button>
                      </div>
                  </form>
              </div>


            </Fragment>
        )
    }
}

export default Payment
