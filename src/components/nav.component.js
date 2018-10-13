import {Link} from "react-router-dom";
import React, { Component } from "react";

class Navigation extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="scrolling-wrapper">
                {
                    !window.location.pathname.includes('/home') &&
                    <div className="carda">
                        <Link to="/home"><h2>Home</h2></Link>
                    </div>
                }
                <div className="carda">
                    <Link to="/manage-accounts"><h2>Manage Accounts</h2></Link>
                </div>
                <div className="carda">
                    <h2>Manage beneficiaries</h2>
                </div>
                <div className="carda"><h2>Make Payments</h2></div>
                <div className="carda"><h2>Transfer</h2></div>
                <div className="carda"><h2>Buy</h2></div>
            </div>
        )
    }
}

export default Navigation