//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";
import axios from "axios";
import {Link} from "react-router-dom";

class MakeOnceOffPayments extends Component {
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
      submitted: false,
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
     name: this.state.name,
     bank: this.state.bank,
     branch: this.state.branch,
     accType: this.state.accType,
     accNr: this.state.accNr,
     ref: this.state.ref,
    }
    this.setState({ submitted: true })
  }
  //handles change of state when data is enterd to form
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  //return payment method to be render paymnet component and parse in necessary props
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
                <h2 class="text-center">Make Once-off Payment</h2>
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
                  <label>Select Bank (select one):</label>
                  <select class="form-control"
                    name="bank"
                    value={this.state.bank}
                    onChange={e => this.handleChange(e)}>
                    <option>Absa</option>
                    <option>NedBank</option>
                    <option>Capitec</option>
                    <option>Standard Bank</option>
                    <option>FNB</option>
                  </select>
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
                      placeholder="Account Type"
                      required="required"/>
                </div>
                <div class="form-group">
                {/*can only enter numbers*/}
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
                      placeholder="Reference"/>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Next</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-6">
           {/*Conditional rendering to render payment when form is submitted*/}
            {this.state.submitted && this.renderPayment()}
          </div>
        </div>
      </Fragment>
    )
  }
}
//export component
export default MakeOnceOffPayments
