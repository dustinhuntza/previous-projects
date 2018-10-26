//necessary imports for the page
import React, {Component, Fragment} from "react"
import jsSHA from "jssha"
import "../css/login.css"
import axios from "axios"
import {Link} from "react-router-dom";

//save background for component
const background = require('../img/BackgroundLogin.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
};

class Login extends Component {
  //set initial states for form data to save in
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        loginFailed: false
    };
    //bind the listener of the funtions to the current class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }
  //set login false when user is changed to log in again
  handleUserChange(e) {
      this.setState({
          [e.target.name]: e.target.value,
          loginFailed: false
      }, () => {
          console.log(this.state)
      });
  }


  handleSubmit(e) {
    e.preventDefault();
    //set password and username
    const user = this.state.username;
    const password = this.state.password;

    const hmac = new jsSHA('SHA-256', 'TEXT');

    hmac.setHMACKey(password, 'TEXT');
    hmac.update(user);
    hmac.update(Date.now().toString(36).substring(0, 4));

    const token = `${hmac.getHMAC('HEX')}%${user}`;

    const api = axios.create({
        baseURL: 'http://45.77.58.134:8080',
        headers: {'Authorization': 'Bearer ' + token}
    });
    //get client info & sets token to client
    (async () => {
        try {
            const res = await api.get('/clients');
            this.props.setToken(token);
            this.props.setClients(res.data);
            this.props.history.push("/home");

        } catch (e) {
            // network error - could be 401 or other "not ok" HTTP status
            this.setState({
                loginFailed: true
            })
        }
    })();
  }
  //form to enter login details and save its state
  render() {
    return (
      <Fragment>
        <div style={divStyle}>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
                <h2 className="text-center">Log In</h2>

                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" placeholder="Enter Username"
                       name="username"
                       onChange={this.handleUserChange}
                       value={this.state.username}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" placeholder="Enter Password"
                       name="password"
                       onChange={this.handleUserChange}
                       value={this.state.password}/>
                <br/>
                {/*login failed sho message*/}
                {this.state.loginFailed && <span style={{color: "red"}}>Login failed</span>}
                <button type="submit" className="btn btn-primary btn-block">Log in</button>

            </form>
              <Link to="/register"><p className="text-center">Create an Account</p></Link>
          </div>
        </div>
      </Fragment>
    )
  }
}

//export component
export default Login
