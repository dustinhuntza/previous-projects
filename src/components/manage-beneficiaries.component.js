//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/manage-ben.css"
import {Link} from "react-router-dom";
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

class ManageBeneficiaries extends Component {
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
      <div style = {divStyle}>
        {/*render nav component*/}
        <Navigation clients={this.props.clients}/>
        <div class="Buttons">
              <Link to="/add-beneficiary"><button type="button" class="btn btn-ghost btn-ghost-bordered center-block">Add Beneficiary</button></Link>
        </div>
        <h1>Manage Beneficiaries</h1>
        <div class="list">
        {/*Map available beneficiaries*/}
        {
          this.props.beneficiaries.map((ben)=> (
            <Link to={`/view-beneficiary/${ben.id}`}><h6>{`Beneficiary: ${ben.name}`}</h6></Link>
          ))
        }
        <Link to="/view-beneficiary/id"><button>View Beneficiaries</button></Link>
      </div>
      <Support />
      </div>
      </Fragment>
    )
  }
}

export default ManageBeneficiaries
