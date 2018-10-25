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

                const beneficiaries = this.props.beneficiaries;
                this.props.setBen(beneficiaries, this.props.match.params.UserId);

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

    renderBeneficiary() {
        //NOT WORKING YET.Getting the param as click on name but doesn't want to render when adding it to map funtion
        //this.props.beneficiaries[this.props.match.params.UserId].map

        if (this.props.beneficiaries !== null) {
            return this.props.beneficiaries.map(ben => {
                return <div>

                    <div class="container">
                      <p>Name: {ben.name}</p>
                      <p>Bank: {ben.bank}</p>
                      <p>Branch: {ben.branch}</p>
                      <p>Account Type: {ben.accType}</p>
                      <p>Account Number: {ben.accNr}</p>
                      <p>Reference: {ben.ref}</p>
                    </div>

                </div>
            });
        }
    }


    render() {

        return (
            <Fragment>
                <Navigation clients={this.props.clients}/>
                <h1>View Beneficiary</h1>

                <div class="container">
                  {this.renderBeneficiary()}
                </div>

                <div class="Buttons">
                  <button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Edit Beneficiary</button>
                  <p></p>
                  <button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Delete Beneficiary</button>
                </div>

              <Support />
            </Fragment>
        )
    }
}

export default ViewBeneficiary
