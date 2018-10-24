import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";
import axios from "axios";
import {Link} from "react-router-dom";

class PayBen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          submitted: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = {
         name: this.state.name,
         bank: this.state.bank,
         branch: this.state.branch,
         accType: this.state.accType,
         accNr: this.state.accNr,
         ref: this.state.ref,
        }
        this.setState({ submitted: true })
     }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    renderPayment(){
      return <Payment name={this.state.name} clients={this.props.clients} token={this.props.token}/>
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

              <div class="row">
                <div class="col-sm-6">
                  <div class="login-form">
                    <form onSubmit={this.handleSubmit}>
                      <h2 class="text-center">Pay Beneficiary</h2>
                        <div class="radio">
                          <label><input type="radio" name="optradio" required/>Beneficiary 1</label>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block">Next</button>
                        </div>
                    </form>
                  </div>
                </div>
                <div class="col-sm-6">
                  {this.state.submitted && this.renderPayment()}
                </div>
              </div>


            </Fragment>
        )
    }
}

export default PayBen
