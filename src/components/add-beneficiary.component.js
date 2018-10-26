//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/add-ben.css"
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

class AddBeneficiary extends Component {
  //set initial states for form data to save in
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      name: '',
      bank: '',
      branch: '',
      accType: '',
      accNr: '',
      ref: '',
      purName: '',
      phoneNr: '',
      networkOperator: '',
    };
    //bind the listener of the funtions to the current class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  //saves the state of the data enetered into the form when submitted
  handleSubmit = (e) => {
    //prevents default event side-effect from occuring when submitting form
    e.preventDefault();
    const form = {
      name: this.state.name,
      bank: this.state.bank,
      branch: this.state.branch,
      accType: this.state.accType,
      accNr: this.state.accNr,
      ref: this.state.ref,
      purName: this.state.purName,
      phoneNr: this.state.phoneNr,
      networkOperator: this.state.networkOperator,
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
//Render the forms and controll values entered into forms
  render() {
    return (
      <Fragment>
          <div style = {divStyle}>
          {/*call navigation component & parse clients info*/}
            <Navigation clients={this.props.clients}/>
            <h1>Add Beneficiary</h1>
              <div class="container">
                <div class="row">
                {/*Form to enter purchase Beneficiary information*/}
                  <div class="col-sm-6">
                    <div class="login-form">
                      <form onSubmit={this.handleSubmit}>
                        <h2 class="text-center">Add Payment Beneficiary</h2>
                        <div class="form-group">
                          <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Name"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="bank"
                            value={this.state.bank}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Bank"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="branch"
                            value={this.state.branch}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Branch"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="accType"
                            value={this.state.accType}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Account type"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="number"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            name="accNr"
                            value={this.state.accNr}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Account Number"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="ref"
                            value={this.state.ref}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Reference"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Save</button>
                        </div>
                        </form>
                      </div>
                    </div>
                    {/*Form to enter purchase Beneficiary information*/}
                  <div class="col-sm-6">
                    <div class="login-form">
                      <form onSubmit={this.handleSubmit}>
                        <h2 class="text-center">Add Purchase Beneficiary</h2>
                        <div class="form-group">
                          <input
                            type="text"
                            name="purName"
                            value={this.state.purName}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Name"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="phoneNr"
                            value={this.state.phoneNr}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Mobile Number"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="networkOperator"
                            value={this.state.networkOperator}
                            onChange={e => this.handleChange(e)}
                            class="form-control"
                            placeholder="Network Operator"
                            required="required"/>
                        </div>
                        <div class="form-group">
                          <button type="button" class="btn btn-primary btn-block">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/*call support component*/}
            <Support />
          </div>
      </Fragment>
    )
  }
}
//export the component
export default AddBeneficiary
