//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/view-acc.css"
import Support from "./support.component";

//save background for component
const background = require('../img/BackgroundGeneral.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  marginTop: '5px',
};

class ViewAccounts extends Component {
  constructor(props) {
      super(props);
      this.state = {
        accounts: [],
        type: null,
        from: null,
        to: null,
        limit: null
      };

      this.renderTransactions = this.renderTransactions.bind(this);
      this.clicked = this.clicked.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.setState({search: this.state.search,});
   }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  clicked() {
    if (this.state.limit !== null) {
      alert(`Limit set to: R${this.state.limit}`);
    }else{
      alert("Please enter a limit");
    }
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

  componentDidUpdate() {
      (async () => {

          try {
              const token = this.props.token;

              const api = axios.create({
                  baseURL: 'http://45.77.58.134:8080',
                  headers: {'Authorization': 'Bearer ' + token}
              });

              if (!this.props.transactions[this.props.match.params.accountId]) {
                  const transactions = await api.get(`/transactions/${this.props.match.params.accountId}/.${this.state.search}`);

                  this.props.setTransactions(transactions.data, this.props.match.params.accountId);
              }
              // console.log(accounts);
          } catch (e) {
              // handle error.
          }
      })();
  }

  renderTransactions() {

      if (this.props.transactions && this.props.transactions[this.props.match.params.accountId]) {
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
      <div style={divStyle}>
        {/*render nav component*/}
        <Navigation clients={this.props.clients}/>
        <h1>View Accounts</h1>
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
                          value={this.state.type}
                          onChange={e => this.handleChange(e)}
                          type="text"
                          class="form-control"
                          placeholder="Search by transaction type"/>
                        </div>
                        <div className="form-group">
                          <label>Search: Date From</label>
                          <input
                            name="search"
                            value={this.state.from}
                            onChange={e => this.handleChange(e)}
                            type="date"
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label>Search: Date To</label>
                            <input
                              name="search"
                              value={this.state.to}
                              onChange={e => this.handleChange(e)}
                              type="date"
                              className="form-control"/>
                        </div>
                      <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Search</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Manage Limits</h4>
                    <form>
                      <div class="form-group">
                          <input
                          type="number"
                          name="limit"
                          pattern="[0-9]*"
                          inputmode="numeric"
                          value={this.state.limit}
                          onChange={e => this.handleChange(e)}
                          class="form-control"
                          placeholder="Set Limit"/>
                      </div>
                      <div class="form-group">
                          <button type="button" onClick={this.clicked} class="btn btn-primary btn-block">Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          {/*render support component*/}
          <Support />
        </div>
      </Fragment>
    )
  }
}
//export component
export default ViewAccounts
