import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";

import MakeOnceOffPayments from "./makeOnceOffPayment.component";
import PayBen from "./payBen.component";
import MakeReccuringPayments from "./makeReccuringPayment.component";
import MakeFuturePayments from "./makeFuturePayment.component";

import axios from "axios";
import {Link} from "react-router-dom";
import "../css/make-payments.css"

class MakePayments extends Component {
    constructor(props) {
        super(props);
        this.state = {
          accounts: [],
          dropdownVisible: false,
          view : ''
        };
    }

    handleClick = view => event => {
        if (!this.state.dropdownVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
             document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            dropdownVisible: !prevState.dropdownVisible,
            view
        }));
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

                <h1>Make Payments</h1>
                <div class="container">
                  <button type="button" onClick={this.handleClick('view1')} class="btn btn-primary active">Make Once-Off Payment</button>
                  <button type="button" onClick={this.handleClick('view2')} class="btn btn-primary active">Pay Beneficiary</button>
                  <button type="button" onClick={this.handleClick('view3')} class="btn btn-primary active">Make Reccuring Payment</button>
                  <button type="button" onClick={this.handleClick('view4')} class="btn btn-primary active">Make Future Dated Payment</button>
                </div>

                <div className="table-container">
                    {this.state.view === 'view1' && <MakeOnceOffPayments clients={this.props.clients} token={this.props.token}/>}
                    {this.state.view === 'view2' && <PayBen clients={this.props.clients} token={this.props.token}/>}
                    {this.state.view === 'view3' && <MakeReccuringPayments clients={this.props.clients} token={this.props.token}/>}
                    {this.state.view === 'view4' && <MakeFuturePayments clients={this.props.clients} token={this.props.token}/>}
                </div>


            </Fragment>
        )
    }
}

export default MakePayments
