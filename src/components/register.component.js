//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/view-acc.css"
import {Link} from "react-router-dom"

//save background for component
const background = require('../img/BackgroundLogin.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
};

class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        accounts: [],
        type: '',
        fName: '',
        lName: '',
        dob: '',
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const form = {
       type: this.state.type,
       fName: this.state.fName,
       lName: this.state.lName,
       dob: this.state.dob,
       username: this.state.username,
       email: this.state.email,
       confirmEmail: this.confirmEmail,
       password: this.state.password,
       confirmPassword: this.state.confirmPassword,
      }
      alert("Feature Coming Soon");
      alert(`Information Entered:
                Account type: ${this.state.type} \n
                First Name: ${this.state.fName} \n
                Last Name: ${this.state.lName} \n
                Date of Birth: ${this.state.dob} \n
                Username: ${this.state.username}\n
                Email: ${this.state.email}`)
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

  render() {
    return (
      <Fragment>
        <div style={divStyle}>
          <div class="login-form">
            <form onSubmit={this.handleSubmit}>
                <h2 class="text-center">Register</h2>
                <div class="form-group">
                  <label>Select Account Type (select one):</label>
                  <select class="form-control"
                    name="type"
                    defaultValue=""
                    value={this.state.type}
                    onChange={e => this.handleChange(e)}>
                    <option>Personal</option>
                    <option>Business</option>
                  </select>
                </div>
                <div class="form-group">
                    <input
                      type="text"
                      name="fName"
                      value={this.state.Fname}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="First Name"
                      required="required"/>
                </div>
                <div class="form-group">
                    <input
                      type="text"
                      name="lName"
                      value={this.state.lName}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Last Name"
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
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Username"
                      required="required"/>
                </div>
                <div class="form-group">
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Email"
                      required="required"/>
                </div>
                <div class="form-group">
                    <input
                      type="text"
                      name="confirmEmail"
                      value={this.state.confirmEmail}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Confirm Email"
                      required="required"/>
                </div>
                <div class="form-group">
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Password"
                      required="required"/>
                </div>
                <div class="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={e => this.handleChange(e)}
                      class="form-control"
                      placeholder="Confirm Password"
                      required="required"/>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}
//export component
export default Register
