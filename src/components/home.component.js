import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "../css/home.css"
import Navigation from "./nav.component";
import Support from "./support.component";

const imgMyimageexample = require('../img/BackgroundGeneral.jpg');
const divStyle = {
  width: '100%',
  minHeight: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover',
  marginTop: '5px',
};

class Home extends Component {
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

        if (this.state.isLoading) {
            return "Loading..."
        }

        return (
            <Fragment>
            <div style={divStyle}>
                <Navigation clients={this.props.clients}/>

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
               <Support />
               </div>
            </Fragment>
        )
    }
}

export default Home
