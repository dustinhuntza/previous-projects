//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";
import axios from "axios";
import {Link} from "react-router-dom";

class PayBen extends Component {
  //set initial states for form data to save in
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
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

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  //handles change of state when data is enterd to form
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
                  <label>Select Beneficiary (select one):</label>
                  <select
                    name="beneficiary"
                    value={this.state.beneficiary}
                    onChange={e => this.handleChange(e)}
                    ref="userInput"
                    defaultValue=""
                    required>
                    {/*map available beneficiaries*/}
                    <option value="" disabled>Choose a Beneficiary</option>
                    {
                      this.props.beneficiaries.map((person)=> {
                        return <option
                          value={person.name}>{person.name}</option>;
                      })
                    }
                  </select>
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
export default PayBen
