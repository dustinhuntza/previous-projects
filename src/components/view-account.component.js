import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/view-acc.css"
import Support from "./support.component";

class ViewAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          search: '.*',
        };

        this.renderTransactions = this.renderTransactions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({search: this.state.search,});
        alert(this.state.search)
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
                const transactions = await api.get(`/transactions/${this.props.match.params.accountId}/.*`);

                this.props.setTransactions(transactions.data, this.props.match.params.accountId);

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

    renderTransactions() {
        debugger;
        if (this.props.transactions !== null) {
            return this.props.transactions[this.props.match.params.accountId].map(transaction => {
                return <div>

                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">{transaction.type}</h4>
                        <p class="card-text text-center">{`Amount: R${transaction.amount}`}</p>
                        <p class="card-text text-center">{`Balance: R${transaction.balance}`}</p>
                      </div>
                    </div>

                </div>
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Navigation clients={this.props.clients}/>
                <h1>View Accounts</h1>

                {this.state.accounts.map((x)=>(
                <div class="container">
                  <p>{`${x.type}`}</p>
                  <p>{`Balance: R${x.balance}`}</p>
                </div>
              ))}

                <div class="row">
                    <div class="col-sm-6">
                    <h4>Transacation History</h4>
                      <div class="card">
                        <div class="card-body">
                            <div class="card-transactions">
                                {this.renderTransactions()}
                            </div>
                        </div>
                      </div>
                    </div>

                <div class="col-sm-6">
                  <h4>Manage</h4>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Search</h4>
                      <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <input
                              name="search"
                              value={this.state.search}
                              onChange={e => this.handleChange(e)}
                              type="text"
                              class="form-control"
                              placeholder="Search..."/>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-primary btn-block">Search</button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Manage Limits</h4>
                      <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Set Limit"/>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-primary btn-block">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>

                  </div>
                </div>

              <Support />
            </Fragment>
        )
    }
}

export default ViewAccounts
