import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/transfer.css"
import Support from "./support.component";

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          amount: '',
          fromAccount:'',
          toAccount:'',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = {
         amount: this.state.amount,
         fromAccount: this.state.fromAccount,
        }
        if (this.state.fromAccount === this.state.toAccount) {
          alert("Same Accounts! Choose different account to transfer From or To!")
        }
     }


    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
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

    check () {

    }

    render() {
        return (
            <Fragment>
                <Navigation clients={this.props.clients}/>
                  <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.handleSubmit}>
                            <h2 class="text-center">Transfer Between Accounts</h2>
                            <div class="form-group">
                              <label>Select From Account (select one):</label>
                              <select
                                name="fromAccount"
                                value={this.state.fromAccount}
                                onChange={e => this.handleChange(e)}
                                ref="userInput"
                                defaultValue=""
                                required>
                                <option value="" disabled>Choose a Account</option>
                                {
                                  this.state.accounts.map((account)=> {
                                    return <option key={account._id}
                                      value={account.type}>{account.type}</option>;
                                  })
                                }
                              </select>
                              {
                                this.state.accounts.filter((bal) => bal.type === this.state.fromAccount).map((account)=> (
                                  <p key={account._id}>
                                        <div>{`Available Balance: R${account.balance}`}</div>
                                    </p>
                                ))
                             }
                            </div>
                            <div class="form-group">
                              <label>Select To Account (select one):</label>
                              <select
                                name="toAccount"
                                value={this.state.toAccount}
                                onChange={e => this.handleChange(e)}
                                ref="userInput"
                                defaultValue=""
                                required>
                                <option value="" disabled>Choose a Account</option>
                                {
                                  this.state.accounts.map((account)=> {
                                    return <option key={account._id}
                                      value={account.type}>{account.type}</option>;
                                  })
                                }
                              </select>
                            </div>
                            <div class="form-group">
                                <input
                                  name="amount"
                                  value={this.state.amount}
                                  onChange={e => this.handleChange(e)}
                                  type="text"
                                  class="form-control"
                                  placeholder="Amount"
                                  required="required"/>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Make Transfer</button>
                            </div>
                        </form>
                    </div>
                  </div>
              <Support />
            </Fragment>
        )
    }
}

export default Transfer
