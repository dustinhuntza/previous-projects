//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/manage-acc.css"
import {Link} from "react-router-dom";
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

class ManageAccounts extends Component {
  //set initial states for form data to save in
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accType: '',
      idNr: '',
      proofOfaddress: '',
      dob: '',
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
     accType: this.state.accType,
     idNr: this.state.idNr,
     proofOfaddress: this.state.proofOfaddress,
     dob: this.state.dob,
    }
    //alert user of status of element
    alert("Feature To Be Added Soon!")
    alert(`Information Entered:
              Account type: ${this.state.accType} \n
              ID number: ${this.state.idNr} \n
              Proof Of Address: ${this.state.proofOfaddress} \n
              Date of Birth: ${this.state.dob}`)
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
        <div style={divStyle}>
          <Navigation clients={this.props.clients}/>
          <h1>Manage Accounts</h1>
          <div class="row">
            <div class="col-sm-6">
            {/*Map differrnt accounts and balances*/}
            <ul>
              {
                this.state.accounts.map((account)=> (
                  <div key={account._id} class="container">
                    <div class="card">

                        <div class="card-header">{`${account.description}`}</div>
                        <div class="card-body">{`Balance: R${account.balance}`}</div>
                        <Link to={`/view-account/${account._id}`}><div class="card-body"><button>View Account</button></div></Link>

                    </div>
                  </div>
                ))
             }
           </ul>
            </div>
            <div class="col-sm-6">
              <div class="container">
                <div class="login-form">
                  <form onSubmit={this.handleSubmit}>
                  {/*Form to aplpy for new account*/}
                      <h2 class="text-center">Apply for new Account</h2>
                      <div class="form-group">
                        <label>Select Account Type (select one):</label>
                        <select class="form-control"
                          name="accType"
                          value={this.state.accType}
                          onChange={e => this.handleChange(e)}>
                          <option>Cheque</option>
                          <option>Savings</option>
                          <option>Credit</option>
                          <option>Investment</option>
                        </select>
                      </div>
                      <div class="form-group">
                          <input
                            type="number"
                            name="idNr"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            value={this.state.idNr}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="ID number"
                            required="required"/>
                      </div>
                      <div class="form-group">
                          <input
                            type="text"
                            name="proofOfaddress"
                            value={this.state.proofOfaddress}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Proof of Address"
                            required="required"/>
                      </div>
                      <div class="form-group">
                          <label>Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            value={this.state.dob}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Date of birth"
                            required="required"/>
                      </div>
                      <div class="form-group">
                          <button type="submit" onClick={this.clicked} class="btn btn-primary btn-block">Apply</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        <Support />
        </div>
      </Fragment>
    )
  }
}
//export component
export default ManageAccounts
