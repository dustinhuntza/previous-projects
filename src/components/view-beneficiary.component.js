import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/add-ben.css"
import Support from "./support.component";

class ViewBeneficiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
        };

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
                <Navigation clients={this.props.clients}/>
                <h1>View Beneficiary</h1>



              <Support />
            </Fragment>
        )
    }
}

export default ViewBeneficiary
