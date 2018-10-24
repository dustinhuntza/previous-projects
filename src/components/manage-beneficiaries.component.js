import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/manage-ben.css"
import {Link} from "react-router-dom";
import Support from "./support.component";

class ManageBeneficiaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          beneficiaries: {
              name:"Pikkie",
              bank:"FNB",
              branch:"Absa Branch",
              accType:"Cheque",
              accNr:"123456",
              ref:"Rent"
          }
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
                <div class="Buttons">
                      <Link to="/add-beneficiary"><button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Add Beneficiary</button></Link>
                </div>
                <h1>Manage Beneficiaries</h1>
                <div class="list">
                    <Link to="/view-beneficiary"><p>{this.state.beneficiaries.name}</p></Link>
                </div>
              <Support />
            </Fragment>
        )
    }
}

export default ManageBeneficiaries
