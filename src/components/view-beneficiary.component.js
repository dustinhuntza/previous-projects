//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/add-ben.css"
import Support from "./support.component";

//save background for component
const background = require('../img/BackgroundGeneral.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  marginTop: '5px',
};

class ViewBeneficiary extends Component {
  //set initial states
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
    //return beneficiary details
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
        <div style = {divStyle}>
          {/*render nav component*/}
          <Navigation clients={this.props.clients}/>
          <h1>View Beneficiary</h1>

          <div class="container">
            {/*call render method that returns beneficiary details*/}
            {this.renderBeneficiary()}
          </div>

          <div class="Buttons">
            <button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Edit Beneficiary</button>
            <p></p>
            <button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Delete Beneficiary</button>
          </div>

        <Support />
        </div>
      </Fragment>
    )
  }
}

export default ViewBeneficiary
