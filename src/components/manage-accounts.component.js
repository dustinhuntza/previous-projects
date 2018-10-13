import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";

class ManageAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <Fragment>
                <Navigation/>
                <h1>Manage Accounts</h1>
            </Fragment>
        )
    }
}

export default ManageAccounts