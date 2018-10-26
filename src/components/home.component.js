//necessary imports for the page
import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../css/home.css"
import Navigation from "./nav.component";
import Support from "./support.component";

//save background for component
const background = require('../img/BackgroundGeneral.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
};

class Home extends Component {
  //set initial states for form data to save in
  constructor(props) {
      super(props);
      this.state = {
          accounts: [],
          isLoading: false
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
    {/*shows loading if api takes long*/}
    if (this.state.isLoading) {
        return "Loading..."
    }

    return (
      <Fragment>
      <div style={divStyle}>
        <Navigation clients={this.props.clients}/>
          {/*Maps out account available and its balances*/}
          <ul>
            {
              this.state.accounts.map((account)=> (
                <div key={account._id} class="container">
                  <div class="card">
                    <div class="card-header">{`${account.type}`}</div>
                    <div class="card-body">{`Balance: R${account.balance}`}</div>
                    <Link to={`/view-account/${account._id}`}><div class="card-body"><button>View Account</button></div></Link>
                </div>
              </div>
            ))
          }
        </ul>
        {/*calls support component*/}
        <Support />
      </div>
      </Fragment>
    )
  }
}
//export component
export default Home
