import {Link} from "react-router-dom";
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


            <div class="scrollmenu">
              <Link to="/home"><h2>Home</h2></Link>
              <Link to="/manage-accounts"><h2>Manage Accounts</h2></Link>
              <Link to="/manage-beneficiaries"><h2>Manage beneficiaries</h2></Link>
              <Link to="/make-payments"><h2>Make Payments</h2></Link>
              <Link to="/transfer"><h2>Transfer</h2></Link>
              <Link to="/buy"><h2>Buy</h2></Link>
            </div>


            </Fragment>

        )
    }
}

export default Navigation
