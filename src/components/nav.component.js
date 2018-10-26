//necessary imports for the page
import {Link, NavLink} from "react-router-dom";
import React, {Component, Fragment} from "react";
import "../css/nav.css"

class Navigation extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <Fragment>
      <div>
        <div className="navbar">
          {/*map welcome message in nav bar*/}
          {this.props.clients.map(x =>
            <h3 key={x._id}>
                {`Welcome ${x.title} ${x.first} ${x.last}`}
            </h3>
          )}

          <div className="navButtons">
            <a href="/">Switch Account</a>
            <br/>
            <Link to="/">Sign Out</Link>
          </div>
        </div>
      </div>

      {/*scroller menu for navigation bar*/}
      <div class="scrollmenu">
        <NavLink to="/home" exact activeStyle={{color:'red'}}><h2>Home</h2></NavLink>
        <NavLink to="/manage-accounts" exact activeStyle={{color:'red'}}><h2>Manage Accounts</h2></NavLink>
        <NavLink to="/manage-beneficiaries" exact activeStyle={{color:'red'}}><h2>Manage beneficiaries</h2></NavLink>
        <NavLink to="/make-payments" exact activeStyle={{color:'red'}}><h2>Make Payments</h2></NavLink>
        <NavLink to="/transfer" exact activeStyle={{color:'red'}}><h2>Transfer</h2></NavLink>
        <NavLink to="/buy" exact activeStyle={{color:'red'}}><h2>Buy</h2></NavLink>
      </div>
      </Fragment>
    )
  }
}

export default Navigation
