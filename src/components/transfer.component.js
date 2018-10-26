//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/transfer.css"
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

class Transfer extends Component {
  //set initial states for form data to save in
  constructor(props) {
      super(props);
      this.state = {
        accounts: [],
        amount: '',
        fromAccount:'',
        toAccount:'',
      };
      //bind the listener of the funtions to the current class
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }
  //saves the state of the data enetered into the form when submitted
  handleSubmit = (e) => {
    //prevents default event side-effect from occuring when submitting form
    e.preventDefault();
    const form = {
     amount: this.state.amount,
     fromAccount: this.state.fromAccount,
    }
    //cannot transfer tfrom and to with same account
    if (this.state.fromAccount === this.state.toAccount) {
      alert("Same Accounts! Choose different account to transfer From or To!")
    }
   }
  //handles change of state when data is enterd to form
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


  render() {
    return (
      <Fragment>
      <div style = {divStyle}>
        {/*call nav component*/}
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
                      {/*map available accounts*/}
                      <option value="" disabled>Choose a Account</option>
                      {
                        this.state.accounts.map((account)=> {
                          return <option key={account._id}
                            value={account.type}>{account.type}</option>;
                        })
                      }
                    </select>
                    {/*map available balance for account*/}
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
                      {/*map available accounts*/}
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
                        pattern="[0-9]*"
                        inputmode="numeric"
                        value={this.state.amount}
                        onChange={e => this.handleChange(e)}
                        type="number"
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
        {/*call suppert component*/}
        <Support />
        </div>
      </Fragment>
    )
  }
}
//export component
export default Transfer
